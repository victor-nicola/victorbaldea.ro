import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import '../../styles/contact.css';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../api/axios';

function Dashboard() {
    const navbarRef = useRef();
    const wrapperRef = useRef();
    const [menuVisibility, setMenuVisible] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);

    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    const closeMenu = () => setMenuVisible(false);

    const handleBackdropClick = (e) => {
        if (e.target.id === 'navbarSupportedContent') {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        if (menuVisibility) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuVisibility]);

    useEffect(() => {
        const updateHeight = () => {
            if (navbarRef.current && wrapperRef.current) {
                wrapperRef.current.style.height = `${navbarRef.current.clientHeight}px`;
                setNavbarHeight(navbarRef.current.clientHeight);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => window.removeEventListener('resize', updateHeight);
    }, []);

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

    return (
        <div className='default-outer-div'>
            <div ref={wrapperRef} className="nav-wrapper">
                <nav ref={navbarRef} className="d-flex justify-content-center navbar navbar-expand-lg navbar-dark fixed-top border-bottom">
                    <div className="container-fluid">
                        <div className="d-none d-lg-block collapse navbar-collapse">
                            <ul className="navbar-nav ms-lg-5 ps-lg-5">
                                <li className="nav-item"><Link to="/" className="nav-link"><p className="headerOption">Home</p></Link></li>
                                <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="/about" className="nav-link"><p className="headerOption">About</p></Link></li>
                                <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="/gallery" className="nav-link"><p className="headerOption">Gallery</p></Link></li>
                            </ul>
                        </div>
                        <Link to="/" className="navbar-left ms-3 mx-auto"><img src="/res/logo.png" className="logo" alt="logo" /></Link>
                        <button onClick={() => setMenuVisible(menuVisibility => !menuVisibility)} className="navbar-toggler border-0" type="button" aria-expanded={menuVisibility} aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ms-lg-auto me-lg-5 pe-lg-5">
                                <li className="nav-item"><Link to="/workshops" className="nav-link"><p className="headerOption">Workshops</p></Link></li>
                                <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="/prints" className="nav-link disabled"><p className="headerOption">Prints</p></Link></li>
                                <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="/contact" className="nav-link"><p className="headerOption">Contact</p></Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className={`mobile-menu ${menuVisibility ? 'open' : ''}`} id="navbarSupportedContent" onClick={handleBackdropClick} style={{paddingTop: `${navbarHeight}px`}}>
                    <ul className="navbar-nav" style={{alignSelf: 'center'}}>
                        <li className="nav-item"><Link to="/" className="nav-link" onClick={closeMenu}><p className="headerOption">Home</p></Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link" onClick={closeMenu}><p className="headerOption">About</p></Link></li>
                        <li className="nav-item"><Link to="/gallery" className="nav-link" onClick={closeMenu}><p className="headerOption">Gallery</p></Link></li>
                        <li className="nav-item"><Link to="/workshops" className="nav-link" onClick={closeMenu}><p className="headerOption">Workshops</p></Link></li>
                        <li className="nav-item"><Link to="/prints" className="nav-link disabled" onClick={closeMenu}><p className="headerOption">Prints</p></Link></li>
                        <li className="nav-item"><Link to="/contact" className="nav-link" onClick={closeMenu}><p className="headerOption">Contact</p></Link></li>
                    </ul>
                </div>
            </div>

            <div style={{flex: '1 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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

            <footer className="text-center text-white border-top">
                <div className="text-center p-3">
                    <p className="text-white">&copy;{(new Date().getFullYear())} All rights reserved: Victor B&#226;ldea</p>
                </div>
            </footer>
        </div>
    );
}

export default Dashboard;