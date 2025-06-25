<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" to="res/pics/favicon.ico">
        <link rel="mask-icon" to="res/pics/favicon.ico" color="#000000">
        
        <title>Victor Baldea</title>
        
        <link rel="stylesheet" type="text/css" to="styles/main.css">

        <link rel="preconnect" to="https://fonts.googleapis.com">
        <link rel="preconnect" to="https://fonts.gstatic.com" crossorigin>
        <link to="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet"> 
        
        <link rel="preconnect" to="https://fonts.googleapis.com">
        <link rel="preconnect" to="https://fonts.gstatic.com" crossorigin>
        <link to="https://fonts.googleapis.com/css2?family=Cinzel&family=Dancing+Script&family=Inconsolata:wght@300&family=Playfair+Display&family=Raleway:wght@300&family=Stick+No+Bills&display=swap" rel="stylesheet"> 

        <link rel="preconnect" to="https://fonts.googleapis.com">
        <link rel="preconnect" to="https://fonts.gstatic.com" crossorigin>
        <link to="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Inconsolata:wght@300&family=Playfair+Display&family=Raleway:wght@300&family=Stick+No+Bills&display=swap" rel="stylesheet"> 

        <link rel="stylesheet" type="text/css" to="styles/defaults.css">
        <link rel="stylesheet" type="text/css" to="styles/text.css">
        <link rel="stylesheet" type="text/css" to="styles/header.css">
        <link rel="stylesheet" type="text/css" to="styles/croatia.css">
        <meta charset="utf-8">
    </head>
    <body style="background-color: #292929; overflow-x: hidden;">
        <div id="nav-wrapper">
            <nav id="navbar" className="d-flex justify-content-center navbar navbar-expand-lg navbar-dark fixed-top border-bottom">
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
        </div>
        
        <div className="d-flex d-lg-none previewHolder justify-content-center">
            <ul>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/1.jpg" onclick="openModal();currentSlide(1)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/19.jpg" onclick="openModal();currentSlide(2)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/3.jpg" onclick="openModal();currentSlide(3)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/4.jpg" onclick="openModal();currentSlide(4)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/2.jpg" onclick="openModal();currentSlide(5)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/6.jpg" onclick="openModal();currentSlide(6)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/7.jpg" onclick="openModal();currentSlide(7)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/5.jpg" onclick="openModal();currentSlide(8)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/8.jpg" onclick="openModal();currentSlide(9)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/10.jpg" onclick="openModal();currentSlide(10)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/9.jpg" onclick="openModal();currentSlide(11)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/12.jpg" onclick="openModal();currentSlide(12)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/13.jpg" onclick="openModal();currentSlide(13)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/11.jpg" onclick="openModal();currentSlide(14)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/15.jpg" onclick="openModal();currentSlide(15)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/14.jpg" onclick="openModal();currentSlide(16)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/16.jpg" onclick="openModal();currentSlide(17)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/17.jpg" onclick="openModal();currentSlide(18)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/20.jpg" onclick="openModal();currentSlide(19)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/18.jpg" onclick="openModal();currentSlide(20)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/21.jpg" onclick="openModal();currentSlide(21)" className="myImg hover-shadow"></Link></div></li>
            </ul>
        </div>

        <div className="d-none d-lg-flex previewHolder justify-content-center">
            <ul>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/1.jpg" onclick="openModal();currentSlide(1)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/4.jpg" onclick="openModal();currentSlide(4)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/7.jpg" onclick="openModal();currentSlide(7)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/10.jpg" onclick="openModal();currentSlide(10)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/13.jpg" onclick="openModal();currentSlide(13)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/14.jpg" onclick="openModal();currentSlide(16)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/20.jpg" onclick="openModal();currentSlide(19)" className="myImg hover-shadow"></Link></div></li>
            </ul>
            <ul>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/19.jpg" onclick="openModal();currentSlide(2)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/2.jpg" onclick="openModal();currentSlide(5)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/5.jpg" onclick="openModal();currentSlide(8)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/9.jpg" onclick="openModal();currentSlide(11)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/11.jpg" onclick="openModal();currentSlide(14)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/16.jpg" onclick="openModal();currentSlide(17)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/18.jpg" onclick="openModal();currentSlide(20)" className="myImg hover-shadow"></Link></div></li>
            </ul>
            <ul>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/3.jpg" onclick="openModal();currentSlide(3)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/6.jpg" onclick="openModal();currentSlide(6)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/8.jpg" onclick="openModal();currentSlide(9)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/12.jpg" onclick="openModal();currentSlide(12)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/15.jpg" onclick="openModal();currentSlide(15)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/17.jpg" onclick="openModal();currentSlide(18)" className="myImg hover-shadow"></Link></div></li>
                <li><div className="preview"><Link><img src="res/pics/gallery/Autumn/21.jpg" onclick="openModal();currentSlide(21)" className="myImg hover-shadow"></Link></div></li>
            </ul>
        </div>

        <div id="myModal" className="modal">
            <span className="close cursor position-absolute" onclick="closeModal()">&times;</span>
            <div className="modal-content" id="modal-content">
                <div className="arrow-holder">
                    <Link className="prev" onclick="plusSlides(-1)">&#10094;</Link>
                    <Link className="next" onclick="plusSlides(1)">&#10095;</Link>
                </div>
                <img id="expandedPreview" className="maxImg" onload="centerArrows()" oncontextmenu="return false;">
            </div>
        </div>

        <footer className="text-center text-white border-top">
            <div className="text-center p-3">
                <p className="text-white">&copy;{(new Date().getFullYear())} All rights reserved: Victor B&#226;ldea</p>
            </div>
        </footer>

        <div id="fader-collapse" className="bg-black d-none d-lg-none fill-screen position-fixed"></div>
        
        <script src="scripts/bootstrap.bundle.min.js"></script>
        <script src="scripts/toggleMenu.js"></script>
        <script src="scripts/setNavWrapperHeight.js"></script>
        <script src="scripts/expandPreview.js"></script>
    </body>
    </html>