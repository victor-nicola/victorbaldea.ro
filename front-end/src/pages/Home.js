import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import axios, { BASE_URL } from '../api/axios';

function Home() {
    const navbarRef = useRef();
    const wrapperRef = useRef();
    const imgRefs = useRef([]);
    const slideshowHolderRef = useRef(null);
    const textRef = useRef(null);
    const [menuVisibility, setMenuVisible] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);

    const [images, setImages] = useState([]);
    const [imgSize, setImgSize] = useState('');
    const [current, setCurrent] = useState(0);

    const setSizesSlideshow = () => {
        const slideshowHolder = slideshowHolderRef.current;
        const text = textRef.current;
        const nav = navbarRef.current;
        const images = imgRefs.current;

        if (!slideshowHolder || !text) return;

        const height = window.innerHeight - nav.clientHeight;
        const width = window.innerWidth;

        slideshowHolder.style.height = `${height}px`;
        slideshowHolder.style.width = `${width}px`;
        
        images.forEach(img => {
            if (img) {
                img.style.height = `${height}px`;
                img.style.width = `${nav.clientWidth}px`;
            }
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setSizesSlideshow();
            if (navbarRef.current && wrapperRef.current) {
                wrapperRef.current.style.height = `${navbarRef.current.clientHeight}px`;
                setNavbarHeight(navbarRef.current.clientHeight);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeMenu = () => setMenuVisible(false);

    const handleBackdropClick = (e) => {
        if (e.target.id === 'navbarSupportedContent') {
            setMenuVisible(false);
        }
    };

    // Handle body overflow when menu is open
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

    // Fetch images
    useEffect(() => {
        axios.get('/getSlideshowImages')
        .then(res => {
            if (window.innerWidth < 432) {
                setImages(res.data.mobile);
                setImgSize('mobile');
            }
            else {
                setImages(res.data.pc);
                setImgSize('pc');
            }
        })
        .catch(err => {
            console.error('Failed to fetch images:', err);
        });
    }, []);

    // Handle slideshow transitions
    useEffect(() => {
        setSizesSlideshow();
        if (images.length < 2) return;

        const delayBetween = 7000;
        const fadeDuration = 1000;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, delayBetween + fadeDuration);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div style={{overflowX: 'hidden', touchAction: 'none'}} className='default-outer-div bg-black'>
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

            <div ref={slideshowHolderRef} className="slideShow">
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={`${BASE_URL}/images/slideshow/${imgSize}/${img}`}
                        ref={el => imgRefs.current[i] = el}
                        alt=''
                        className="imageSlideShow"
                        style={{
                            opacity: i === current ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                            zIndex: i === current ? 2 : 1,
                        }}
                    />
                ))}
            </div>

            <div ref={textRef} className="container-fluid position-absolute center-vertical-absolute text-center">
                <p style={{fontFamily: "'Inconsolata', monospace"}}>View. Nature. Emotion.</p>
                <p style={{fontFamily: "'Cinzel', serif"}} className="biggerP">Victor B&#226;ldea</p>
                <button type="button" className="btn btn-outline-danger">
                    <Link to="/gallery"><p>View Gallery</p></Link>
                </button>
            </div>

            <footer className="text-center text-white border-top">
                <div className="text-center p-3">
                    <p className="text-white">&copy;{(new Date().getFullYear())} All rights reserved: Victor B&#226;ldea</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;