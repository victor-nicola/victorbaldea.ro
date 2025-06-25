import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Workshops from './pages/public/Workshops';
import Contact from './pages/public/Contact';
import LogIn from './pages/public/LogIn';
import Dashboard from './pages/private/Dashboard';
import RedirectIfAuth from './wrappers/RedirectIfAuth';
import RequireAuth from './wrappers/RequireAuth';
import { AuthProvider, useAuth } from './contexts/AuthContext';


function AppRoutes() {
  const { loading } = useAuth();

  if (loading) return;
  
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/log-in" element={
          <RedirectIfAuth>
          <LogIn />
          </RedirectIfAuth>
        } />
        <Route path="/dashboard" element={
          <RequireAuth>
          <Dashboard />
          </RequireAuth>
        } />
      </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
