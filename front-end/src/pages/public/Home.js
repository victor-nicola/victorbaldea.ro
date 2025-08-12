import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import axios, { BASE_URL } from '../../api/axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/slideshow.css';

function Home() {
    const headerRef = useRef();
    const imgRefs = useRef([]);
    const slideshowHolderRef = useRef(null);

    const [images, setImages] = useState([]);
    const [imgSize, setImgSize] = useState('');
    const [current, setCurrent] = useState(0);

    const [headerHeight, setHeaderHeight] = useState(0);

    const setSizesSlideshow = () => {
        const slideshowHolder = slideshowHolderRef.current;
        const images = imgRefs.current;
        if (!slideshowHolder || !images) return;

        images.forEach(img => {
            if (img) {
                img.style.height = `${slideshowHolder.clientHeight}px`;
                img.style.width = `${slideshowHolder.clientWidth}px`;
            }
        });
    };

    const loadImages = async () => {
        try {
            const device = window.innerWidth < 432 ? 'mobile' : 'pc';
            setImgSize(device);
            const res = await axios.get(`/slideshow/${device}`);
            setImages(res.data.map(img => img.filename));
        } catch (err) {
            console.error('Failed to fetch images:', err);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

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

    // Add resize event listener with image reloading
    useEffect(() => {
        const handleResize = () => {
            const newDevice = window.innerWidth < 432 ? 'mobile' : 'pc';
            
            // Reload images if device type changed
            if (newDevice !== imgSize) {
                loadImages();
            }
            
            setSizesSlideshow();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [imgSize]); // Add imgSize as dependency

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
        <>
            <div style={{ overflowX: 'hidden', touchAction: 'none' }} className='default-outer-div bg-black'>
                <Header ref={headerRef}/>
                
                <div ref={slideshowHolderRef} className="slideshow" style={{ marginTop: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)` }}>
                    {images.map((filename, i) => (
                        <img
                            key={i}
                            src={`${BASE_URL}/images/slideshow/${imgSize}/${filename}`}
                            ref={el => imgRefs.current[i] = el}
                            alt=""
                            className="imageSlideshow"
                            style={{
                                opacity: i === current ? 1 : 0,
                                transition: 'opacity 1s ease-in-out',
                                zIndex: i === current ? 2 : 1,
                            }}
                        />
                    ))}
                </div>

                <div className="fullscreen-centered-text" style={{zIndex: 0}}>
                    <p style={{ fontFamily: "'Inconsolata', monospace" }}>View. Nature. Emotion.</p>
                    <p style={{ fontFamily: "'Cinzel', serif" }} className="biggerP">Victor Bâldea</p>
                    <Link to="/gallery" className="btn btn-outline-danger">
                        <p>View Gallery</p>
                    </Link>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Home;