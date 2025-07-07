import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'  // ADD THIS LINE
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import authRoutes from './routes/auth.js'
// Load environment variables
dotenv.config()

// Connect to database 
connectDB()

const app = express()
 
// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
)

app.use('/api/auth', authRoutes)

// Basic route
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Server is running!', 
    environment: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME || 'ChatApp',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

app.use(notFound)

// Global error handling middleware (must be last)
// Purpose: Catches all errors that occur anywhere in your app
// When it runs: When ANY middleware calls next(error)
// express now knows about the middleware
// REGISTER MIDDLEWARE --- without this Express uses its default HTML error handler instead of your JSON handler.
app.use(errorHandler)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
})
