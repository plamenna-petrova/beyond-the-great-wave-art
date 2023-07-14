
import React from "react";

import './SecondaryPageMastheadHeader.css';

class SecondaryPageMastheadHeader extends React.Component {
    render() {
        return (
            <div className="container-fluid page-header wow fadeIn" data-wow-delay="0.1s">
                <div className="container">
                    <h1 className="display-3 mb-3 animated slideInDown secondary-page-masthead-header-heading" aria-current="page">{ this.props.title }</h1>
                </div>
            </div>
        )
    }
}

export default SecondaryPageMastheadHeader;