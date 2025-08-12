import { useRef, useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import '../styles/header.css';

const Header = forwardRef((props, ref) => {
    const [menuVisibility, setMenuVisible] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);
    
    const internalNavbarRef = useRef();
    
    const setRefs = (node) => {
        internalNavbarRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    };

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
            if (internalNavbarRef.current) {
                setNavbarHeight(internalNavbarRef.current.clientHeight);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => window.removeEventListener('resize', updateHeight);
    }, []);
    
    return (
        <>
            <nav ref={setRefs} className="navbar navbar-expand-lg navbar-dark fixed-top border-bottom">
                <div className="d-none d-lg-block collapse navbar-collapse">
                    <ul className="navbar-nav ms-lg-2 ms-xl-5 ps-xl-5">
                        <li className="nav-item"><Link to="/" className="nav-link"><p className="headerOption">Home</p></Link></li>
                        <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="/about" className="nav-link"><p className="headerOption">About</p></Link></li>
                        <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="/gallery" className="nav-link"><p className="headerOption">Gallery</p></Link></li>
                    </ul>
                </div>
                <Link to="/" className="navbar-left mx-auto"><img src="/res/logo.png" className="logo" alt="logo" /></Link>
                <button onClick={() => setMenuVisible(m => !m)} className="navbar-toggler border-0" type="button" aria-expanded={menuVisibility} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="d-none d-lg-block collapse navbar-collapse">
                    <ul className="navbar-nav ms-lg-auto me-lg-2 me-xl-5 pe-xl-5">
                        <li className="nav-item"><Link to="/workshops" className="nav-link"><p className="headerOption">Workshops</p></Link></li>
                        <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="/prints" className="nav-link disabled"><p className="headerOption">Prints</p></Link></li>
                        <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="/contact" className="nav-link"><p className="headerOption">Contact</p></Link></li>
                    </ul>
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
        </>
    );
});

export default Header;