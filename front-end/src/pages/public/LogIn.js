import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import '../../styles/logIn.css';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function LogIn() {
    const navbarRef = useRef();
    const wrapperRef = useRef();
    const [menuVisibility, setMenuVisible] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);
    
    const [password, setPassword] = useState('');
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    const closeMenu = () => setMenuVisible(false);

    const handleBackdropClick = (e) => {
        if (e.target.id === 'navbarSupportedContent') {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.body.style.overflow = menuVisibility ? 'hidden' : 'unset';
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

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login',
                {password: password},
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                }
            );
            
            const accessToken = response?.data?.accessToken;
            setAccessToken(accessToken);

            setPassword('');
            // alert('logged in');
            navigate('/dashboard');

        } catch (err) {
            setPassword('');

            if (!err?.response) {
                alert('Serverul nu a răspuns');
            } else if (err.response?.status === 400) {
                alert('Parola incorectă');
            } else {
                alert('Logarea nu s-a putut efectua');
            }
        }
    };

    return (
        <div style={{ overflowX: 'hidden' }} className="default-outer-div">
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
                        <button onClick={() => setMenuVisible(menu => !menu)} className="navbar-toggler border-0" type="button" aria-expanded={menuVisibility} aria-label="Toggle navigation">
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
                <div className={`mobile-menu ${menuVisibility ? 'open' : ''}`} id="navbarSupportedContent" onClick={handleBackdropClick} style={{ paddingTop: `${navbarHeight}px` }}>
                    <ul className="navbar-nav" style={{ alignSelf: 'center' }}>
                        <li className="nav-item"><Link to="/" className="nav-link" onClick={closeMenu}><p className="headerOption">Home</p></Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link" onClick={closeMenu}><p className="headerOption">About</p></Link></li>
                        <li className="nav-item"><Link to="/gallery" className="nav-link" onClick={closeMenu}><p className="headerOption">Gallery</p></Link></li>
                        <li className="nav-item"><Link to="/workshops" className="nav-link" onClick={closeMenu}><p className="headerOption">Workshops</p></Link></li>
                        <li className="nav-item"><Link to="/prints" className="nav-link disabled" onClick={closeMenu}><p className="headerOption">Prints</p></Link></li>
                        <li className="nav-item"><Link to="/contact" className="nav-link" onClick={closeMenu}><p className="headerOption">Contact</p></Link></li>
                    </ul>
                </div>
            </div>

            <div className="container d-flex justify-content-center align-items-center" style={{ flex: 1 }}>
                <div style={{width: 'min(100%, 350px)'}}>
                    <p className="text-center mb-2 text-white title">Log In</p>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <p htmlFor="password" className="form-label text">Password</p>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <button type='button' className="login-btn" onClick={handleLogin}>
                            <p className='text'>Log In</p>
                        </button>
                    </form>
                </div>
            </div>

            <footer className="text-center text-white border-top mt-5">
                <div className="text-center p-3">
                    <p className="text-white mb-0">&copy;{(new Date().getFullYear())} All rights reserved: Victor B&#226;ldea</p>
                </div>
            </footer>
        </div>
    );
}

export default LogIn;
