// src/components/UserManagement/UserProfile.tsx
import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import CurriculumView from '../Curriculum/CurriculumView';
import CurriculumEdit from '../Curriculum/CurriculumEdit';
import type { User } from '../../types';

const UserProfile: React.FC = () => {
  const { currentUser, updateUserProfile, logoutUser } = useUsers();
  const [isEditing, setIsEditing] = useState(false);

  if (!currentUser) {
    return (
      <div className="alert alert-warning">
        <p>No hay usuario autenticado</p>
        <p>Por favor, inicie sesión o regístrese</p>
      </div>
    );
  }

  const handleSaveCurriculum = (updatedUser: User) => {
    updateUserProfile(currentUser.id, updatedUser);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="user-info">
          <h1>Perfil de Usuario</h1>
          <p><strong>Documento:</strong> {currentUser.documento}</p>
          <p><strong>Especialidad:</strong> {currentUser.especialidad}</p>
          <p><strong>Miembro desde:</strong> {new Date(currentUser.fechaRegistro).toLocaleDateString()}</p>
        </div>
        <div className="profile-actions">
          <button onClick={logoutUser} className="btn btn-secondary">
            Cerrar Sesión
          </button>
        </div>
      </div>

      {isEditing ? (
        <CurriculumEdit
          user={currentUser}
          onSave={handleSaveCurriculum}
          onCancel={handleCancelEdit}
        />
      ) : (
        <CurriculumView
          user={currentUser}
          isOwner={true}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

export default UserProfile;