
import React from "react";

import { Carousel } from 'antd';

const testimonialImagesForCarouselStyle = {
    width: 90 + 'px',
    height: 90 + 'px'
};

class Testimonials extends React.Component {
    render() {
        return (
            <div className="testimonials-wrapper">
                <div className="container-fluid bg-light bg-icon py-6 mb-5">
                    <div className="container">
                        <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 + 'px' }}>
                            <h1 className="display-5 mb-3">Customer Review</h1>
                            <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                        </div>
                        <Carousel effect='scrollX' autoplay waitForAnimate={true} dotPosition={'bottom'} dots={{ className: 'testimonials-dots' }}>
                            {
                                this.props.testimonialsDataForCarousel.map(testimonialsDatumForCarousel => (
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
            </div>
        )
    }
}

export default Testimonials;