import { useState, useEffect } from 'react';
import { getSubmissions, updateSubmission, deleteSubmission, approveSubmission, rejectSubmission } from '../services/submissionsService';

export default function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', category: '', content: '' });
  const [filter, setFilter] = useState('todas');

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const reload = () => setSubmissions(getSubmissions());

  const handleApprove = (id) => { approveSubmission(id); reload(); };
  const handleReject = (id) => { rejectSubmission(id); reload(); };
  const handleDelete = (id) => { if (confirm('¿Eliminar esta solicitud permanentemente?')) { deleteSubmission(id); reload(); } };

  const startEdit = (sub) => {
    setEditing(sub.id);
    setEditForm({ title: sub.title, category: sub.category, content: sub.content });
  };

  const saveEdit = (id) => {
    updateSubmission(id, editForm);
    setEditing(null);
    reload();
  };

  const filtered = submissions.filter((s) => {
    if (filter === 'todas') return true;
    return s.status === filter;
  });

  const counts = {
    todas: submissions.length,
    pendiente: submissions.filter((s) => s.status === 'pendiente').length,
    aprobada: submissions.filter((s) => s.status === 'aprobada').length,
    rechazada: submissions.filter((s) => s.status === 'rechazada').length,
  };

  const statusColors = {
    pendiente: { bg: '#fff3cd', color: '#856404', label: 'Pendiente' },
    aprobada: { bg: '#d4edda', color: '#155724', label: 'Aprobada' },
    rechazada: { bg: '#f8d7da', color: '#721c24', label: 'Rechazada' },
  };

  return (
    <main className="main-content">
      <div className="page-layout" style={{ minHeight: '70vh' }}>
        <div className="admin-header">
          <div>
            <h1>
              <i className="fas fa-shield-alt admin-header-icon" />
              Panel de Administración
            </h1>
            <p className="admin-header-subtitle">Gestiona las solicitudes de publicación</p>
          </div>
          <div className="admin-filter-bar">
            {Object.entries(counts).map(([key, count]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`admin-filter-btn${filter === key ? ' active' : ''}`}
              >
                {key === 'todas' ? 'Todas' : key.charAt(0).toUpperCase() + key.slice(1)} ({count})
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="admin-empty">
            <i className="fas fa-inbox admin-empty-icon" />
            <p className="admin-empty-text">No hay solicitudes {filter !== 'todas' ? `con estado "${filter}"` : ''}</p>
          </div>
        ) : (
          <div className="admin-cards">
            {filtered.map((sub) => {
              const status = statusColors[sub.status] || statusColors.pendiente;
              return (
                <div key={sub.id} className="admin-card">
                  <div className="admin-card-body">
                    <div className="admin-card-top">
                      <div className="admin-card-main">
                        <div className="admin-card-badges">
                          <span className="admin-badge" style={{ background: status.bg, color: status.color }}>
                            {status.label}
                          </span>
                          <span className="admin-badge" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                            {sub.category || 'Sin categoría'}
                          </span>
                          <span className="admin-badge-status">
                            {new Date(sub.createdAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {editing === sub.id ? (
                          <div className="admin-edit-form">
                            <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              className="admin-form-input admin-form-input-title"
                            />
                            <select
                              value={editForm.category}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              className="admin-form-input"
                            >
                              <option value="medio-ambiente">Medio Ambiente</option>
                              <option value="flora-fauna">Flora y Fauna</option>
                              <option value="ciencia">Ciencia</option>
                              <option value="economia">Economía Verde</option>
                              <option value="comunidad">Comunidad</option>
                            </select>
                            <textarea
                              value={editForm.content}
                              onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                              rows={6}
                              className="admin-form-input"
                              style={{ resize: 'vertical' }}
                            />
                          </div>
                        ) : (
                          <>
                            <h3 className="admin-card-title">{sub.title}</h3>
                            <p className="admin-card-content">{sub.content}</p>
                          </>
                        )}

                        <div className="admin-card-author">
                          <span><i className="fas fa-user" style={{ marginRight: '4px' }} /> {sub.author}</span>
                          <span><i className="fas fa-envelope" style={{ marginRight: '4px' }} /> {sub.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-card-footer">
                    {editing === sub.id ? (
                      <>
                        <button onClick={() => setEditing(null)} className="admin-btn">
                          Cancelar
                        </button>
                        <button onClick={() => saveEdit(sub.id)} className="admin-btn admin-btn-primary">
                          <i className="fas fa-save" /> Guardar
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(sub)} className="admin-btn">
                          <i className="fas fa-edit" /> Editar
                        </button>
                        {sub.status !== 'aprobada' && (
                          <button onClick={() => handleApprove(sub.id)} className="admin-btn admin-btn-success">
                            <i className="fas fa-check" /> Aprobar
                          </button>
                        )}
                        {sub.status !== 'rechazada' && (
                          <button onClick={() => handleReject(sub.id)} className="admin-btn admin-btn-warning">
                            <i className="fas fa-ban" /> Rechazar
                          </button>
                        )}
                        <button onClick={() => handleDelete(sub.id)} className="admin-btn admin-btn-danger">
                          <i className="fas fa-trash" /> Borrar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
