const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs')

async function updateAdminPassword() {
  try {
    // Create connection
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'finance_calculator',
    })

    console.log('✅ Database connected successfully')

    // Hash the admin password
    const hashedPassword = await bcrypt.hash('admin', 10)
    console.log('🔐 Password hashed successfully')

    // Update the admin user's password
    await connection.execute(
      'UPDATE users SET password = ? WHERE username = ?',
      [hashedPassword, 'admin']
    )

    console.log('✅ Admin password updated successfully')
    console.log('📋 You can now login with:')
    console.log('   Username: admin')
    console.log('   Email: admin@example.com')
    console.log('   Password: admin')

    await connection.end()
  } catch (error) {
    console.error('❌ Failed to update admin password:', error)
  }
}

updateAdminPassword()
