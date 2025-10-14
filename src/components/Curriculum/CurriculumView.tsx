// src/components/Curriculum/CurriculumView.tsx
import React from 'react';
import type { User } from '../../types';

interface CurriculumViewProps {
  user: User;
  isOwner?: boolean;
  onEdit?: () => void;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({ user, isOwner = false, onEdit }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="curriculum-view">
      <div className="curriculum-header">
        <h1>Currículum Vitae</h1>
        <h2>{user.nombreCompleto}</h2>
        <p className="specialty">{user.especialidad}</p>
        {isOwner && onEdit && (
          <button onClick={onEdit} className="btn btn-secondary">
            Editar Currículum
          </button>
        )}
      </div>

      <div className="curriculum-content">
        {/* Información Personal */}
        <section className="personal-info">
          <h3>Información Personal</h3>
          <div className="info-grid">
            <div>
              <strong>Documento:</strong> {user.documento}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Especialidad:</strong> {user.especialidad}
            </div>
          </div>
        </section>

        {/* Certificaciones */}
        <section className="certifications">
          <h3>Certificaciones Obtenidas</h3>
          {user.certificaciones.length === 0 ? (
            <p className="no-data">No hay certificaciones registradas</p>
          ) : (
            <div className="certifications-grid">
              {user.certificaciones.map(cert => (
                <div key={cert.id} className="certification-card">
                  <h4>{cert.examenNombre}</h4>
                  <p><strong>Fecha:</strong> {formatDate(cert.fechaEmision)}</p>
                  <p><strong>Puntuación:</strong> {cert.porcentajeObtenido}%</p>
                  <p><strong>Código:</strong> {cert.codigoUnico}</p>
                  <a 
                    href={cert.urlCertificado} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="certificate-link"
                  >
                    Ver Certificado
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Experiencia Laboral */}
        <section className="experience">
          <h3>Experiencia Laboral</h3>
          {user.experiencia.length === 0 ? (
            <p className="no-data">No hay experiencia laboral registrada</p>
          ) : (
            <div className="experience-list">
              {user.experiencia.map(exp => (
                <div key={exp.id} className="experience-item">
                  <h4>{exp.puesto}</h4>
                  <p className="company">{exp.empresa}</p>
                  <p className="period">
                    {formatDate(exp.fechaInicio)} - {exp.actual ? 'Presente' : formatDate(exp.fechaFin)}
                  </p>
                  {exp.descripcion && (
                    <p className="description">{exp.descripcion}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Formación Académica */}
        <section className="education">
          <h3>Formación Académica</h3>
          {user.formacion.length === 0 ? (
            <p className="no-data">No hay formación académica registrada</p>
          ) : (
            <div className="education-list">
              {user.formacion.map(edu => (
                <div key={edu.id} className="education-item">
                  <h4>{edu.titulo}</h4>
                  <p className="institution">{edu.institucion}</p>
                  <p className="year">{edu.año}</p>
                  {edu.descripcion && (
                    <p className="description">{edu.descripcion}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CurriculumView;