import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import ExamsAdmin from './pages/ExamsAdmin'
import CertificatePage from './pages/CertificatePage'
import AssignPage from './pages/AssignPage'
import TakeExamPage from './pages/TakeExamPage'
import CVPage from './pages/CVPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import AuthProvider, { useAuth } from './context/AuthContext'
import './index.css'

function UserSection(){
  const { user, logout } = useAuth();
  if (user) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="px-2 py-0.5 rounded bg-slate-700">{user.name}</span>
        <button onClick={logout} className="px-2 py-1 rounded-lg border border-slate-600 hover:bg-slate-700">Salir</button>
      </div>
    );
  }
  return (
    <div className="flex gap-2 text-sm">
      <NavLink to="/login" className="px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700">Ingresar</NavLink>
      <NavLink to="/registro" className="px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700">Registrarme</NavLink>
    </div>
  );
}

function Layout(){
  const link = (to:string, label:string) => (
    <NavLink to={to} className={({isActive}) => `px-3 py-1 rounded-lg border border-slate-700 ${isActive ? 'bg-slate-700' : 'bg-slate-800 hover:bg-slate-700'}`}>{label}</NavLink>
  );
  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="rounded-2xl bg-card/80 border border-slate-700 p-4 flex items-center justify-between gap-3">
        <h1 className="text-xl font-bold flex items-center gap-2">🏛️ Certificaciones <span className="text-brand">Pro</span></h1>
        <nav className="flex gap-2 text-sm">
          {link('/', 'Editor')}
          {link('/asignar', 'Asignar')}
          {link('/rendir', 'Rendir')}
          {link('/certificado', 'Certificado')}
          {link('/cv', 'CV')}
          {link('/usuarios', 'Usuarios')}
        </nav>
        <UserSection/>
      </header>
      <main className="mt-4">
        <Routes>
          <Route path="/" element={<ExamsAdmin />} />
          <Route path="/asignar" element={<AssignPage />} />
          <Route path="/rendir" element={<TakeExamPage />} />
          <Route path="/certificado" element={<CertificatePage />} />
          <Route path="/cv" element={<CVPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/usuarios" element={<UsersPage />} />
        </Routes>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Layout/>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
