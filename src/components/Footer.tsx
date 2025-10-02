import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Ingeniería de Sistemas</h5>
            <p>Sistema de Gestión de Líneas de Profundización</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p>&copy; 2024 Universidad - Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;