import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Exam, Result, User } from '../types'
import { loadExams, loadResults, loadUsers, saveResults, uid } from '../utils/localStorageHelpers'
import { generateCertificatePDF } from '../utils/generateCertificate'
import { getCurrentUser } from '../utils/auth'

export default function TakeExamPage() {
  const { examId } = useParams()
  const nav = useNavigate()
  const [exam, setExam] = useState<Exam | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const currentUser = getCurrentUser()

  useEffect(() => {
    const e = loadExams().find(x => x.id === examId) || null
    setExam(e)
  }, [examId])

  if (!exam) return <div className="card">Examen no encontrado</div>
  if (!currentUser) return <div className="card">No hay usuario autenticado. Ve a <Link to="/login">Login</Link>.</div>

  const handleSubmit = () => {
    const results = loadResults()
    const exists = results.find(r => r.userId === currentUser.id && r.examId === exam.id)
    if (exists) return alert('Ya has realizado este examen. Intento único.')

    let score = 0
    if (exam.type === 'multiple') {
      const total = exam.questions.length
      const correct = exam.questions.filter(q => q.correctAnswer && answers[q.id] === q.correctAnswer).length
      score = (correct / total) * 100
    } else {
      score = 0
    }
    const passed = score >= exam.minScore
    const code = uid()
    const certUrl = passed ? `/cert/${code}` : undefined

    const result: Result = {
      id: uid(),
      userId: currentUser.id,
      examId: exam.id,
      score,
      passed,
      takenAt: new Date().toISOString(),
      certCode: passed ? code : undefined,
      certUrl
    }
    const updated = [result, ...results]
    saveResults(updated)

    if (passed) generateCertificatePDF(currentUser, exam, score, code)
    alert(`Puntaje: ${score.toFixed(2)}%. ${passed ? 'Aprobado ✅' : 'Desaprobado ❌'}`)
    nav('/certificates')
  }

  return (
    <div className="card">
      <h2>Rendir: {exam.title}</h2>
      {exam.questions.map(q => (
        <div key={q.id} className="card" style={{marginTop:8}}>
          <div><strong>Pregunta:</strong> {q.text}</div>
          {exam.type === 'multiple' ? (
            <div style={{marginTop:8, display:'grid', gap:6}}>
              {(q.options||[]).map(opt => (
                <label key={opt} style={{display:'flex', gap:6, alignItems:'center'}}>
                  <input type="radio" name={q.id} value={opt}
                    onChange={e=>setAnswers(prev=>({...prev, [q.id]: e.target.value}))}/>
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea onChange={e=>setAnswers(prev=>({...prev, [q.id]: e.target.value}))} />
          )}
        </div>
      ))}
      <button onClick={handleSubmit} style={{marginTop:12}}>Enviar</button>
    </div>
  )
}
