import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold">
                Líneas de Profundización en Ingeniería de Sistemas
              </h1>
              <p className="lead">
                Sistema integral para la gestión y administración de líneas de profundización 
                académica en el programa de Ingeniería de Sistemas.
              </p>
              <Link to="/login" className="btn btn-light btn-lg">
                Acceder al Sistema
              </Link>
            </div>
            <div className="col-lg-6">
              <img 
                src="/api/placeholder/600/400" 
                alt="Ingeniería de Sistemas" 
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col">
              <h2>Características del Sistema</h2>
              <p className="lead">Gestión completa y eficiente</p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="bi bi-diagram-3 display-4 text-primary"></i>
                  <h5 className="card-title mt-3">Gestión de Líneas</h5>
                  <p className="card-text">
                    Administra las diferentes líneas de profundización disponibles 
                    en el programa académico.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="bi bi-people display-4 text-primary"></i>
                  <h5 className="card-title mt-3">Control de Estudiantes</h5>
                  <p className="card-text">
                    Gestiona la inscripción de estudiantes a las líneas de profundización.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="bi bi-graph-up display-4 text-primary"></i>
                  <h5 className="card-title mt-3">Reportes y Análisis</h5>
                  <p className="card-text">
                    Genera reportes detallados y análisis estadísticos del programa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home