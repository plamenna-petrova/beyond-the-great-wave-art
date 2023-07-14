
import { useEffect, useState } from 'react';

import './ScrollToTopButton.css';

export default function ScrollToTopButton() {
    const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowScrollToTopButton(true);
            } else {
                setShowScrollToTopButton(false);
            }
        })
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <>
            {" "}
            {showScrollToTopButton && (
                <div className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top" onClick={scrollToTop}>
                    <i className="bi bi-arrow-up"></i>
                </div>
            )}
            {" "}
        </>
    )
}