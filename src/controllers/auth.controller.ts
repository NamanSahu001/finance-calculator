import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import {
  AuthService,
  getUserDetails,
  setLastLogin,
  getUserDetailsByEmail,
} from '../services/auth.service'
import { createUser } from '../services/user.service'
import { getAllUsers } from '../services/user.service'

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password }: any = req.body

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' })
    return
  }

  try {
    // Get user from database - try username first, then email
    let user: any = await getUserDetails(username)

    if (!user) {
      // If not found by username, try by email
      user = await getUserDetailsByEmail(username)
    }

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }
    console.log(user)
    // Validate password - try bcrypt first, then plain text as fallback
    let passwordValid = await bcrypt.compare(password, user.password)

    // If bcrypt fails, try plain text comparison for existing users
    if (!passwordValid && user.password === password) {
      passwordValid = true
      console.log('Using plain text password fallback')
    }

    console.log(passwordValid)
    if (!passwordValid) {
      res.status(401).json({ message: 'Invalid credentials' })
      return
    }

    // Update last login timestamp
    await setLastLogin(user.id)

    // Generate tokens
    const accessToken = AuthService.generateToken({
      id: user.id,
      username: user.username,
      email: user.email_id,
      type: user.type,
    })

    // Prepare response
    const response: any = {
      token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email_id,
        type: user.type,
      },
      expiresIn: 36000, // 10 hours in seconds
    }

    res.json(response)
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const logoutController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.json({ message: 'Logged out successfully' })
}

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password, email }: any = req.body

    // Validate input
    if (!username || !password || !email) {
      res.status(400).json({
        message: 'Username, password, and email are required',
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      res.status(400).json({
        message: 'Please provide a valid email address',
      })
      return
    }

    // Validate password strength
    if (password.length < 6) {
      res.status(400).json({
        message: 'Password must be at least 6 characters long',
      })
      return
    }

    const result = await createUser({ username, password, email })
    res.status(201).json(result)
  } catch (error: any) {
    console.error('Registration error:', error)
    if (error.message.includes('already exists')) {
      res.status(409).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAllUsers()
    res.status(200).json(result)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
