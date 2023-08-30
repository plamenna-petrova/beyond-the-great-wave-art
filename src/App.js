import { Routes, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/navbar/Navbar';
import Home from "./pages/layout/home/Home";
import AboutUs from "./pages/layout/about-us/AboutUs";
import ContactUs from "./pages/layout/contact-us/ContactUs";
import Footer from "./components/footer/Footer";
import ScrollToTopButton from "./components/scroll-to-top-button/ScrollToTopButton";
import NotFoundPage from "./pages/layout/not-found-page/NotFoundPage";
import Galleries from "./pages/layout/galleries/Galleries";
import Blog from "./pages/layout/blog/Blog";
import CustomerReviews from "./pages/layout/customer-reviews/CustomerReviews";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import Spinner from "./components/spinner/Spinner";

import { useSelector } from "react-redux";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";

import FieldsManagement from "./pages/dashboard/fields-management/FieldsManagement";
import ArtMovementsManagement from "./pages/dashboard/art-movements-management/ArtMovementsManagement";
import ArtistsManagement from "./pages/dashboard/artists-management/ArtistsManagement";
import GalleriesManagement from "./pages/dashboard/galleries-management/GalleriesManagement";
import GenresManagement from "./pages/dashboard/genres-management/GenresManagement";
import NationalitiesManagement from "./pages/dashboard/nationalities-management/NationalitiesManagement";
import CenturiesManagement from "./pages/dashboard/centuries-management/CenturiesManagement";
import StylesManagement from "./pages/dashboard/styles-management/StylesManagement";

export default function App() {
    const isLoadingSpinnerActive = useSelector((state) => state.loading.isLoadingSpinnerActive);

    return (
        <div className="App">
            {isLoadingSpinnerActive && <Spinner />}
            <Navbar />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="/galleries" element={<Galleries />}></Route>
                <Route path="/about-us" element={<AboutUs />}></Route>
                <Route path="/contact-us" element={<ContactUs />}></Route>
                <Route path="/blog" element={<Blog />}></Route>
                <Route path="/testimonials" element={<CustomerReviews />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                <Route path="dashboard" element={<Dashboard />}>
                    <Route path="fields-management" element={<FieldsManagement />}></Route>
                    <Route path="genres-management" element={<GenresManagement />}></Route>
                    <Route path="art-movements-management" element={<ArtMovementsManagement />}></Route>
                    <Route path="nationalities-management" element={<NationalitiesManagement />}></Route>
                    <Route path="centuries-management" element={<CenturiesManagement />}></Route>
                    <Route path="artists-management" element={<ArtistsManagement />}></Route>
                    <Route path="galleries-management" element={<GalleriesManagement />}></Route>
                    <Route path="styles-management" element={<StylesManagement />}></Route>
                </Route>
                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}