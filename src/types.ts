export type ExamType = 'multiple' | 'open';

export interface Choice {
  key: string;
  text: string;
}
export interface Question {
  id: string;
  text: string;
  choices?: Choice[];
  correctKey?: string;
}
export interface Exam {
  id: string;
  title: string;
  area: string;
  type: ExamType;
  minScore: number;
  questions: Question[];
  createdAt: string;
  updatedAt?: string;
}
