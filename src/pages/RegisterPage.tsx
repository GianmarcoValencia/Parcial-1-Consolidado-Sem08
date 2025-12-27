import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage(){
  const { register } = useAuth();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const submit = () => {
    const res = register({ id, name, email, password });
    if (!res.ok) { setMsg(res.msg || 'Error de registro'); return; }
    setMsg('Registro exitoso. Sesión iniciada.');
    setId(''); setName(''); setEmail(''); setPassword('');
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="title">Registro de usuario</h2>
      <p className="helper">Se guarda en LocalStorage. No uses contraseñas reales.</p>
      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <input value={id} onChange={e=>setId(e.target.value)} placeholder="ID (DNI/código/email)"/>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre completo"/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña (mín. 6)"/>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button onClick={submit} className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold">Registrarme</button>
        {msg && <span className="text-sm">{msg}</span>}
      </div>
    </div>
  );
}
