import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterCompany from './pages/RegisterCompany';
import Portal from './pages/Portal';
import Login from './pages/Login';
import PasswordRecovery from './pages/PasswordRecovery';
import ResetPassword from './pages/ResetPassword';
import Products from './pages/products';
import ClientAccount from './pages/clientAccount';
import CompanyAccount from './pages/companyAccount';
import Home from './pages/Home';
import ProductInfo from './pages/productInfo';
import Resources from './pages/Resources';
import Model from './pages/model';
import ContactUs from './pages/contactUs';

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
        <Route path="/model" element={<Model />} />
        <Route path='/product/:id' element={<ProductInfo />} />
        <Route path="/client/:id" element={<ClientAccount />} />
        <Route path="/company/:id" element={<CompanyAccount />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/countactUs" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
