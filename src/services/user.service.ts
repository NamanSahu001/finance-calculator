import bcrypt from 'bcryptjs'
import { getConnection } from '../config/db.config'

export interface CreateUserData {
  username: string
  password: string
  email: string
}

export const createUser = async (userData: CreateUserData) => {
  const connection = await getConnection()

  try {
    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE username = ? OR email_id = ?',
      [userData.username, userData.email]
    )

    if ((existingUsers as any[]).length > 0) {
      throw new Error('User with this username or email already exists')
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

    // Insert new user
    const [result] = await connection.execute(
      'INSERT INTO users (username, password, email_id) VALUES (?, ?, ?)',
      [userData.username, hashedPassword, userData.email]
    )

    const insertResult = result as any

    // Get the created user (without password)
    const [users] = await connection.execute(
      'SELECT id, username, email_id, created_at FROM users WHERE id = ?',
      [insertResult.insertId]
    )

    return {
      success: true,
      message: 'User created successfully',
      user: (users as any[])[0],
    }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const getAllUsers = async () => {
  const connection = await getConnection()

  try {
    const [users] = await connection.execute(
      'SELECT id, username, email_id, type, created_at, updated_at FROM users ORDER BY created_at DESC'
    )

    return {
      success: true,
      users: users,
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const getUserById = async (userId: number) => {
  const connection = await getConnection()

  try {
    const [users] = await connection.execute(
      'SELECT id, username, email_id, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    )

    if ((users as any[]).length === 0) {
      throw new Error('User not found')
    }

    return {
      success: true,
      user: (users as any[])[0],
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
