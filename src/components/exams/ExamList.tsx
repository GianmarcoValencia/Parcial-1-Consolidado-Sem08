import { Exam } from '../../types';

type Props = {
  exams: Exam[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ExamList({ exams, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
      <h3 className="text-lg font-semibold text-slate-100">Exámenes guardados</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-300">
            <tr>
              <th className="text-left py-2">Título</th>
              <th className="text-left py-2">Área</th>
              <th className="text-left py-2">Tipo</th>
              <th className="text-left py-2">Mínimo</th>
              <th className="text-left py-2">Preguntas</th>
              <th className="text-left py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-slate-200">
            {exams.map(e => (
              <tr key={e.id} className="border-t border-slate-800">
                <td className="py-2">{e.title}</td>
                <td className="py-2">{e.area}</td>
                <td className="py-2">{e.type}</td>
                <td className="py-2">{e.minScore}%</td>
                <td className="py-2">{e.questions.length}</td>
                <td className="py-2 flex gap-2">
                  <button onClick={() => onEdit(e.id)} className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white">Editar</button>
                  <button onClick={() => onDelete(e.id)} className="px-3 py-1 rounded-lg border border-rose-700 text-rose-300 hover:bg-rose-900/30">Eliminar</button>
                </td>
              </tr>
            ))}
            {exams.length === 0 && (
              <tr><td className="py-4 text-slate-400" colSpan={6}>No hay exámenes aún.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
