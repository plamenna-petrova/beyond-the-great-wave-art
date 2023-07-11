
import React from 'react';

class Introduction extends React.Component {
    render() {
        return (
            <div className="about-wrapper">
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                <div className="about-img position-relative overflow-hidden p-5 pe-0">
                                    <img className="img-fluid w-100" src={this.props.aboutImage.relativePath} alt={this.props.aboutImage.alt} />
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                <h1 className="display-5 mb-4">Best Contemporary Galleries</h1>
                                <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                                <p><i className="fa fa-check text-primary me-3"></i>Tempor erat elitr rebum at clita</p>
                                <p><i className="fa fa-check text-primary me-3"></i>Aliqu diam amet diam et eos</p>
                                <p><i className="fa fa-check text-primary me-3"></i>Clita duo justo magna dolore erat amet</p>
                                <a href="/" className="btn btn-primary rounded-pill py-3 px-5 mt-3">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Introduction;