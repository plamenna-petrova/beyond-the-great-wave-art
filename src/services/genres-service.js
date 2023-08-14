
import { addNewRecordToFirestoreAsync, deleteFirestoreRecordAsync, firestoreRecordExistsAsync, getAllFirestoreRecordsAsync, getFirestoreRecordByIdAsync, updateFirestoreRecordAsync } from "./firebase-service";

const genresCollectionName = "genres";

const getAllGenresAsync = async () => {
    return await getAllFirestoreRecordsAsync(genresCollectionName);
}

const getGenreByIdAsync = async (id) => {
    return await getFirestoreRecordByIdAsync(genresCollectionName, id);
}

const createGenreAsync = async (genreToCreate) => {
    await addNewRecordToFirestoreAsync(genresCollectionName, genreToCreate);
}

const updateGenreAsync = async (genreToUpdateId, updateGenreData) => {
    await updateFirestoreRecordAsync(genresCollectionName, genreToUpdateId, updateGenreData);
}

const deleteGenreAsync = async (genreToDeleteId) => {
    await deleteFirestoreRecordAsync(genresCollectionName, genreToDeleteId);
}

const genreExistsAsync = async (genreNameToFind) => {
    return await firestoreRecordExistsAsync(genresCollectionName, "name", genreNameToFind);
}

export {
    getAllGenresAsync,
    getGenreByIdAsync,
    createGenreAsync,
    updateGenreAsync,
    deleteGenreAsync,
    genreExistsAsync
}