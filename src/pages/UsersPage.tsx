import { useEffect, useState } from 'react'
import { User, UserRole } from '../types'
import { loadUsers, saveUsers, uid } from '../utils/localStorageHelpers'
import { Link } from 'react-router-dom'
import { setCurrentUserId } from '../utils/auth'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [form, setForm] = useState<Partial<User>>({ role: 'user' })

  useEffect(()=>{
    const u = loadUsers()
    if (u.length === 0) {
      // seed admin user
      const admin: User = { id: uid(), name:'Admin', email:'admin@cert.com', document:'00000000', specialty:'Comité Técnico', password:'1234', role:'admin', bio:'', education:[], experience:[] }
      const demo: User = { id: uid(), name:'Estudiante Demo', email:'demo@cert.com', document:'11111111', specialty:'Sistemas', password:'demo', role:'user', bio:'', education:[], experience:[] }
      saveUsers([admin, demo])
      setUsers([admin, demo])
    } else setUsers(u)
  }, [])

  const submit = () => {
    if (!form.name || !form.email || !form.document || !form.specialty || !form.password || !form.role) return alert('Completa todos los campos')
    if (users.some(u => u.document === form.document)) return alert('Documento ya registrado')
    const newU: User = {
      id: uid(),
      name: form.name!, email: form.email!,
      document: form.document!, specialty: form.specialty!, password: form.password!,
      role: form.role as UserRole,
      bio: '', education: [], experience: []
    }
    const updated = [newU, ...users]
    setUsers(updated); saveUsers(updated)
    setForm({ role: 'user' })
    alert('Usuario registrado')
  }

  const quickLogin = (id: string) => {
    setCurrentUserId(id)
    alert('Sesión iniciada con este usuario')
  }

  return (
    <div className="card">
      <h2>Usuarios</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <section className="card">
          <h3>Registro</h3>
          <label>Rol
            <select value={form.role} onChange={e=>setForm({...form, role: e.target.value as UserRole})}>
              <option value="user">Usuario</option>
              <option value="admin">Admin (Comité Técnico)</option>
            </select>
          </label>
          <label>Nombre completo<input value={form.name||''} onChange={e=>setForm({...form, name:e.target.value})}/></label>
          <label>Correo<input value={form.email||''} onChange={e=>setForm({...form, email:e.target.value})}/></label>
          <label>N° Documento<input value={form.document||''} onChange={e=>setForm({...form, document:e.target.value})}/></label>
          <label>Especialidad<input value={form.specialty||''} onChange={e=>setForm({...form, specialty:e.target.value})}/></label>
          <label>Contraseña<input type="password" value={form.password||''} onChange={e=>setForm({...form, password:e.target.value})}/></label>
          <button onClick={submit}>Registrar</button>
        </section>
        <section>
          <h3>Listado</h3>
          <table><thead><tr><th>Nombre</th><th>Correo</th><th>Documento</th><th>Rol</th><th>Perfil</th><th>Login</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td><td>{u.email}</td><td>{u.document}</td><td>{u.role}</td>
                <td><Link className="badge" to={`/curriculum/${u.id}`}>Ver</Link></td>
                <td><button onClick={()=>quickLogin(u.id)}>Usar</button></td>
              </tr>
            ))}
          </tbody></table>
        </section>
      </div>
    </div>
  )
}
