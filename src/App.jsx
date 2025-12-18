import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomerProvider } from './hooks/useCustomers';
import Home from './pages/Home';
import CustomerList from './pages/CustomerList';
import CustomerForm from './pages/CustomerForm';
import CustomerDetail from './pages/CustomerDetail';
import './index.css';

function App() {
  return (
    <CustomerProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/records" element={<CustomerList />} />
            <Route path="/add" element={<CustomerForm />} />
            <Route path="/edit/:id" element={<CustomerForm />} />
            <Route path="/view/:id" element={<CustomerDetail />} />
          </Routes>
        </div>
      </Router>
    </CustomerProvider>
  );
}

export default App;
