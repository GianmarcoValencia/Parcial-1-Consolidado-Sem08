// src/components/UserManagement/UserRegistration.tsx
import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';

const UserRegistration: React.FC = () => {
  const { registerUser, currentUser } = useUsers();
  const [formData, setFormData] = useState({
    documento: '',
    nombreCompleto: '',
    email: '',
    especialidad: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerUser(formData);
    setMessage(result.message);
    
    if (result.success) {
      setFormData({ documento: '', nombreCompleto: '', email: '', especialidad: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (currentUser) {
    return (
      <div className="alert alert-info">
        <p>Ya hay una sesión activa para: {currentUser.nombreCompleto}</p>
        <p>Documento: {currentUser.documento}</p>
      </div>
    );
  }

  return (
    <div className="user-registration">
      <h2>Registro de Usuario</h2>
      {message && (
        <div className={`alert ${message.includes('exitosamente') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="documento">Número de Documento *</label>
          <input
            type="text"
            id="documento"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            required
            pattern="[0-9]{8,12}"
            title="Ingrese un número de documento válido (8-12 dígitos)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nombreCompleto">Nombre Completo *</label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            required
            minLength={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="especialidad">Especialidad *</label>
          <input
            type="text"
            id="especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Registrar Usuario
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;