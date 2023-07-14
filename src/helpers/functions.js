import firstHomePageCarouselImage from '../resources/images/press-release-rm-32.jpg';
import secondHomePageCarouselImage from '../resources/images/press-release-rm-32.jpg';

const getSectionsImages = async () => {
    const sectionsImages =
        [
            {
                dataUrl: await getImageDataUrlFromdataUrl(firstHomePageCarouselImage),
                alt: 'First Home Page Carousel Resource'
            },
            {
                dataUrl: await getImageDataUrlFromdataUrl(secondHomePageCarouselImage),
                alt: 'Second Home Page Carousel Resource'
            }
        ];

    return sectionsImages;
}

const getTestimonialsDataForCarousel = async () => {
    const testimonialsDataForCarousel =
        [
            {
                id: '1',
                imageSrc: await getImageDataUrlFromdataUrl(firstHomePageCarouselImage),
                imageAlt: 'Gallery Testimonial 1',
                textContent: 'Gallery Review From User 1'
            },
            {
                id: '2',
                imageSrc: await getImageDataUrlFromdataUrl(firstHomePageCarouselImage),
                imageAlt: 'Gallery Testimonial 2',
                textContent: 'Gallery Review From User 2'
            },
            {
                id: '3',
                imageSrc: await getImageDataUrlFromdataUrl(firstHomePageCarouselImage),
                imageAlt: 'Gallery Testimonial 3',
                textContent: 'Gallery Review From User 3'
            },
            {
                id: '4',
                imageSrc: await getImageDataUrlFromdataUrl(firstHomePageCarouselImage),
                imageAlt: 'Gallery Testimonial 4',
                textContent: 'Gallery Review From User 4'
            },
        ];

    return testimonialsDataForCarousel;
}

const fillGalleriesSelectionWithSampleData = async (sampleImages) => {
    const sampleGalleries = [];

    for (let i = 0; i < 24; i++) {
        sampleGalleries.push({
            id: i + 1,
            name: 'Modern Gallery',
            location: 'London, UK',
            image: {
                src: sampleImages[0].dataUrl,
                alt: 'Modern Gallery Image'
            }
        })
    }

    return sampleGalleries;
}

const fillBlogPostsSelectionWithSampleData = async (sampleImages) => {
    const sampleBlogPostsForSelection = [];

    for (let i = 0; i < 3; i++) {
        const currentDate = new Date();
        sampleBlogPostsForSelection.push({
            id: i + 1,
            title: 'Blog Post About Modern Gallery',
            author: 'Admin',
            createdOn: `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`,
            image: {
                src: sampleImages[0].dataUrl,
                alt: 'Modern Gallery Image'
            }
        });
    }

    return sampleBlogPostsForSelection;
}

const getImageDataUrlFromdataUrl = async (imagedataUrl) => {
    const imageBlob = await toBlob(imagedataUrl);

    const fileReader = new FileReader();

    await new Promise((resolve, reject) => {
        fileReader.onload = resolve;
        fileReader.onerror = reject;
        fileReader.readAsDataURL(imageBlob);
    });

    return fileReader.result;
}

const toBlob = async (url) => {
    const response = await fetch(url);
    return await response.blob();
}

export {
    fillGalleriesSelectionWithSampleData,
    fillBlogPostsSelectionWithSampleData,
    getSectionsImages,
    getTestimonialsDataForCarousel
};