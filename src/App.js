
import { Routes, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/navbar/Navbar';
import Home from "./pages/layout/home/Home";
import Footer from "./components/footer/Footer";

const App = () => {
    return (
        <div className="App">
            <Navbar />

            {/* Router Outlet Start */}
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            {/* Router Outlet End */}

            <Footer />

            {/* Back to Top */}
            <a href="/" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up"></i></a>
        </div>
    );
}

export default App;
