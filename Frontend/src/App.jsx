import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import useAuth from "./hooks/useAuth.js";
import React, { useEffect } from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import GamePage from "./pages/GamePage.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import Header from "./components/Header.jsx";

export default function App() {
    const { auth, loadCurrentUser, handleLogout } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            await loadCurrentUser();
        }

        fetchUser();
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-blue-100 flex flex-col">
                    <Header auth={auth} handleLogout={handleLogout}/>

                    <Routes>
                        <Route path="/" element={auth.isAuthenticated ? <GamePage /> : <Register />} />
                        <Route path="/leaderboard" element={auth.isAuthenticated ? <Leaderboard /> : <Register />} />
                        <Route path="/register" element={auth.isAuthenticated ? <Navigate to="/" /> : <Register />} />
                        <Route path="/login" element={auth.isAuthenticated ? <Navigate to="/" /> : <Login />} />
                    </Routes>
            </div>
        </Router>
    );
}
