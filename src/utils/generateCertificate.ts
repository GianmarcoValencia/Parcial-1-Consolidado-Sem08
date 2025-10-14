import jsPDF from 'jspdf'
import { Exam, User } from '../types'

export function generateCertificatePDF(user: User, exam: Exam, score: number, code: string) {
  const doc = new jsPDF()
  doc.setFontSize(20)
  doc.text('Certificado de Aprobación', 20, 20)
  doc.setFontSize(12)
  doc.text(`Nombre: ${user.name}`, 20, 40)
  doc.text(`Examen: ${exam.title}`, 20, 50)
  doc.text(`Área: ${exam.area}`, 20, 60)
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 70)
  doc.text(`Puntaje: ${score.toFixed(2)}%`, 20, 80)
  doc.text(`Código: ${code}`, 20, 90)
  doc.save(`certificado_${user.name.replace(/\s+/g, '_')}.pdf`)
}
