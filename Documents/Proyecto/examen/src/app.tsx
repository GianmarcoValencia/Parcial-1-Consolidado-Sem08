import { BrowserRouter, Routes, Route } from "react-router-dom";
import CertificateIssuer from "./components/CertificateIssuer";
import CertificateViewer from "./components/CertificateViewer";

function App() {
  // Datos simulados (puedes cambiarlos luego)
  const dummyUser = { name: "Juan Pérez" };
  const dummyExam = { title: "Desarrollo Web Avanzado" };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<CertificateIssuer user={dummyUser} exam={dummyExam} />}
        />
        <Route path="/certificate/:id" element={<CertificateViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
