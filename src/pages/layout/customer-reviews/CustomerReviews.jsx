import { useEffect } from "react"
import SecondaryPageMastheadHeader from "../components/seconday-page-masthead-header/SecondayPageMastheadHeader";
import Testimonials from "../components/testimonials/Testimonials";

import firstHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';
import { useDispatch } from "react-redux";
import { setLoadingSpinner } from "../../../store/features/loading/loadingSlice";

const testimonialsDataForCarousel = [
    {
        id: '1',
        imageSrc: firstHomePageCarouselImage,
        imageAlt: 'Gallery Testimonial 1',
        textContent: 'Gallery Review From User 1'
    },
    {
        id: '2',
        imageSrc: firstHomePageCarouselImage,
        imageAlt: 'Gallery Testimonial 2',
        textContent: 'Gallery Review From User 2'
    },
    {
        id: '3',
        imageSrc: firstHomePageCarouselImage,
        imageAlt: 'Gallery Testimonial 3',
        textContent: 'Gallery Review From User 3'
    },
    {
        id: '4',
        imageSrc: firstHomePageCarouselImage,
        imageAlt: 'Gallery Testimonial 4',
        textContent: 'Gallery Review From User 4'
    },
];

export default function CustomerReviews() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoadingSpinner(true));
        setTimeout(() => {
            dispatch(setLoadingSpinner(false));
        }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="customer-reviews-wrapper">
            <SecondaryPageMastheadHeader title="Testimonials" />
            <Testimonials testimonialsDataForCarousel={testimonialsDataForCarousel} />
        </div>
    )
}