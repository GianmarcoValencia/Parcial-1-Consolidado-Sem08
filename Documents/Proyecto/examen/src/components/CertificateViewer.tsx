import { useParams } from "react-router-dom";
import { getData } from "../utils/storage";

const CertificateViewer: React.FC = () => {
  const { id } = useParams();
  const certs = getData("certificates");
  const cert = certs.find((c: any) => c.id === id);

  if (!cert) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        ❌ Certificado no encontrado o inválido
      </h2>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Certificado de Aprobación</h1>
      <p><strong>Nombre:</strong> {cert.userName}</p>
      <p><strong>Examen:</strong> {cert.examTitle}</p>
      <p><strong>Fecha:</strong> {cert.issuedAt}</p>
      <p><strong>Código:</strong> {cert.hash}</p>
      <p><strong>Verificación:</strong> ✅ Válido</p>
    </div>
  );
};

export default CertificateViewer;
