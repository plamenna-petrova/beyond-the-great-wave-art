
import { useEffect, useState } from 'react';

import firstHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';
import secondHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';

import SecondaryPageMastheadHeader from '../components/seconday-page-masthead-header/SecondayPageMastheadHeader';
import GalleriesSelection from "../components/galleries-selection/GalleriesSelection";
import Invitation from '../components/invitation/Invitation';
import Testimonials from '../components/testimonials/Testimonials';

import { fillGalleriesSelectionWithSampleData  } from '../../../helpers/functions';

const sectionsImages = [
    {
        relativePath: firstHomePageCarouselImage,
        alt: 'First Home Page Carousel Resource'
    },
    {
        relativePath: secondHomePageCarouselImage,
        alt: 'Second Home Page Carousel Resource'
    }
];

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

const Galleries = () => {
    const [galleriesForSelection, setGalleriesForSelection] = useState([]);

    useEffect(() => {
        setGalleriesForSelection(fillGalleriesSelectionWithSampleData(sectionsImages));
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

export default Galleries;