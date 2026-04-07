import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterCompany from './pages/RegisterCompany';
import Portal from './pages/Portal';
import Login from './pages/Login';
import PasswordRecovery from './pages/PasswordRecovery';
import ResetPassword from './pages/ResetPassword';
import Products from './pages/products';
import ClientAcc1 from './pages/clientacc1';
import ClientAcc2 from './pages/clientacc2';
import ClientAcc3 from './pages/clientacc3';
import CompanyAcc1 from './pages/companyacc1';
import CompanyAcc2 from './pages/companyacc2';
import CompanyAcc3 from './pages/companyacc3';
import Home from './pages/Home';
import ProductInfo from './pages/productInfo';

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
        <Route path="/products" element={<Products />}/>
        {/* <Route path="/UploadProducts" element={<UploadProducts />}/> */}
        <Route path='/product/:id' element={<ProductInfo />} />
        <Route path="/client-portal" element={<ClientAcc1 />} />
        <Route path="/client-portal2" element={<ClientAcc2 />} />
        <Route path="/client-portal3" element={<ClientAcc3 />} />
        <Route path="/company-portal1" element={<CompanyAcc1 />} />
        <Route path="/company-portal2" element={<CompanyAcc2 />} />
        <Route path="/company-portal3" element={<CompanyAcc3 />} />

      </Routes>
    </Router>
  );
}

export default AppRoutes;
