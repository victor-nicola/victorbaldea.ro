import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios, { BASE_URL } from '../../api/axios';
import ReactMarkdown from 'react-markdown';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/about.css';

function About() {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            const handleKeyDown = (event) => {
                if ((event.ctrlKey || event.metaKey) && event.code === "KeyE" && event.shiftKey) {
                    navigate('/edit-about');
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [navigate, accessToken]);

    const getText = async() => {
        try {
            const response = await axios.get('/getText/about', {}, {});
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
            
            <div className="pe-5 d-special-block about-holder py-4 flex-fill" style={{marginTop: `${headerHeight}px`}}>
                <div className="row ps-5">
                    <div className="col-6">
                        <div className="float-end center-in-col">
                            <div className='markdown'>
                                <ReactMarkdown>{text}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <img src={`${BASE_URL}/images/about.png`} className="center-in-col about-image" alt='' />
                    </div>
                </div>
            </div>
            
            <div className="container-fluid d-special-none about-holder pt-5 pb-5 flex-fill">
                <img src={`${BASE_URL}/images/about.png`} className="about-image center-horizontal-relative" alt='' />
                <div className="center-horizontal-relative ps-3 pe-3 pt-4">
                    <div className='markdown'>
                        <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default About;