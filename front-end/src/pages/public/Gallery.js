import { useState, useEffect, useCallback, useRef } from "react";
import axios, { BASE_URL } from "../../api/axios";
import GalleryItem from "../../components/GalleryItem";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import '../../styles/gallery.css';
import { useAuth } from "../../contexts/AuthContext";

export default function Gallery() {
    const [galleries, setGalleries] = useState([]);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1248);
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            const handleKeyDown = (event) => {
                if ((event.ctrlKey || event.metaKey) && event.code === "KeyE" && event.shiftKey) {
                    navigate('/edit-gallery');
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [navigate, accessToken]);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1248);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchGalleries = useCallback(async () => {
        const res = await axios.get("/gallery");
        setGalleries(
            res.data.map((g) => ({
                ...g,
                coverUrl: `${BASE_URL}/images/gallery/800/${g.coverFilename}`,
            }))
        );
    }, []);

    useEffect(() => {
        fetchGalleries();
    }, [fetchGalleries]);

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
        <div style={{ overflowX: "hidden" }} className="default-outer-div">
            <Header ref={headerRef} />

            <div className="px-4 py-4 flex-fill" style={{marginTop: `${headerHeight}px`}}>
                <div
                    className="mt-4"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "45px",
                        width: "100%",
                        maxWidth: "100%"
                    }}
                >
                    {isLargeScreen ? (
                        // Large screen: use grid layout
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                rowGap: "45px",
                                columnGap: "60px",
                                justifyItems: "center",
                                width: "100%",
                                maxWidth: "100%"
                            }}
                        >
                            {galleries.map((gallery, index) => {
                                const isLastSingle = galleries.length % 2 === 1 && index === galleries.length - 1;

                                return (
                                    <div
                                        key={gallery.id}
                                        style={{
                                            gridColumn: isLastSingle ? "span 2" : undefined,
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <GalleryItem gallery={gallery} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        // Small screen: use flex layout for perfect centering
                        galleries.map((gallery) => (
                            <div
                                key={gallery.id}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <GalleryItem gallery={gallery} />
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}