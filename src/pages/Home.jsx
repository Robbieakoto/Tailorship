import { useNavigate } from 'react-router-dom';
import { UserPlus, BookOpen, Scissors, LogOut, User } from 'lucide-react';
import { useCustomers } from '../hooks/useCustomers';

const Home = () => {
    const navigate = useNavigate();
    const { userId, logout } = useCustomers();

    return (
        <div className="container fade-in">
            <header style={{ textAlign: 'center', margin: '40px 0', position: 'relative' }}>
                <button
                    onClick={logout}
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '0',
                        background: 'white',
                        padding: '10px',
                        borderRadius: '50%',
                        boxShadow: 'var(--shadow)',
                        color: 'var(--error)'
                    }}
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>

                <div style={{
                    background: 'var(--primary)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <Scissors size={40} color="white" />
                </div>
                <h1>Tailorship</h1>
                <p style={{ color: 'var(--text-muted)' }}>Professional Measurement Records</p>

                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '16px',
                    padding: '6px 16px',
                    background: '#edeff2',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    color: 'var(--text-dark)',
                    fontWeight: '600'
                }}>
                    <User size={14} />
                    ID: {userId}
                </div>
            </header>

            <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
                <button
                    onClick={() => navigate('/add')}
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '30px',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: 'var(--shadow)',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                    }}
                >
                    <UserPlus size={32} />
                    Add New Customer
                </button>

                <button
                    onClick={() => navigate('/records')}
                    style={{
                        background: 'var(--blue)',
                        color: 'white',
                        padding: '30px',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: 'var(--shadow)',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        border: 'none'
                    }}
                >
                    <BookOpen size={32} />
                    View Customer
                </button>
            </div>

            <footer style={{ marginTop: 'auto', padding: '40px 0', textAlign: 'center', opacity: 0.6 }}>
                <p>© {new Date().getFullYear()} Tailorship Pro</p>
                <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>Built with ❤️ by Robbieshares</p>
            </footer>
        </div>
    );
};

export default Home;
