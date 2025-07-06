import jwt from 'jsonwebtoken'
import { getConnection } from '../config/db.config'

export class AuthService {
  private static readonly SECRET_KEY = process.env.JWT_SECRET || 'Info#1234'
  private static readonly TOKEN_EXPIRY = '10h'

  static generateToken(payload: any): string {
    return jwt.sign(payload, this.SECRET_KEY, {
      expiresIn: this.TOKEN_EXPIRY,
    })
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.SECRET_KEY) as any
    } catch (error) {
      throw new Error('Invalid token')
    }
  }

  static decodeToken(token: string): any | null {
    try {
      return jwt.decode(token) as any
    } catch {
      return null
    }
  }
}

export async function getUserDetails(username: string): Promise<any> {
  const connection = await getConnection()
  const [rows] = await connection.execute(
    'SELECT id, username, password, email_id,type FROM users WHERE username = ?',
    [username]
  )
  return (rows as any[])[0]
}

export async function getUserDetailsByEmail(email: string): Promise<any> {
  const connection = await getConnection()
  const [rows] = await connection.execute(
    'SELECT id, username, password, email_id,created_at ,type FROM users WHERE email_id = ?',
    [email]
  )
  return (rows as any[])[0]
}

export async function setLastLogin(id: number) {
  const connection = await getConnection()
  await connection.execute(
    'UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [id]
  )
}
