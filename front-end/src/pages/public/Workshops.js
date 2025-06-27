import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import '../../styles/workshops.css';
import { BASE_URL } from '../../api/axios';

function Workshops() {
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
            
            <div className="d-none d-md-block workshops-holder py-4 py-xl-0 align-content-center" style={{top: `${navbarHeight}px`}}>
                <div className="row ps-5">
                    <div className="col-6">
                        <div className="float-end center-in-col">
                            <p className="workshops-text m-0">
                                Before the development of the internet and social media we could learn about photography
                                from buying specialized magazines that were seldom available for purchase, at least in my country.
                                Currently, we are bombarded by millions of images every day when scrolling through our social media platforms
                                or different webpages, but few capture our attention for more than a few seconds and keep us engaged into admiring them.
                                I believe that is because some images can convey the feeling and the emotions that the person that captured them experienced
                                in those moments, like a piece of art. We do not have to spend time reflecting as to why we do it, we simply do it. 
                            </p>
                            <p className="workshops-text">
                                In the last years I am happy to see that photography has developed quite a lot in my country,
                                and that there are currently more than a handful of photographers who conduct workshops
                                dedicated to learning about this craft. Some people have a natural eye for understanding
                                what makes an image captivating, but this ability also comes through a lot of practice
                                and by sharing experiences with other people that share your passion.
                                I myself never learned photography from participating in workshops, but through a lot of reading,
                            researching and practicing. I never view photography as a means of capturing a beautiful image,
                                but as a way of engaging the viewer into experiencing the feelings I had when I pressed the camera shutter,
                                hopefully giving him the desire to go out and explore nature. 
                            </p>
                            <p className="workshops-text"> 
                                Before doing photography, I used to hike and travel a lot and I always wanted to capture the beautiful places I have visited,
                                a desire which prompted me in learning about photography. At first, I used to travel a lot alone because I could not find a person or a group
                                with the same mindset as myself, but lately I have been travelling quite a bit with my friends Adrian Petrisor and Ovidiu Lazar,
                                and it has been a rewarding experience. I know there are a lot of people like myself when I first started photography and hiking
                                that have difficulties in finding a group to enjoy their passions, which is part of the reason why I wanted to start doing these workshops.
                            </p>
                            <p className="workshops-text">
                                Due to the nature of my job, I do not have the time to organize small group workshops but mostly you will be able to find me
                                in the workshops organized by my friends Adrian & Ovidiu. However, if you want a small group or individual experience in hiking
                                and photography with me you can send me an email or contact through social media and maybe we can set up a 1-2-3-day tour in your desired place or a place chosen by me.
                            </p>
                            <p className="workshops-text text-center">
                                In these workshops I will teach you everything I know about how to visualize a scene and capture a beautiful image, therefore do not hesitate to contact me, if interested.
                                I do not charge extra for my participation; I only require you to pay for my accommodation and transport.
                            </p>
                        </div>
                    </div>
                    <div className="col-6">
                        <img src={`${BASE_URL}/images/workshops.jpg`} className="center-in-col workshops-image" alt=""/>
                    </div>
                </div>
            </div>
            
            <div className="container-fluid d-md-none workshops-holder py-3">
                
                <img src={`${BASE_URL}/images/workshops.jpg`} className="workshops-image center-horizontal-relative" alt=""/>
            
                <div className="center-horizontal-relative px-3">
                    <p className="workshops-text">
                        Before the development of the internet and social media we could learn about photography
                        from buying specialized magazines that were seldom available for purchase, at least in my country.
                        Currently, we are bombarded by millions of images every day when scrolling through our social media platforms
                        or different webpages, but few capture our attention for more than a few seconds and keep us engaged into admiring them.
                        I believe that is because some images can convey the feeling and the emotions that the person that captured them experienced
                        in those moments, like a piece of art. We do not have to spend time reflecting as to why we do it, we simply do it. 
                    </p>
                    <p className="workshops-text">
                        In the last years I am happy to see that photography has developed quite a lot in my country,
                        and that there are currently more than a handful of photographers who conduct workshops
                        dedicated to learning about this craft. Some people have a natural eye for understanding
                        what makes an image captivating, but this ability also comes through a lot of practice
                        and by sharing experiences with other people that share your passion.
                        I myself never learned photography from participating in workshops, but through a lot of reading,
                    researching and practicing. I never view photography as a means of capturing a beautiful image,
                        but as a way of engaging the viewer into experiencing the feelings I had when I pressed the camera shutter,
                        hopefully giving him the desire to go out and explore nature. 
                    </p>
                    <p className="workshops-text"> 
                        Before doing photography, I used to hike and travel a lot and I always wanted to capture the beautiful places I have visited,
                        a desire which prompted me in learning about photography. At first, I used to travel a lot alone because I could not find a person or a group
                        with the same mindset as myself, but lately I have been travelling quite a bit with my friends Adrian Petrisor and Ovidiu Lazar,
                        and it has been a rewarding experience. I know there are a lot of people like myself when I first started photography and hiking
                        that have difficulties in finding a group to enjoy their passions, which is part of the reason why I wanted to start doing these workshops.
                    </p>
                    <p className="workshops-text">
                        Due to the nature of my job, I do not have the time to organize small group workshops but mostly you will be able to find me
                        in the workshops organized by my friends Adrian & Ovidiu. However, if you want a small group or individual experience in hiking
                        and photography with me you can send me an email or contact through social media and maybe we can set up a 1-2-3-day tour in your desired place or a place chosen by me.
                    </p>
                    <p className="workshops-text">
                        <em>
                            In these workshops I will teach you everything I know about how to visualize a scene and capture a beautiful image, therefore do not hesitate to contact me, if interested.
                            I do not charge extra for my participation; I only require you to pay for my accommodation and transport.
                        </em>
                    </p>
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

export default Workshops;