import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import ExamsPage from './pages/ExamsPage'
import UsersPage from './pages/UsersPage'
import CertificatesPage from './pages/CertificatesPage'
import CurriculumPage from './pages/CurriculumPage'
import TakeExamPage from './pages/TakeExamPage'
import CertificatePublic from './pages/CertificatePublic'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import { getCurrentUser, logout } from './utils/auth'

export default function App() {
  const nav = useNavigate()
  const user = getCurrentUser()

  const doLogout = () => { logout(); nav('/login') }

  return (
    <div className="container">
      <header className="card" style={{display:'flex', gap:12, alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <h1 style={{fontSize:22, fontWeight:700}}>🏛️ Sistema de Certificación</h1>
          <nav style={{display:'flex', gap:12}}>
            <Link to="/">Inicio</Link>
            <Link to="/users">Usuarios</Link>
            <Link to="/certificates">Certificados</Link>
            <Link to="/exams">Exámenes</Link>
          </nav>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          {user ? (<>
            <span className="badge">{user.name} — {user.role}</span>
            <button onClick={doLogout}>Salir</button>
          </>) : (<Link className="badge" to="/login">Iniciar sesión</Link>)}
        </div>
      </header>
      <main style={{marginTop:16}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/exams" element={
            <ProtectedRoute roles={['admin']}>
              <ExamsPage />
            </ProtectedRoute>
          } />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/curriculum/:userId" element={<CurriculumPage />} />
          <Route path="/take/:examId" element={
            <ProtectedRoute roles={['user','admin']}>
              <TakeExamPage />
            </ProtectedRoute>
          } />
          <Route path="/cert/:code" element={<CertificatePublic />} />
        </Routes>
      </main>
      <footer style={{opacity:.7, fontSize:12, marginTop:24}}>React + Vite + TS • Auth + Roles • LocalStorage</footer>
    </div>
  )
}
