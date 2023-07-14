
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
import CustomerReviews from "./pages/layout/components/customer-reviews/CustomerReviews";

const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/galleries',
        element: <Galleries />
    },
    {
        path: '/about-us',
        element: <AboutUs />
    },
    {
        path: '/contact-us',
        element: <ContactUs />
    },
    {
        path: '/blog',
        element: <Blog />
    },
    {
        path: '/testimonials',
        element: <CustomerReviews />
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                {
                    routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))
                }
            </Routes>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}

export default App;