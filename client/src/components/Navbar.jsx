import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-govBlue text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
            <div className="font-bold text-xl ml-4">
                {/* <Link to="/" className="flex items-center gap-2">
                    <span>Jharkhand Innovation Portal</span>
                </Link> */}
            </div>
            <div className="space-x-6 mr-4 flex items-center">
                {user ? (
                    <>
                        <span className="text-sm font-semibold opacity-80 border-r pr-6 border-white/20">
                            Welcome, {user.name} ({user.role})
                        </span>

                        {user.role === 'Citizen' && (
                            <Link to="/citizen/challenges/new" className="hover:text-govOrange transition-colors">Submit Challenge</Link>
                        )}

                        {user.role === 'University' && (
                            <Link to="/university/dashboard" className="hover:text-govOrange transition-colors">University Dashboard</Link>
                        )}

                        <Link to="/government/dashboard" className="hover:text-govOrange transition-colors">Analytics Data</Link>

                        <button
                            onClick={logout}
                            className="bg-red-500/90 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-600 transition-colors shadow-sm ml-4"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/government/dashboard" className="hover:text-govOrange transition-colors">Public Analytics</Link>
                        <Link to="/login" className="bg-govOrange text-govBlue px-5 py-1.5 font-bold rounded-full hover:bg-orange-300 transition-colors">
                            Login to Portal
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

// export default Navbar;
