import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="card">
      <h2 style={{fontSize:20, fontWeight:700}}>Bienvenido</h2>
      <p>Plataforma integrada en un solo proyecto: gestión de exámenes, usuarios, rendición, certificados y CV público.</p>
      <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:8}}>
        <Link className="badge" to="/exams">Comité Técnico: Editar Exámenes</Link>
        <Link className="badge" to="/users">Registrar/Autenticar Usuarios</Link>
        <Link className="badge" to="/certificates">Ver Certificados</Link>
      </div>
    </div>
  )
}
