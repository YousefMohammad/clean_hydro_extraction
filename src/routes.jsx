import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterCompany from './pages/RegisterCompany';
import Portal from './pages/Portal';
import Login from './pages/Login';
import PasswordRecovery from './pages/PasswordRecovery';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/register-customer" element={<RegisterCustomer />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
