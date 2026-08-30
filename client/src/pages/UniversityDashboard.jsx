import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

function UniversityDashboard() {
    const { user } = useContext(AuthContext);
    const [challenges, setChallenges] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const cRes = await api.get('/challenges');
            setChallenges(cRes.data);
            const pRes = await api.get('/projects');
            setProjects(pRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    const acceptChallenge = async (ch) => {
        try {
            await api.post('/projects', {
                challengeId: ch._id,
                universityId: user?._id || '60d0fe4f5311236168a109ca', // using spoofed ID fallback for demo if auth not connected yet
                title: `Project: ${ch.title}`,
                description: `Solving ${ch.title} challenge.`
            });
            alert('Challenge Accepted, Project Created!');
            loadData();
        } catch (err) {
            alert('Error accepting challenge');
        }
    };

    return (
        <div className="p-8 bg-govGray min-h-screen">
            <h1 className="text-3xl font-bold text-govBlue mb-6">University Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="glass-card shadow border rounded-lg bg-white p-6">
                    <h2 className="text-2xl font-bold mb-4">Pending Selected Challenges</h2>
                    {challenges.length === 0 && <p className="text-gray-500 text-sm">No pending challenges currently.</p>}
                    {challenges.map(c => (
                        <div key={c._id} className="border-l-4 border-govOrange p-4 bg-gray-50 rounded shadow-sm mb-4">
                            <h3 className="text-lg font-bold">{c.title}</h3>
                            <p className="text-sm text-gray-600 my-2">{c.description}</p>
                            <button
                                onClick={() => acceptChallenge(c)}
                                className="bg-govBlue text-white px-4 py-2 text-sm rounded mt-2 hover:bg-blue-900 transition flex items-center gap-2">
                                Accept & Create Project
                            </button>
                        </div>
                    ))}
                </div>

                <div className="glass-card shadow border rounded-lg bg-white p-6">
                    <h2 className="text-2xl font-bold mb-4">Active Projects</h2>
                    {projects.length === 0 && <p className="text-gray-500 text-sm">No active projects yet.</p>}
                    {projects.map(p => (
                        <div key={p._id} className="border p-4 rounded shadow-sm mb-4 bg-gray-50">
                            <h3 className="text-lg font-bold text-success">{p.title}</h3>
                            <p className="text-sm text-gray-600 my-1">{p.description}</p>
                            <div className="mt-2">
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded">Status: {p.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default UniversityDashboard;
