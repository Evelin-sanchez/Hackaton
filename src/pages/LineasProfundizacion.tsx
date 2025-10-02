import React, { useState, useEffect } from 'react'
import { lineaService } from '../services/api'
import { LineaProfundizacion } from '../types'

const LineasProfundizacion: React.FC = () => {
  const [lineas, setLineas] = useState<LineaProfundizacion[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLinea, setEditingLinea] = useState<LineaProfundizacion | null>(null)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    coordinador: '',
    estado: 'activa'
  })

  useEffect(() => {
    loadLineas()
  }, [])

  const loadLineas = async () => {
    try {
      const response = await lineaService.getAll()
      setLineas(response.data)
    } catch (error) {
      console.error('Error cargando líneas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingLinea) {
        await lineaService.update(editingLinea.id!, formData)
      } else {
        await lineaService.create(formData)
      }
      setShowModal(false)
      setEditingLinea(null)
      setFormData({ nombre: '', descripcion: '', coordinador: '', estado: 'activa' })
      loadLineas()
    } catch (error) {
      console.error('Error guardando línea:', error)
    }
  }

  const handleEdit = (linea: LineaProfundizacion) => {
    setEditingLinea(linea)
    setFormData({
      nombre: linea.nombre,
      descripcion: linea.descripcion,
      coordinador: linea.coordinador,
      estado: linea.estado
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de eliminar esta línea?')) {
      try {
        await lineaService.delete(id)
        loadLineas()
      } catch (error) {
        console.error('Error eliminando línea:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Líneas de Profundización</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingLinea(null)
            setFormData({ nombre: '', descripcion: '', coordinador: '', estado: 'activa' })
            setShowModal(true)
          }}
        >
          Nueva Línea
        </button>
      </div>

      <div className="row">
        {lineas.map((linea) => (
          <div key={linea.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{linea.nombre}</h5>
                <p className="card-text">{linea.descripcion}</p>
                <div className="mb-2">
                  <small className="text-muted">
                    <strong>Coordinador:</strong> {linea.coordinador}
                  </small>
                </div>
                <span className={`badge ${linea.estado === 'activa' ? 'bg-success' : 'bg-secondary'}`}>
                  {linea.estado}
                </span>
              </div>
              <div className="card-footer">
                <button 
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleEdit(linea)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(linea.id!)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear/editar */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingLinea ? 'Editar Línea' : 'Nueva Línea'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      value={formData.descripcion}
                      onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Coordinador</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.coordinador}
                      onChange={(e) => setFormData({...formData, coordinador: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value})}
                    >
                      <option value="activa">Activa</option>
                      <option value="inactiva">Inactiva</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingLinea ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LineasProfundizacion