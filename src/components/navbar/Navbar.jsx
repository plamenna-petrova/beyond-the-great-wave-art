
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { getSignedInUserDetailsFromQuerySnapshot, signOutAsync } from "../../services/auth-service";

import { Button } from "antd";
import { authenticateUser } from "../../store/features/auth/authSlice";
import { auth } from "../../firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { setLoadingSpinner } from "../../store/features/loading/loadingSlice";

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
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [firebaseUser, loading] = useAuthState(auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        await signOutAsync().then(() => {
            dispatch(authenticateUser({ currentUser: null }));
            dispatch(setLoadingSpinner(true));
            navigate('/login');
        }).catch((error) => {
            console.log('error', error);
        });
    }

    const setCurrentUser = async (authenticatedUser) => {
        const { uid, email, accessToken, refreshToken } = authenticatedUser;

        const signedInUserDetails = await getSignedInUserDetailsFromQuerySnapshot(uid);

        if (signedInUserDetails) {
            const { username, authProvider, role } = signedInUserDetails;

            dispatch(authenticateUser({
                currentUser: {
                    uid,
                    email,
                    username,
                    authProvider,
                    role,
                    isNewUser: false,
                    accessToken,
                    refreshToken
                }
            }));
        }
    }

    useEffect(() => {
        if (loading) {
            return;
        }

        if (firebaseUser) {
            if (!currentUser) {
                setCurrentUser(firebaseUser);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firebaseUser, loading]);

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
                            <NavLink className="btn-sm-square bg-white rounded-circle ms-3" to="/">
                                <small className="fa fa-search text-body"></small>
                            </NavLink>
                            <NavLink className="btn-sm-square bg-white rounded-circle ms-3" to="/login">
                                <small className="fa fa-user text-body"></small>
                            </NavLink>
                            <NavLink className="btn-sm-square bg-white rounded-circle ms-3" to="/">
                                <small className="fa fa-shopping-bag text-body"></small>
                            </NavLink>
                            {
                                (currentUser && !currentUser.isNewUser && currentUser.role === 'admin') &&
                                <NavLink className="btn-sm-square bg-white rounded-circle ms-3" to="/dashboard">
                                    <small className="fas fa-tachometer-alt text-body"></small>
                                </NavLink>
                            }

                        </div>
                        {
                            (currentUser && !currentUser.isNewUser) && <Button type="primary" onClick={logout}>Logout</Button>
                        }
                    </div>
                </nav>
            </div>
        </div>
    )
}