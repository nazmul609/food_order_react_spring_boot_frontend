import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import API_BASE_URL from '../../apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [role, setRole] = useState(''); 
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
            const response = await fetch(`${API_BASE_URL}/auth/signin`, {
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
            const userEmail = decodedToken.sub;
            const userRole = role; 

            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('token', responseData.refreshToken);
            localStorage.setItem('email', userEmail);
            localStorage.setItem('userId', id);
            localStorage.setItem('role', userRole);

            // Redirect based on selected role
            if (userRole === 'customer') {
                navigate(`/customer-profile/my-profile/${id}`);
            } else if (userRole === 'vendor') {
                navigate(`/vendor-profile/my-profile/${id}`);
            } else if (userRole === 'admin') {
                navigate(`/admin-profile`);
            }

            // Refresh the page after navigation
            window.location.reload();

        } catch (error) {
            setError(error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        {/* Password Input with FontAwesome Icon */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            required 
                        >
                            <option value="" disabled>Select Role</option> 
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
