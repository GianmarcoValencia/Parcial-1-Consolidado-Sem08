import { Exam, Result, User } from '../types'

const KEYS = {
  exams: 'exams',
  users: 'users',
  results: 'results'
} as const

const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) as T : fallback
  } catch { return fallback }
}

const write = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const loadExams = (): Exam[] => read<Exam[]>(KEYS.exams, [])
export const saveExams = (exams: Exam[]) => write(KEYS.exams, exams)

export const loadUsers = (): User[] => read<User[]>(KEYS.users, [])
export const saveUsers = (users: User[]) => write(KEYS.users, users)

export const loadResults = (): Result[] => read<Result[]>(KEYS.results, [])
export const saveResults = (results: Result[]) => write(KEYS.results, results)

export const uid = () => crypto.randomUUID()
