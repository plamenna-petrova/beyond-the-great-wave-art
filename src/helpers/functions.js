import firstHomePageCarouselImage from '../resources/images/press-release-rm-32.jpg';
import secondHomePageCarouselImage from '../resources/images/press-release-rm-32.jpg';

const getSectionsImages = async() => {
    const sectionsImages = [];

    for (let i = 0; i < 2; i++) {
        await getImageDataUrl(firstHomePageCarouselImage).then((dataUrl) => {
            sectionsImages.push({
                dataUrl: dataUrl,
                alt: `Carousel Resource #${i + 1}`
            });
        });
    }

    return sectionsImages;
}

const getTestimonialsDataForCarousel = async() => {
    const testimonialsDataForCarousel = [];

    for (let i = 0; i < 4; i++) {
        await getImageDataUrl(firstHomePageCarouselImage).then((dataUrl) => {
            testimonialsDataForCarousel.push({
                id: i + 1,
                imageSrc: dataUrl,
                imageAlt: `Gallery Testimonial ${i + 1}`,
                textContent: `Gallery Review From User ${i + 1}`
            });
        });
    }

    return testimonialsDataForCarousel;
}

const fillGalleriesSelectionWithSampleData = async(sampleImages) => {
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

const fillBlogPostsSelectionWithSampleData = async(sampleImages) => {
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

const getImageDataUrl = async(relativePath) => {
    const imageBlob = await toBlob(relativePath);

    const fileReader = new FileReader();

    const readImagePromise = new Promise((resolve, reject) => {
        fileReader.onload = resolve;
        fileReader.onerror = reject;
        fileReader.readAsDataURL(imageBlob);
    });

    await readImagePromise;

    return fileReader.result;
}

const toBlob = async(url) => {
    const response = await fetch(url);
    return await response.blob();
}

export {
    fillGalleriesSelectionWithSampleData,
    fillBlogPostsSelectionWithSampleData,
    getSectionsImages,
    getTestimonialsDataForCarousel
};