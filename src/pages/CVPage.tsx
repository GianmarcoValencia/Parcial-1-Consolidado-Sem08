import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CVPage(){
  const [name, setName] = useState('Gianmarco Valencia');
  const [title, setTitle] = useState('Desarrollador Web');
  const [email, setEmail] = useState('gianval41@gmail.com');
  const [phone, setPhone] = useState('+51 999 999 999');
  const [location, setLocation] = useState('Huancayo, Perú');
  const [summary, setSummary] = useState('Desarrollador con enfoque en UX y front-end moderno. Experiencia en React, TypeScript y Tailwind.');
  const [skills, setSkills] = useState('React, TypeScript, Vite, Tailwind, Node.js, Git');
  const [experience, setExperience] = useState('Empresa X (2023–2025): Frontend — Componentes accesibles y reutilizables.\nFreelance (2022–2023): Sitios web responsivos, optimización de performance.');
  const [education, setEducation] = useState('UNCP — Ing. Sistemas (2019–2025)');
  const cvRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const ratio = pageWidth / canvas.width;
    const imgHeight = canvas.height * ratio;
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
    pdf.save(`CV-${name || 'profesional'}.pdf`);
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="title">CV Profesional</h2>
        <p className="helper">Completa y descarga tu CV PDF con plantilla moderna.</p>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre completo"/>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título profesional"/>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Teléfono"/>
          <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Ubicación"/>
        </div>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <textarea rows={3} value={summary} onChange={e=>setSummary(e.target.value)} placeholder="Resumen profesional"/>
          <textarea rows={3} value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Habilidades (coma)"/>
          <textarea rows={4} value={experience} onChange={e=>setExperience(e.target.value)} placeholder="Experiencia (una por línea)"/>
          <textarea rows={4} value={education} onChange={e=>setEducation(e.target.value)} placeholder="Educación"/>
        </div>
        <div className="mt-3">
          <button onClick={downloadPDF} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold">Descargar CV (PDF)</button>
        </div>
      </div>

      <div className="card overflow-auto">
        <div className="text-sm text-slate-400 mb-2">Vista previa</div>
        <div className="w-full flex justify-center">
          <div ref={cvRef} className="w-[794px] min-h-[1123px] bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500"></div>
            <div className="p-8 grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="text-3xl font-extrabold">{name || 'Nombre Apellido'}</div>
                <div className="text-teal-600 font-semibold">{title || 'Título profesional'}</div>
                <p className="mt-4 text-slate-700">{summary}</p>
                <div className="mt-6">
                  <div className="text-lg font-bold border-b-2 border-slate-200 pb-1">Experiencia</div>
                  <ul className="mt-2 space-y-2">
                    {experience.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} className="pl-2 border-l-4 border-teal-500">{line}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <div className="text-lg font-bold border-b-2 border-slate-200 pb-1">Educación</div>
                  <p className="mt-2">{education}</p>
                </div>
              </div>
              <div className="col-span-1">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <div className="text-sm text-slate-500">Contacto</div>
                  <div className="mt-1 text-slate-800">{email}</div>
                  <div className="text-slate-800">{phone}</div>
                  <div className="text-slate-800">{location}</div>
                </div>
                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <div className="text-sm text-slate-500">Habilidades</div>
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {skills.split(',').map((s, i) => (
                      <li key={i} className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">{s.trim()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
