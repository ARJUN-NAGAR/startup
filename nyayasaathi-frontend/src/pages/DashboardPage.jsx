// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useVoiceRecognition from '../hooks/useVoiceRecognition'; // <-- IMPORT THE HOOK
import { MicrophoneIcon, DocumentChartBarIcon, ArrowRightOnRectangleIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const StatusBadge = ({ status }) => {
    // ... (This component remains the same)
    const statusClasses = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Submitted: 'bg-blue-100 text-blue-800',
        Escalated: 'bg-purple-100 text-purple-800',
        Resolved: 'bg-green-100 text-green-800',
    };
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};


const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');

    // --- VOICE RECOGNITION STATE ---
    const { text, isListening, startListening, hasRecognitionSupport } = useVoiceRecognition();
    const [issueDescription, setIssueDescription] = useState('');

    // Update the text area when the voice recognition result changes
    useEffect(() => {
        setIssueDescription(text);
    }, [text]);

    const fetchIssues = async () => {
        try {
            const { data } = await api.get('/citizens/issues');
            setIssues(data.issues);
        } catch (err) {
            setError('Failed to load your cases. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    // --- FUNCTION TO SUBMIT THE NEW CASE ---
    const handleCaseSubmit = async () => {
        if (!issueDescription) {
            setSubmitStatus({ type: 'error', message: 'Description cannot be empty.' });
            return;
        }
        setSubmitStatus({ type: 'loading', message: 'Submitting your case...' });
        try {
            // This matches the `citizensRoutes.js` endpoint
            await api.post('/citizens/issues', {
                issueType: 'Other', // You can add a dropdown/modal to select this
                description: issueDescription,
                // kiosk and other fields can be added later
            });
            setSubmitStatus({ type: 'success', message: 'Case submitted successfully!' });
            setIssueDescription(''); // Clear the textarea
            fetchIssues(); // Refresh the list of issues
        } catch (err) {
            setSubmitStatus({ type: 'error', message: 'Failed to submit case. Please try again.' });
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                     <h1 className="text-2xl font-bold text-brand-primary">Nyaya Saathi Dashboard</h1>
                     <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Welcome, {user?.userId}!</span>
                        <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700 font-semibold">
                            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-1"/>
                            Logout
                        </button>
                     </div>
                </div>
            </header>

            <main className="container mx-auto p-6">
                {/* --- UPDATED VOICE ACTION CARD --- */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-3xl font-bold text-brand-dark mb-4">Start a New Case</h2>
                    
                    {!hasRecognitionSupport && (
                        <p className="text-red-500">Sorry, your browser does not support voice recognition.</p>
                    )}
                    
                    {hasRecognitionSupport && (
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <button
                                onClick={startListening}
                                disabled={isListening}
                                className={`rounded-full p-5 shadow-lg transition-transform transform hover:scale-105 ${
                                    isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-brand-primary text-white'
                                }`}
                            >
                                <MicrophoneIcon className="w-10 h-10" />
                            </button>
                            <div className="w-full">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    {isListening ? "Listening..." : "Click the mic or type your issue below:"}
                                </label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
                                    value={issueDescription}
                                    onChange={(e) => setIssueDescription(e.target.value)}
                                    placeholder="e.g., 'My pension has not arrived for three months...'"
                                />
                                <div className="mt-2 flex justify-end items-center">
                                    {submitStatus && (
                                        <p className={`text-sm mr-4 ${submitStatus.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                                            {submitStatus.message}
                                        </p>
                                    )}
                                    <button
                                        onClick={handleCaseSubmit}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-secondary hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                                    >
                                        Submit Case
                                        <PaperAirplaneIcon className="ml-2 -mr-1 h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* My Legal Issues */}
                <div className="mt-10">
                    {/* ... (This section remains the same) ... */}
                    <h3 className="text-2xl font-bold text-brand-dark mb-4 flex items-center">
                        <DocumentChartBarIcon className="w-7 h-7 mr-2 text-brand-secondary"/>
                        My Cases
                    </h3>
                    {loading && <p>Loading your cases...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    
                    {!loading && issues.length === 0 && (
                        <div className="bg-white text-center p-8 rounded-lg shadow">
                            <p className="text-gray-600">You haven't filed any cases yet.</p>
                            <p className="mt-2 text-gray-500">Use the microphone button above to get started.</p>
                        </div>
                    )}
                    
                    <div className="flex flex-col gap-4">
                        {issues.map(issue => (
                            <div key={issue._id} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-brand-secondary">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-lg text-brand-dark">{issue.issueType}</h4>
                                        <p className="text-gray-600 mt-1">{issue.description}</p>
                                    </div>
                                    <StatusBadge status={issue.status} />
                                </div>
                                <p className="text-xs text-gray-400 mt-3">
                                    Filed on: {new Date(issue.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;