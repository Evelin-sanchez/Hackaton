import sqlite3 from 'sqlite3'
import bcrypt from 'bcryptjs'

const db = new sqlite3.Database(':memory:')

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    // Crear tabla de usuarios
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        nombre TEXT NOT NULL,
        role TEXT DEFAULT 'admin'
      )
    `, (err) => {
      if (err) reject(err)
    })

    // Crear tabla de líneas de profundización
    db.run(`
      CREATE TABLE IF NOT EXISTS lineas_profundizacion (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        coordinador TEXT NOT NULL,
        estado TEXT DEFAULT 'activa',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) reject(err)
    })

    // Crear tabla de estudiantes
    db.run(`
      CREATE TABLE IF NOT EXISTS estudiantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT UNIQUE NOT NULL,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        semestre INTEGER NOT NULL,
        linea_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (linea_id) REFERENCES lineas_profundizacion (id)
      )
    `, async (err) => {
      if (err) {
        reject(err)
        return
      }

      // Insertar usuario por defecto
      const hashedPassword = await bcrypt.hash('admin123', 10)
      db.run(
        `INSERT OR IGNORE INTO usuarios (email, password, nombre, role) 
         VALUES (?, ?, ?, ?)`,
        ['admin@universidad.edu.co', hashedPassword, 'Administrador', 'admin'],
        (err) => {
          if (err) reject(err)
          else resolve()
        }
      )

      // Insertar líneas de profundización de ejemplo
      const lineasEjemplo = [
        {
          nombre: 'Inteligencia Artificial',
          descripcion: 'Estudio de algoritmos y técnicas para crear sistemas inteligentes',
          coordinador: 'Dr. Carlos Rodríguez'
        },
        {
          nombre: 'Desarrollo de Software',
          descripcion: 'Metodologías y prácticas para el desarrollo de software de calidad',
          coordinador: 'Ing. María González'
        },
        {
          nombre: 'Ciberseguridad',
          descripcion: 'Protección de sistemas y redes contra amenazas digitales',
          coordinador: 'Dr. Andrés López'
        }
      ]

      lineasEjemplo.forEach(linea => {
        db.run(
          `INSERT OR IGNORE INTO lineas_profundizacion (nombre, descripcion, coordinador) 
           VALUES (?, ?, ?)`,
          [linea.nombre, linea.descripcion, linea.coordinador]
        )
      })
    })
  })
}

export { db }