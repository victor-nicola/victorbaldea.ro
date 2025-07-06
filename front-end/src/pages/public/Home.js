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
    const textRef = useRef(null);

    const [images, setImages] = useState([]);
    const [imgSize, setImgSize] = useState('');
    const [current, setCurrent] = useState(0);

    const setSizesSlideshow = () => {
        const slideshowHolder = slideshowHolderRef.current;
        const nav = headerRef.current;
        const images = imgRefs.current;
        if (!slideshowHolder || !nav) return;

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
        <div style={{ overflowX: 'hidden', touchAction: 'none' }} className='default-outer-div bg-black'>
            <Header ref={headerRef}/>
            
            <div ref={slideshowHolderRef} className="slideshow" style={{marginTop: `${headerHeight}px`}}>
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

            <div ref={textRef} className="container-fluid position-absolute center-vertical-absolute text-center">
                <p style={{ fontFamily: "'Inconsolata', monospace" }}>View. Nature. Emotion.</p>
                <p style={{ fontFamily: "'Cinzel', serif" }} className="biggerP">Victor B&#226;ldea</p>
                <Link to="/gallery" className="btn btn-outline-danger">
                    <p>View Gallery</p>
                </Link>
            </div>

            <Footer />
        </div>
    );
}

export default Home;