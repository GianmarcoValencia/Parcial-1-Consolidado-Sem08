import { useState } from 'react'
import { login } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@cert.com')
  const [password, setPassword] = useState('1234')
  const nav = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const u = login(email, password)
    if (!u) return alert('Credenciales inválidas')
    nav('/')
  }

  return (
    <div className="card" style={{maxWidth:420, margin:'0 auto'}}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={submit}>
        <label>Correo<input value={email} onChange={e=>setEmail(e.target.value)} /></label>
        <label>Contraseña<input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
        <button type="submit" style={{width:'100%'}}>Entrar</button>
      </form>
      <p style={{opacity:.7, fontSize:12, marginTop:8}}>Usuario demo: <code>admin@cert.com</code> / <code>1234</code></p>
    </div>
  )
}
