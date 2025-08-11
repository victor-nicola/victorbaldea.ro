import { useState, useRef, useEffect } from 'react';
import '../../styles/logIn.css';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function LogIn() {
    const [password, setPassword] = useState('');
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

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
                alert('Server didn\'t answer');
            } else if (err.response?.status === 400) {
                alert('Incorrect password');
            } else {
                alert('Couldn\'t log in');
            }
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
        <div style={{ overflowX: 'hidden' }} className="default-outer-div">
            <Header ref={headerRef} />

            <div className="container d-flex justify-content-center align-items-center" style={{ flex: 1, marginTop: `${headerHeight}px` }}>
                <div style={{width: 'min(100%, 350px)'}}>
                    <p className="text-center mb-2 text-white title w-100">Log In</p>
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

            <Footer />
        </div>
    );
}

export default LogIn;
