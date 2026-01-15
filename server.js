import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import authRouter from './src/routes/authRoutes.js'
import flightRouter from './src/routes/flightRoute.js'
import middlewareRouter from './src/middleware/authMiddleware.js'


const app = express()
app.use(express.json())
app.use('/auth', authRouter)

app.use('/flight',middlewareRouter,flightRouter)
const PORT = 5004





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});