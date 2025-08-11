import { useRef, useEffect, useState } from 'react';
import axios, { BASE_URL } from '../../api/axios';
import ReactMarkdown from 'react-markdown';
import '../../styles/edit-static.css';
import { useAuth } from '../../contexts/AuthContext';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { processImage } from '../../utils/imageProcessor';

function EditWorkshops() {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    
    const {accessToken} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const textareaRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.code === "KeyS") {
                event.preventDefault();
                navigate(`/workshops`);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [navigate]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Check for Ctrl+S or Cmd+S
            if ((event.ctrlKey || event.metaKey) && event.code === "KeyS") {
                event.preventDefault(); // Stop the browser Save As dialog
                setEditing(false);
            }
        };

        const textarea = textareaRef.current;
        textarea?.addEventListener("keydown", handleKeyDown);

        // Clean up
        return () => {
            textarea?.removeEventListener("keydown", handleKeyDown);
        };
    }, [text]);

    const getText = async() => {
        try {
            const response = await axios.get('/getText/workshops', {}, {});
            setText(response?.data);
        } catch (err) {
            if (!err?.response) {
                alert('Server didn\'t answer');
            }
        }
    };

    useEffect(() => {
        getText();
    }, []);

    const saveText = async() => {
        try {
            const response = await axiosPrivate.post('/saveText/workshops', {text: text},
            {
                headers: {'Authorization': `Bearer ${accessToken}`},
                withCredentials: true
            });
            alert(response?.data);
            setEditing(false);
        } catch (err) {
            console.log(err);
            
            if (!err?.response) {
                alert('Server didn\'t answer');
            }
        }
    };

    const handleSelectFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log("Original file size:", file.size / 1024, "KB");

        try {
            const compressedFile = await processImage(file, 1920, 4);

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

        try {
            const response = await axiosPrivate.post("/saveImage/workshops", formData, {
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
        <div style={{overflowX: 'hidden'}} className='default-outer-div'>
            <Header ref={headerRef} />
            
            <div className="pe-5 d-none d-md-block align-content-center py-4 flex-fill" style={{marginTop: `${headerHeight}px`}}>
                <div className="row ps-5">
                    <div className="col-6">
                        <div className="center-in-col">
                            <div className='align-items-center'>
                                {!editing ?
                                    <div className='markdown'>
                                        <ReactMarkdown>{text}</ReactMarkdown>
                                    </div>
                                    :
                                    <textarea
                                        ref={textareaRef}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Write something about your workshops"
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
                            <img src={previewURL ? previewURL : `${BASE_URL}/images/workshops.png`} className="workshops-edit-image d-block" alt='' />
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
            
            <div className="container-fluid d-md-none pt-5 pb-5 flex-fill" style={{marginTop: `${headerHeight}px`}}>
                <div>
                    <img src={previewURL ? previewURL : `${BASE_URL}/images/workshops.png`} className="workshops-edit-image center-horizontal-relative" alt='' />
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
                <div>
                    <div className="center-horizontal-relative ps-3 pe-3">
                        {!editing ?
                            <div className='markdown' style={{marginTop: '20px'}}>
                                <ReactMarkdown>{text}</ReactMarkdown>
                            </div>
                            :
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Write something about your workshops"
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
            
            <Footer />
        </div>
    );
}

export default EditWorkshops;