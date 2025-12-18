import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Edit2, Phone, Calendar, User } from 'lucide-react';
import { useCustomers } from '../hooks/useCustomers';

const CustomerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getCustomer } = useCustomers();
    const customer = getCustomer(id);

    if (!customer) return <div className="container">Customer not found</div>;

    const labels = {
        bust: 'Bust',
        waist: 'Waist',
        hips: 'Hips',
        shoulder: 'Shoulder',
        sleeveLength: 'Sleeve Length',
        topLength: 'Top Length',
        trouserLength: 'Trouser Length',
        thigh: 'Thigh',
        ankle: 'Ankle'
    };

    return (
        <div className="container fade-in">
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', position: 'sticky', top: 0, background: 'var(--secondary)', zIndex: 10, padding: '10px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => navigate('/records')} style={{ background: 'none', color: 'var(--primary)', padding: '8px' }}>
                        <ChevronLeft size={28} />
                    </button>
                    <h2 style={{ marginLeft: '12px' }}>Details</h2>
                </div>
                <button
                    onClick={() => navigate(`/edit/${customer.id}`)}
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '600'
                    }}
                >
                    <Edit2 size={18} />
                    Edit
                </button>
            </header>

            <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>{customer.name}</h1>

                <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                        <Phone size={18} />
                        <span>{customer.phone || 'No phone number'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                        <User size={18} />
                        <span>{customer.gender}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                        <Calendar size={18} />
                        <span>Recorded on {customer.dateTaken}</span>
                    </div>
                </div>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ marginBottom: '20px', borderBottom: '2px solid var(--secondary)', paddingBottom: '10px' }}>Body Measurements</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {Object.entries(customer.measurements).map(([key, value]) => (
                        <div key={key} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{labels[key]}</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary)' }}>
                                {value ? `${value}"` : '—'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button
                    onClick={() => window.print()}
                    style={{ background: 'none', color: 'var(--primary)', fontWeight: '600', textDecoration: 'underline' }}
                >
                    Download / Print Record
                </button>
            </div>
        </div>
    );
};

export default CustomerDetail;
