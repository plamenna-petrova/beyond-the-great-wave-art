
import React from 'react';

class MastheadHeader extends React.Component {
    render() {
        return (
            <div className="masthead-header-wrapper">
                {/* Carousel start */}
                <div className="container-fluid p-0 mb-5 wow fadeIn" data-wow-delay="0.1s">
                    <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="w-100" src={this.props.mastheadHeaderCarouselImages[0].relativePath} alt={this.props.mastheadHeaderCarouselImages[0].alt} />
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
                                <img className="w-100" src={this.props.mastheadHeaderCarouselImages[1].relativePath} alt={this.props.mastheadHeaderCarouselImages[1].alt} />
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
            </div>
        )
    }
}

export default MastheadHeader;