import ExamEditor from '../components/exams/ExamEditor';
import { useAuth } from '../context/AuthContext';

export default function ExamsAdmin() {
  const { usersCount } = useAuth();
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="card">
        <div className="flex items-center justify-between">
          <h2 className="title">Panel del Comité Técnico</h2>
          <div className="badge">Usuarios registrados: {usersCount}</div>
        </div>
      </div>
      <ExamEditor />
    </div>
  );
}
