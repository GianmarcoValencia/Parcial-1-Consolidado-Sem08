// src/utils/storage.ts
import type { User } from '../types';
const USERS_KEY = 'certification_users';
const CURRENT_USER_KEY = 'current_user';

export const storage = {
  // Usuarios
  getUsers: (): User[] => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch {
      return [];
    }
  },

  saveUsers: (users: User[]): void => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  // Usuario actual
  getCurrentUser: (): User | null => {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
    } catch {
      return null;
    }
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  // Generar IDs únicos
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};