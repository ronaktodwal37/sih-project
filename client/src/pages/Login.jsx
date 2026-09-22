import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const u = await login({ email, password });

            if (u.role === 'Citizen') navigate('/citizen/challenges/new');
            else if (u.role === 'University') navigate('/university/dashboard');
            else if (u.role === 'Government' || u.role === 'Admin') navigate('/government/dashboard');
            else navigate('/');

        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Login failed. Invalid credentials.');
        }
    };

    return (
        <div className="min-h-[85vh] bg-govGray flex items-center justify-center p-4">
            <div className="glass-card p-10 w-full max-w-md bg-white shadow-xl rounded-xl border-t-8 border-govBlue">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-govBlue mb-2">Portal Access</h2>
                    <p className="text-sm text-gray-500">Sign in to your governmental role account</p>
                </div>

                {errorMsg && (
                    <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center border border-red-200">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-govBlue transition-shadow"
                            placeholder="user@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-govBlue transition-shadow"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button className="w-full bg-govBlue text-white p-3 rounded font-bold hover:bg-blue-900 transition-colors shadow-md mt-2">
                        Sign In Securely
                    </button>
                </form>

                <div className="mt-8 p-4 bg-blue-50/50 border border-blue-100 rounded text-xs text-gray-600 font-mono">
                    <p className="mb-2 font-bold text-govBlue">DEMO CREDENTIALS:</p>
                    <ul className="space-y-1">
                        <li>Citizen: <b>rahul@example.com</b> / password123</li>
                        <li>Admin: <b>admin@jharkhand.gov.in</b> / password123</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Login;
