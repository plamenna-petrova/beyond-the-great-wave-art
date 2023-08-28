import { 
    addNewRecordToFirestoreAsync, 
    hardDeleteFirestoreRecordAsync, 
    firestoreRecordExistsAsync, 
    getAllFirestoreRecordsAsync, 
    getFirestoreRecordByIdAsync, 
    updateFirestoreRecordAsync, 
    softDeleteFirestoreRecordAsync,
    getAllFirestoreRecordsWithDeletedAsync
} from "./firebase-service";

const genresCollectionName = "genres";

const getAllGenresAsync = async () => {
    return await getAllFirestoreRecordsAsync(genresCollectionName);
}

const getAllGenresWithDeletedAsync = async () => {
    return await getAllFirestoreRecordsWithDeletedAsync(genresCollectionName);
}

const getGenreByIdAsync = async (id) => {
    return await getFirestoreRecordByIdAsync(genresCollectionName, id);
}

const createGenreAsync = async (genre) => {
    await addNewRecordToFirestoreAsync(genresCollectionName, genre);
}

const updateGenreAsync = async (id, genre) => {
    await updateFirestoreRecordAsync(genresCollectionName, id, genre);
}

const softDeleteGenreAsync = async (id, genre) => {
    await softDeleteFirestoreRecordAsync(genresCollectionName, id, genre);
}

const hardDeleteGenreAsync = async (id) => {
    await hardDeleteFirestoreRecordAsync(genresCollectionName, id);
}

const genreExistsAsync = async (genre) => {
    return await firestoreRecordExistsAsync(genresCollectionName, "name", genre);
}

const genresService = {
    getAllGenresAsync,
    getAllGenresWithDeletedAsync,
    getGenreByIdAsync,
    createGenreAsync,
    updateGenreAsync,
    softDeleteGenreAsync,
    hardDeleteGenreAsync,
    genreExistsAsync
}

export default genresService;