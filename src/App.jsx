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
import AddRoomForm from "./pages/admin-panel/add-room-admin";
import TermsAndConditions from "./pages/terms-privacy.jsx/terms-and-conditions";
import PrivacyPolicy from "./pages/terms-privacy.jsx/privacy-policy";
import UserRating from "./pages/user-panel/ratings";

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
    <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
    <Route path="/user-dashboard"  element={<UserDashboard/>}/>
    <Route path="/add-room-admin"  element={<AddRoomForm/>} />nd
    <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
    <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
    <Route path="/ratings" element={<UserRating/>}/>
    <Route path="*" element={<PageDoesNotExist/>}/>
    
    </Routes>
    </BrowserRouter>
 
  </div>
  )
}

export default App
