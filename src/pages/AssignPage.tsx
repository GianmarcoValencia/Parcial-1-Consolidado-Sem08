import { useEffect, useMemo, useState } from 'react';
import { Assignment, Exam } from '../types';
import { loadAssignments, loadExams, saveAssignments, uid } from '../utils/localStorageHelpers';
import { useAuth } from '../context/AuthContext';

export default function AssignPage(){
  const { usersCount } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [rows, setRows] = useState<Assignment[]>([]);

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [examId, setExamId] = useState('');

  useEffect(()=>{ setExams(loadExams()); setRows(loadAssignments()); }, []);

  const error = useMemo(()=>{
    if (!userId.trim()) return 'Ingresa el identificador del usuario.';
    if (!userName.trim()) return 'Ingresa el nombre del usuario.';
    if (!examId) return 'Selecciona un examen.';
    return null;
  }, [userId, userName, examId]);

  const assign = () => {
    if (error) { alert(error); return; }
    const row: Assignment = { id: uid(), userId: userId.trim(), userName: userName.trim(), examId, createdAt: new Date().toISOString() };
    const up = [row, ...rows];
    setRows(up); saveAssignments(up);
    setUserId(''); setUserName(''); setExamId('');
    alert('Examen asignado.');
  };

  const remove = (id: string) => {
    const up = rows.filter(r => r.id !== id);
    setRows(up); saveAssignments(up);
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="title">Asignar examen a usuario</h2>
        <p className="helper">Usuarios registrados: <b>{usersCount}</b>. El usuario accede en “Rendir”.</p>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <div><label className="block text-sm text-slate-300">ID usuario</label><input value={userId} onChange={e=>setUserId(e.target.value)} placeholder="DNI/código/email"/></div>
          <div><label className="block text-sm text-slate-300">Nombre del usuario</label><input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="Nombre completo"/></div>
          <div><label className="block text-sm text-slate-300">Examen</label>
            <select value={examId} onChange={e=>setExamId(e.target.value)}><option value="">— Selecciona —</option>{exams.map(e => <option key={e.id} value={e.id}>{e.title} • {e.area}</option>)}</select>
          </div>
        </div>
        <div className="mt-3"><button onClick={assign} className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold">Asignar</button>{error && <span className="error ml-3">⚠ {error}</span>}</div>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-100">Asignaciones</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-300"><tr><th className="text-left py-2">Usuario</th><th className="text-left py-2">ID</th><th className="text-left py-2">Examen</th><th className="text-left py-2">Fecha</th><th className="text-left py-2">Acciones</th></tr></thead>
            <tbody className="text-slate-200">
              {rows.map(r => {
                const exam = exams.find(e=>e.id===r.examId);
                return (
                  <tr key={r.id} className="border-t border-slate-800">
                    <td className="py-2">{r.userName}</td>
                    <td className="py-2">{r.userId}</td>
                    <td className="py-2">{exam ? `${exam.title} • ${exam.area}` : '—'}</td>
                    <td className="py-2">{new Date(r.createdAt).toLocaleString()}</td>
                    <td className="py-2"><button onClick={()=>remove(r.id)} className="px-3 py-1 rounded-lg border border-rose-700 text-rose-300 hover:bg-rose-900/30">Eliminar</button></td>
                  </tr>
                );
              })}
              {rows.length===0 && <tr><td className="py-3 text-slate-400" colSpan={5}>No hay asignaciones.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
