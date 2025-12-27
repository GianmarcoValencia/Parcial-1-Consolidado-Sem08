import { useEffect, useMemo, useState } from 'react';
import { Assignment, Exam } from '../types';
import { loadAssignments, loadExams, loadAttempts, saveAttempts, uid } from '../utils/localStorageHelpers';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TakeExamPage(){
  const { user } = useAuth();
  const [userIdInput, setUserIdInput] = useState('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);

  const [active, setActive] = useState<Assignment | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const nav = useNavigate();

  useEffect(()=>{ setAssignments(loadAssignments()); setExams(loadExams()); }, []);

  useEffect(()=>{
    // Si está logueado, usar su ID para buscar automáticamente
    if (user) {
      setUserIdInput(user.id);
      const row = loadAssignments().find(r => r.userId.trim() === user.id.trim());
      if (row) setActive(row);
    }
  }, [user]);

  const exam = useMemo(()=> active ? (exams.find(e => e.id === active.examId) || null) : null, [active, exams]);

  const lookup = () => {
    const key = (user?.id || userIdInput).trim();
    const row = assignments.find(r => r.userId.trim() === key);
    if (!row) { alert('No se encontró asignación para ese usuario.'); return; }
    setActive(row); setAnswers({});
  };

  const setAnswer = (qId: string, key: string) => setAnswers(prev => ({ ...prev, [qId]: key }));

  const submit = () => {
    if (!exam || !active) return;
    const total = exam.questions.length;
    let correct = 0;
    for (const q of exam.questions){
      if (exam.type === 'multiple' && q.correctKey){
        if (answers[q.id] === q.correctKey) correct++;
      }
    }
    const score = Math.round((correct / total) * 100);
    const passed = score >= exam.minScore;

    const attempts = loadAttempts();
    attempts.unshift({ id: uid(), assignmentId: active.id, examId: exam.id, userId: active.userId, userName: active.userName, score, passed, createdAt: new Date().toISOString() });
    saveAttempts(attempts);

    const url = new URL(window.location.origin + '/certificado');
    url.searchParams.set('exam', exam.id);
    url.searchParams.set('name', active.userName);
    url.searchParams.set('score', String(score));
    url.searchParams.set('id', uid());
    nav(url.pathname + url.search);
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="title">Acceso del usuario para rendir</h2>
        <p className="helper">{user ? `Sesión: ${user.name} (${user.id})` : 'Puedes loguearte para autocompletar.'}</p>

        {!user && (
          <div className="flex gap-2 mt-2">
            <input value={userIdInput} onChange={e=>setUserIdInput(e.target.value)} placeholder="ID (DNI/código/email)"/>
            <button onClick={lookup} className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold">Buscar examen</button>
          </div>
        )}

        {user && (
          <div className="mt-2">
            <button onClick={lookup} className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold">Cargar mi examen</button>
          </div>
        )}

        {active && (
          <div className="mt-4 text-sm text-slate-300">
            <div><b>Usuario:</b> {active.userName} <span className="text-slate-400">({active.userId})</span></div>
          </div>
        )}
      </div>

      {exam && active && (
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-100">{exam.title} • {exam.area}</h3>
          <div className="helper">Tipo: {exam.type} • Mínimo: {exam.minScore}% • Preguntas: {exam.questions.length}</div>

          <ol className="mt-3 space-y-4 list-decimal list-inside">
            {exam.questions.map(q => (
              <li key={q.id} className="rounded-xl bg-slate-800/60 p-3 border border-slate-700">
                <div className="text-slate-100">{q.text}</div>

                {exam.type === 'multiple' && q.choices && (
                  <ul className="mt-2 space-y-1">
                    {q.choices.map(ch => (
                      <li key={ch.key} className="flex items-center gap-2">
                        <input type="radio" name={q.id} checked={answers[q.id] === ch.key} onChange={() => setAnswer(q.id, ch.key)} />
                        <span className="w-6 text-center font-semibold">{ch.key}</span>
                        <span className="text-slate-200">{ch.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exam.type === 'open' && (
                  <textarea className="w-full mt-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2" placeholder="Respuesta abierta (no se califica automáticamente)."></textarea>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-4">
            <button onClick={submit} className="px-5 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold">Enviar y ver certificado</button>
          </div>
        </div>
      )}
    </div>
  );
}
