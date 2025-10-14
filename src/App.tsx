// En tu App.tsx o componente principal
import React, { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import UserRegistration from './components/UserManagement/UserRegistration';
import UserList from './components/UserManagement/UserList';
import UserProfile from './components/UserManagement/UserProfile';
import './styles/user-management.css';

const App: React.FC = () => {
  const { currentUser, loginUser } = useUsers();
  const [activeTab, setActiveTab] = useState<'register' | 'list' | 'profile'>('register');

  const handleLogin = (documento: string) => {
    const result = loginUser(documento);
    if (result.success) {
      setActiveTab('profile');
    }
  };

  return (
    <div className="app">
      <nav className="navigation">
        <button 
          onClick={() => setActiveTab('register')}
          className={activeTab === 'register' ? 'active' : ''}
        >
          Registro
        </button>
        <button 
          onClick={() => setActiveTab('list')}
          className={activeTab === 'list' ? 'active' : ''}
        >
          Lista de Usuarios
        </button>
        {currentUser && (
          <button 
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'active' : ''}
          >
            Mi Perfil
          </button>
        )}
      </nav>

      <main className="main-content">
        {activeTab === 'register' && <UserRegistration />}
        {activeTab === 'list' && <UserList />}
        {activeTab === 'profile' && <UserProfile />}
      </main>

      {/* Componente de Login Simple */}
      {!currentUser && activeTab !== 'register' && (
        <div className="login-overlay">
          <div className="login-form">
            <h3>Iniciar Sesión</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const documento = formData.get('documento') as string;
              handleLogin(documento);
            }}>
              <input
                type="text"
                name="documento"
                placeholder="Número de documento"
                required
              />
              <button type="submit" className="btn btn-primary">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;