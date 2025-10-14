// src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import type { User, Certification } from '../types';
import { storage } from '../utils/storage';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Cargar datos iniciales
    const loadedUsers = storage.getUsers();
    const loadedCurrentUser = storage.getCurrentUser();
    setUsers(loadedUsers);
    setCurrentUser(loadedCurrentUser);
  }, []);

  const registerUser = (userData: Omit<User, 'id' | 'fechaRegistro' | 'certificaciones' | 'experiencia' | 'formacion'>): { success: boolean; message: string } => {
    // Validar documento único
    const existingUser = users.find(u => u.documento === userData.documento);
    if (existingUser) {
      return { success: false, message: 'El número de documento ya está registrado' };
    }

    // Validar email único
    const existingEmail = users.find(u => u.email === userData.email);
    if (existingEmail) {
      return { success: false, message: 'El correo electrónico ya está registrado' };
    }

    const newUser: User = {
      ...userData,
      id: storage.generateId(),
      fechaRegistro: new Date().toISOString(),
      certificaciones: [],
      experiencia: [],
      formacion: []
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    storage.saveUsers(updatedUsers);

    return { success: true, message: 'Usuario registrado exitosamente' };
  };

  const loginUser = (documento: string): { success: boolean; message: string; user?: User } => {
    const user = users.find(u => u.documento === documento);
    if (!user) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    setCurrentUser(user);
    storage.setCurrentUser(user);
    return { success: true, message: 'Inicio de sesión exitoso', user };
  };

  const logoutUser = (): void => {
    setCurrentUser(null);
    storage.setCurrentUser(null);
  };

  const updateUserProfile = (userId: string, updates: Partial<User>): void => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    );
    setUsers(updatedUsers);
    storage.saveUsers(updatedUsers);

    // Actualizar usuario actual si es el mismo
    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser = { ...currentUser, ...updates };
      setCurrentUser(updatedCurrentUser);
      storage.setCurrentUser(updatedCurrentUser);
    }
  };

  const addCertification = (userId: string, certification: Omit<Certification, 'id'>): void => {
    const newCertification: Certification = {
      ...certification,
      id: storage.generateId()
    };

    const user = users.find(u => u.id === userId);
    if (user) {
      const updatedCertifications = [...user.certificaciones, newCertification];
      updateUserProfile(userId, { certificaciones: updatedCertifications });
    }
  };

  return {
    users,
    currentUser,
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    addCertification
  };
};