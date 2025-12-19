import { useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import { Scissors, ArrowRight, Loader2, UserPlus, LogIn, CheckCircle2 } from 'lucide-react';

const Login = () => {
    const [userIdInput, setUserIdInput] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useCustomers();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tidiedId = userIdInput.trim().toLowerCase();

        if (!tidiedId) {
            setError('Please enter a User ID');
            return;
        }

        if (tidiedId.length < 3) {
            setError('User ID must be at least 3 characters long');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMessage('');

        const result = isLoginMode
            ? await login(tidiedId)
            : await register(tidiedId);

        if (result.success) {
            if (!isLoginMode) {
                setSuccessMessage('Account created successfully! Redirecting...');
                // The App level handles the redirect because isLoggedIn changes
            }
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{
                    background: 'var(--primary)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <Scissors size={40} color="white" />
                </div>
                <h1 style={{ fontSize: '2rem', marginBottom: '4px' }}>Tailorship</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Universal Measurement Records</p>
            </div>

            <div style={{
                background: 'white',
                padding: '32px',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-lg)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', background: '#f8f9fa', padding: '4px', borderRadius: '12px' }}>
                    <button
                        onClick={() => { setIsLoginMode(true); setError(''); setSuccessMessage(''); }}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '10px',
                            background: isLoginMode ? 'white' : 'transparent',
                            boxShadow: isLoginMode ? 'var(--shadow)' : 'none',
                            color: isLoginMode ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                        }}
                    >
                        <LogIn size={16} /> Login
                    </button>
                    <button
                        onClick={() => { setIsLoginMode(false); setError(''); setSuccessMessage(''); }}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '10px',
                            background: !isLoginMode ? 'white' : 'transparent',
                            boxShadow: !isLoginMode ? 'var(--shadow)' : 'none',
                            color: !isLoginMode ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                        }}
                    >
                        <UserPlus size={16} /> Create ID
                    </button>
                </div>

                <h2 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-dark)' }}>
                    {isLoginMode ? 'Welcome Back' : 'Get Started'}
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.85rem' }}>
                    {isLoginMode ? 'Enter your User ID to resume your work' : 'Choose a unique ID to sync your records'}
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>User ID</label>
                        <input
                            type="text"
                            value={userIdInput}
                            onChange={(e) => setUserIdInput(e.target.value)}
                            placeholder="e.g. fashion_hub"
                            required
                            style={{
                                padding: '16px',
                                border: '2px solid #edeff2'
                            }}
                        />
                        {error && <p style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '8px' }}>{error}</p>}
                        {successMessage && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '0.85rem', marginTop: '12px', background: 'rgba(74, 103, 65, 0.1)', padding: '10px', borderRadius: '8px' }}>
                                <CheckCircle2 size={16} />
                                {successMessage}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: 'var(--blue)',
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
                        {loading ? <Loader2 size={24} className="spin" /> : (
                            isLoginMode ? <>Login <LogIn size={20} /></> : <>Create ID <ArrowRight size={20} /></>
                        )}
                    </button>
                </form>

                <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {isLoginMode
                        ? 'Lost your records? Make sure you are using the correct User ID.'
                        : 'Your records will be securely tied to this ID. You can use it on any device.'}
                </p>
            </div>
        </div>
    );
};

export default Login;
