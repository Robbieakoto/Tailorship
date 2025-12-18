import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';
import { useCustomers } from '../hooks/useCustomers';

const TOP_FIELDS = [
    { id: 'bust', label: 'Bust' },
    { id: 'shoulder', label: 'Shoulder' },
    { id: 'sleeveLength', label: 'Sleeve Length' },
    { id: 'topLength', label: 'Top Length' },
    { id: 'check', label: 'Check' },
    { id: 'acrossBack', label: 'Across Back' },
    { id: 'cuff', label: 'Cuff' },
    { id: 'aroundArms', label: 'Around Arms' }
];

const BOTTOM_FIELDS = [
    { id: 'waist', label: 'Waist' },
    { id: 'hips', label: 'Hips' },
    { id: 'trouserLength', label: 'Trouser Length' },
    { id: 'thigh', label: 'Thigh' },
    { id: 'ankle', label: 'Ankle' },
    { id: 'knee', label: 'Knee' },
    { id: 'bass', label: 'Bass' },
    { id: 'seat', label: 'Seat' }
];

const ALL_FIELDS = [...TOP_FIELDS, ...BOTTOM_FIELDS];

const CustomerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addCustomer, updateCustomer, getCustomer } = useCustomers();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        gender: 'Female',
        dateTaken: new Date().toISOString().split('T')[0],
        measurements: ALL_FIELDS.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {})
    });

    useEffect(() => {
        if (id) {
            const existing = getCustomer(id);
            if (existing) setFormData(existing);
        }
    }, [id, getCustomer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateCustomer(id, formData);
        } else {
            addCustomer(formData);
        }
        navigate('/records');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('m_')) {
            const field = name.replace('m_', '');
            setFormData(prev => ({
                ...prev,
                measurements: { ...prev.measurements, [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="container fade-in">
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, background: 'var(--secondary)', zIndex: 10, padding: '10px 0' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--primary)', padding: '8px' }}>
                    <ChevronLeft size={28} />
                </button>
                <h2 style={{ marginLeft: '12px' }}>{id ? 'Edit Customer' : 'Add Customer'}</h2>
            </header>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px', paddingBottom: '40px' }}>
                <section>
                    <h3 style={{ marginBottom: '12px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Basic Info</h3>
                    <div style={{ display: 'grid', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: '500' }}>Full Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter customer name"
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: '500' }}>Phone Number</label>
                            <input
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: '500' }}>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: '500' }}>Date Taken</label>
                                <input
                                    type="date"
                                    name="dateTaken"
                                    value={formData.dateTaken}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 style={{ marginBottom: '16px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid var(--secondary)', paddingBottom: '8px' }}>Measurements (inches)</h3>

                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ marginBottom: '12px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' }}>Upper Body (Top)</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {TOP_FIELDS.map(field => (
                                <div key={field.id}>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{field.label}</label>
                                    <input
                                        name={`m_${field.id}`}
                                        type="number"
                                        step="0.25"
                                        value={formData.measurements[field.id]}
                                        onChange={handleChange}
                                        placeholder="0.0"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '12px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' }}>Lower Body (Bottom)</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {BOTTOM_FIELDS.map(field => (
                                <div key={field.id}>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{field.label}</label>
                                    <input
                                        name={`m_${field.id}`}
                                        type="number"
                                        step="0.25"
                                        value={formData.measurements[field.id]}
                                        onChange={handleChange}
                                        placeholder="0.0"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <button
                    type="submit"
                    style={{
                        background: 'var(--blue)',
                        color: 'white',
                        padding: '16px',
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        marginTop: '20px',
                        boxShadow: 'var(--shadow)'
                    }}
                >
                    <Save size={20} />
                    {id ? 'Update Record' : 'Save Customer'}
                </button>
            </form>
        </div>
    );
};

export default CustomerForm;
