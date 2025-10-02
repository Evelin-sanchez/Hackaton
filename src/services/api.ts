import axios from 'axios'
import { LineaProfundizacion, Estudiante, AuthResponse } from '../types'

const API_BASE_URL = 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar token a las requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  login: (credentials: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', credentials)
}

export const lineaService = {
  getAll: () => api.get<LineaProfundizacion[]>('/lineas'),
  getById: (id: number) => api.get<LineaProfundizacion>(`/lineas/${id}`),
  create: (data: Omit<LineaProfundizacion, 'id'>) => 
    api.post<LineaProfundizacion>('/lineas', data),
  update: (id: number, data: Partial<LineaProfundizacion>) =>
    api.put<LineaProfundizacion>(`/lineas/${id}`, data),
  delete: (id: number) => api.delete(`/lineas/${id}`)
}

export const estudianteService = {
  getAll: () => api.get<Estudiante[]>('/estudiantes'),
  getById: (id: number) => api.get<Estudiante>(`/estudiantes/${id}`),
  create: (data: Omit<Estudiante, 'id'>) => 
    api.post<Estudiante>('/estudiantes', data),
  update: (id: number, data: Partial<Estudiante>) =>
    api.put<Estudiante>(`/estudiantes/${id}`, data),
  delete: (id: number) => api.delete(`/estudiantes/${id}`)
}

export default api