
import React from "react";

import BlogPostSelectionCard from "./blog-post-selection-card/BlogPostSelectionCard";

class LatestBlogPostsSelection extends React.Component {
    render() {
        return (
            <div className="latest-blog-posts-selection-wrapper">
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 + 'px' }}>
                            <h1 className="display-5 mb-3">Latest Blog</h1>
                            <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                        </div>
                        <div className="row g-4">
                            {
                                this.props.latestBlogPostsForSelection.map((latestBlogPostForSelection, index) => (
                                    <BlogPostSelectionCard blogPostSelectionDetails={latestBlogPostForSelection} key={index}  />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LatestBlogPostsSelection;