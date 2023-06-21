
import logo from './resources/images/logo.png';
import firstHomePageCarouselImage from './resources/images/press-release-rm-32.jpg';
import secondHomePageCarouseImage from './resources/images/press-release-rm-32.jpg';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div> */}

      {/* Navbar Start */}
      <div className="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s">
        <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
          <div className="col-lg-6 px-5 text-start">
            <small><i className="fa fa-map-marker-alt me-2"></i>123 Wave Street, Kanagawa, Japan</small>
            <small className="ms-4"><i className="fa fa-envelope me-2"></i>info@example.com</small>
          </div>
          <div className="col-lg-6 px-5 text-end">
            <small>Follow us:</small>
            <a className="text-body ms-3" href=""><i className="fab fa-facebook-f"></i></a>
            <a className="text-body ms-3" href=""><i className="fab fa-twitter"></i></a>
            <a className="text-body ms-3" href=""><i className="fab fa-linkedin-in"></i></a>
            <a className="text-body ms-3" href=""><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
          <a href="/" className="navbar-brand ms-4 ms-lg-0">
          </a>
          <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
              <a href="/" className="nav-item nav-link active">Home</a>
              <a href="/" className="nav-item nav-link">About Us</a>
              <a href="/" className="nav-item nav-link">Products</a>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                <div className="dropdown-menu m-0">
                  <a href="/" className="dropdown-item">Blog Grid</a>
                  <a href="/" className="dropdown-item">Our Features</a>
                  <a href="/" className="dropdown-item">Testimonial</a>
                  <a href="/" className="dropdown-item">404 Page</a>
                </div>
              </div>
              <a href="/" className="nav-item nav-link">Contact Us</a>
            </div>
            <div className="d-none d-lg-flex ms-2">
              <a className="btn-sm-square bg-white rounded-circle ms-3" href="">
                <small className="fa fa-search text-body"></small>
              </a>
              <a className="btn-sm-square bg-white rounded-circle ms-3" href="">
                <small className="fa fa-user text-body"></small>
              </a>
              <a className="btn-sm-square bg-white rounded-circle ms-3" href="">
                <small className="fa fa-shopping-bag text-body"></small>
              </a>
            </div>
          </div>
        </nav>
      </div>
      {/* Navbar End */}

      {/* Carousel start */}
      <div className="container-fluid p-0 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src={firstHomePageCarouselImage}  alt={"First Home Page Carousel Image"} />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-lg-7">
                      <h1 className="display-2 mb-5 animated slideInDown">To create one's world in any of the arts takes courage.</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src={secondHomePageCarouseImage} alt={"Second Home Page Carousel Image"} />
                <div className="carousel-caption">
                  <div className="container">
                    <div className="row justify-content-start">
                      <div className="col-lg-7">
                        <h1 className="display-2 mb-5 animated slideInDown">A true artist is not one who is inspired, but one who inspires others.</h1>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Carousel End */}

      {/* About Start */}
    <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5 align-items-center">
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                    <div className="about-img position-relative overflow-hidden p-5 pe-0">
                        <img className="img-fluid w-100" src={firstHomePageCarouselImage} />
                    </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <h1 class="display-5 mb-4">Best Organic Fruits And Vegetables</h1>
                    <p class="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                    <p><i class="fa fa-check text-primary me-3"></i>Tempor erat elitr rebum at clita</p>
                    <p><i class="fa fa-check text-primary me-3"></i>Aliqu diam amet diam et eos</p>
                    <p><i class="fa fa-check text-primary me-3"></i>Clita duo justo magna dolore erat amet</p>
                    <a class="btn btn-primary rounded-pill py-3 px-5 mt-3" href="">Read More</a>
                </div>
            </div>
        </div>
    </div>
    {/* About End */}

    {/* Feature Start */}
    <div className="container-fluid bg-light bg-icon my-5 py-6">
        <div className="container">
            <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 500 + 'px'}}>
                <h1 className="display-5 mb-3">Our Features</h1>
                <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
            </div>
            <div className="row g-4">
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="bg-white text-center h-100 p-4 p-xl-5">
                        <img className="img-fluid mb-4" src={firstHomePageCarouselImage} alt="" />
                        <h4 className="mb-3">Natural Process</h4>
                        <p className="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                        <a className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill" href="">Read More</a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="bg-white text-center h-100 p-4 p-xl-5">
                        <img className="img-fluid mb-4" src={firstHomePageCarouselImage} alt="" />
                        <h4 className="mb-3">Organic Products</h4>
                        <p className="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                        <a className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill" href="">Read More</a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="bg-white text-center h-100 p-4 p-xl-5">
                        <img className="img-fluid mb-4" src={firstHomePageCarouselImage} alt="" />
                        <h4 className="mb-3">Biologically Safe</h4>
                        <p className="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                        <a className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill" href="">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* Feature End */}
    </div>
  );
}

export default App;
