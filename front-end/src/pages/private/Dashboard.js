import { useNavigate } from 'react-router-dom';
import '../../styles/contact.css';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../api/axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRef, useEffect, useState } from 'react';

function Dashboard() {
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    const logout = async() => {
        try {
            await axios.post('/logout', {}, {withCredentials: true});
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            setAccessToken(null);
            navigate('/');
        }
    };

    const headerRef = useRef();
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (!headerRef.current) return;
            setHeaderHeight(headerRef.current.clientHeight);
        };

        updateHeight();
        
        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(headerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className='default-outer-div'>
            <Header ref={headerRef} />

            <div style={{flex: '1 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: `${headerHeight}px`}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <p className='mb-4'>Dashboard</p>

                    <button type="button" className="btn btn-outline-primary mb-3" style={{width: '100%'}} onClick={() => navigate('/edit-gallery')}>
                        <p className='text'>Gallery</p>
                    </button>

                    <button type="button" className="btn btn-outline-secondary mb-3" style={{width: '100%'}} onClick={() => navigate('/edit-slideshow')}>
                        <p className='text'>Slideshow</p>
                    </button>

                    <button type="button" className="btn btn-outline-success mb-3" style={{width: '100%'}} onClick={() => navigate('/edit-about')}>
                        <p className='text'>About</p>
                    </button>

                    <button type="button" className="btn btn-outline-info mb-3" style={{width: '100%'}} onClick={() => navigate('/edit-workshops')}>
                        <p className='text'>Workshops</p>
                    </button>

                    <button type="button" className="btn btn-outline-danger" style={{width: '100%'}} onClick={logout}>
                        <p className='text'>Log out</p>
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;