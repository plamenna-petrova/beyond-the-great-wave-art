
import { useEffect, useState } from 'react';

import SecondaryPageMastheadHeader from '../components/seconday-page-masthead-header/SecondayPageMastheadHeader';
import GalleriesSelection from "../components/galleries-selection/GalleriesSelection";
import Invitation from '../components/invitation/Invitation';
import Testimonials from '../components/testimonials/Testimonials';

import { fillGalleriesSelectionWithSampleData, getSectionsImages, getTestimonialsDataForCarousel } from '../../../helpers/functions';
import Spinner from '../../../components/spinner/Spinner';

export default function Galleries() {
    const [isGalleriesDataLoaded, setIsGalleriesDataLoaded] = useState(false);
    const [testimonialsDataForCarousel, setTestimonialsDataForCarousel] = useState([]);
    const [galleriesForSelection, setGalleriesForSelection] = useState([]);

    useEffect(() => {
        const loadGalleriesPageDataAsync = async () => {
            await getSectionsImages().then(async (images) => {
                await getTestimonialsDataForCarousel().then(async (data) => {
                    setTestimonialsDataForCarousel(data);
                    await fillGalleriesSelectionWithSampleData(images).then((galleries) => {
                        setGalleriesForSelection(galleries);
                        setIsGalleriesDataLoaded(true);
                    }).catch((error) => {
                        throw error;
                    });
                }).catch((error) => {
                    throw error;
                })
            }).catch((error) => {
                console.log('error', error);
                setIsGalleriesDataLoaded(false);
            });
        }
        loadGalleriesPageDataAsync();
    }, []);

    return (
        <div className="galleries-wrapper">
            {!isGalleriesDataLoaded && <Spinner />}
            {isGalleriesDataLoaded && (
                <>
                    <SecondaryPageMastheadHeader title="Galleries" />
                    <GalleriesSelection galleriesForSelection={galleriesForSelection} />
                    <Invitation />
                    <Testimonials testimonialsDataForCarousel={testimonialsDataForCarousel} />
                </>
            )}
        </div>
    )
}