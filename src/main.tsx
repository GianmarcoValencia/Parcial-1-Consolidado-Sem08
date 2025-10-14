import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ExamsAdmin from './pages/ExamsAdmin'
import './index.css'

function App(){
  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="rounded-2xl bg-card/80 border border-slate-700 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">🏛️ Comité Técnico — Parte 1 (UX mejorada)</h1>
        <nav className="flex gap-3 text-sm">
          <Link to="/" className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700">Editor</Link>
        </nav>
      </header>
      <main className="mt-4">
        <Routes>
          <Route path="/" element={<ExamsAdmin />} />
        </Routes>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
)
