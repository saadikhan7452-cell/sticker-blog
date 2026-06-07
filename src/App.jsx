import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Blogs from './pages/Blogs'; 
import SingleBlog from './pages/SingleBlog';
import About from './pages/About';
import Submit from "./pages/Submit";
import VideoGallery from "./pages/VideoGallery"; // 👈 Naya page import ho gaya

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:id" element={<SingleBlog />} />
          <Route path="about" element={<About />} />
          <Route path="submit" element={<Submit />} />
          <Route path="gallery" element={<VideoGallery />} /> {/* 🚀 Route setup done */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;