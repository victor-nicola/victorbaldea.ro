import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import '../styles/about.css';
import { BASE_URL } from '../api/axios';

function About() {
    const navbarRef = useRef();
    const wrapperRef = useRef();
    const [menuVisibility, setMenuVisible] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);
    
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

    return (
        <div style={{overflowX: 'hidden'}} className='default-outer-div'>
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
            
            <div className="pe-5 d-none d-special-block about-holder py-4" style={{top: `${navbarHeight}px`}}>
                <div className="row ps-5">
                    <div className="col-6">
                        <div className="float-end center-in-col">
                            <p className="about-text m-0">
                                I work as a doctor in the field of Gastroenterology and have always been attracted by images.
                                My passion for travelling, mountaineering and the wilderness have played an important role
                                in becoming a photographer. From high school I started learning about photography while studying
                                the works of Ansel Adams, Charlie Waite and Marc Adamus, which are my biggest inspiration.
                                I bought my first camera in 2008 and since then I learned a lot about photography while following
                                the works of other photographers and through intensive practice. The first years I made a lot of
                                mistakes but from 2012, after four years of intensive research I approached photography more seriously.
                            </p>
                            <p className="about-text">
                                The purpose of this website is to offer a visual introduction to my work, giving the
                                viewers the possibility of seeing different places from my country and around the
                                world through my eyes.
                            </p>
                            <p className="about-text">
                                We live in a digital world where we are bombarded by billions of pictures every day
                                and get to experience many viewpoints of the same subjects, therefore it is difficult to
                                capture an iconic image. I approach landscape photography as a form of art and
                                before pressing the camera shutter I know in my mind how I want the final image to
                                look. I always try through my photography to capture and transmit the feelings
                                I experienced when pressing the camera shutter and I am constantly working towards
                                improving myself as a photographer. As both with medicine and photography you
                                can never reach perfection, and perseverance has always been my guidance.
                                The photos that can be viewed on this website were taken from 2012 until now and
                                are the results of 10 years of hard work. In this period, I captured a lot of images, but
                                I strive to show only my best and most representative work.
                            </p>
                            <div style={{alignItems: 'center', marginTop: '20px'}}>
                                <p className="about-title">My Equipment:</p>
                                <p className="about-text m-0">Camera: Nikon Z8 + 3leggedthing L bracket</p>
                                <p className="about-text m-0">Lenses:</p>
                                <p className="about-text m-0">- Nikkor Z 14-28mm f2.8S</p>
                                <p className="about-text m-0">- Nikkor Z 24-70mm f2.8S</p>
                                <p className="about-text m-0">- Nikkor Z 70-200mm f2.8S</p>
                                <p className="about-text m-0">- Nikkor Z 180-600mm f5.6-6.3 VR</p>
                                <p className="about-text m-0">- Nikkor Z 50mm f1.2S</p>
                                <p className="about-text m-0">- Sigma 14 mm f1.4 + ETZ adapter</p>
                                <p className="about-text m-0">Tripod: Leofoto Ranger ls-365CEX, Gitzo 1545T series 1 Traveler</p>
                                <p className="about-text m-0">Tripod head: Gitzo GH1382TQD, Really Right Stuff BH-55, Leofoto Vh-30R</p>
                                <p className="about-text m-0">Filters:</p>
                                <p className="about-text m-0">- NiSi S6 150 mm filter holder and ND 6 stop, ND 10 stop</p>
                                <p className="about-text m-0">- NiSi Medium grad 3 stop</p>
                                <p className="about-text m-0">- NiSi Soft grad 2 stop filters</p>
                                <p className="about-text m-0">- NiSi Enhanced Landscape CPL</p>
                                <p className="about-text m-0">- Maven 82 mm Magnetic Filters set ND + CPL</p>
                                <p className="about-text m-0">- Kase Revolution 112 mm Magnetic Filters set ND + CPL</p>
                                <p className="about-text m-0">Star tracker: MoveShootMove</p>
                                <p className="about-text m-0">Backpack: Shimoda Action X50 v2, Lowepro PhotoSport PRO 70L AW III S-M</p>
                                <p className="about-text m-0">Software: Adobe Photoshop, Adobe Lightroom, Luminar Neo, Starry LandscapeStacker</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <img src={`${BASE_URL}/images/poza-about.png`} className="center-in-col about-image" alt='Victor Baldea' />
                    </div>
                </div>
            </div>
            
            <div className="container-fluid d-special-none about-holder pt-5 pb-5">
                
                <img src={`${BASE_URL}/images/poza-about.png`} className="about-image center-horizontal-relative" alt='Victor Baldea' />
            
                <div className="center-horizontal-relative ps-3 pe-3">
                    <p className="about-text">
                        I work as a doctor in the field of Gastroenterology and have always been attracted by images.
                        My passion for travelling, mountaineering and the wilderness have played an important role
                        in becoming a photographer. From high school I started learning about photography while studying
                        the works of Ansel Adams, Charlie Waite and Marc Adamus, which are my biggest inspiration.
                        I bought my first camera in 2008 and since then I learned a lot about photography while following
                        the works of other photographers and through intensive practice. The first years I made a lot of
                        mistakes but from 2012, after four years of intensive research I approached photography more seriously.
                    </p>
                    <p className="about-text">
                        The purpose of this website is to offer a visual introduction to my work, giving the
                        viewers the possibility of seeing different places from my country and around the
                        world through my eyes.
                    </p>
                    <p className="about-text">
                        We live in a digital world where we are bombarded by billions of pictures every day
                        and get to experience many viewpoints of the same subjects, therefore it is difficult to
                        capture an iconic image. I approach landscape photography as a form of art and
                        before pressing the camera shutter I know in my mind how I want the final image to
                        look. I always try through my photography to capture and transmit the feelings
                        I experienced when pressing the camera shutter and I am constantly working towards
                        improving myself as a photographer. As both with medicine and photography you
                        can never reach perfection, and perseverance has always been my guidance.
                        The photos that can be viewed on this website were taken from 2012 until now and
                        are the results of 10 years of hard work. In this period, I captured a lot of images, but
                        I strive to show only my best and most representative work.
                    </p>
                    <div style={{alignItems: 'center', marginTop: '20px'}}>
                        <p className="about-title">My Equipment:</p>
                        <p className="about-text m-0">Camera: Nikon Z8 + 3leggedthing L bracket</p>
                        <p className="about-text m-0">Lenses:</p>
                        <p className="about-text m-0">- Nikkor Z 14-28mm f2.8S</p>
                        <p className="about-text m-0">- Nikkor Z 24-70mm f2.8S</p>
                        <p className="about-text m-0">- Nikkor Z 70-200mm f2.8S</p>
                        <p className="about-text m-0">- Nikkor Z 180-600mm f5.6-6.3 VR</p>
                        <p className="about-text m-0">- Nikkor Z 50mm f1.2S</p>
                        <p className="about-text m-0">- Sigma 14 mm f1.4 + ETZ adapter</p>
                        <p className="about-text m-0">Tripod: Leofoto Ranger ls-365CEX, Gitzo 1545T series 1 Traveler</p>
                        <p className="about-text m-0">Tripod head: Gitzo GH1382TQD, Really Right Stuff BH-55, Leofoto Vh-30R</p>
                        <p className="about-text m-0">Filters:</p>
                        <p className="about-text m-0">- NiSi S6 150 mm filter holder and ND 6 stop, ND 10 stop</p>
                        <p className="about-text m-0">- NiSi Medium grad 3 stop</p>
                        <p className="about-text m-0">- NiSi Soft grad 2 stop filters</p>
                        <p className="about-text m-0">- NiSi Enhanced Landscape CPL</p>
                        <p className="about-text m-0">- Maven 82 mm Magnetic Filters set ND + CPL</p>
                        <p className="about-text m-0">- Kase Revolution 112 mm Magnetic Filters set ND + CPL</p>
                        <p className="about-text m-0">Star tracker: MoveShootMove</p>
                        <p className="about-text m-0">Backpack: Shimoda Action X50 v2, Lowepro PhotoSport PRO 70L AW III S-M</p>
                        <p className="about-text m-0">Software: Adobe Photoshop, Adobe Lightroom, Luminar Neo, Starry LandscapeStacker</p>
                    </div>
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

export default About;