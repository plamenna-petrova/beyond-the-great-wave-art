

import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            {/* Navbar Start */}
            <div className="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s">
                <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
                    <div className="col-lg-6 px-5 text-start">
                        <small><i className="fa fa-map-marker-alt me-2"></i>123 Wave Street, Kanagawa, Japan</small>
                        <small className="ms-4"><i className="fa fa-envelope me-2"></i>info@example.com</small>
                    </div>
                    <div className="col-lg-6 px-5 text-end">
                        <small>Follow us:</small>
                        <Link className="text-body ms-3" to="/"><i className="fab fa-facebook-f"></i></Link>
                        <Link className="text-body ms-3" to="/"><i className="fab fa-twitter"></i></Link>
                        <Link className="text-body ms-3" to="/"><i className="fab fa-linkedin-in"></i></Link>
                        <Link className="text-body ms-3" to="/"><i className="fab fa-instagram"></i></Link>
                    </div>
                </div>

                <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
                    <Link to="/" className="navbar-brand ms-4 ms-lg-0">
                    </Link>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <Link to="/" className="nav-item nav-link active">Home</Link>
                            <Link to="/" className="nav-item nav-link">About Us</Link>
                            <Link to="/" className="nav-item nav-link">Galleries</Link>
                            <div className="nav-item dropdown">
                                <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                                <div className="dropdown-menu m-0">
                                    <Link to="/" className="dropdown-item">Blog</Link>
                                    <Link to="/" className="dropdown-item">Our Features</Link>
                                    <Link to="/" className="dropdown-item">Testimonials</Link>
                                    <Link href="/" className="dropdown-item">404 Page</Link>
                                </div>
                            </div>
                            <Link to="/" className="nav-item nav-link">Contact Us</Link>
                        </div>
                        <div className="d-none d-lg-flex ms-2">
                            <Link className="btn-sm-square bg-white rounded-circle ms-3" to="/">
                                <small className="fa fa-search text-body"></small>
                            </Link>
                            <Link className="btn-sm-square bg-white rounded-circle ms-3" to="/">
                                <small className="fa fa-user text-body"></small>
                            </Link>
                            <Link className="btn-sm-square bg-white rounded-circle ms-3" to="/">
                                <small className="fa fa-shopping-bag text-body"></small>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            {/* Navbar End */}
        </div>
    )
}

export default Navbar;