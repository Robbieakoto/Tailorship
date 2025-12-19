import { useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import { Scissors, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
    const [userIdInput, setUserIdInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useCustomers();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!userIdInput.trim()) {
            setError('Please enter a User ID');
            return;
        }

        setLoading(true);
        setError('');
        const result = await login(userIdInput.trim());
        if (!result.success) {
            setError('Login failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{
                    background: 'var(--primary)',
                    width: '100px',
                    height: '100px',
                    borderRadius: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <Scissors size={50} color="white" />
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Tailorship</h1>
                <p style={{ color: 'var(--text-muted)' }}>Universal Measurement Records</p>
            </div>

            <div style={{
                background: 'white',
                padding: '32px',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-lg)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-dark)' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>Enter your User ID to sync your records</p>

                <form onSubmit={handleLogin} style={{ display: 'grid', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>User ID</label>
                        <input
                            type="text"
                            value={userIdInput}
                            onChange={(e) => setUserIdInput(e.target.value)}
                            placeholder="e.g. tailor789"
                            required
                            style={{
                                padding: '16px',
                                border: '2px solid #edeff2'
                            }}
                        />
                        {error && <p style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '8px' }}>{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '16px',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? <Loader2 size={24} className="spin" /> : <>Login to Sync <ArrowRight size={20} /></>}
                    </button>
                </form>

                <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    Records are saved to your ID. Use the same ID on any device to access your customers.
                </p>
            </div>
        </div>
    );
};

export default Login;
