import { Link } from 'react-router-dom';
import { useRef, useEffect, useState, useCallback } from 'react';
import { BASE_URL } from '../../api/axios';
import ReactMarkdown from 'react-markdown';
import imageCompression from "browser-image-compression";
import '../../styles/edit-static.css';
import { useAuth } from '../../contexts/AuthContext';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function EditAbout() {
    const navbarRef = useRef();
    const wrapperRef = useRef();
    const [menuVisibility, setMenuVisible] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    
    const {accessToken} = useAuth();
    const {axiosPrivate} = useAxiosPrivate();

    const getText = useCallback(async() => {
        try {
            const response = await axiosPrivate.post('/getText', {file: 'about'}, {});
            setText(response?.data);
        } catch (err) {
            if (!err?.response) {
                alert('Serverul nu a răspuns');
            }
        }
    }, [axiosPrivate]);

    useEffect(() => {
        getText();
    }, [getText]);

    const saveText = async() => {
        try {
            const response = await axiosPrivate.post('/saveText', {text: text, file: 'about'},
            {
                headers: {'Authorization': `Bearer ${accessToken}`},
                withCredentials: true
            });
            alert(response?.data);
        } catch (err) {
            if (!err?.response) {
                alert('Serverul nu a raspuns');
            }
        }
    };

    const handleSelectFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log("Original file size:", file.size / 1024, "KB");

        // Compress the image
        const options = {
            maxSizeMB: 2,             // Target max size (e.g., 1 MB)
            maxWidthOrHeight: 1920,   // Resize if needed
            useWebWorker: true
        };

        try {
            const compressedFile = await imageCompression(file, options);

            console.log("Compressed file size:", compressedFile.size / 1024, "KB");

            // Update preview URL
            const preview = URL.createObjectURL(compressedFile);

            setSelectedFile(compressedFile);
            setPreviewURL(preview);
        } catch (error) {
            console.error("Compression error:", error);
        }
    };

    const saveImage = async () => {
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("file", 'about');

        try {
            const response = await axiosPrivate.post("/saveImage", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            console.log("Upload successful:", response.data);
            alert("Upload successful!");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed.");
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
                                        placeholder="Scrie ceva despre tine"
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
                            <img src={previewURL ? previewURL : `${BASE_URL}/images/poza-about.png`} className="about-image d-block" alt='' />
                            <div className='btn-bar mt-3'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="fileInput"
                                    onChange={handleSelectFile}
                                />
                                <button type="button" className="btn btn-outline-danger me-3" onClick={() => document.getElementById("fileInput").click()}>
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
                        {/* <button type="button" className="btn btn-outline-danger me-3" onClick={() => selectImage()}>
                            <p className='text'>Edit</p>
                        </button>
                        <button type="button" className="btn btn-outline-success" onClick={() => saveImage()}>
                            <p className='text'>Save</p>
                        </button> */}
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