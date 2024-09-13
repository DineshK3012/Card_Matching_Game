import { Link } from "react-router-dom";

const Header = ({ auth, handleLogout }) => {
    return (
        <header className="bg-blue-600 text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center">
            <Link to="/" className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold">Pokemon Game</h1>
            </Link>
            <div className="flex flex-row items-center gap-2 justify-center">
                {auth.isAuthenticated && (
                    <>
                        <Link to="/leaderboard">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto">
                                Leaderboard
                            </button>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
