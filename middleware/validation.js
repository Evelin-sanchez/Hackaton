export const validateLinea = (req, res, next) => {
  const { nombre, descripcion, coordinador } = req.body

  if (!nombre || nombre.trim().length === 0) {
    return res.status(400).json({ message: 'El nombre es requerido' })
  }

  if (!descripcion || descripcion.trim().length === 0) {
    return res.status(400).json({ message: 'La descripción es requerida' })
  }

  if (!coordinador || coordinador.trim().length === 0) {
    return res.status(400).json({ message: 'El coordinador es requerido' })
  }

  if (nombre.length > 100) {
    return res.status(400).json({ message: 'El nombre no puede exceder 100 caracteres' })
  }

  next()
}

export const validateEstudiante = (req, res, next) => {
  const { codigo, nombre, email, semestre } = req.body

  if (!codigo || codigo.trim().length === 0) {
    return res.status(400).json({ message: 'El código es requerido' })
  }

  if (!nombre || nombre.trim().length === 0) {
    return res.status(400).json({ message: 'El nombre es requerido' })
  }

  if (!email || email.trim().length === 0) {
    return res.status(400).json({ message: 'El email es requerido' })
  }

  if (!semestre || semestre < 1 || semestre > 12) {
    return res.status(400).json({ message: 'El semestre debe estar entre 1 y 12' })
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'El formato del email es inválido' })
  }

  next()
}