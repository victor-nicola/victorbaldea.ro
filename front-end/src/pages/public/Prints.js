<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" to="res/pics/favicon.ico">
        <link rel="mask-icon" to="res/pics/favicon.ico" color="#000000">
        
        <title>Victor Baldea</title>
        
        <link rel="stylesheet" type="text/css" to="styles/main.css">
        <link rel="stylesheet" type="text/css" to="styles/bootstrap-icons.css">

        <link rel="preconnect" to="https://fonts.googleapis.com">
        <link rel="preconnect" to="https://fonts.gstatic.com" crossorigin>
        <link to="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet"> 
        
        <link rel="preconnect" to="https://fonts.googleapis.com">
        <link rel="preconnect" to="https://fonts.gstatic.com" crossorigin>
        <link to="https://fonts.googleapis.com/css2?family=Cinzel&family=Dancing+Script&family=Inconsolata:wght@300&family=Playfair+Display&family=Raleway:wght@300&family=Stick+No+Bills&display=swap" rel="stylesheet"> 

        <link rel="preconnect" to="https://fonts.googleapis.com">
        <link rel="preconnect" to="https://fonts.gstatic.com" crossorigin>
        <link to="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Inconsolata:wght@300&family=Playfair+Display&family=Raleway:wght@300&family=Stick+No+Bills&display=swap" rel="stylesheet"> 

        <link rel="stylesheet" type="text/css" to="styles/header.css">
        <link rel="stylesheet" type="text/css" to="styles/text.css">
        <link rel="stylesheet" type="text/css" to="styles/defaults.css">
        <link rel="stylesheet" type="text/css" to="styles/contact.css">
        <meta charset="utf-8">
    </head>
    <body style="background-color: #292929;">

        <nav className="d-flex justify-content-center navbar navbar-expand-lg navbar-dark fixed-top border-bottom">
            <div className="container-fluid">
                <div className="d-none d-lg-block collapse navbar-collapse">
                    <ul className="navbar-nav ms-lg-5 ps-lg-5">
                        <li className="nav-item"><Link to="/" className="nav-link"><p className="headerOption">Home</p></Link></li>
                        <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="about" className="nav-link"><p className="headerOption">About</p></Link></li>
                        <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="gallery" className="nav-link"><p className="headerOption">Gallery</p></Link></li>
                    </ul>
                </div>
                <Link to="/" className="navbar-left ms-3 mx-auto"><img src="res/pics/logo.png" className="logo"></Link>
                <button id="menu-expander" className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-lg-auto me-lg-5 pe-lg-5">
                        <li className="nav-item"><Link to="workshops" className="nav-link"><p className="headerOption">Workshops</p></Link></li>
                        <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="prints" className="nav-link disabled"><p className="headerOption">Prints</p></Link></li>
                        <li className="nav-item ms-lg-3 ps-lg-3 ms-xxl-5"><Link to="contact" className="nav-link"><p className="headerOption">Contact</p></Link></li>
                    </ul>
                </div>
            </div>
                
            <div className="d-lg-none collapse center-vertical-absolute" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link to="/" className="nav-link center-horizontal-relative"><p className="headerOption">Home</p></Link></li>
                    <li className="nav-item"><Link to="about" className="nav-link center-horizontal-relative"><p className="headerOption">About</p></Link></li>
                    <li className="nav-item"><Link to="gallery" className="nav-link center-horizontal-relative"><p className="headerOption">Gallery</p></Link></li>
                    <li className="nav-item"><Link to="workshops" className="nav-link center-horizontal-relative"><p className="headerOption">Workshops</p></Link></li>
                    <li className="nav-item"><Link to="prints" className="nav-link center-horizontal-relative disabled"><p className="headerOption">Prints</p></Link></li>
                    <li className="nav-item"><Link to="contact" className="nav-link center-horizontal-relative"><p className="headerOption">Contact</p></Link></li>
                </ul>
            </div>
        </nav>

        <div className="container-fluid center-vertical-absolute">
            <div className="text-center pt-3"><p className="text">Unavailable</p></div>
        </div>

        <footer className="text-center text-white border-top fixed-bottom">
            <div className="text-center p-3">
                <p className="text-white">&copy;{(new Date().getFullYear())} All rights reserved: Victor B&#226;ldea</p>
            </div>
        </footer>

        <div id="fader-collapse" className="bg-black d-none d-lg-none fill-screen position-fixed"></div>

        <script src=" scripts/bootstrap.bundle.min.js"></script>
        <script src=" scripts/toggleMenu.js"></script>
    </body>
</html>