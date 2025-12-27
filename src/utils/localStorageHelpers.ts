import { Exam, Assignment, Attempt, User } from '../types';

const EXAMS_KEY = 'exams';
const ASSIGN_KEY = 'assignments';
const ATTEMPTS_KEY = 'attempts';
const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';

function read<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; }
  catch { return fallback; }
}
function write(key: string, value: unknown) { localStorage.setItem(key, JSON.stringify(value)); }

export const loadExams = (): Exam[] => read<Exam[]>(EXAMS_KEY, []);
export const saveExams = (exams: Exam[]) => write(EXAMS_KEY, exams);

export const loadAssignments = (): Assignment[] => read<Assignment[]>(ASSIGN_KEY, []);
export const saveAssignments = (rows: Assignment[]) => write(ASSIGN_KEY, rows);

export const loadAttempts = (): Attempt[] => read<Attempt[]>(ATTEMPTS_KEY, []);
export const saveAttempts = (rows: Attempt[]) => write(ATTEMPTS_KEY, rows);

export const uid = () => crypto.randomUUID();

// Users
export const loadUsers = (): User[] => read<User[]>(USERS_KEY, []);
export const saveUsers = (rows: User[]) => write(USERS_KEY, rows);

export const getCurrentUser = (): User | null => read<User | null>(CURRENT_USER_KEY, null);
export const setCurrentUser = (u: User | null) => write(CURRENT_USER_KEY, u);

// Hash muy simple (NO usar en producción)
export function simpleHash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h.toString(16);
}
