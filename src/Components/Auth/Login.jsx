import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setError('Please fill in all fields.');
            return;
        }

        const requestBody = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Login failed');
            }

            const decodedToken = jwtDecode(responseData.refreshToken);
            const id = decodedToken.userId;
            const userEmail = decodedToken.sub; // Extracted email from token
            const userRole = decodedToken.role;

            // Store the necessary data in localStorage
            localStorage.setItem('token', responseData.refreshToken);
            localStorage.setItem('email', userEmail); 
            localStorage.setItem('userId', id); 
            localStorage.setItem('role', role)
            localStorage.setItem('isLoggedIn', true);

            setLoginSuccess(true);

        } catch (error) {
            setError(error.message);
        }
    };

    const handleOnboardingNavigation = () => {
        const id = localStorage.getItem('userId');
        const userRole = localStorage.getItem('role');

        // Redirect based on role to the onboarding page
        if (userRole === 'customer') {
            navigate(`/customer-onboarding/${id}`);
        } else if (userRole === 'vendor') {
            navigate(`/vendor-onboarding/${id}`);
        } else if (userRole === 'admin') {
            navigate(`/admin-profile`);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login to Restoura</h2>
                {loginSuccess ? (
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-6">Login Successful</h1>
                        <p>Welcome back!</p>
                        <button
                            onClick={handleOnboardingNavigation}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 mt-4"
                        >
                            Go to Onboarding
                        </button>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default Login;