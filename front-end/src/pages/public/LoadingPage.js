import React from "react";

const LoadingPage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{backgroundColor: '#292929'}}>
            <div
                className="spinner-border text-light"
                role="status"
                style={{ width: "4rem", height: "4rem" }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 fs-5 text-light">Loading, please wait...</p>
        </div>
    );
};

export default LoadingPage;
