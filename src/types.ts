export type ExamType = 'multiple' | 'open';

export interface Choice { key: string; text: string; }
export interface Question { id: string; text: string; choices?: Choice[]; correctKey?: string; }
export interface Exam {
  id: string; title: string; area: string; type: ExamType;
  minScore: number; questions: Question[];
  createdAt: string; updatedAt?: string;
}

export interface Assignment {
  id: string; userId: string; userName: string; examId: string; createdAt: string;
}

export interface Attempt {
  id: string; assignmentId: string; examId: string; userId: string; userName: string;
  score: number; passed: boolean; createdAt: string;
}

export interface User {
  id: string; // DNI/código/email (login)
  name: string;
  email: string;
  passwordHash: string; // hash local simple
  createdAt: string;
}
