

import firstHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';
import secondHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';

import { Carousel } from 'antd';

import MastheadHeader from './components/MastheadHeader';
import About from './components/About';
import Features from './components/Features';

const sectionsImages = [
    {
        relativePath: firstHomePageCarouselImage,
        alt: 'First Home Page Carousel Resource'
    },
    {
        relativePath: secondHomePageCarouselImage,
        alt: 'Second Home Page Carousel Resource'
    }
];

const testimonialsDataForCarousel = [
    {
        id: '1',
        imageSrc: firstHomePageCarouselImage,
        imageAlt: 'Gallery Testimonial 1',
        textContent: 'Gallery Review From User 1'
    },
    {
        id: '2',
        imageSrc: firstHomePageCarouselImage,
        imageAlt: 'Gallery Testimonial 2',
        textContent: 'Gallery Review From User 2'
    },
    {
        id: '3',
        imageSrc: firstHomePageCarouselImage,
        imageAlt: 'Gallery Testimonial 3',
        textContent: 'Gallery Review From User 3'
    },
    {
        id: '4',
        imageSrc: firstHomePageCarouselImage,
        imageAlt: 'Gallery Testimonial 4',
        textContent: 'Gallery Review From User 4'
    },
];

const testimonialImagesForCarouselStyle = {
    width: 90 + 'px',
    height: 90 + 'px'
};

const Home = () => {
    return (
        <div className="home-wrapper">
            <MastheadHeader mastheadHeaderCarouselImages={sectionsImages.slice(0, 2)} />
            <About aboutImage={sectionsImages[0]} />
            <Features featuresImages={sectionsImages} />

            {/* Galleries Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-0 gx-5 align-items-end">
                        <div className="col-lg-6">
                            <div className="section-header text-start mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 + 'px' }}>
                                <h1 className="display-5 mb-3">Galleries List</h1>
                                <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
                            <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
                                <li className="nav-item me-2">
                                    <a className="btn btn-outline-primary border-2 active" data-bs-toggle="pill" href="#tab-1">Contemporary</a>
                                </li>
                                <li className="nav-item me-2">
                                    <a className="btn btn-outline-primary border-2" data-bs-toggle="pill" href="#tab-2">Historical</a>
                                </li>
                                <li className="nav-item me-0">
                                    <a className="btn btn-outline-primary border-2" data-bs-toggle="pill" href="#tab-3">Abstract</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Classy Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                                    <a className="btn btn-primary rounded-pill mt-5 py-3 px-5" href="/">Browse More Products</a>
                                </div>
                            </div>
                        </div>
                        <div id="tab-2" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <a className="btn btn-primary rounded-pill py-3 px-5" href="/">Browse More Products</a>
                                </div>
                            </div>
                        </div>
                        <div id="tab-3" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="product-item">
                                        <div className="position-relative bg-light overflow-hidden">
                                            <img className="img-fluid w-100" src={firstHomePageCarouselImage} alt="" />
                                            <div className="bg-secondary rounded text-primary position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        </div>
                                        <div className="text-center p-4">
                                            <a className="d-block h5 mb-2" href="/">Modern Gallery</a>
                                            <span className="text-primary me-1">London, UK</span>
                                            <span className="text-body text-decoration-line-through"></span>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="w-50 text-center border-end py-2">
                                                <a className="text-body" href="/"><i className="fa fa-eye text-primary me-2"></i>View detail</a>
                                            </small>
                                            <small className="w-50 text-center py-2">
                                                <a className="text-body" href="/"><i className="fa fa-shopping-bag text-primary me-2"></i>Review</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <a className="btn btn-primary rounded-pill py-3 px-5" href="/">Browse More Products</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Galleries End */}

            {/* Firm Visit Start */}
            <div className="container-fluid bg-primary bg-icon mt-5 py-6">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-7 wow fadeIn" data-wow-delay="0.1s">
                            <h1 className="display-5 text-white mb-3">Visit Our Firm</h1>
                            <p className="text-white mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet. Diam dolor diam ipsum sit. Aliqu diam amet diam
                                et eos.</p>
                        </div>
                        <div className="col-md-5 text-md-end wow fadeIn" data-wow-delay="0.5s">
                            <a className="btn btn-lg btn-secondary rounded-pill py-3 px-5" href="/">Visit Now</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Firm Visit End */}

            {/* Testimonials Start */}
            <div className="container-fluid bg-light bg-icon py-6 mb-5">
                <div className="container">
                    <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 + 'px' }}>
                        <h1 className="display-5 mb-3">Customer Review</h1>
                        <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                    </div>
                    <Carousel effect='scrollX' autoplay waitForAnimate={true} dotPosition={'bottom'} dots={{ className: 'testimonials-dots' }}>
                        {
                            testimonialsDataForCarousel.map(testimonialsDatumForCarousel => (
                                <div key={testimonialsDatumForCarousel.id}>
                                    <div className="testimonial-item position-relative bg-white p-5 mt-4">
                                        <i className="fa fa-quote-left fa-3x text-primary position-absolute top-0 start-0 mt-n4 ms-5"></i>
                                        <h4 className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</h4>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img className="flex-shrink-0 rounded-circle" src={testimonialsDatumForCarousel.imageSrc} style={testimonialImagesForCarouselStyle} alt={testimonialsDatumForCarousel.imageAlt} />
                                            <div className="ms-3">
                                                <h5 className="mb-1">Client Name</h5>
                                                <span>Profession</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
            {/* Testimonials End */}

            {/* Blog Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 + 'px' }}>
                        <h1 className="display-5 mb-3">Latest Blog</h1>
                        <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <img className="img-fluid" src={firstHomePageCarouselImage} alt="" />
                            <div className="bg-light p-4">
                                <a className="d-block h5 lh-base mb-4" href="/">The best works of modern art</a>
                                <div className="text-muted border-top pt-4">
                                    <small className="me-3"><i className="fa fa-user text-primary me-2"></i>Admin</small>
                                    <small className="me-3"><i className="fa fa-calendar text-primary me-2"></i>01 Jan, 2045</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <img className="img-fluid" src={firstHomePageCarouselImage} alt="" />
                            <div className="bg-light p-4">
                                <a className="d-block h5 lh-base mb-4" href="/">The best works of modern art</a>
                                <div className="text-muted border-top pt-4">
                                    <small className="me-3"><i className="fa fa-user text-primary me-2"></i>Admin</small>
                                    <small className="me-3"><i className="fa fa-calendar text-primary me-2"></i>01 Jan, 2045</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <img className="img-fluid" src={firstHomePageCarouselImage} alt="" />
                            <div className="bg-light p-4">
                                <a className="d-block h5 lh-base mb-4" href="/">The best works of modern art</a>
                                <div className="text-muted border-top pt-4">
                                    <small className="me-3"><i className="fa fa-user text-primary me-2"></i>Admin</small>
                                    <small className="me-3"><i className="fa fa-calendar text-primary me-2"></i>01 Jan, 2045</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Blog End */}
        </div>
    );
}

export default Home;