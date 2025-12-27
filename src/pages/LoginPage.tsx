import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage(){
  const { login } = useAuth();
  const [idOrEmail, setIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const submit = () => {
    const res = login(idOrEmail, password);
    setMsg(res.ok ? 'Sesión iniciada.' : (res.msg || 'No se pudo iniciar sesión'));
    if (res.ok) { setIdOrEmail(''); setPassword(''); }
  };

  return (
    <div className="card max-w-xl mx-auto">
      <h2 className="title">Iniciar sesión</h2>
      <p className="helper">Autenticación local (LocalStorage).</p>
      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <input value={idOrEmail} onChange={e=>setIdOrEmail(e.target.value)} placeholder="ID o Email"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña"/>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button onClick={submit} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold">Entrar</button>
        {msg && <span className="text-sm">{msg}</span>}
      </div>
    </div>
  );
}
