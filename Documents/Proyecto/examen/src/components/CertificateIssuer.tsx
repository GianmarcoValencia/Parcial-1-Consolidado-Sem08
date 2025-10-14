import { jsPDF } from "jspdf";
import { saveData, getData } from "../utils/storage";

interface CertificateIssuerProps {
  user: { name: string };
  exam: { title: string };
}

const CertificateIssuer: React.FC<CertificateIssuerProps> = ({ user, exam }) => {
  const issueCertificate = () => {
    const hash = crypto.randomUUID();
    const cert = {
      id: hash,
      userName: user.name,
      examTitle: exam.title,
      issuedAt: new Date().toLocaleDateString(),
      publicUrl: `${window.location.origin}/certificate/${hash}`,
      hash,
    };

    const certs = getData("certificates");
    saveData("certificates", [...certs, cert]);

    const pdf = new jsPDF();
    pdf.text("CERTIFICADO DE APROBACIÓN", 60, 20);
    pdf.text(`Nombre: ${user.name}`, 20, 40);
    pdf.text(`Examen: ${exam.title}`, 20, 50);
    pdf.text(`Fecha: ${cert.issuedAt}`, 20, 60);
    pdf.text(`Código: ${hash}`, 20, 70);
    pdf.text(`Verificación: ${cert.publicUrl}`, 20, 80);
    pdf.save(`Certificado-${user.name}.pdf`);

    alert("Certificado generado correctamente ✅");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Generar Certificado</h2>
      <button
        onClick={issueCertificate}
        style={{
          backgroundColor: "#16a34a",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginTop: "15px",
        }}
      >
        Generar PDF
      </button>
    </div>
  );
};

export default CertificateIssuer;
