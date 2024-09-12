import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from "./pages/default";
import Booking from "./pages/booking";
import AdminLogin from "./pages/login/admin-login";
import UserLogin from "./pages/login/user-login";
import AdminRegister from "./pages/register/admin-registration";
import UserRegister from "./pages/register/user-registration";
import PageDoesNotExist from "./pages/page-does-not-exist";
import AdminDashboard from "./pages/admin-panel/admin-dashboard";
import UserDashboard from "./pages/user-panel/user-dashboard";
import ForgotPassword from "./pages/login/forgot-password";

function App() {
  
  return (
  <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Default />} />
    <Route path="Booking" element={<Booking/>}/>
    <Route path="/admin-login" element={<AdminLogin/>}/>
    <Route path="/user-login" element={<UserLogin/>}/>
    <Route path="/admin-registration" element={<AdminRegister/>}/>
    <Route path="/user-registration" element={<UserRegister/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="*" element={<PageDoesNotExist/>}/>
    <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
    <Route path="/user-dashboard"  element={<UserDashboard/>}/>
    </Routes>
    </BrowserRouter>
 
  </div>
  )
}

export default App
