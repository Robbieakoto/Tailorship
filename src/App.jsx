import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { CustomerProvider, useCustomers } from './hooks/useCustomers';
import Home from './pages/Home';
import CustomerList from './pages/CustomerList';
import CustomerForm from './pages/CustomerForm';
import CustomerDetail from './pages/CustomerDetail';
import Login from './pages/Login';
import './index.css';

const AppContent = ({ showSplash }) => {
  const { isLoggedIn, loading } = useCustomers();

  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-logo">
          <Scissors size={50} color="white" />
        </div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        <p style={{ marginTop: '16px', color: 'var(--primary)', fontWeight: '600', letterSpacing: '1px' }}>TAILORSHIP</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/records" element={<CustomerList />} />
          <Route path="/add" element={<CustomerForm />} />
          <Route path="/edit/:id" element={<CustomerForm />} />
          <Route path="/view/:id" element={<CustomerDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Service Worker for automatic updates
  useRegisterSW({
    onRegistered(r) {
      r && setInterval(() => {
        r.update();
      }, 60 * 60 * 1000);
    },
    onNeedRefresh() {
      if (window.confirm('A new version of Tailorship is available. Update now?')) {
        window.location.reload();
      }
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CustomerProvider>
      <AppContent showSplash={showSplash} />
    </CustomerProvider>
  );
}

export default App;
