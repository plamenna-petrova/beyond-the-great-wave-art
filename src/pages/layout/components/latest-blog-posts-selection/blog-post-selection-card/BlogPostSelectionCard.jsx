
import React from "react";

export default function BlogPostSelectionCard({ blogPostSelectionDetails }) {
    return (
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <img className="img-fluid" src={blogPostSelectionDetails.image.src} alt={blogPostSelectionDetails.image.alt} />
            <div className="bg-light p-4">
                <a className="d-block h5 lh-base mb-4" href="/">{blogPostSelectionDetails.title}</a>
                <div className="text-muted border-top pt-4">
                    <small className="me-3"><i className="fa fa-user text-primary me-2"></i>{blogPostSelectionDetails.author}</small>
                    <small className="me-3"><i className="fa fa-calendar text-primary me-2"></i>{blogPostSelectionDetails.createdOn}</small>
                </div>
            </div>
        </div>
    )
}