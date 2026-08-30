import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SubmitChallenge from './pages/SubmitChallenge';
import UniversityDashboard from './pages/UniversityDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div className="min-h-[80vh] flex flex-col justify-center items-center text-center p-8 bg-govGray">
              <div className="max-w-4xl glass-card bg-white shadow-lg rounded-2xl p-12 border-t-8 border-govOrange">
                <h1 className="text-4xl md:text-5xl text-govBlue font-extrabold mb-6 leading-tight">
                  Jharkhand Societal Innovation Portal
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Connect community problems directly with university innovators, corporate funding, and government frameworks to deploy measurable real-world solutions.
                </p>
                <div className="flex gap-4 justify-center">
                  <a href="/login" className="bg-govOrange text-govBlue px-8 py-3 rounded-full font-bold hover:bg-orange-300 transition-colors shadow-md">
                    Access Portal
                  </a>
                  <a href="/government/dashboard" className="bg-white text-govBlue border-2 border-govBlue px-8 py-3 rounded-full font-bold hover:bg-govBlue hover:text-white transition-colors shadow-sm">
                    View Public Impact
                  </a>
                </div>
              </div>
            </div>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/citizen/challenges/new" element={<SubmitChallenge />} />
          <Route path="/university/dashboard" element={<UniversityDashboard />} />
          <Route path="/government/dashboard" element={<GovernmentDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
