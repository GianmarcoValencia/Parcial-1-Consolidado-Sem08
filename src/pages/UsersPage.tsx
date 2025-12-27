import { useMemo } from 'react';
import { loadUsers } from '../utils/localStorageHelpers';
import { useAuth } from '../context/AuthContext';

export default function UsersPage(){
  const { usersCount } = useAuth();
  const rows = loadUsers();
  const since = useMemo(()=> new Date().toLocaleString(), []);

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="title">Usuarios registrados</h2>
        <div className="mt-2 text-sm text-slate-300">Total: <b>{usersCount}</b></div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-slate-100">Listado</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-300">
              <tr><th className="text-left py-2">ID</th><th className="text-left py-2">Nombre</th><th className="text-left py-2">Email</th><th className="text-left py-2">Registro</th></tr>
            </thead>
            <tbody className="text-slate-200">
              {rows.map(u => (
                <tr key={u.id} className="border-t border-slate-800">
                  <td className="py-2">{u.id}</td>
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{new Date(u.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {rows.length===0 && <tr><td className="py-3 text-slate-400" colSpan={4}>Aún no hay usuarios.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
