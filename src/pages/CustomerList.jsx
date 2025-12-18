import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, User, Phone, Trash2, Eye } from 'lucide-react';
import { useCustomers } from '../hooks/useCustomers';

const CustomerList = () => {
    const navigate = useNavigate();
    const { customers, deleteCustomer } = useCustomers();
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState(null);

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
            deleteCustomer(id);
            setNotification('Customer record deleted successfully');
            setTimeout(() => setNotification(null), 3000);
        }
    };

    return (
        <div className="container fade-in">
            {notification && (
                <div className="toast-container">
                    <div className="toast">
                        <span>{notification}</span>
                    </div>
                </div>
            )}
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, background: 'var(--secondary)', zIndex: 10, padding: '10px 0' }}>
                <button onClick={() => navigate('/')} style={{ background: 'none', color: 'var(--primary)', padding: '8px' }}>
                    <ChevronLeft size={28} />
                </button>
                <h2 style={{ marginLeft: '12px' }}>Customer Records</h2>
            </header>

            <div style={{ position: 'relative', marginBottom: '24px' }}>
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    style={{ paddingLeft: '44px' }}
                    placeholder="Search by name or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
                {filteredCustomers.length > 0 ? (
                    filteredCustomers.map(customer => (
                        <div
                            key={customer.id}
                            onClick={() => navigate(`/view/${customer.id}`)}
                            style={{
                                background: 'white',
                                padding: '20px',
                                borderRadius: 'var(--radius)',
                                boxShadow: 'var(--shadow)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{customer.name}</h3>
                                <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Phone size={14} /> {customer.phone || 'N/A'}
                                    </span>
                                    <span>•</span>
                                    <span>{customer.gender}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate(`/view/${customer.id}`); }}
                                    style={{ background: '#f0f4f0', color: 'var(--primary)', padding: '10px', borderRadius: '12px' }}
                                    title="View Record"
                                >
                                    <Eye size={20} />
                                </button>
                                <button
                                    onClick={(e) => handleDelete(e, customer.id)}
                                    style={{ background: '#fff0f0', color: 'var(--error)', padding: '10px', borderRadius: '12px' }}
                                    title="Delete Record"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', marginTop: '40px' }}>
                        {searchTerm ? 'No customers match your search.' : 'No records yet. Start by adding a customer!'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerList;
