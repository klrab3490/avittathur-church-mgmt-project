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
  const [fetchError, setFetchError] = useState(false);
  const [invoiceSF, setInvoiceSF] = useState('');
  const [invoiceNF, setInvoiceNF] = useState('');

  useEffect(() => {
    const handleDBConnection = (arg: unknown) => {
      const status = arg === 'success' ? 'connected' : 'error';
      console.log('MongoDB', status);
      setIsDBConnected(arg === 'success');
    };

    window.electron.ipcRenderer.connectToMongoDB();
    window.electron.ipcRenderer.once(
      'connect-to-mongodb',
      handleDBConnection as (...args: unknown[]) => void,
    );
    // special form: invoice number
    window.electron.ipcRenderer.on(
      'fetch-special-form-invoice',
      (event: any) => {
        if (event.success) {
          if (event.data === null || event.data === undefined) {
            setFetchError(true);
            console.error('No data found');
          } else {
            setFetchError(false);
            setInvoiceSF(event.data);
            console.log('Latest form data:', event.data);
          }
        } else {
          setFetchError(true);
          console.error('Failed to fetch latest form data:', event.message);
        }
      },
    );
    window.electron.ipcRenderer.fetchSpecialFormInvoice();
    // normal form: invoice number
    window.electron.ipcRenderer.once(
      'fetch-normal-form-invoice',
      (event: any) => {
        if (event.success) {
          if (event.data === null || event.data === undefined) {
            setFetchError(true);
            console.error('No data found');
          } else {
            setFetchError(false);
            setInvoiceNF(event.data);
            console.log('Latest form data:', event.data);
          }
        } else {
          setFetchError(true);
          console.error('Failed to fetch latest form data:', event.message);
        }
      },
    );
    window.electron.ipcRenderer.fetchNormalFormInvoice();
  }, []);
  const invoiceNumberSF = parseInt(invoiceSF.slice(1), 10);
  const invoiceNumberNF = parseInt(invoiceNF.slice(1), 10);

  return (
    <div className="">
      {fetchError && (
        <div className="flex justify-center items-center h-screen">
          <div className="text-4xl">
            Unexpected error. Please restart the application
          </div>
        </div>
      )}
      {!fetchError && !isDBConnected && (
        <div className="flex justify-center items-center h-screen">
          <div className="text-4xl">Connecting to Database...</div>
        </div>
      )}
      {!fetchError && isDBConnected && (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/form-1"
              element={<Form1 lastinvoice={invoiceNumberNF} />}
            />
            <Route
              path="/form-2"
              element={<Form2 lastinvoice={invoiceNumberSF} />}
            />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}
