import jsPDF from 'jspdf'
import { User } from '../types'

export function exportCV(user: User, certs: { title: string, date: string, code?: string }[]) {
  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text(`CV — ${user.name}`, 20, 20)
  doc.setFontSize(12)
  doc.text(`Especialidad: ${user.specialty}`, 20, 30)
  if (user.bio) doc.text(doc.splitTextToSize(`Bio: ${user.bio}`, 170), 20, 40)

  let y = user.bio ? 60 : 40
  doc.setFont(undefined, 'bold')
  doc.text('Formación', 20, y); doc.setFont(undefined, 'normal'); y += 6
  ;(user.education||[]).forEach(e => { doc.text(`• ${e}`, 24, y); y += 6 })

  y += 4
  doc.setFont(undefined, 'bold')
  doc.text('Experiencia', 20, y); doc.setFont(undefined, 'normal'); y += 6
  ;(user.experience||[]).forEach(e => { doc.text(`• ${e}`, 24, y); y += 6 })

  y += 4
  doc.setFont(undefined, 'bold')
  doc.text('Certificaciones', 20, y); doc.setFont(undefined, 'normal'); y += 6
  certs.forEach(c => { doc.text(`• ${c.title} — ${c.date} ${c.code ? `(Código: ${c.code})` : ''}`, 24, y); y += 6 })

  doc.save(`CV_${user.name.replace(/\s+/g, '_')}.pdf`)
}
