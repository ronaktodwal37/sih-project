import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

function SubmitChallenge() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const nextStep = (e) => {
        e.preventDefault();
        setStep(s => s + 1);
    };

    const prevStep = (e) => {
        e.preventDefault();
        setStep(s => s - 1);
    };

    const onSubmit = async (data) => {
        try {
            await api.post('/challenges', data);
            alert('Challenge submitted successfully!');
            navigate('/');
        } catch (err) {
            alert('Error submitting challenge');
            console.error(err);
        }
    };

    if (!user || user.role !== 'Citizen') {
        return (
            <div className="min-h-[85vh] p-8 flex justify-center items-center bg-govGray">
                <div className="text-center glass-card bg-white p-8">
                    <h2 className="text-red-500 text-2xl font-bold mb-4">Access Restricted</h2>
                    <p className="text-gray-600 mb-6">You must be logged in as a Citizen to submit a civic challenge.</p>
                    <button onClick={() => navigate('/login')} className="bg-govBlue text-white px-6 py-2 rounded shadow hover:bg-blue-900">
                        Navigate to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-govGray p-8 flex justify-center">
            <div className="glass-card w-full max-w-2xl bg-white shadow rounded p-8">
                <h1 className="text-3xl font-bold text-govBlue mb-6">Submit a Societal Challenge</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {step === 1 && (
                        <div className="space-y-4 animate-fade-in">
                            <h2 className="text-xl font-semibold">Step 1: Challenge Details</h2>
                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <input {...register("title", { required: true })} className="w-full p-2 border rounded" placeholder="E.g. Water Contamination" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <textarea {...register("description", { required: true })} className="w-full p-2 border rounded" rows="4" placeholder="Detail the problem here..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Category</label>
                                <select {...register("category", { required: true })} className="w-full p-2 border rounded">
                                    <option value="">Select Category</option>
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Water">Water Management</option>
                                    <option value="Education">Education</option>
                                    <option value="Healthcare">Healthcare</option>
                                </select>
                            </div>
                            <button onClick={nextStep} className="bg-govBlue text-white px-4 py-2 rounded mt-4 hover:bg-blue-900 transition-colors">Next</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-fade-in">
                            <h2 className="text-xl font-semibold">Step 2: Location & Impact</h2>
                            <div>
                                <label className="block text-sm font-medium">District</label>
                                <input {...register("location.district", { required: true })} className="w-full p-2 border rounded" placeholder="E.g. Ranchi" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Urgency</label>
                                <select {...register("urgency")} className="w-full p-2 border rounded">
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button onClick={prevStep} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors">Back</button>
                                <button type="submit" className="bg-success text-white px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors shadow">Submit Challenge</button>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}

export default SubmitChallenge;
