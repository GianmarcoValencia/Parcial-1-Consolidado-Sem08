export type ExamType = 'multiple' | 'open'

export interface Question {
  id: string
  text: string
  options?: string[]
  correctAnswer?: string
}

export interface Exam {
  id: string
  title: string
  area: string
  type: ExamType
  questions: Question[]
  minScore: number
  createdAt: string
}

export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  name: string
  email: string
  document: string
  specialty: string
  password: string
  role: UserRole
  bio?: string
  education?: string[]
  experience?: string[]
}

export interface Result {
  id: string
  userId: string
  examId: string
  score: number
  passed: boolean
  takenAt: string
  certCode?: string
  certUrl?: string
}
