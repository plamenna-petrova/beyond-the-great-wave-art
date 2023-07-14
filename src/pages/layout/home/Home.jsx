
import { useEffect, useState } from 'react';

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

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [sectionsImages, setSectionsImages] = useState([]);
    const [testimonialsDataForCarousel, setTestimonialsDataForCarousel] = useState([]);
    const [galleriesForSelection, setGalleriesForSelection] = useState([]);
    const [latestBlogPostsForSelection, setLatestBlogPostsForSelection] = useState([]);

    useEffect(() => {
        const loadSectionImagesAsync = async () => {
            setIsLoaded(false);
            await getSectionsImages().then(async (images) => {
                setSectionsImages(images);
                await getTestimonialsDataForCarousel().then(async (data) => {
                    setTestimonialsDataForCarousel(data);
                    await fillGalleriesSelectionWithSampleData(images).then(async (galleries) => {
                        setGalleriesForSelection(galleries);
                        await fillBlogPostsSelectionWithSampleData(images).then(async (blogPosts) => {
                            setLatestBlogPostsForSelection(blogPosts);
                        }).catch((error) => {
                            throw error;
                        });
                    }).catch((error) => {
                        throw error;
                    });
                    setIsLoaded(true);
                }).catch((error) => {
                    throw error;
                });
            }).catch((error) => {
                setIsLoaded(false);
            });
        }
        loadSectionImagesAsync().then(() => {
            setIsLoaded(true);
            console.log('set to false');
        });
    }, []);

    return (
        <div className="home-wrapper">
            {!isLoaded && <Spinner />}
            {isLoaded && (
                <div>
                    <MastheadHeader mastheadHeaderCarouselImages={sectionsImages.slice(0, 2)} />
                    <Introduction aboutImage={sectionsImages[0]} />
                    <Features featuresImages={sectionsImages} />
                    <GalleriesSelection galleriesForSelection={galleriesForSelection} />
                    <Invitation />
                    <Testimonials testimonialsDataForCarousel={testimonialsDataForCarousel} />
                    <LatestBlogPostsSelection latestBlogPostsForSelection={latestBlogPostsForSelection} />
                </div>
            )}
        </div>
    );
}

export default Home;