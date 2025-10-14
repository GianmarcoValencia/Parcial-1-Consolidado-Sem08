// src/components/Curriculum/CurriculumEdit.tsx
import React, { useState } from 'react';
import type { User, WorkExperience, Education } from '../../types';
import { storage } from '../../utils/storage';

interface CurriculumEditProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const CurriculumEdit: React.FC<CurriculumEditProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>({ ...user });

  const handleSave = () => {
    onSave(formData);
  };

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: storage.generateId(),
      puesto: '',
      empresa: '',
      fechaInicio: '',
      fechaFin: '',
      descripcion: '',
      actual: false
    };
    setFormData({
      ...formData,
      experiencia: [...formData.experiencia, newExperience]
    });
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    const updatedExperiences = [...formData.experiencia];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    setFormData({
      ...formData,
      experiencia: updatedExperiences
    });
  };

  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experiencia: formData.experiencia.filter((_, i) => i !== index)
    });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: storage.generateId(),
      titulo: '',
      institucion: '',
      año: '',
      descripcion: ''
    };
    setFormData({
      ...formData,
      formacion: [...formData.formacion, newEducation]
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...formData.formacion];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setFormData({
      ...formData,
      formacion: updatedEducation
    });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      formacion: formData.formacion.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="curriculum-edit">
      <div className="edit-header">
        <h1>Editar Currículum</h1>
        <div className="edit-actions">
          <button onClick={handleSave} className="btn btn-primary">
            Guardar Cambios
          </button>
          <button onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </div>

      {/* Experiencia Laboral */}
      <section className="edit-section">
        <div className="section-header">
          <h3>Experiencia Laboral</h3>
          <button onClick={addExperience} className="btn btn-sm btn-outline">
            + Agregar Experiencia
          </button>
        </div>

        {formData.experiencia.map((exp, index) => (
          <div key={exp.id} className="edit-item">
            <div className="form-row">
              <input
                type="text"
                placeholder="Puesto"
                value={exp.puesto}
                onChange={(e) => updateExperience(index, 'puesto', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Empresa"
                value={exp.empresa}
                onChange={(e) => updateExperience(index, 'empresa', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <input
                type="date"
                value={exp.fechaInicio}
                onChange={(e) => updateExperience(index, 'fechaInicio', e.target.value)}
                className="form-input"
              />
              {!exp.actual && (
                <input
                  type="date"
                  value={exp.fechaFin}
                  onChange={(e) => updateExperience(index, 'fechaFin', e.target.value)}
                  className="form-input"
                />
              )}
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={exp.actual}
                  onChange={(e) => updateExperience(index, 'actual', e.target.checked)}
                />
                Trabajo actual
              </label>
            </div>
            <textarea
              placeholder="Descripción de responsabilidades y logros"
              value={exp.descripcion}
              onChange={(e) => updateExperience(index, 'descripcion', e.target.value)}
              className="form-textarea"
              rows={3}
            />
            <button
              onClick={() => removeExperience(index)}
              className="btn btn-danger btn-sm"
            >
              Eliminar
            </button>
          </div>
        ))}
      </section>

      {/* Formación Académica */}
      <section className="edit-section">
        <div className="section-header">
          <h3>Formación Académica</h3>
          <button onClick={addEducation} className="btn btn-sm btn-outline">
            + Agregar Formación
          </button>
        </div>

        {formData.formacion.map((edu, index) => (
          <div key={edu.id} className="edit-item">
            <div className="form-row">
              <input
                type="text"
                placeholder="Título obtenido"
                value={edu.titulo}
                onChange={(e) => updateEducation(index, 'titulo', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Institución"
                value={edu.institucion}
                onChange={(e) => updateEducation(index, 'institucion', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Año de graduación"
                value={edu.año}
                onChange={(e) => updateEducation(index, 'año', e.target.value)}
                className="form-input"
              />
            </div>
            <textarea
              placeholder="Descripción adicional"
              value={edu.descripcion}
              onChange={(e) => updateEducation(index, 'descripcion', e.target.value)}
              className="form-textarea"
              rows={2}
            />
            <button
              onClick={() => removeEducation(index)}
              className="btn btn-danger btn-sm"
            >
              Eliminar
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CurriculumEdit;