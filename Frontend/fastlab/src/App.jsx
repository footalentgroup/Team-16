import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPaciente from "./pages/LoginPaciente";


function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* Definir rutas simples */}
        <Route path="/loginpaciente" element={<LoginPaciente />} />
      </Routes>
    </Router>
        
    </>
  );
}

export default App;
