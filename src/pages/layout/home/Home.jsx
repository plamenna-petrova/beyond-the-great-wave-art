
import { useEffect, useState } from 'react';

import firstHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';
import secondHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';

import MastheadHeader from './components/masthead-header/MastheadHeader';
import Introduction from './components/introduction/Introduction';
import Features from './components/features/Features';
import GalleriesSelection from './components/galleries-selection/GalleriesSelection';
import Invitation from './components/invitation/Invitation';
import Testimonials from './components/testimonials/Testimonials';
import LatestBlogPostsSelection from './components/latest-blog-posts-selection/LatestBlogPostsSelection';

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

const Home = () => {
    const [galleriesForSelection, setGalleriesForSelection] = useState([]);
    const [latestBlogPostsForSelection, setLatestBlogPostsForSelection] = useState([]);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        const sampleBlogPostsForSelection = [];

        for (let i = 0; i < 3; i++) {
            const currentDate = new Date();
            sampleBlogPostsForSelection.push({
                id: i + 1,
                title: 'Blog Post About Modern Gallery',
                author: 'Admin',
                createdOn: `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`,
                image: {
                    src: firstHomePageCarouselImage,
                    alt: 'Modern Gallery Image'
                }
            })
        }

        setLatestBlogPostsForSelection(sampleBlogPostsForSelection);
    }, []);

    return (
        <div className="home-wrapper">
            <MastheadHeader mastheadHeaderCarouselImages={sectionsImages.slice(0, 2)} />
            <Introduction aboutImage={sectionsImages[0]} />
            <Features featuresImages={sectionsImages} />
            <GalleriesSelection galleriesForSelection={galleriesForSelection} />
            <Invitation />
            <Testimonials testimonialsDataForCarousel={testimonialsDataForCarousel} />
            <LatestBlogPostsSelection latestBlogPostsForSelection={latestBlogPostsForSelection} />
        </div>
    );
}

export default Home;