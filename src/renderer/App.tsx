import 'tailwindcss/tailwind.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Form1 from './pages/Form-1';
import Form2 from './pages/Form-2';
import Reports from './pages/Reports';
import Certificates from './pages/Certificates';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form-1" element={<Form1 />} />
        <Route path="/form-2" element={<Form2 />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}
