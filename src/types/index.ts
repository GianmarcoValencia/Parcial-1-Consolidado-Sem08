export interface User {
  id: string;
  documento: string;
  nombreCompleto: string;
  email: string;
  especialidad: string;
  fechaRegistro: string;
  certificaciones: Certification[];
  experiencia: WorkExperience[];
  formacion: Education[];
}

export interface Certification {
  id: string;
  examenId: string;
  examenNombre: string;
  fechaEmision: string;
  porcentajeObtenido: number;
  urlCertificado: string;
  codigoUnico: string;
}

export interface WorkExperience {
  id: string;
  puesto: string;
  empresa: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  actual: boolean;
}

export interface Education {
  id: string;
  titulo: string;
  institucion: string;
  año: string;
  descripcion: string;
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}