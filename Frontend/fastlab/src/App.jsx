import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPaciente from "./pages/LoginPaciente";
import LoginAdmin from './pages/LoginAdmin';


function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* Definir rutas simples */}
        <Route path="/" element={<LoginPaciente />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
      </Routes>
    </Router>
        
    </>
  );
}

export default App;
