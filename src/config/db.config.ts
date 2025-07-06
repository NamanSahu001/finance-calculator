import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Limit concurrent connections
  queueLimit: 0,
  enableKeepAlive: true,
  // keepAliveInitialDelay: 30000,
  // connectTimeout: 60000,
  // acquireTimeout: 60000,
  // multipleStatements: true
}

// Retry settings
const MAX_RETRIES = 5
const RETRY_DELAY = 2000 // Initial delay (2 seconds)

let pool: mysql2.Pool | null = null

// Function to validate connection
const validateConnection = async (
  connection: mysql2.PoolConnection
): Promise<boolean> => {
  try {
    await connection.ping()
    await connection.query('SELECT 1')
    return true
  } catch (error) {
    console.error('Connection validation failed:', error)
    return false
  }
}

const pingInterval = 1800000 // 30 minutes (30 * 60 * 1000 ms)

// Function to create pool with retry logic
const createPool = async (retries = 0): Promise<mysql2.Pool> => {
  try {
    const newPool = mysql2.createPool(dbConfig)

    // Set up ping interval
    setInterval(async () => {
      try {
        const connection = await newPool.getConnection()
        await connection.ping()
        connection.release()
      } catch (error) {
        console.error('Ping failed:', error)
      }
    }, pingInterval)

    // Test the connection
    const [rows] = await newPool.query('SELECT 1 AS test')
    console.log('✅ Database pool created successfully.')
    return newPool
  } catch (error) {
    console.error(
      `❌ Database pool creation failed (Attempt ${
        retries + 1
      }/${MAX_RETRIES}):`,
      error
    )

    if (retries < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retries)
      console.log(`🔄 Retrying pool creation in ${delay / 1000} seconds...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return createPool(retries + 1)
    }
    throw new Error(
      'Maximum retry attempts reached. Could not create database pool.'
    )
  }
}

// Initialize pool
const initializePool = async () => {
  try {
    pool = await createPool()
  } catch (error) {
    console.error('Failed to initialize database pool:', error)
    process.exit(1)
  }
}

// Initialize pool on startup
initializePool()

export const getConnection = async (): Promise<mysql2.Pool> => {
  if (!pool) {
    try {
      pool = await createPool()
    } catch (error: any) {
      console.error('❌ Failed to get database connection:', error)
      throw new Error('Failed to get database connection')
    }
  }

  // Validate pool connection
  try {
    const connection = await pool.getConnection()
    const isValid = await validateConnection(connection)
    connection.release()

    if (!isValid) {
      console.log('🔄 Connection invalid, recreating pool...')
      await closePool() // Properly close the existing pool
      pool = await createPool()
    }
  } catch (error) {
    console.error('❌ Connection validation failed, recreating pool...')
    await closePool() // Properly close the existing pool
    pool = await createPool()
  }

  return pool
}

// Function to execute query with retry logic
export const executeQuery = async <T>(
  query: string,
  params?: any[],
  retries = 0
): Promise<T> => {
  try {
    const connection = await getConnection()
    const [result] = await connection.query(query, params)
    return result as T
  } catch (error: any) {
    console.error(
      `Query execution failed (Attempt ${retries + 1}/${MAX_RETRIES}):`,
      error
    )

    if (
      retries < MAX_RETRIES &&
      (error.code === 'PROTOCOL_CONNECTION_LOST' ||
        error.code === 'ECONNRESET' ||
        error.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR')
    ) {
      const delay = RETRY_DELAY * Math.pow(2, retries)
      console.log(`🔄 Retrying query in ${delay / 1000} seconds...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return executeQuery(query, params, retries + 1)
    }

    throw error
  }
}

// Properly close the pool when the app shuts down
export const closePool = async () => {
  if (pool) {
    try {
      await pool.end()
      console.log('✅ Database connection pool closed.')
      pool = null
    } catch (error) {
      console.error('Error closing database pool:', error)
    }
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('⚠️ SIGINT received. Closing database pool...')
  await closePool()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('⚠️ SIGTERM received. Closing database pool...')
  await closePool()
  process.exit(0)
})

export const getPoolConnection = async (): Promise<mysql2.Connection> => {
  if (!pool) {
    pool = mysql2.createPool(dbConfig)
  }

  try {
    const connection = await pool.getConnection()

    // Validate connection
    try {
      await connection.query('SELECT 1')
      return connection.connection
    } catch (error) {
      // If validation fails, release the connection and throw
      connection.release()
      throw error
    }
  } catch (error) {
    console.error('Failed to get pool connection:', error)
    throw error
  }
}

export const releaseConnection = async (conn: mysql2.PoolConnection) => {
  try {
    // console.log("Release connection :", (conn), (connection))
    // if (connection) connection.release();
    if (conn) {
      conn.release()
    }
  } catch (error: any) {
    console.error('Database config error', error)
    throw new Error('Failed to create database connection')
  }
}

export default pool
