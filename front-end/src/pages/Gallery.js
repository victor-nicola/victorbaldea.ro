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
        <link rel="stylesheet" type="text/css" to="styles/gallery.css">
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

        <div className="d-none d-lg-block container-fluid" style="margin-top: 150px;">
            <div className="row">
                <div className="col">
                    <Link to="croatia" className="float-end">
                        <div className="preview">
                            <img src="res/pics/gallery/800/croatia.jpg">
                        </div>
                        <div className="title"><p>Croatia and Slovenia</p></div>
                    </Link>
                </div>
                <div className="col">
                    <Link to="dolomites" className="float-start">
                        <div className="preview">
                            <img src="res/pics/gallery/800/dolomites.jpg">
                        </div>
                        <div className="title"><p>Dolomites</p></div>
                    </Link> 
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="iceland" className="float-end">
                        <div className="preview">
                            <img src="res/pics/gallery/800/iceland.jpg">
                        </div>
                        <div className="title"><p>Iceland</p></div>
                    </Link>
                </div>
                <div className="col">
                    <Link to="autumn" className="float-start">
                        <div className="preview">
                            <img src="res/pics/gallery/800/autumn.jpg">
                        </div>
                        <div className="title"><p>Autumn</p></div>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="spring" className="float-end">
                        <div className="preview">
                            <img src="res/pics/gallery/800/spring.jpg">
                        </div>
                        <div className="title"><p>Spring</p></div>
                    </Link>
                </div>
                <div className="col">
                    <Link to="summer" className="float-start">
                        <div className="preview">
                            <img src="res/pics/gallery/800/summer.jpg">
                        </div>
                        <div className="title"><p>Summer</p></div>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="winter" className="float-end">
                        <div className="preview">
                            <img src="res/pics/gallery/800/winter.jpg">
                        </div>
                        <div className="title"><p>Winter</p></div>
                    </Link>
                </div>
                <div className="col">
                    <Link to="water" className="float-start">
                        <div className="preview">
                            <img src="res/pics/gallery/800/water.jpg">
                        </div>
                        <div className="title"><p>Waterfalls</p></div>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="favs" className="float-end">
                        <div className="preview">
                            <img src="res/pics/gallery/800/favs.jpg">
                        </div>
                        <div className="title"><p>Personal Favourites</p></div>
                    </Link>
                </div>
                <div className="col">
                    <Link to="bw" className="float-start">
                        <div className="preview">
                            <img src="res/pics/gallery/800/bw.jpg">
                        </div>
                        <div className="title"><p>Black and White</p></div>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="faroe" className="float-end">
                        <div className="preview">
                            <img src="res/pics/gallery/800/faroe.jpg">
                        </div>
                        <div className="title"><p>Faroe Islands</p></div>
                    </Link>
                </div>
                <div className="col">
                    <Link to="sri-lanka" className="float-start">
                        <div className="preview">
                            <img src="res/pics/gallery/800/sri-lanka.jpg">
                        </div>
                        <div className="title"><p>Sri Lanka</p></div>
                    </Link>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Link to="kyrgyzstan" className="float-end">
                        <div className="preview">
                            <img src="res/pics/gallery/800/kyrgyzstan.jpg">
                        </div>
                        <div className="title"><p>Kyrgyzstan</p></div>
                    </Link>
                </div>
                <div className="col">
                    <Link to="lofoten" className="float-start">
                        <div className="preview">
                            <img src="res/pics/gallery/800/lofoten.jpg">
                        </div>
                        <div className="title"><p>Lofoten</p></div>
                    </Link>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Link to="madeira" className="float-end">
                        <div className="preview">
                            <img src="res/pics/gallery/800/madeira.jpg">
                        </div>
                        <div className="title"><p>Madeira</p></div>
                    </Link>
                </div>
                <div className="col">
                  <Link to="peru" className="float-start">
                      <div className="preview">
                          <img src="res/pics/gallery/800/peru.jpg">
                      </div>
                      <div className="title"><p>Peru</p></div>
                  </Link>
              </div>
            </div>

            <div className="row">
              <div className="col justify-content-center align-items-center flex-row d-flex">
                  <Link to="scotland">
                      <div className="preview">
                          <img src="res/pics/gallery/800/scotland.jpg">
                      </div>
                      <div className="title"><p>Scotland</p></div>
                  </Link>
              </div>
            </div>

            <!-- <div className="row">
                <div className="col justify-content-center align-items-center flex-row d-flex">
                    <Link to="kyrgyzstan">
                        <div className="preview">
                            <img src="res/pics/gallery/800/kyrgyzstan.jpg">
                        </div>
                        <div className="title"><p>Kyrgyzstan</p></div>
                    </Link>
                </div>
            </div> -->
        </div>

        <div className="container-fluid d-lg-none" style="margin-top: 130px; margin-left: 0; left: 0;"> <!--removed position-absolute class-->
            <ul className="vertical-list">
                <li className="center-horizontal-relative"><Link to="croatia">
                    <div className="preview">
                        <img src="res/pics/gallery/800/croatia.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Croatia and Slovenia</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="dolomites">
                    <div className="preview">
                        <img src="res/pics/gallery/800/dolomites.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Dolomites</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="iceland">
                    <div className="preview">
                        <img src="res/pics/gallery/800/iceland.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Iceland</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="autumn">
                    <div className="preview">
                        <img src="res/pics/gallery/800/autumn.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Autumn</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="spring">
                    <div className="preview">
                        <img src="res/pics/gallery/800/spring.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Spring</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="summer">
                    <div className="preview">
                        <img src="res/pics/gallery/800/summer.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Summer</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="winter">
                    <div className="preview">
                        <img src="res/pics/gallery/800/winter.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Winter</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="water">
                    <div className="preview">
                        <img src="res/pics/gallery/800/water.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Waterfalls</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="favs">
                    <div className="preview">
                        <img src="res/pics/gallery/800/favs.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Personal Favourites</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="bw">
                    <div className="preview">
                        <img src="res/pics/gallery/800/bw.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Black and White</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="faroe">
                    <div className="preview">
                        <img src="res/pics/gallery/800/faroe.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Faroe Islands</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="sri-lanka">
                    <div className="preview">
                        <img src="res/pics/gallery/800/sri-lanka.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Sri Lanka</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="kyrgyzstan">
                    <div className="preview">
                        <img src="res/pics/gallery/800/kyrgyzstan.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Kyrgyzstan</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="lofoten">
                    <div className="preview">
                        <img src="res/pics/gallery/800/lofoten.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Lofoten</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="madeira">
                    <div className="preview">
                        <img src="res/pics/gallery/800/madeira.jpg">
                    </div>
                    <div className="title center-horizontal-relative"><p>Madeira</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="peru">
                  <div className="preview">
                      <img src="res/pics/gallery/800/peru.jpg">
                  </div>
                  <div className="title center-horizontal-relative"><p>Peru</p></div>
                </Link></li>
                <li className="center-horizontal-relative"><Link to="scotland">
                  <div className="preview">
                      <img src="res/pics/gallery/800/scotland.jpg">
                  </div>
                  <div className="title center-horizontal-relative"><p>Scotland</p></div>
                </Link></li>
            </ul>
        </div>

        <footer className="text-center text-white border-top">
            <div className="text-center p-3">
                <p className="text-white">&copy;{(new Date().getFullYear())} All rights reserved: Victor B&#226;ldea</p>
            </div>
        </footer>
        
        <div id="fader-collapse" className="bg-black d-none d-lg-none fill-screen position-fixed"></div>

        <script src=" scripts/bootstrap.bundle.min.js"></script>
        <script src=" scripts/toggleMenu.js"></script>
    </body>
</html>