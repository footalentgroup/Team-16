import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import LoginPaciente from './pages/LoginPaciente'
import LoginAdmin from './pages/LoginAdmin'
import Historal from './pages/Historial/Historial'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    {/* Definir rutas simples */}
                    <Route
                        path='/'
                        element={<LoginPaciente />}
                    />
                    <Route
                        path='/login/admin'
                        element={<LoginAdmin />}
                    />
                    <Route
                        path='/historial'
                        element={<Historal />}
                    />
                </Routes>
            </Router>
        </>
    )
}

export default App
