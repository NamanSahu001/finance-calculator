import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import planRoutes from './routes/plan.routes'
const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend Vite dev server
  })
)
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))
app.use('/api/auth', authRoutes)
app.use('/api/plan', planRoutes)
app.use('/api/', (_req: any, res: any, _next: any) => {
  return res.status(400).json({
    status_code: 400,
    message: 'Something went wrong',
    error: 'Wrong method or api',
  })
})

export default app
