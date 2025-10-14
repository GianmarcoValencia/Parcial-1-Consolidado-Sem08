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
    <div className="user-list">
      <h2>Usuarios Registrados</h2>
      <div className="user-stats">
        <p>Total de usuarios: {users.length}</p>
        {currentUser && (
          <p>Usuario actual: {currentUser.nombreCompleto}</p>
        )}
      </div>

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className={`user-card ${currentUser?.id === user.id ? 'current-user' : ''}`}>
            <h3>{user.nombreCompleto}</h3>
            <div className="user-info">
              <p><strong>Documento:</strong> {user.documento}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Especialidad:</strong> {user.especialidad}</p>
              <p><strong>Fecha Registro:</strong> {new Date(user.fechaRegistro).toLocaleDateString()}</p>
              <p><strong>Certificaciones:</strong> {getCertificationCount(user)}</p>
            </div>
            {user.certificaciones.length > 0 && (
              <div className="certifications-preview">
                <h4>Certificaciones:</h4>
                <ul>
                  {user.certificaciones.slice(0, 2).map(cert => (
                    <li key={cert.id}>{cert.examenNombre}</li>
                  ))}
                  {user.certificaciones.length > 2 && (
                    <li>... y {user.certificaciones.length - 2} más</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="empty-state">
          <p>No hay usuarios registrados</p>
        </div>
      )}
    </div>
  );
};

export default UserList;