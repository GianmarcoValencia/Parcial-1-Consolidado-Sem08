import { useEffect, useMemo, useState } from 'react';
import { Exam, ExamType, Question } from '../../types';
import { loadExams, saveExams, uid } from '../../utils/localStorageHelpers';
import QuestionForm from './QuestionForm';
import ExamList from './ExamList';

export default function ExamEditor() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [area, setArea] = useState('');
  const [type, setType] = useState<ExamType>('multiple');
  const [minScore, setMinScore] = useState<number>(60);
  const [questions, setQuestions] = useState<Question[]>([]);

  const isEditing = Boolean(editingId);

  useEffect(() => { setExams(loadExams()); }, []);

  const formError = useMemo(() => {
    if (!title.trim()) return 'Ingresa el título.';
    if (!area.trim()) return 'Ingresa el área temática.';
    if (!Number.isFinite(minScore) || minScore < 0 || minScore > 100) return 'El porcentaje mínimo debe estar entre 0 y 100.';
    if (questions.length < 2) return 'Un examen debe tener al menos 2 preguntas.';
    if (type === 'multiple') {
      for (const q of questions) {
        if (!q.choices || q.choices.length < 2 || !q.correctKey) return 'Cada pregunta de opción múltiple debe tener al menos 2 alternativas y una correcta.';
        if (!q.choices.find(c => c.key === q.correctKey)) return 'La alternativa correcta debe existir en la lista.';
      }
    }
    return null;
  }, [title, area, minScore, questions, type]);

  const resetForm = () => {
    setEditingId(null);
    setTitle(''); setArea(''); setType('multiple'); setMinScore(60); setQuestions([]);
  };

  const saveExam = () => {
    if (formError) { alert(formError); return; }
    if (isEditing) {
      const updated = exams.map(e => e.id === editingId ? ({
        ...e,
        title: title.trim(),
        area: area.trim(),
        type,
        minScore,
        questions,
        updatedAt: new Date().toISOString(),
      }) : e);
      setExams(updated); saveExams(updated);
      alert('Examen actualizado y guardado en LocalStorage.');
      resetForm();
    } else {
      const newExam: Exam = {
        id: uid(),
        title: title.trim(),
        area: area.trim(),
        type,
        minScore,
        questions,
        createdAt: new Date().toISOString(),
      };
      const updated = [newExam, ...exams];
      setExams(updated); saveExams(updated);
      alert('Examen creado y guardado en LocalStorage.');
      resetForm();
    }
  };

  const deleteExam = (id: string) => {
    const updated = exams.filter(e => e.id !== id);
    setExams(updated); saveExams(updated);
    if (editingId === id) resetForm();
  };

  const addQuestion = (q: Question) => setQuestions(prev => [q, ...prev]);
  const updateQuestion = (q: Question) => setQuestions(prev => prev.map(x => x.id === q.id ? q : x));
  const removeQuestion = (id: string) => setQuestions(prev => prev.filter(q => q.id !== id));

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold">Editor de Exámenes</h2>
        <p className="helper">Crea exámenes, añade múltiples preguntas y define el % mínimo. Todo se guarda en LocalStorage.</p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm text-slate-300">Título</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ej. Certificación Física"/>
          </div>
          <div>
            <label className="block text-sm text-slate-300">Área temática</label>
            <input value={area} onChange={e=>setArea(e.target.value)} placeholder="Ej. Mecánica"/>
          </div>
          <div>
            <label className="block text-sm text-slate-300">Tipo</label>
            <select value={type} onChange={e=>setType(e.target.value as ExamType)}>
              <option value="multiple">Opción múltiple</option>
              <option value="open">Preguntas abiertas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-300">% mínimo de aprobación</label>
            <input type="number" min={0} max={100} value={minScore} onChange={e=>setMinScore(Number(e.target.value))}/>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <QuestionForm examType={type} onSubmit={addQuestion} />
          <div className="flex items-center justify-between">
            <span className="badge">Preguntas agregadas: {questions.length}</span>
            <button
              className="px-3 py-1 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800"
              onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Ir al formulario para escribir otra pregunta"
            >Nueva pregunta</button>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="mt-4 rounded-2xl border border-slate-700 p-4">
            <h4 className="text-slate-100 font-semibold mb-2">Preguntas del examen ({questions.length})</h4>
            <ul className="space-y-2">
              {questions.map(q => (
                <li key={q.id} className="rounded-xl bg-slate-800/60 p-3 border border-slate-700">
                  <div className="text-slate-100">{q.text}</div>

                  {type === 'multiple' && q.choices && (
                    <ul className="mt-2 space-y-1 text-sm">
                      {q.choices.map(ch => (
                        <li key={ch.key} className="flex items-center gap-2">
                          <span className="w-6 text-center font-semibold">{ch.key}</span>
                          <span className="text-slate-200">{ch.text}</span>
                          {q.correctKey === ch.key && <span className="badge">Correcta</span>}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-3 flex gap-2">
                    <QuestionForm
                      examType={type}
                      initial={q}
                      onSubmit={updateQuestion}
                      onCancel={()=>{}}
                    />
                    <button
                      onClick={()=>removeQuestion(q.id)}
                      className="px-3 py-2 h-fit rounded-xl border border-rose-700 text-rose-300 hover:bg-rose-900/30"
                    >Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex gap-2 items-center">
          <button onClick={saveExam} className="px-5 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold">
            {isEditing ? 'Actualizar y guardar' : 'Guardar examen'}
          </button>
          {formError && <span className="error">⚠ {formError}</span>}
        </div>
      </div>

      <ExamList
        exams={exams}
        onEdit={(id) => {
          const exam = exams.find(e => e.id === id);
          if (exam) {
            setEditingId(id);
            setTitle(exam.title); setArea(exam.area); setType(exam.type);
            setMinScore(exam.minScore); setQuestions(exam.questions);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onDelete={id => deleteExam(id)}
      />
    </div>
  );
}
