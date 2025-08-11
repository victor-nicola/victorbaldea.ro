import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function NotFound() {
    const headerRef = useRef();
    const navigate = useNavigate();
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.clientHeight);
            }
        };
        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        if (headerRef.current) observer.observe(headerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#292929",
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                overflowX: "hidden"
            }}
        >
            <Header ref={headerRef} />

            <main
                style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "20px",
                    marginTop: `${headerHeight}px`
                }}
            >
                <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    404 - Page Not Found
                </h1>
                <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
                    The page you are looking for doesn’t exist.
                </p>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        padding: "12px 24px",
                        backgroundColor: "#1f1f1f",
                        border: "1px solid #444",
                        borderRadius: "4px",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "1rem"
                    }}
                >
                    Go Home
                </button>
            </main>

            <Footer />
        </div>
    );
}
