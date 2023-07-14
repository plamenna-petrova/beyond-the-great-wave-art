

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const navLinkBaseClass = 'nav-item nav-link';
const dropDownToggleBaseClass = 'nav-link dropdown-toggle';
const dropDownItemBaseClass = 'dropdown-item';

const addActivityIndicationClassToNavLink = (isCurrentRouteActive, navigationArgs) => {
    const [isPrimaryNavigation, dropdownNavigationArgs] = navigationArgs;
    const [isDropdownToggle, isDropdownItem] = dropdownNavigationArgs || [];

    if (isPrimaryNavigation && dropdownNavigationArgs !== []) {
        return isCurrentRouteActive ? `${navLinkBaseClass} active` : `${navLinkBaseClass}`;
    } else {
        if (isDropdownToggle && !isDropdownItem) {
            return isCurrentRouteActive ? `${dropDownToggleBaseClass} active` : `${dropDownToggleBaseClass}`;
        } else if (!isDropdownToggle && isDropdownItem) {
            return isCurrentRouteActive ? `${dropDownItemBaseClass} active` : `${dropDownItemBaseClass}`;
        } else {
            return '';
        }
    }
}

export default function Navbar() {
    return (
        <div className="navbar-wrapper">
            <div className="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s">
                <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
                    <div className="col-lg-6 px-5 text-start">
                        <small><i className="fa fa-map-marker-alt me-2"></i>123 Wave Street, Kanagawa, Japan</small>
                        <small className="ms-4"><i className="fa fa-envelope me-2"></i>info@example.com</small>
                    </div>
                    <div className="col-lg-6 px-5 text-end">
                        <small>Follow us:</small>
                        <Link className="text-body ms-3" to="/"><i className="fab fa-facebook-f"></i></Link>
                        <Link className="text-body ms-3" to="/"><i className="fab fa-twitter"></i></Link>
                        <Link className="text-body ms-3" to="/"><i className="fab fa-linkedin-in"></i></Link>
                        <Link className="text-body ms-3" to="/"><i className="fab fa-instagram"></i></Link>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
                    <Link to="/" className="navbar-brand ms-4 ms-lg-0">
                    </Link>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <NavLink to="/" className={({ isActive }) => addActivityIndicationClassToNavLink(isActive, [true, null])}>Home</NavLink>
                            <NavLink to="/galleries" className={({ isActive }) => addActivityIndicationClassToNavLink(isActive, [true, null])}>Galleries</NavLink>
                            <div className="nav-item dropdown">
                                <NavLink to="/" className={() => addActivityIndicationClassToNavLink(false, [false, [true, false]])} data-bs-toggle="dropdown">Features</NavLink>
                                <div className="dropdown-menu m-0">
                                    <NavLink to="/blog" className={({ isActive }) => addActivityIndicationClassToNavLink(isActive, [false, [false, true]])}>Blog</NavLink>
                                    <NavLink to="/testimonials" className={({ isActive }) => addActivityIndicationClassToNavLink(isActive, [false, [false, true]])}>Testimonials</NavLink>
                                </div>
                            </div>
                            <NavLink to="/about-us" className={({ isActive }) => addActivityIndicationClassToNavLink(isActive, [true, null])}>About Us</NavLink>
                            <NavLink to="/contact-us" className={({ isActive }) => addActivityIndicationClassToNavLink(isActive, [true, null])}>Contact Us</NavLink>
                        </div>
                        <div className="d-none d-lg-flex ms-2">
                            <Link className="btn-sm-square bg-white rounded-circle ms-3" to="/">
                                <small className="fa fa-search text-body"></small>
                            </Link>
                            <Link className="btn-sm-square bg-white rounded-circle ms-3" to="/">
                                <small className="fa fa-user text-body"></small>
                            </Link>
                            <Link className="btn-sm-square bg-white rounded-circle ms-3" to="/">
                                <small className="fa fa-shopping-bag text-body"></small>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}