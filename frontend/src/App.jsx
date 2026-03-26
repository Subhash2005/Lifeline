import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Pages
import Home from './pages/Home';
import CampaignList from './pages/CampaignList';
import CampaignDetail from './pages/CampaignDetail';
import CreateCampaign from './pages/CreateCampaign';
import EmergencyCampaign from './pages/EmergencyCampaign';
import VolunteerPage from './pages/VolunteerPage';
import HospitalMarketplace from './pages/HospitalMarketplace';
import Leaderboard from './pages/Leaderboard';
import Dashboard from './pages/Dashboard';
import CSRDashboard from './pages/CSRDashboard';
import LedgerPage from './pages/LedgerPage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white flex flex-col selection:bg-primary-100 selection:text-primary-900">
          <Toaster 
            position="top-right" 
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#ffffff',
                    color: '#0f172a',
                    borderRadius: '2rem',
                    padding: '1rem 1.5rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                }
            }}
          />
          <Navbar />
          <main className="flex-grow w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campaigns" element={<CampaignList />} />
              <Route path="/campaign/:id" element={<CampaignDetail />} />
              <Route path="/create" element={<CreateCampaign />} />
              <Route path="/emergency" element={<EmergencyCampaign />} />
              <Route path="/volunteers" element={<VolunteerPage />} />
              <Route path="/hospitals" element={<HospitalMarketplace />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/csr" element={<CSRDashboard />} />
              <Route path="/ledger" element={<LedgerPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
