export interface LineaProfundizacion {
  id?: number
  nombre: string
  descripcion: string
  coordinador: string
  estado: 'activa' | 'inactiva'
  created_at?: string
}

export interface Estudiante {
  id?: number
  codigo: string
  nombre: string
  email: string
  semestre: number
  linea_id?: number
  linea_nombre?: string
  created_at?: string
}

export interface Usuario {
  id?: number
  email: string
  nombre: string
  role: string
}

export interface AuthResponse {
  token: string
  user: Usuario
}