import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setError('Please fill in all fields.');
            return;
        }

        const requestBody = {
            email: email,
            password: password,
            role: role,
        };

        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            setRegistrationSuccess(true);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error.message);
            setError('Registration failed. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Register for Restoura</h2>
                <form onSubmit={handleRegister} className="space-y-6">
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
                        <input 
                            type="password" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
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
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Register
                    </button>
                    <div className="text-center mt-4">
                        <p>Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
