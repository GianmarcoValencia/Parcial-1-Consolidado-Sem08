import { useParams } from 'react-router-dom'
import { loadUsers, saveUsers, loadResults, loadExams } from '../utils/localStorageHelpers'
import { exportCV } from '../utils/generateCV'

export default function CurriculumPage() {
  const { userId } = useParams()
  const users = loadUsers()
  const user = users.find(u => u.id === userId)
  const results = loadResults().filter(r => r.userId === userId && r.passed)
  const exams = loadExams()

  if (!user) return <div className="card">Usuario no encontrado</div>

  const update = (key: 'bio'|'education'|'experience', val: string) => {
    const next = users.map(u => u.id === user.id ? ({
      ...u,
      [key]: key==='bio' ? val : (val.split('|').map(s=>s.trim()).filter(Boolean))
    }): u)
    saveUsers(next)
  }

  const exportPdf = () => {
    const certs = results.map(r => {
      const ex = exams.find(e => e.id === r.examId)
      return { title: ex?.title || 'Examen', date: new Date(r.takenAt).toLocaleDateString(), code: r.certCode }
    })
    exportCV(user, certs)
  }

  return (
    <div className="card">
      <h2>Currículum — {user.name}</h2>
      <p><strong>Especialidad:</strong> {user.specialty}</p>
      <label>Resumen/Bio<textarea defaultValue={user.bio} onBlur={e=>update('bio', e.target.value)}/></label>
      <label>Formación (separa con | )<input defaultValue={(user.education||[]).join(' | ')} onBlur={e=>update('education', e.target.value)} /></label>
      <label>Experiencia (separa con | )<input defaultValue={(user.experience||[]).join(' | ')} onBlur={e=>update('experience', e.target.value)} /></label>

      <button onClick={exportPdf} style={{marginTop:12}}>Exportar CV a PDF</button>

      <h3 style={{marginTop:12}}>Certificaciones</h3>
      <ul>
        {results.map(r => {
          const exam = exams.find(e => e.id === r.examId)
          return <li key={r.id}>{exam?.title} — <a href={`/cert/${r.certCode}`}>Ver certificado</a></li>
        })}
      </ul>
      <p style={{opacity:.8, fontSize:12, marginTop:8}}>URL pública de perfil: <code>/curriculum/{user.id}</code></p>
    </div>
  )
}
