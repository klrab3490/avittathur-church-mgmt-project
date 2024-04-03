import 'tailwindcss/tailwind.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Form1 from './pages/Form-1';
import Form2 from './pages/Form-2';
import Reports from './pages/Reports';
import Certificates from './pages/Certificates';

export default function App() {
  const [isDBConnected, setIsDBConnected] = useState(false);

  useEffect(() => {
    const handleDBConnection = (arg: unknown) => {
      const status = arg === 'success' ? 'connected' : 'error';
      // eslint-disable-next-line no-console
      console.log(`MongoDB ${status}`);
      setIsDBConnected(arg === 'success');
    };
    window.electron.ipcRenderer.connectToMongoDB();
    window.electron.ipcRenderer.once(
      'connect-to-mongodb',
      handleDBConnection as (...args: unknown[]) => void,
    );
  }, []);

  return (
    <div className="">
      {isDBConnected ? (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form-1" element={<Form1 />} />
            <Route path="/form-2" element={<Form2 />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Router>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-4xl">Connecting to Database...</div>
        </div>
      )}
    </div>
  );
}
