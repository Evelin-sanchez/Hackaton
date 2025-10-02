import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../utils/database.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_para_desarrollo'

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email y contraseña son requeridos' 
      })
    }

    // Buscar usuario en la base de datos
    const user = await new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM usuarios WHERE email = ?',
        [email],
        (err, row) => {
          if (err) reject(err)
          else resolve(row)
        }
      )
    })

    if (!user) {
      return res.status(401).json({ 
        message: 'Credenciales inválidas' 
      })
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ 
        message: 'Credenciales inválidas' 
      })
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ 
      message: 'Error interno del servidor' 
    })
  }
})

// Middleware de autenticación
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso requerido' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' })
    }
    req.user = user
    next()
  })
}

export default router