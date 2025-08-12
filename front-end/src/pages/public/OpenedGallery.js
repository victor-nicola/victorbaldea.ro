import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { BASE_URL } from "../../api/axios";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/opened-gallery.css';
import { useAuth } from "../../contexts/AuthContext";

export default function OpenedGallery() {
    const { galleryName } = useParams();
    const [images, setImages] = useState([]);
    const [layout, setLayout] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            const handleKeyDown = (event) => {
                if ((event.ctrlKey || event.metaKey) && event.code === "KeyE" && event.shiftKey) {
                    navigate(`/edit-gallery/${galleryName}`);
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [navigate, galleryName, accessToken]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getLayoutConfig = () => {
        if (windowWidth >= 992) return { columnCount: 3, imageWidth: 400 };
        if (windowWidth >= 504) return { columnCount: 1, imageWidth: 350 };
        return { columnCount: 1, imageWidth: windowWidth * 0.7 };
    };

    const { columnCount, imageWidth } = getLayoutConfig();

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await axios.get(`/gallery/${galleryName}`);

                let fetchedImages = res.data.images || [];
                const fetchedLayout = res.data.layout || null;

                setLayout(fetchedLayout);

                if (fetchedLayout && Array.isArray(fetchedLayout.imageOrder) && fetchedLayout.imageOrder.length > 0) {
                    const orderedImages = [];
                    fetchedLayout.imageOrder.forEach(filename => {
                        const found = fetchedImages.find(img => img.thumb === filename);
                        if (found) orderedImages.push(found);
                    });
                    fetchedImages.forEach(img => {
                        if (!fetchedLayout.imageOrder.includes(img.thumb)) {
                            orderedImages.push(img);
                        }
                    });
                    fetchedImages = orderedImages;
                }

                setImages(fetchedImages);
            } catch (err) {
                console.error("Error fetching gallery:", err);
                if (err.response && err.response.status === 404) {
                    setError(true);
                }
            }
        };

        fetchGallery();
    }, [galleryName]);

    useEffect(() => {
        if (error) {
            navigate("/404");
        }
    }, [error, navigate]);

    const buildColumns = () => {
        if (!layout || !layout.imageColumns) {
            const columns = Array.from({ length: columnCount }, () => []);
            const columnHeights = Array(columnCount).fill(0);
            images.forEach(item => {
                const shortestIndex = columnHeights.indexOf(Math.min(...columnHeights));
                columns[shortestIndex].push(item);
                columnHeights[shortestIndex] += 300;
            });
            return columns;
        }

        const columns = Array.from({ length: columnCount }, () => []);
        images.forEach(img => {
            const colIndex = layout.imageColumns[img.thumb];
            if (typeof colIndex === 'number' && colIndex >= 0 && colIndex < columnCount) {
                columns[colIndex].push(img);
            } else {
                columns[0].push(img);
            }
        });

        return columns;
    };

    const masonryColumns = buildColumns();

    // Build row-wise flattened list
    const flatImagesRowWise = [];
    const maxRows = Math.max(...masonryColumns.map(col => col.length));
    for (let row = 0; row < maxRows; row++) {
        for (let col = 0; col < masonryColumns.length; col++) {
            if (masonryColumns[col][row]) {
                flatImagesRowWise.push(masonryColumns[col][row]);
            }
        }
    }

    const openModal = (index) => {
        setCurrentIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const getRowWiseFlatIndex = (colIdx, imgIdx) => {
        const target = masonryColumns[colIdx][imgIdx];
        return flatImagesRowWise.findIndex(img => img === target);
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + flatImagesRowWise.length) % flatImagesRowWise.length);
    };

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % flatImagesRowWise.length);
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
        if (headerRef.current) resizeObserver.observe(headerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    return (
        <div style={{ overflowX: "hidden" }} className="default-outer-div">
            <Header ref={headerRef} />

            <div style={{
                marginTop: `${headerHeight}px`,
                marginBottom: '30px',
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: 0,
                flex: 1,
            }}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    gap: '50px',
                    justifyContent: 'center',
                    paddingLeft: '50px',
                    paddingRight: '50px',
                }}>
                    {masonryColumns.map((column, ci) => (
                        <div key={ci} style={{
                            width: `${imageWidth}px`,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {column.map((item, i) => (
                                <div key={i} style={{ marginTop: i === 0 ? "30px" : "30px", width: '100%', boxSizing: 'border-box' }}>
                                    <img
                                        src={`${BASE_URL}/images/gallery/${galleryName}/${item.thumb}`}
                                        alt=""
                                        className="hover-shadow img-preview"
                                        onClick={() => openModal(getRowWiseFlatIndex(ci, i))}
                                        style={{ cursor: 'pointer', userSelect: 'none' }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {modalOpen && flatImagesRowWise.length > 0 && (
                <div
                    id="myModal"
                    className="modal"
                    style={{ display: "block" }}
                >
                    <span className="close cursor position-absolute" onClick={closeModal}>
                        &times;
                    </span>
                    <div className="modal-content" id="modal-content">
                        <img
                            src={`${BASE_URL}/images/gallery/${galleryName}/${flatImagesRowWise[currentIndex].full || flatImagesRowWise[currentIndex].thumb}`}
                            alt=""
                            className="maxImg"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                        <div className="arrow-holder">
                            <button className="prev" onClick={prevSlide}>&#10094;</button>
                            <button className="next" onClick={nextSlide}>&#10095;</button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
