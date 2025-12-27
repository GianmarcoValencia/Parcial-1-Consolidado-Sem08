import { forwardRef } from 'react';

type Props = {
  studentName: string;
  examTitle: string;
  score: number;
  minScore: number;
  certId: string;
  dateStr: string;
};

const CertificateCanvas = forwardRef<HTMLDivElement, Props>(function CertificateCanvas(props, ref) {
  const passed = props.score >= props.minScore;
  return (
    <div
      ref={ref}
      className="w-[960px] h-[640px] bg-white text-slate-900 rounded-2xl shadow-2xl border-[14px] border-[#0b1220] relative overflow-hidden"
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%)' }}></div>
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500"></div>
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <div className="text-2xl font-black tracking-wide">PLATAFORMA DE CERTIFICACIÓN</div>
        <div className="text-xs text-slate-600">ID: {props.certId}</div>
      </div>
      <div className="absolute inset-x-10 top-24 text-center">
        <div className="text-[42px] font-extrabold text-slate-800">CERTIFICADO</div>
        <div className="mt-2 text-slate-600">Se otorga a</div>
        <div className="mt-1 text-3xl font-bold text-slate-900">{props.studentName || 'Nombre del alumno'}</div>
        <div className="mt-3 text-slate-700">por haber completado satisfactoriamente el examen</div>
        <div className="mt-1 text-2xl font-semibold text-slate-900">{props.examTitle || 'Título del examen'}</div>
      </div>
      <div className="absolute inset-x-10 bottom-40 grid grid-cols-3 gap-6 text-center">
        <div className="rounded-xl border border-slate-200 p-4 bg-white/70">
          <div className="text-sm text-slate-500">Puntaje</div>
          <div className="text-3xl font-bold">{props.score}%</div>
        </div>
        <div className="rounded-xl border border-slate-200 p-4 bg-white/70">
          <div className="text-sm text-slate-500">Mínimo</div>
          <div className="text-3xl font-bold">{props.minScore}%</div>
        </div>
        <div className={`rounded-xl border p-4 bg-white/70 ${passed ? 'border-emerald-300' : 'border-rose-300'}`}>
          <div className="text-sm text-slate-500">Resultado</div>
          <div className={`text-3xl font-extrabold ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>{passed ? 'APROBADO' : 'NO APROBADO'}</div>
        </div>
      </div>
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-slate-700">
        <div className="text-center">
          <div className="h-10 border-t-4 border-slate-400 w-56 mx-auto"></div>
          <div className="text-xs mt-1">Comité Técnico</div>
        </div>
        <div className="text-sm">{props.dateStr}</div>
        <div className="text-xs">Verificación local • Sin backend</div>
      </div>
    </div>
  );
});

export default CertificateCanvas;
