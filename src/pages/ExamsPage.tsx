import { useEffect, useMemo, useState } from 'react'
import { Exam, ExamType, Question } from '../types'
import { loadExams, saveExams, uid } from '../utils/localStorageHelpers'
import { Link } from 'react-router-dom'

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [form, setForm] = useState<Partial<Exam>>({ type: 'multiple', minScore: 60 })
  const [qText, setQText] = useState('')
  const [qOptions, setQOptions] = useState<string>('')
  const [qAnswer, setQAnswer] = useState('')

  useEffect(() => { setExams(loadExams()) }, [])

  const addQuestion = () => {
    const options = (form.type === 'multiple') ? qOptions.split('|').map(s=>s.trim()).filter(Boolean) : undefined
    const q: Question = {
      id: uid(),
      text: qText.trim(),
      options,
      correctAnswer: form.type === 'multiple' ? qAnswer.trim() : undefined
    }
    setForm(prev => ({ ...prev, questions: [...(prev.questions||[]), q] }))
    setQText(''); setQOptions(''); setQAnswer('')
  }

  const createExam = () => {
    if (!form.title || !form.area || !form.type || !form.minScore || !(form.questions?.length)) return alert('Completa el formulario y añade preguntas')
    const newExam: Exam = {
      id: uid(),
      title: form.title!,
      area: form.area!,
      type: form.type as ExamType,
      questions: form.questions!,
      minScore: Number(form.minScore),
      createdAt: new Date().toISOString()
    }
    const updated = [newExam, ...exams]
    setExams(updated); saveExams(updated)
    setForm({ type: 'multiple', minScore: 60 })
    alert('Examen creado')
  }

  const removeExam = (id: string) => {
    const updated = exams.filter(e => e.id !== id)
    setExams(updated); saveExams(updated)
  }

  return (
    <div className="card">
      <h2 style={{fontSize:18, fontWeight:700}}>Comité Técnico — Editor de Exámenes</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <section className="card">
          <h3>Nuevo examen</h3>
          <label>Título<input value={form.title||''} onChange={e=>setForm({...form, title:e.target.value})}/></label>
          <label>Área temática<input value={form.area||''} onChange={e=>setForm({...form, area:e.target.value})}/></label>
          <label>Tipo
            <select value={form.type} onChange={e=>setForm({...form, type:e.target.value as ExamType})}>
              <option value="multiple">Opción múltiple</option>
              <option value="open">Preguntas abiertas</option>
            </select>
          </label>
          <label>Porcentaje mínimo de aprobación<input type="number" value={form.minScore||60} onChange={e=>setForm({...form, minScore:Number(e.target.value)})}/></label>
          <hr/>
          <h4>Agregar pregunta</h4>
          <label>Enunciado<textarea value={qText} onChange={e=>setQText(e.target.value)} /></label>
          {form.type==='multiple' && <>
            <label>Opciones (separa con | )<input value={qOptions} onChange={e=>setQOptions(e.target.value)} placeholder="A|B|C|D"/></label>
            <label>Respuesta correcta<input value={qAnswer} onChange={e=>setQAnswer(e.target.value)} placeholder="A"/></label>
          </>}
          <button onClick={addQuestion} disabled={!qText}>Añadir pregunta</button>
          <div style={{marginTop:8}}><span className="badge">{form.questions?.length||0} preguntas</span></div>
          <button onClick={createExam} style={{marginTop:8}}>Guardar Examen</button>
        </section>
        <section>
          <h3>Exámenes existentes</h3>
          <table>
            <thead><tr><th>Título</th><th>Área</th><th>Tipo</th><th>Acciones</th></tr></thead>
            <tbody>
            {exams.map(e => (
              <tr key={e.id}>
                <td>{e.title}</td><td>{e.area}</td><td>{e.type}</td>
                <td style={{display:'flex', gap:8}}>
                  <Link className="badge" to={`/take/${e.id}`}>Rendir</Link>
                  <button onClick={()=>removeExam(e.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}
