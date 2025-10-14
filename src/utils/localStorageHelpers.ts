import { Exam } from '../types';

const EXAMS_KEY = 'exams';

function read<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; }
  catch { return fallback; }
}
function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const loadExams = (): Exam[] => read<Exam[]>(EXAMS_KEY, []);
export const saveExams = (exams: Exam[]) => write(EXAMS_KEY, exams);
export const uid = () => crypto.randomUUID();
