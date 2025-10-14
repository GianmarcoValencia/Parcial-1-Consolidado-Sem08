// src/App.tsx
import React, { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import UserRegistration from './components/UserManagement/UserRegistration';
import UserList from './components/UserManagement/UserList';
import UserProfile from './components/UserManagement/UserProfile';

// Placeholder components para las otras funcionalidades
const ExamManagement = () => (
  <div className="card">
    <h2>🚧 Gestión de Exámenes (Comité Técnico)</h2>
    <p>Esta funcionalidad está en desarrollo...</p>
    <div className="alert alert-info">
      <strong>Funcionalidades planeadas:</strong>
      <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
        <li>Crear nuevos exámenes con título y área temática</li>
        <li>Agregar, editar y eliminar preguntas</li>
        <li>Establecer criterios de aprobación</li>
        <li>Guardar exámenes en Local Storage</li>
      </ul>
    </div>
  </div>
);

const ExamTaking = () => (
  <div className="card">
    <h2>🚧 Rendición de Exámenes</h2>
    <p>Esta funcionalidad está en desarrollo...</p>
    <div className="alert alert-info">
      <strong>Funcionalidades planeadas:</strong>
      <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
        <li>Seleccionar examen disponible</li>
        <li>Responder preguntas (múltiple opción/abiertas)</li>
        <li>Ver puntaje final y resultado</li>
        <li>Control de intentos únicos por usuario</li>
      </ul>
    </div>
  </div>
);

const CertificateGeneration = () => (
  <div className="card">
    <h2>🚧 Generación de Certificados</h2>
    <p>Esta funcionalidad está en desarrollo...</p>
    <div className="alert alert-info">
      <strong>Funcionalidades planeadas:</strong>
      <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
        <li>Generar certificados PDF al aprobar examen</li>
        <li>Nombre del usuario y examen</li>
        <li>Fecha de emisión y código único</li>
        <li>URL pública para verificación</li>
      </ul>
    </div>
  </div>
);

const App: React.FC = () => {
  const { currentUser, loginUser, logoutUser } = useUsers();
  const [activeTab, setActiveTab] = useState<'register' | 'users' | 'profile' | 'exams' | 'take-exam' | 'certificates'>('register');

  const handleLogin = (documento: string) => {
    const result = loginUser(documento);
    if (result.success) {
      setActiveTab('profile');
    } else {
      alert(result.message);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setActiveTab('register');
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '2.5rem', 
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🎓 Sistema de Certificación en Línea
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
          Plataforma profesional de evaluación y certificación
        </p>
      </header>

      {/* Navegación */}
      <nav className="nav-tabs">
        <button 
          onClick={() => setActiveTab('register')}
          className={activeTab === 'register' ? 'active' : ''}
        >
          👥 Registro
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={activeTab === 'users' ? 'active' : ''}
        >
          📋 Lista Usuarios
        </button>
        <button 
          onClick={() => setActiveTab('exams')}
          className={activeTab === 'exams' ? 'active' : ''}
        >
          📝 Gestionar Exámenes
        </button>
        <button 
          onClick={() => setActiveTab('take-exam')}
          className={activeTab === 'take-exam' ? 'active' : ''}
        >
          🎯 Rendir Examen
        </button>
        <button 
          onClick={() => setActiveTab('certificates')}
          className={activeTab === 'certificates' ? 'active' : ''}
        >
          📜 Certificados
        </button>
        {currentUser && (
          <button 
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'active' : ''}
          >
            👤 Mi Perfil
          </button>
        )}
        {currentUser && (
          <button 
            onClick={handleLogout}
            className="btn-outline"
            style={{ minWidth: '120px' }}
          >
            🚪 Cerrar Sesión
          </button>
        )}
      </nav>

      {/* Información del usuario actual */}
      {currentUser && (
        <div className="card" style={{ background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Usuario actual:</strong> {currentUser.nombreCompleto}
              <br />
              <small>Documento: {currentUser.documento} | Especialidad: {currentUser.especialidad}</small>
            </div>
            <span style={{ 
              background: '#007bff', 
              color: 'white', 
              padding: '5px 10px', 
              borderRadius: '20px',
              fontSize: '12px'
            }}>
              Conectado
            </span>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <main>
        {activeTab === 'register' && <UserRegistration />}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'profile' && currentUser && <UserProfile />}
        {activeTab === 'exams' && <ExamManagement />}
        {activeTab === 'take-exam' && <ExamTaking />}
        {activeTab === 'certificates' && <CertificateGeneration />}
      </main>

      {/* Login Modal */}
      {!currentUser && activeTab !== 'register' && activeTab !== 'users' && (
        <div className="login-overlay">
          <div className="login-form">
            <h3>🔐 Iniciar Sesión</h3>
            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
              Para acceder a esta sección, necesita iniciar sesión
            </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const documento = formData.get('documento') as string;
              handleLogin(documento);
            }}>
              <input
                type="text"
                name="documento"
                placeholder="Ingrese su número de documento"
                required
              />
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Iniciar Sesión
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <small style={{ color: '#666' }}>
                ¿No tiene cuenta? <a 
                  href="#register" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('register');
                  }}
                  style={{ color: '#007bff', textDecoration: 'none' }}
                >
                  Regístrese aquí
                </a>
              </small>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '50px', 
        padding: '20px',
        color: 'rgba(255,255,255,0.7)'
      }}>
        <p>Desarrollo de Aplicaciones Web - Semestre IX</p>
        <p><small>Sistema de Certificación en Línea</small></p>
      </footer>
    </div>
  );
};

export default App;