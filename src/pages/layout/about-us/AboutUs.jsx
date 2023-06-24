
import { Link } from "react-router-dom";

import firstHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';
import secondHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';

import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-wrapper">
      <div className="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <h1 className="display-3 mb-3 animated slideInDown about-us-heading">About Us</h1>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="about-img position-relative overflow-hidden p-5 pe-0">
                <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt={'About Us Header'} />
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 className="display-5 mb-4">Best Contemporary Galleries</h1>
              <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
              <p><i className="fa fa-check text-primary me-3"></i>Tempor erat elitr rebum at clita</p>
              <p><i className="fa fa-check text-primary me-3"></i>Aliqu diam amet diam et eos</p>
              <p><i className="fa fa-check text-primary me-3"></i>Clita duo justo magna dolore erat amet</p>
              <Link to="/" className="btn btn-primary rounded-pill py-3 px-5 mt-3">Read More</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-primary bg-icon mt-5 py-6">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-md-7 wow fadeIn" data-wow-delay="0.1s">
              <h1 className="display-5 text-white mb-3">Visit Our Company</h1>
              <p className="text-white mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.</p>
            </div>
            <div className="col-md-5 text-md-end wow fadeIn" data-wow-delay="0.5s">
              <Link to="/" className="btn btn-lg btn-secondary rounded-pill py-3 px-5">Visit Now</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-light bg-icon py-6">
        <div className="container">
          <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 + 'px' }}>
            <h1 className="display-5 mb-3">Our Features</h1>
            <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="bg-white text-center h-100 p-4 p-xl-5">
                <img className="img-fluid mb-4" src={secondHomePageCarouselImage} alt={'About Us Feature'} />
                <h4 className="mb-3">Modern Galleries</h4>
                <p className="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                <Link to="/" className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill">Read More</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="bg-white text-center h-100 p-4 p-xl-5">
                <img className="img-fluid mb-4" src={secondHomePageCarouselImage} alt={'About Us Feature'} />
                <h4 className="mb-3">Modern Galleries</h4>
                <p className="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                <Link to="/" className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill">Read More</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="bg-white text-center h-100 p-4 p-xl-5">
                <img className="img-fluid mb-4" src={secondHomePageCarouselImage} alt={'About Us Feature'} />
                <h4 className="mb-3">Modern Galleries</h4>
                <p className="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                <Link to="/" className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;