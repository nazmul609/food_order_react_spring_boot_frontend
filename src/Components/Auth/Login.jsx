import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // need to add authentication logic here
        if (email === '' || password === '') {
            setError('Please fill in all fields.');
            return;
        }

        // After successful login, redirect based on role
        if (role === 'customer') {
            navigate('/customer-profile');
        } else if (role === 'vendor') {
            navigate('/vendor-profile');
        } else if (role === 'admin') {
            navigate('/admin-profile');
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 py-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login to Restoura</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <button 
                                type="button" 
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Login
                    </button>
                    <div className="text-center mt-4">
                        <p>Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
