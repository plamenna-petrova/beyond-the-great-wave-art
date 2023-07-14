import { useEffect, useState } from "react"
import Spinner from "../../../../components/spinner/Spinner";
import { getTestimonialsDataForCarousel } from "../../../../helpers/functions";
import SecondaryPageMastheadHeader from "../seconday-page-masthead-header/SecondayPageMastheadHeader";
import Testimonials from "../testimonials/Testimonials";

export default function CustomerReviews() {
    const [isCustomerReviewsPageDataLoaded, setIsCustomersReviewsPageDataLoaded] = useState(false);
    const [testimonialsDataForCarousel, setTestimonialsDataForCarousel] = useState([]);

    useEffect(() => {
        const loadCustomerReviewsPageDataAsync = async () => {
            await getTestimonialsDataForCarousel().then((data) => {
                setTestimonialsDataForCarousel(data);
                setIsCustomersReviewsPageDataLoaded(true);
            }).catch((error) => {
                console.log('error', error);
                setIsCustomersReviewsPageDataLoaded(false);
            })
        }
        loadCustomerReviewsPageDataAsync();
    }, [])

    return (
        <div className="customer-reviews-wrapper">
            {!isCustomerReviewsPageDataLoaded && <Spinner />}
            {isCustomerReviewsPageDataLoaded && (
                <>
                    <SecondaryPageMastheadHeader title="Testimonials" />
                    <Testimonials testimonialsDataForCarousel={testimonialsDataForCarousel} />
                </>
            )}
        </div>
    )
}