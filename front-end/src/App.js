import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Workshops from './pages/public/Workshops';
import Contact from './pages/public/Contact';
import LogIn from './pages/public/LogIn';
import Dashboard from './pages/private/Dashboard';
import RedirectIfAuth from './wrappers/RedirectIfAuth';
import RequireAuth from './wrappers/RequireAuth';
import EditAbout from './pages/private/EditAbout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoadingPage from './pages/public/LoadingPage';
import EditWorkshops from './pages/private/EditWorkshops';
import EditSlideshow from './pages/private/EditSlideshow';
import EditGalleries from './pages/private/EditGalleries';
import Gallery from './pages/public/Gallery';
import OpenedGallery from './pages/public/OpenedGallery';
import NotFound from './pages/public/NotFound';
import EditGallery from './pages/private/EditGallery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/custom-defaults.css';
import './styles/text.css';

function AppRoutes() {
    const { loading } = useAuth();

    if (loading) return <LoadingPage />;
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:galleryName" element={<OpenedGallery />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/404" element={<NotFound />} />
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
            <Route path="/edit-about" element={
                <RequireAuth>
                    <EditAbout />
                </RequireAuth>
            } />
            <Route path="/edit-workshops" element={
                <RequireAuth>
                    <EditWorkshops />
                </RequireAuth>
            } />
            <Route path="/edit-slideshow" element={
                <RequireAuth>
                    <EditSlideshow />
                </RequireAuth>
            } />
            <Route path="/edit-gallery" element={
                <RequireAuth>
                    <EditGalleries />
                </RequireAuth>
            } />
            <Route path="/edit-gallery/:galleryName" element={
                <RequireAuth>
                    <EditGallery />
                </RequireAuth>
            } />
            <Route path="*" element={<NotFound />} />
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
