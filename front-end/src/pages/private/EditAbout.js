import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import axios, { BASE_URL } from '../../api/axios';
import ReactMarkdown from 'react-markdown';
import '../../styles/edit-static.css';

function EditAbout() {
    const navbarRef = useRef();
    const wrapperRef = useRef();
    const [menuVisibility, setMenuVisible] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState('');
    
    const getText = async() => {
        try {
            const response = await axios.post('/getText', {file: 'about'}, {});
            setText(response?.data);
        } catch (err) {
            if (!err?.response) {
                alert('Serverul nu a răspuns');
            }
        }
    };

    useEffect(() => {
        getText();
    }, []);

    const saveText = async() => {
        try {
            const response = await axios.post('/saveText', {text: text, file: 'about'}, {});
            alert(response?.data);
        } catch (err) {
            if (!err?.response) {
                alert('Serverul nu a răspuns');
            }
        }
    };

    const selectImage = () => {

    };

    const saveImage = () => {

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
                        <div className="center-in-col">
                            <div className='align-items-center h-100'>
                                {!editing ?
                                    <div className='markdown'>
                                        <ReactMarkdown>{text}</ReactMarkdown>
                                    </div>
                                    :
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Write something about you"
                                        className='text-input markdown'
                                        required
                                        autoFocus
                                    />
                                }
                            </div>
                            <div className='btn-bar mt-3'>
                                <button type="button" className="btn btn-outline-danger me-3" onClick={() => setEditing(true)}>
                                    <p className='text'>Edit</p>
                                </button>
                                <button type="button" className="btn btn-outline-primary me-3" onClick={() => setEditing(false)}>
                                    <p className='text'>Preview</p>
                                </button>
                                <button type="button" className="btn btn-outline-success" onClick={() => saveText()}>
                                    <p className='text'>Save</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className='center-in-col'>
                            <img src={`${BASE_URL}/images/poza-about.png`} className="about-image d-block" style={{justifySelf: 'center'}} alt='' />
                            <div className='btn-bar mt-3'>
                                <button type="button" className="btn btn-outline-danger me-3" onClick={() => selectImage()}>
                                    <p className='text'>Edit</p>
                                </button>
                                <button type="button" className="btn btn-outline-success" onClick={() => saveImage()}>
                                    <p className='text'>Save</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container-fluid d-special-none about-holder pt-5 pb-5">
                <div>
                    <img src={`${BASE_URL}/images/poza-about.png`} className="about-image center-horizontal-relative" alt='' />
                    <div className='btn-bar mt-3'>
                        <button type="button" className="btn btn-outline-danger me-3" onClick={() => selectImage()}>
                            <p className='text'>Edit</p>
                        </button>
                        <button type="button" className="btn btn-outline-success" onClick={() => saveImage()}>
                            <p className='text'>Save</p>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="center-horizontal-relative ps-3 pe-3">
                        <div className='markdown' style={{marginTop: '20px'}}>
                            <ReactMarkdown>{text}</ReactMarkdown>
                        </div>
                    </div>
                    <div className='btn-bar mt-3'>
                        <button type="button" className="btn btn-outline-danger me-3" onClick={() => setEditing(true)}>
                            <p className='text'>Edit</p>
                        </button>
                        <button type="button" className="btn btn-outline-primary me-3" onClick={() => setEditing(false)}>
                            <p className='text'>Preview</p>
                        </button>
                        <button type="button" className="btn btn-outline-success" onClick={() => saveText()}>
                            <p className='text'>Save</p>
                        </button>
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

export default EditAbout;