
import React from "react";

import GallerySelectionCard from "./gallery-selection-card/GallerySelectionCard";

class GalleriesSelection extends React.Component {
    render() {
        return (
            <div className="galleries-selection-wrapper">
                {/* Galleries Selection Start */}
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
                                    {
                                        this.props.galleriesForSelection.slice(0, 8).map(galleryForSelection => (
                                            <GallerySelectionCard gallerySelectionCardDetails={galleryForSelection} key={galleryForSelection.id} />
                                        ))
                                    }
                                    <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                                        <a className="btn btn-primary rounded-pill mt-5 py-3 px-5" href="/">Browse For More Galleries</a>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-2" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    {
                                        this.props.galleriesForSelection.slice(8, 16).map(galleryForSelection => (
                                            <GallerySelectionCard gallerySelectionCardDetails={galleryForSelection} key={galleryForSelection.id} />
                                        ))
                                    }
                                    <div className="col-12 text-center">
                                        <a className="btn btn-primary rounded-pill py-3 px-5" href="/">Browse For More Galleries</a>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-3" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    {
                                        this.props.galleriesForSelection.slice(16, 24).map(galleryForSelection => (
                                            <GallerySelectionCard gallerySelectionCardDetails={galleryForSelection} key={galleryForSelection.id} />
                                        ))
                                    }
                                    <div className="col-12 text-center">
                                        <a className="btn btn-primary rounded-pill py-3 px-5" href="/">Browse For More Galleries</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Galleries Selection End */}
            </div>
        )
    }
}

export default GalleriesSelection;