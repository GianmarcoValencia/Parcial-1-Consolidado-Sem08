// src/components/UserManagement/UserList.tsx
import React from 'react';
import { useUsers } from '../../hooks/useUsers';
import type { User } from '../../types';

const UserList: React.FC = () => {
  const { users, currentUser } = useUsers();

  const getCertificationCount = (user: User): number => {
    return user.certificaciones.length;
  };

  return (
    <div className="card">
      <h2>👥 Usuarios Registrados en el Sistema</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{ background: '#e8f5e8', padding: '15px', borderRadius: '8px' }}>
          <strong style={{ color: '#2c3e50' }}>Total de Usuarios</strong>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>{users.length}</div>
        </div>
        {currentUser && (
          <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '8px' }}>
            <strong style={{ color: '#2c3e50' }}>Usuario Actual</strong>
            <div style={{ fontSize: '1rem', color: '#007bff' }}>{currentUser.nombreCompleto}</div>
          </div>
        )}
      </div>

      {users.length === 0 ? (
        <div className="alert alert-warning">
          <p>No hay usuarios registrados en el sistema.</p>
          <p>Use la pestaña "Registro" para agregar el primer usuario.</p>
        </div>
      ) : (
        <div className="users-grid">
          {users.map(user => (
            <div key={user.id} className={`user-card ${currentUser?.id === user.id ? 'current-user' : ''}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ color: '#2c3e50', margin: 0 }}>{user.nombreCompleto}</h3>
                {currentUser?.id === user.id && (
                  <span style={{ 
                    background: '#007bff', 
                    color: 'white', 
                    padding: '2px 8px', 
                    borderRadius: '10px',
                    fontSize: '10px'
                  }}>
                    TÚ
                  </span>
                )}
              </div>
              
              <div className="user-info">
                <p><strong>📝 Documento:</strong> {user.documento}</p>
                <p><strong>📧 Email:</strong> {user.email}</p>
                <p><strong>🎯 Especialidad:</strong> {user.especialidad}</p>
                <p><strong>📅 Registro:</strong> {new Date(user.fechaRegistro).toLocaleDateString()}</p>
                <p>
                  <strong>🏆 Certificaciones:</strong> 
                  <span style={{ 
                    background: getCertificationCount(user) > 0 ? '#28a745' : '#6c757d',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    marginLeft: '8px'
                  }}>
                    {getCertificationCount(user)}
                  </span>
                </p>
              </div>

              {user.certificaciones.length > 0 && (
                <div style={{ 
                  marginTop: '15px', 
                  paddingTop: '15px', 
                  borderTop: '1px solid #ddd' 
                }}>
                  <h4 style={{ fontSize: '14px', color: '#2c3e50', marginBottom: '8px' }}>
                    Últimas certificaciones:
                  </h4>
                  <ul style={{ fontSize: '12px', color: '#555', paddingLeft: '15px' }}>
                    {user.certificaciones.slice(0, 2).map(cert => (
                      <li key={cert.id}>{cert.examenNombre}</li>
                    ))}
                    {user.certificaciones.length > 2 && (
                      <li style={{ fontStyle: 'italic' }}>
                        ... y {user.certificaciones.length - 2} más
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;