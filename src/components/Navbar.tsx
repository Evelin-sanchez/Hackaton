import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar: React.FC = () => {
  const location = useLocation()
  const isLoggedIn = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-cpu-fill me-2"></i>
          Líneas de Profundización
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                Inicio
              </Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${location.pathname === '/lineas' ? 'active' : ''}`} 
                    to="/lineas"
                  >
                    Líneas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${location.pathname === '/estudiantes' ? 'active' : ''}`} 
                    to="/estudiantes"
                  >
                    Estudiantes
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          <div className="navbar-nav">
            {isLoggedIn ? (
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            ) : (
              <Link className="btn btn-outline-light" to="/login">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar