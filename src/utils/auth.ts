export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token')
  return !!token
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

export const logout = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}