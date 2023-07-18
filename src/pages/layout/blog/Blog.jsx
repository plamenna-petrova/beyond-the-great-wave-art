import { useEffect } from "react";
import { useState } from "react";

import Spinner from "../../../components/spinner/Spinner";
import LatestBlogPostsSelection from "../components/latest-blog-posts-selection/LatestBlogPostsSelection";
import SecondaryPageMastheadHeader from "../components/seconday-page-masthead-header/SecondayPageMastheadHeader";

import firstHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';
import { useDispatch, useSelector } from "react-redux";
import { setLoadingSpinner } from "../../../store/features/loading/loadingSlice";

export default function Blog() {
    const dispatch = useDispatch();

    const [latestBlogPostsForSelection, setLatestBlogPostsForSelection] = useState([]);

    useEffect(() => {
        dispatch(setLoadingSpinner(true));

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

        setTimeout(() => {
            dispatch(setLoadingSpinner(false));
        }, 500);
    }, []);

    return (
        <div className="blog-wrapper">
            <SecondaryPageMastheadHeader title="Blog" />
            <LatestBlogPostsSelection latestBlogPostsForSelection={latestBlogPostsForSelection} />
        </div>
    )
}