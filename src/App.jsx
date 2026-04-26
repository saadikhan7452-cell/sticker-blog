import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Blogs from './pages/Blogs'; 
import SingleBlog from './pages/SingleBlog';
import About from './pages/About';
import SubmitVideo from "./pages/Submit";
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import GenerateQR from './components/QRCodeGen'; 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:id" element={<SingleBlog />} />
          <Route path="about" element={<About />} />
         <Route path="/submit" element={<SubmitVideo />} />
         <Route path="/login" element={<Login />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/generate-qr" element={<GenerateQR />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;