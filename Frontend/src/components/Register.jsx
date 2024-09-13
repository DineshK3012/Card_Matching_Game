import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Adjust the path as needed

const Register = () => {
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });
    const navigate = useNavigate();
    const { handleRegister } = useAuth(); // To log in the user after registration

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await handleRegister(formData);
    }

    return (
        <div className="lg:w-[30%] md:w-[50%] w-[70%] my-4 mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="w-full p-3 border-gray-200 rounded-lg outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-3 border-gray-200 rounded-lg outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full p-3 border-gray-200 rounded-lg outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white w-full p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Register
                </button>
            </form>
            <div className="mt-4 text-center">
                <p>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
