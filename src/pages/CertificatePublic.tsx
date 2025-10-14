import { useParams, Link } from 'react-router-dom'
import { loadResults, loadUsers, loadExams } from '../utils/localStorageHelpers'

export default function CertificatePublic() {
  const { code } = useParams()
  const results = loadResults()
  const match = results.find(r => r.certCode === code && r.passed)
  if (!match) return <div className="card">Certificado no válido o no encontrado</div>
  const user = loadUsers().find(u => u.id === match.userId)
  const exam = loadExams().find(e => e.id === match.examId)

  return (
    <div className="card">
      <h2>Certificado Digital</h2>
      <p><strong>Nombre:</strong> {user?.name}</p>
      <p><strong>Examen:</strong> {exam?.title}</p>
      <p><strong>Fecha:</strong> {new Date(match.takenAt).toLocaleDateString()}</p>
      <p><strong>Código:</strong> {match.certCode}</p>
      <p><Link className="badge" to={`/curriculum/${user?.id}`}>Ver en currículum</Link></p>
      <p style={{opacity:.8}}>Validación simulada: este enlace verifica la existencia del certificado en LocalStorage.</p>
    </div>
  )
}
