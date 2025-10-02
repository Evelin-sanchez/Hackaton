import express from 'express'
import { authenticateToken } from './auth.js'
import { db } from '../utils/database.js'

const router = express.Router()

// Todas las rutas requieren autenticación
router.use(authenticateToken)

// GET /api/lineas - Obtener todas las líneas
router.get('/', (req, res) => {
  db.all('SELECT * FROM lineas_profundizacion', [], (err, rows) => {
    if (err) {
      console.error('Error obteniendo líneas:', err)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
    res.json(rows)
  })
})

// GET /api/lineas/:id - Obtener línea por ID
router.get('/:id', (req, res) => {
  const { id } = req.params

  db.get(
    'SELECT * FROM lineas_profundizacion WHERE id = ?',
    [id],
    (err, row) => {
      if (err) {
        console.error('Error obteniendo línea:', err)
        return res.status(500).json({ message: 'Error interno del servidor' })
      }

      if (!row) {
        return res.status(404).json({ message: 'Línea no encontrada' })
      }

      res.json(row)
    }
  )
})

// POST /api/lineas - Crear nueva línea
router.post('/', (req, res) => {
  const { nombre, descripcion, coordinador, estado } = req.body

  if (!nombre || !descripcion || !coordinador) {
    return res.status(400).json({ 
      message: 'Nombre, descripción y coordinador son requeridos' 
    })
  }

  db.run(
    `INSERT INTO lineas_profundizacion (nombre, descripcion, coordinador, estado) 
     VALUES (?, ?, ?, ?)`,
    [nombre, descripcion, coordinador, estado || 'activa'],
    function(err) {
      if (err) {
        console.error('Error creando línea:', err)
        return res.status(500).json({ message: 'Error interno del servidor' })
      }

      res.status(201).json({
        id: this.lastID,
        nombre,
        descripcion,
        coordinador,
        estado: estado || 'activa'
      })
    }
  )
})

// PUT /api/lineas/:id - Actualizar línea
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { nombre, descripcion, coordinador, estado } = req.body

  if (!nombre || !descripcion || !coordinador) {
    return res.status(400).json({ 
      message: 'Nombre, descripción y coordinador son requeridos' 
    })
  }

  db.run(
    `UPDATE lineas_profundizacion 
     SET nombre = ?, descripcion = ?, coordinador = ?, estado = ? 
     WHERE id = ?`,
    [nombre, descripcion, coordinador, estado, id],
    function(err) {
      if (err) {
        console.error('Error actualizando línea:', err)
        return res.status(500).json({ message: 'Error interno del servidor' })
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Línea no encontrada' })
      }

      res.json({
        id: parseInt(id),
        nombre,
        descripcion,
        coordinador,
        estado
      })
    }
  )
})

// DELETE /api/lineas/:id - Eliminar línea
router.delete('/:id', (req, res) => {
  const { id } = req.params

  db.run(
    'DELETE FROM lineas_profundizacion WHERE id = ?',
    [id],
    function(err) {
      if (err) {
        console.error('Error eliminando línea:', err)
        return res.status(500).json({ message: 'Error interno del servidor' })
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Línea no encontrada' })
      }

      res.json({ message: 'Línea eliminada correctamente' })
    }
  )
})

export default router