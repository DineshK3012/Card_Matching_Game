import { useRecoilState } from 'recoil';
import { authAtom } from '../recoil/authAtom';
import { login, logout, loadUser, register } from '../api/auth';
import { toast } from 'react-toastify';
import { useState } from 'react';

const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authAtom);
    const [loading, setLoading] = useState(false);

    // Handle login
    const handleLogin = async (credentials) => {
        setLoading(true);
        try {
            const { data } = await login(credentials);
            setAuth({ isAuthenticated: true, user: data.user });
            toast.success("Login successful!");
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`${errorMessage}`);
        }finally {
            setLoading(false);  // Set loading to false after the user is fetched
        }
    };

    // Handle logout
    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setAuth({ isAuthenticated: false, user: null });
            toast.success("Logout successful!");
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`${errorMessage}`);
        }
    };

    // Handle registration
    const handleRegister = async (userData) => {
        setLoading(true);
        try {
            const { data } = await register(userData);
            setAuth({ isAuthenticated: true, user: data.user });
            toast.success("Registration successful!");
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`${errorMessage}`);
        }finally {
            setLoading(false);  // Set loading to false after the user is fetched
        }
    };

    // Load current user
    const loadCurrentUser = async () => {
        setLoading(true);
        try {
            const { data } = await loadUser();
            setAuth({ isAuthenticated: true, user: data });
        } catch (error) {
            setAuth({ isAuthenticated: false, user: null });
        } finally {
            setLoading(false);  // Set loading to false after the user is fetched
        }
    };

    return { auth, loading, handleLogin, handleLogout, handleRegister, loadCurrentUser };
};

export default useAuth;
