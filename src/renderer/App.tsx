import { useEffect, useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import Certificates from './pages/Certificates';
import Form1 from './pages/Form-1';
import Form2 from './pages/Form-2';
import Home from './pages/Home';
import Reports from './pages/Reports';

export default function App() {
  const [isDBConnected, setIsDBConnected] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [invoiceSF, setInvoiceSF] = useState('');
  const [invoiceNF, setInvoiceNF] = useState('');
  const [dataSF, setDataSF] = useState([]);

  useEffect(() => {
    const handleDBConnection = (arg: unknown) => {
      setIsDBConnected(arg === 'success');
    };

    window.electron.ipcRenderer.connectToMongoDB();
    window.electron.ipcRenderer.once(
      'connect-to-mongodb',
      handleDBConnection as (...args: unknown[]) => void,
    );
    // special form: invoice number
    window.electron.ipcRenderer.once(
      'fetch-special-form-invoice',
      (event: any) => {
        if (event.success) {
          if (event.data === null || event.data === undefined) {
            setFetchError(true);
          } else {
            setFetchError(false);
            setInvoiceSF(event.data);
          }
        } else {
          setFetchError(true);
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
          } else {
            setFetchError(false);
            setInvoiceNF(event.data);
          }
        } else {
          setFetchError(true);
        }
      },
    );
    window.electron.ipcRenderer.fetchNormalFormInvoice();
    window.electron.ipcRenderer.once(
      'fetch-special-form-data',
      (event: any) => {
        if (event.success) {
          setFetchError(false);
          setDataSF(event.data);
        } else {
          setFetchError(true);
        }
      },
    );
    window.electron.ipcRenderer.fetchSpecialFormData();
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
            <Route path="/reports" element={<Reports specialForm={dataSF} />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}
