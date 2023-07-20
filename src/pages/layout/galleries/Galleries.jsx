
import { useEffect, useState } from 'react';

import SecondaryPageMastheadHeader from '../components/seconday-page-masthead-header/SecondayPageMastheadHeader';
import GalleriesSelection from "../components/galleries-selection/GalleriesSelection";
import Invitation from '../components/invitation/Invitation';
import Testimonials from '../components/testimonials/Testimonials';

import firstHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';
import { useDispatch } from 'react-redux';
import { setLoadingSpinner } from '../../../store/features/loading/loadingSlice';

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

export default function Galleries() {
    const dispatch = useDispatch();

    const [galleriesForSelection, setGalleriesForSelection] = useState([]);

    useEffect(() => {
        dispatch(setLoadingSpinner(true));

        const sampleGalleries = [];

        for (let i = 0; i < 24; i++) {
            sampleGalleries.push({
                id: i + 1,
                name: 'Modern Gallery',
                location: 'London, UK',
                image: {
                    src: firstHomePageCarouselImage,
                    alt: 'Modern Gallery Image'
                }
            })
        }

        setGalleriesForSelection(sampleGalleries);

        setTimeout(() => {
            dispatch(setLoadingSpinner(false));
        }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="galleries-wrapper">
            <SecondaryPageMastheadHeader title="Galleries" />
            <GalleriesSelection galleriesForSelection={galleriesForSelection} />
            <Invitation />
            <Testimonials testimonialsDataForCarousel={testimonialsDataForCarousel} />
        </div>
    )
}