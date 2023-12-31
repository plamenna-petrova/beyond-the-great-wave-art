
import React from "react";

export default function Features({ featuresImages }) {
    return (
        <div className="features-wrapper">
            <div className="container-fluid bg-light bg-icon my-5 py-6">
                <div className="container">
                    <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 + 'px' }}>
                        <h1 className="display-5 mb-3">Our Features</h1>
                        <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-white text-center h-100 p-4 p-xl-5">
                                <img className="img-fluid mb-4" src={featuresImages[0].src} alt={featuresImages[0].alt} />
                                <h4 className="mb-3">Modern Galleries</h4>
                                <p className="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                                <a className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill" href="/">Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="bg-white text-center h-100 p-4 p-xl-5">
                                <img className="img-fluid mb-4" src={featuresImages[0].src} alt={featuresImages[0].alt} />
                                <h4 className="mb-3">Modern Galleries</h4>
                                <p className="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                                <a className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill" href="/">Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="bg-white text-center h-100 p-4 p-xl-5">
                                <img className="img-fluid mb-4" src={featuresImages[0].src} alt={featuresImages[0].alt} />
                                <h4 className="mb-3">Modern Galleries</h4>
                                <p className="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                                <a className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill" href="/">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}