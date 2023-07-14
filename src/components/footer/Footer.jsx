
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <div className="container-fluid bg-dark footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s" style={{ textAlign: 'initial' }}>
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h1 className="fw-bold text-primary mb-4">Beyond The Great Wave Art</h1>
                            <p>Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita</p>
                            <div className="d-flex pt-2">
                                <Link to="/" className="btn btn-square btn-outline-light rounded-circle me-1"><i className="fab fa-twitter"></i></Link>
                                <Link to="/" className="btn btn-square btn-outline-light rounded-circle me-1"><i className="fab fa-facebook-f"></i></Link>
                                <Link to="/" className="btn btn-square btn-outline-light rounded-circle me-1"><i className="fab fa-youtube"></i></Link>
                                <Link to="/" className="btn btn-square btn-outline-light rounded-circle me-0"><i className="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-light mb-4">Address</h4>
                            <p><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                            <p><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                            <p><i className="fa fa-envelope me-3"></i>info@example.com</p>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-light mb-4">Quick Links</h4>
                            <Link to="/" className="btn btn-link">About Us</Link>
                            <Link to="/" className="btn btn-link">Contact Us</Link>
                            <Link to="/" className="btn btn-link">Our Services</Link>
                            <Link to="/" className="btn btn-link">Terms & Condition</Link>
                            <Link to="/" className="btn btn-link">Support</Link>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-light mb-4">Newsletter</h4>
                            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                            <div className="position-relative mx-auto" style={{ maxWidth: 400 + 'px' }}>
                                <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                                <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <a href="/">Your Site Name</a>, All Right Reserved.
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                Designed By <a href="https://htmlcodex.com">HTML Codex</a>
                                <br />Distributed By: <a href="https://themewagon.com" target="_blank" rel="noreferrer">ThemeWagon</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}