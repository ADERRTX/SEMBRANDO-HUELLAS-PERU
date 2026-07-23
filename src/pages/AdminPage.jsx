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
      <div className="container" style={{ padding: '40px 20px', minHeight: '70vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              <i className="fas fa-shield-alt" style={{ color: 'var(--primary)', marginRight: '12px' }} />
              Panel de Administración
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Gestiona las solicitudes de publicación</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.entries(counts).map(([key, count]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: filter === key ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                  background: filter === key ? 'var(--primary)' : 'var(--bg-primary)',
                  color: filter === key ? 'white' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
              >
                {key === 'todas' ? 'Todas' : key.charAt(0).toUpperCase() + key.slice(1)} ({count})
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <i className="fas fa-inbox" style={{ fontSize: '3rem', marginBottom: '16px', display: 'block', opacity: 0.3 }} />
            <p style={{ fontSize: '1.1rem' }}>No hay solicitudes {filter !== 'todas' ? `con estado "${filter}"` : ''}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map((sub) => {
              const status = statusColors[sub.status] || statusColors.pendiente;
              return (
                <div key={sub.id} style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'var(--transition)',
                }}>
                  <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            background: status.bg,
                            color: status.color,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                          }}>
                            {status.label}
                          </span>
                          <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                            {sub.category || 'Sin categoría'}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(sub.createdAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {editing === sub.id ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                            <input
                              type="text"
                              value={editForm.title}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--primary)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700, boxSizing: 'border-box' }}
                            />
                            <select
                              value={editForm.category}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--primary)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box' }}
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
                              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--primary)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.9rem', resize: 'vertical', boxSizing: 'border-box' }}
                            />
                          </div>
                        ) : (
                          <>
                            <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>{sub.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 12px', maxHeight: '80px', overflow: 'hidden' }}>{sub.content}</p>
                          </>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          <span><i className="fas fa-user" style={{ marginRight: '4px' }} /> {sub.author}</span>
                          <span><i className="fas fa-envelope" style={{ marginRight: '4px' }} /> {sub.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '12px 24px', background: 'var(--bg-secondary)', display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    {editing === sub.id ? (
                      <>
                        <button onClick={() => setEditing(null)} style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>
                          Cancelar
                        </button>
                        <button onClick={() => saveEdit(sub.id)} style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>
                          <i className="fas fa-save" /> Guardar
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(sub)} style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>
                          <i className="fas fa-edit" /> Editar
                        </button>
                        {sub.status !== 'aprobada' && (
                          <button onClick={() => handleApprove(sub.id)} style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: 'none', background: '#28a745', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>
                            <i className="fas fa-check" /> Aprobar
                          </button>
                        )}
                        {sub.status !== 'rechazada' && (
                          <button onClick={() => handleReject(sub.id)} style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: 'none', background: '#ffc107', color: '#333', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>
                            <i className="fas fa-ban" /> Rechazar
                          </button>
                        )}
                        <button onClick={() => handleDelete(sub.id)} style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: 'none', background: '#dc3545', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>
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
