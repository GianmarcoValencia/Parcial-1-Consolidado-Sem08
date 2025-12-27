import { useEffect, useRef, useState } from 'react';
import { loadExams, uid } from '../utils/localStorageHelpers';
import type { Exam } from '../types';
import CertificateCanvas from '../components/cert/CertificateCanvas';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function getQuery(name: string){
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || '';
}

export default function CertificatePage(){
  const [exams, setExams] = useState<Exam[]>([]);
  const [examId, setExamId] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [score, setScore] = useState<number>(100);
  const [certId, setCertId] = useState<string>(uid());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const stored = loadExams(); setExams(stored);
    const qExam = getQuery('exam'); const qName = getQuery('name'); const qScore = getQuery('score'); const qId = getQuery('id');
    if (qExam) setExamId(qExam);
    if (qName) setStudentName(qName);
    if (qScore) setScore(Number(qScore));
    if (qId) setCertId(qId);
  }, []);

  const exam = exams.find(e => e.id === examId);
  const minScore = exam?.minScore ?? 60;
  const dateStr = new Date().toLocaleDateString();

  const handleDownloadPDF = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`certificado-${studentName || 'alumno'}.pdf`);
  };

  const shareUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('exam', examId);
    url.searchParams.set('name', studentName);
    url.searchParams.set('score', String(score));
    url.searchParams.set('id', certId);
    return url.toString();
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="title">Certificado</h2>
        <p className="helper">Plantilla profesional: descarga PDF o comparte URL.</p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div><label className="block text-sm text-slate-300">Examen</label><select value={examId} onChange={e=>setExamId(e.target.value)}><option value="">— Selecciona —</option>{exams.map(e => (<option key={e.id} value={e.id}>{e.title} • {e.area}</option>))}</select></div>
          <div><label className="block text-sm text-slate-300">Nombre</label><input value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Nombre del alumno"/></div>
          <div><label className="block text-sm text-slate-300">Puntaje (%)</label><input type="number" min={0} max={100} value={score} onChange={e=>setScore(Number(e.target.value))}/></div>
          <div><label className="block text-sm text-slate-300">ID certificado</label><input value={certId} onChange={e=>setCertId(e.target.value)} /></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button disabled={!examId || !studentName} onClick={handleDownloadPDF} className={`${(!examId || !studentName) ? 'bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} px-4 py-2 rounded-xl text-white font-semibold`}>Descargar PDF</button>
          <a href={shareUrl()} className="px-4 py-2 rounded-xl border border-slate-600 text-slate-200 hover:bg-slate-800">Abrir URL pública</a>
        </div>
      </div>
      <div className="card overflow-auto">
        <div className="text-sm text-slate-400 mb-2">Vista previa</div>
        <div className="w-full flex justify-center">
          <CertificateCanvas ref={ref} studentName={studentName} examTitle={exam?.title || ''} score={score} minScore={minScore} certId={certId} dateStr={dateStr} />
        </div>
      </div>
    </div>
  );
}
