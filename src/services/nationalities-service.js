import { 
    addNewRecordToFirestoreAsync,
    firestoreRecordExistsAsync,
    getAllFirestoreRecordsAsync, 
    getAllFirestoreRecordsWithDeletedAsync, 
    getFirestoreRecordByIdAsync, 
    hardDeleteFirestoreRecordAsync, 
    softDeleteFirestoreRecordAsync, 
    updateFirestoreRecordAsync
} from "./firebase-service";

const nationalitiesCollectionName = "nationalities";

const getAllNationalitiesAsync = async () => {
    return await getAllFirestoreRecordsAsync(nationalitiesCollectionName);
}

const getAllNationalitiesWithDeletedAsync = async () => {
    return await getAllFirestoreRecordsWithDeletedAsync(nationalitiesCollectionName);
}

const getNationalityByIdAsync = async (id) => {
    return await getFirestoreRecordByIdAsync(nationalitiesCollectionName, id);
}

const createNationalityAsync = async (nationality) => {
    await addNewRecordToFirestoreAsync(nationalitiesCollectionName, nationality);
}

const updateNationalityAsync = async (id, nationality) => {
    await updateFirestoreRecordAsync(nationalitiesCollectionName, id, nationality);
}

const softDeleteNationalityAsync = async (id, nationality) => {
    await softDeleteFirestoreRecordAsync(nationalitiesCollectionName, id, nationality);
}

const hardDeleteNationalityAsync = async (id) => {
    await hardDeleteFirestoreRecordAsync(nationalitiesCollectionName, id);
}

const nationalityExistsAsync = async (name) => {
    return await firestoreRecordExistsAsync(nationalitiesCollectionName, "name", name);
}

const nationalitiesService = {
    getAllNationalitiesAsync,
    getAllNationalitiesWithDeletedAsync,
    getNationalityByIdAsync,
    createNationalityAsync,
    updateNationalityAsync,
    softDeleteNationalityAsync,
    hardDeleteNationalityAsync,
    nationalityExistsAsync
}

export default nationalitiesService;