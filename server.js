import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/auth.js'
import lineasRoutes from './routes/lineas.js'
import estudiantesRoutes from './routes/estudiantes.js'
import { initDatabase } from './utils/database.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware de seguridad
app.use(helmet())

// Limitador de tasa
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 solicitudes por ventana
})
app.use(limiter)

// Middleware
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/lineas', lineasRoutes)
app.use('/api/estudiantes', estudiantesRoutes)

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' })
})

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  })
})

// Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' })
})

// Inicializar base de datos y servidor
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`)
  })
}).catch(error => {
  console.error('Error inicializando base de datos:', error)
  process.exit(1)
})