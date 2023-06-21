import logo from './logo.svg';
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
            <small><i className="fa fa-map-marker-alt me-2"></i>123 Street, New York, USA</small>
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
            <h1 className="fw-bold text-primary m-0">F<span className="text-secondary">oo</span>dy</h1>
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
              <img className="w-100" src="./resources/images/press-release-rm-32.jpg" alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-lg-7">
                      <h1 className="display-2 mb-5 animated slideInDown">Organic Food Is Good For Health</h1>
                      <a href="" className="btn btn-primary rounded-pill py-sm-3 px-sm-5">Products</a>
                      <a href="" className="btn btn-secondary rounded-pill py-sm-3 px-sm-5 ms-3">Services</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src="./resources/images/press-release-rm-32.jpg" alt="Image" />
                <div className="carousel-caption">
                  <div class="container">
                    <div class="row justify-content-start">
                      <div class="col-lg-7">
                        <h1 class="display-2 mb-5 animated slideInDown">Natural Food Is Always Healthy</h1>
                        <a href="" class="btn btn-primary rounded-pill py-sm-3 px-sm-5">Products</a>
                        <a href="" class="btn btn-secondary rounded-pill py-sm-3 px-sm-5 ms-3">Services</a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#header-carousel"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#header-carousel"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Carousel End */}
    </div>
  );
}

export default App;
