import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from "./pages/default";
import Booking from "./pages/booking";

function App() {
  
  return (
  <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Default />} />
    <Route path="Booking" element={<Booking/>}/>
  
    </Routes>
    </BrowserRouter>
 
  </div>
  )
}

export default App
