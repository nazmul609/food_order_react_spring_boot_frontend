import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import API_BASE_URL from '../../apiConfig';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (email === '' || password === '' || confirmPassword === '') {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const requestBody = {
            email: email,
            password: password,
            role: role,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
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

            const responseData = await response.json();
            const decodedToken = jwtDecode(responseData.refreshToken);
            const id = decodedToken.userId;
            const userEmail = decodedToken.sub;

            // Store the necessary data in localStorage
            localStorage.setItem('token', responseData.refreshToken);
            localStorage.setItem('email', userEmail);
            localStorage.setItem('userId', id);
            localStorage.setItem('role', role);

            setRegistrationSuccess(true);
        } catch (error) {
            console.error('Registration error:', error.message);
            setError('Registration failed. Please try again later.');
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
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Register for Restoura</h2>
                {registrationSuccess ? (
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-6">Registration Successful</h1>
                        <p>Thank you for registering!</p>
                        <button
                            onClick={handleOnboardingNavigation}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 mt-4"
                        >
                            Continue to Onboarding
                        </button>
                    </div>
                ) : (
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

                        {/* Password Input with FontAwesome Icon */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={passwordVisible ? 'text' : 'password'}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                                </span>
                            </div>
                        </div>

                        {/* Confirm Password Input with FontAwesome Icon */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={confirmPasswordVisible ? faEye : faEyeSlash} />
                                </span>
                            </div>
                        </div>

                        {/* Role selection */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required 
                            >
                                <option value="" disabled>Select Role</option> 
                                <option value="customer">Customer</option>
                                <option value="vendor">Vendor</option>
                            </select>
                        </div>

                        {/* Register button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Register
                        </button>

                        <div className="text-center mt-4">
                            <p>
                                Already have an account?{' '}
                                <a href="/login" className="text-indigo-600 hover:underline">
                                    Login
                                </a>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Register;
