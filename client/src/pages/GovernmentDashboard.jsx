import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function GovernmentDashboard() {
    const [data, setData] = useState(null);
    const COLORS = ['#0c2340', '#f4a261', '#2a9d8f', '#e76f51', '#264653', '#e9c46a'];

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const res = await api.get('/analytics/government');
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!data) return <div className="p-8 text-center animate-pulse">Loading Analytics...</div>;

    return (
        <div className="bg-govGray min-h-screen p-8">
            <h1 className="text-3xl font-bold text-govBlue mb-6">Government Analytics Dashboard</h1>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="glass-card bg-white shadow rounded p-6 text-center border-t-4 border-govBlue">
                    <p className="text-gray-500 text-sm">Total Challenges</p>
                    <p className="text-4xl font-bold text-govBlue">{data.kpis.totalChallenges}</p>
                </div>
                <div className="glass-card bg-white shadow rounded p-6 text-center border-t-4 border-success">
                    <p className="text-gray-500 text-sm">Active Projects</p>
                    <p className="text-4xl font-bold text-success">{data.kpis.activeProjects}</p>
                </div>
                <div className="glass-card bg-white shadow rounded p-6 text-center border-t-4 border-govOrange">
                    <p className="text-gray-500 text-sm">Universities</p>
                    <p className="text-4xl font-bold text-govOrange">{data.kpis.universitiesParticipating}</p>
                </div>
                <div className="glass-card bg-white shadow rounded p-6 text-center border-t-4 border-indigo-500">
                    <p className="text-gray-500 text-sm">Citizens Impacted</p>
                    <p className="text-4xl font-bold text-indigo-600">{data.kpis.citizensImpacted}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bar Chart - Categories */}
                <div className="glass-card bg-white shadow rounded p-6 h-80">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Challenges by Category</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.charts.categories}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#0c2340" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart - Districts */}
                <div className="glass-card bg-white shadow rounded p-6 h-80 flex flex-col items-center">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 w-full text-left">Challenges by District</h2>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={data.charts.districts}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label
                            >
                                {data.charts.districts.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mt-8 glass-card bg-white shadow rounded p-6">
                <h2 className="text-lg font-bold text-gray-700 mb-4">District Challenge Heatmap</h2>
                <p className="text-sm text-gray-500 mb-4">Interactive geographic overview of spatial challenge data density across Jharkhand.</p>
                <div className="bg-blue-50 w-full h-64 border border-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 border border-blue-300 p-2 rounded bg-white">Leaflet Map Visualization Placeholder</span>
                </div>
            </div>

        </div>
    );
}

export default GovernmentDashboard;
