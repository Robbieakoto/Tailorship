import { useNavigate } from 'react-router-dom';
import { UserPlus, BookOpen, Scissors } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container fade-in">
            <header style={{ textAlign: 'center', margin: '40px 0' }}>
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
            </header>

            <div style={{ display: 'grid', gap: '20px', marginTop: '40px' }}>
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
                        background: 'white',
                        color: 'var(--primary)',
                        padding: '30px',
                        borderRadius: 'var(--radius)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: 'var(--shadow)',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        border: '2px solid var(--primary)'
                    }}
                >
                    <BookOpen size={32} />
                    View Records
                </button>
            </div>

            <footer style={{ marginTop: 'auto', padding: '40px 0', textAlign: 'center', opacity: 0.6 }}>
                <p>© {new Date().getFullYear()} Tailorship Pro</p>
            </footer>
        </div>
    );
};

export default Home;
