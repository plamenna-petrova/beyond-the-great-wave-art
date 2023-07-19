
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
    getImageDataUrl,
    toBlob
}