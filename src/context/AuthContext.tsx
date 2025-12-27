import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { getCurrentUser, setCurrentUser, loadUsers, saveUsers, simpleHash, uid } from '../utils/localStorageHelpers';

type AuthCtx = {
  user: User | null;
  usersCount: number;
  register: (data: { id: string; name: string; email: string; password: string }) => { ok: boolean; msg?: string };
  login: (idOrEmail: string, password: string) => { ok: boolean; msg?: string };
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth must be used within AuthProvider');
  return v;
};

export default function AuthProvider({ children }: { children: React.ReactNode }){
  const [user, setUser] = useState<User | null>(null);
  const [usersCount, setUsersCount] = useState<number>(0);

  useEffect(()=>{
    setUser(getCurrentUser());
    setUsersCount(loadUsers().length);
  }, []);

  const register: AuthCtx['register'] = ({ id, name, email, password }) => {
    id = id.trim(); name = name.trim(); email = email.trim().toLowerCase();
    if (!id || !name || !email || !password) return { ok: false, msg: 'Completa todos los campos.' };
    if (password.length < 6) return { ok: false, msg: 'La contraseña debe tener al menos 6 caracteres.' };
    const rows = loadUsers();
    if (rows.find(u => u.id === id || u.email === email)) return { ok: false, msg: 'Ya existe un usuario con ese ID o email.' };
    const u: User = { id, name, email, passwordHash: simpleHash(password), createdAt: new Date().toISOString() };
    rows.unshift(u); saveUsers(rows); setUsersCount(rows.length);
    setCurrentUser(u); setUser(u);
    return { ok: true };
  };

  const login: AuthCtx['login'] = (idOrEmail, password) => {
    const rows = loadUsers();
    const target = rows.find(u => u.id === idOrEmail.trim() || u.email === idOrEmail.trim().toLowerCase());
    if (!target) return { ok: false, msg: 'Usuario no encontrado.' };
    if (target.passwordHash !== simpleHash(password)) return { ok: false, msg: 'Contraseña incorrecta.' };
    setCurrentUser(target); setUser(target);
    return { ok: true };
  };

  const logout = () => { setCurrentUser(null); setUser(null); };

  return <Ctx.Provider value={{ user, usersCount, register, login, logout }}>{children}</Ctx.Provider>;
}
