
import { useCallback, useEffect, useState } from 'react';

import Spinner from '../../../components/spinner/Spinner';

import MastheadHeader from './masthead-header/MastheadHeader';
import Introduction from '../components/introduction/Introduction';
import Features from '../components/features/Features';
import GalleriesSelection from '../components/galleries-selection/GalleriesSelection';
import Invitation from '../components/invitation/Invitation';
import Testimonials from '../components/testimonials/Testimonials';
import LatestBlogPostsSelection from '../components/latest-blog-posts-selection/LatestBlogPostsSelection';

import {
    fillGalleriesSelectionWithSampleData,
    fillBlogPostsSelectionWithSampleData,
    getSectionsImages,
    getTestimonialsDataForCarousel
} from '../../../helpers/functions';

export default function Home() {
    const [isHomePageDataLoaded, setIsHomePageDataLoaded] = useState(false);
    const [sectionsImages, setSectionsImages] = useState([]);
    const [testimonialsDataForCarousel, setTestimonialsDataForCarousel] = useState([]);
    const [galleriesForSelection, setGalleriesForSelection] = useState([]);
    const [latestBlogPostsForSelection, setLatestBlogPostsForSelection] = useState([]);

    const loadHomePageDataAsync = useCallback(async () => {
        await getSectionsImages().then(async (images) => {
            setSectionsImages(images);
            await getTestimonialsDataForCarousel().then(async (data) => {
                setTestimonialsDataForCarousel(data);
                await fillGalleriesSelectionWithSampleData(images).then(async (galleries) => {
                    setGalleriesForSelection(galleries);
                    await fillBlogPostsSelectionWithSampleData(images).then(async (blogPosts) => {
                        setLatestBlogPostsForSelection(blogPosts);
                        setIsHomePageDataLoaded(true);
                    }).catch((error) => {
                        throw error;
                    });
                }).catch((error) => {
                    throw error;
                });
            }).catch((error) => {
                throw error;
            });
        }).catch((error) => {
            console.log('error', error);
            setIsHomePageDataLoaded(false);
        });
    }, []);

    useEffect(() => {
        loadHomePageDataAsync()
            .catch((error) => console.log('error', error));
    }, [loadHomePageDataAsync]);

    return (
        <div className="home-wrapper">
            {!isHomePageDataLoaded && <Spinner />}
            {isHomePageDataLoaded && (
                <>
                    <MastheadHeader mastheadHeaderCarouselImages={sectionsImages.slice(0, 2)} />
                    <Introduction introductionImage={sectionsImages[0]} />
                    <Features featuresImages={sectionsImages} />
                    <GalleriesSelection galleriesForSelection={galleriesForSelection} />
                    <Invitation />
                    <Testimonials testimonialsDataForCarousel={testimonialsDataForCarousel} />
                    <LatestBlogPostsSelection latestBlogPostsForSelection={latestBlogPostsForSelection} />
                </>
            )}
        </div>
    );
}