import { loadResults, loadUsers, loadExams } from '../utils/localStorageHelpers'
import { Link } from 'react-router-dom'

export default function CertificatesPage() {
  const results = loadResults()
  const users = loadUsers()
  const exams = loadExams()

  return (
    <div className="card">
      <h2>Certificados</h2>
      <table>
        <thead><tr><th>Usuario</th><th>Examen</th><th>Puntaje</th><th>Estado</th><th>URL Pública</th></tr></thead>
        <tbody>
          {results.map(r => {
            const user = users.find(u => u.id === r.userId)
            const exam = exams.find(e => e.id === r.examId)
            return (
              <tr key={r.id}>
                <td>{user?.name}</td>
                <td>{exam?.title}</td>
                <td>{r.score.toFixed(2)}%</td>
                <td>{r.passed ? 'Aprobado' : 'Desaprobado'}</td>
                <td>{r.passed && r.certCode ? <Link to={`/cert/${r.certCode}`}>Abrir</Link> : '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
