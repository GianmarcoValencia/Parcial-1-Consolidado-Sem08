import { useEffect, useMemo, useRef, useState } from 'react';
import { ExamType, Question, Choice } from '../../types';
import { uid } from '../../utils/localStorageHelpers';

type Props = {
  examType: ExamType;
  initial?: Question;
  onCancel?: () => void;
  onSubmit: (q: Question) => void;
};

const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function QuestionForm({ examType, initial, onSubmit, onCancel }: Props) {
  const [text, setText] = useState(initial?.text ?? '');
  const [choices, setChoices] = useState<Choice[]>(
    initial?.choices ?? [
      { key: 'A', text: '' },
      { key: 'B', text: '' },
    ]
  );
  const [correctKey, setCorrectKey] = useState<string | undefined>(initial?.correctKey);
  const [touched, setTouched] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const isMultiple = examType === 'multiple';

  const error = useMemo(() => {
    if (!text.trim()) return 'Ingresa el enunciado de la pregunta.';
    if (isMultiple) {
      if (!choices || choices.length < 2) return 'Ingresa al menos 2 alternativas.';
      const anyEmpty = choices.some(c => !c.text.trim());
      if (anyEmpty) return 'Completa el texto de todas las alternativas.';
      if (!correctKey) return 'Selecciona la alternativa correcta.';
      if (!choices.find(c => c.key === correctKey)) return 'La alternativa correcta debe existir en la lista.';
    }
    return null;
  }, [text, isMultiple, choices, correctKey]);

  const addChoice = () => {
    const nextKey = ABC[choices.length] || `${choices.length + 1}`;
    setChoices(prev => [...prev, { key: nextKey, text: '' }]);
  };

  const removeChoice = (key: string) => {
    const filtered = choices.filter(c => c.key !== key);
    const relettered = filtered.map((c, i) => ({ key: ABC[i] || `${i+1}`, text: c.text }));
    setChoices(relettered);
    if (correctKey === key) setCorrectKey(undefined);
  };

  const updateChoiceText = (key: string, value: string) => {
    setChoices(prev => prev.map(c => c.key === key ? { ...c, text: value } : c));
  };

  const handleSubmit = () => {
    setTouched(true);
    if (error) return;
    const q: Question = {
      id: initial?.id ?? uid(),
      text: text.trim(),
      choices: isMultiple ? choices : undefined,
      correctKey: isMultiple ? correctKey : undefined,
    };
    onSubmit(q);
    if (!initial) {
      setText('');
      setChoices([{ key: 'A', text: '' }, { key: 'B', text: '' }]);
      setCorrectKey(undefined);
      // focus back for "otra pregunta"
      setTimeout(()=> textareaRef.current?.focus(), 0);
    }
  };

  const parseLine = (raw: string) => {
    const tokens = raw.trim().split(/(?=[A-Z]\s)/).map(s => s.trim()).filter(Boolean);
    const parsed: Choice[] = [];
    tokens.forEach((t, i) => {
      const match = t.match(/^([A-Z])\s+(.*)$/);
      if (match) {
        parsed.push({ key: ABC[i] || match[1], text: match[2].trim() });
      }
    });
    if (parsed.length >= 2) {
      setChoices(parsed.map((c, i) => ({ key: ABC[i], text: c.text })));
      setCorrectKey(undefined);
    } else {
      alert('No se pudo detectar el formato. Ejemplo: "A Fuerzas centrípetas B Movimiento angular C ..."');
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-slate-100 font-semibold">{initial ? 'Editar pregunta' : 'Agregar pregunta'}</h4>
        {!initial && <span className="helper">Agrega varias seguidas. Luego guarda el examen.</span>}
      </div>
      <label className="block text-sm text-slate-300 mt-3">Enunciado</label>
      <textarea
        ref={textareaRef}
        className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-100"
        rows={3}
        value={text}
        onChange={e=>setText(e.target.value)}
        placeholder="Escribe la pregunta…"
      />
      {touched && error && !text.trim() && <div className="error mt-1">⚠ {error}</div>}

      {isMultiple && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-300">Alternativas</label>
            <button
              type="button"
              onClick={addChoice}
              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm"
            >+ Agregar alternativa</button>
          </div>

          <div className="mt-2 space-y-2">
            {choices.map((c) => (
              <div key={c.key} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correct"
                  checked={correctKey === c.key}
                  onChange={() => setCorrectKey(c.key)}
                  title="Marcar como correcta"
                />
                <span className="w-6 text-center font-semibold">{c.key}</span>
                <input
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2"
                  value={c.text}
                  onChange={e=>updateChoiceText(c.key, e.target.value)}
                  placeholder={`Texto de la alternativa ${c.key}`}
                />
                <button
                  type="button"
                  onClick={() => removeChoice(c.key)}
                  className="px-2 py-1 rounded-lg border border-rose-700 text-rose-300 hover:bg-rose-900/30"
                  disabled={choices.length <= 2}
                  title="Eliminar alternativa"
                >Eliminar</button>
              </div>
            ))}
          </div>

          {touched && error && error !== 'Ingresa el enunciado de la pregunta.' && (
            <div className="error mt-1">⚠ {error}</div>
          )}

          <details className="mt-2">
            <summary className="text-xs text-slate-400 cursor-pointer">Pegar texto con formato (A xxx B yyy C zzz)</summary>
            <textarea
              className="w-full mt-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2"
              rows={2}
              placeholder="A Fuerzas centrípetas B Movimiento Angular C ..."
              onBlur={e => e.target.value.trim() && parseLine(e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">Pega y sal del cuadro para parsear.</p>
          </details>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800"
          >Cancelar</button>
        )}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold"
        >{initial ? 'Guardar cambios' : 'Agregar pregunta'}</button>
      </div>
    </div>
  );
}
