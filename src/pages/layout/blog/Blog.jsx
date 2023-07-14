import { useEffect } from "react";
import { useState } from "react";
import { fillBlogPostsSelectionWithSampleData, getSectionsImages } from "../../../helpers/functions";

import Spinner from "../../../components/spinner/Spinner";
import LatestBlogPostsSelection from "../components/latest-blog-posts-selection/LatestBlogPostsSelection";
import SecondaryPageMastheadHeader from "../components/seconday-page-masthead-header/SecondayPageMastheadHeader";

export default function Blog() {
    const [isBlogPageDataLoaded, setIsBlogPageDataLoaded] = useState(false);
    const [latestBlogPostsForSelection, setLatestBlogPostsForSelection] = useState([]);

    useEffect(() => {
        const loadBlogPageDataAsync = async () => {
            await getSectionsImages().then(async (images) => {
                await fillBlogPostsSelectionWithSampleData(images).then(async (blogPosts) => {
                    setLatestBlogPostsForSelection(blogPosts);
                    setIsBlogPageDataLoaded(true);
                }).catch((error) => {
                    throw error;
                });
            }).catch((error) => {
                console.log('error', error);
                setIsBlogPageDataLoaded(false);
            });
        }
        loadBlogPageDataAsync();
    }, []);

    return (
        <div className="blog-wrapper">
            {!isBlogPageDataLoaded && <Spinner />}
            {isBlogPageDataLoaded && (
                <>
                    <SecondaryPageMastheadHeader title="Blog" />
                    <LatestBlogPostsSelection latestBlogPostsForSelection={latestBlogPostsForSelection}/>
                </>
            )}
        </div>
    )
}