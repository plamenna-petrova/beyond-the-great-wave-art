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

const centuriesCollectionName = "centuries";

const getAllCenturiesAsync = async () => {
    return await getAllFirestoreRecordsAsync(centuriesCollectionName);
}

const getAllCenturiesWithDeletedAsync = async () => {
    return await getAllFirestoreRecordsWithDeletedAsync(centuriesCollectionName);
}

const getCenturyByIdAsync = async (id) => {
    return await getFirestoreRecordByIdAsync(centuriesCollectionName, id);
}

const createCenturyAsync = async (century) => {
    await addNewRecordToFirestoreAsync(centuriesCollectionName, century);
}

const updateCenturyAsync = async (id, century) => {
    await updateFirestoreRecordAsync(centuriesCollectionName, id, century);
}

const softDeleteCenturyAsync = async (id, century) => {
    await softDeleteFirestoreRecordAsync(centuriesCollectionName, id, century);
}

const hardDeleteCenturyAsync = async (id) => {
    await hardDeleteFirestoreRecordAsync(centuriesCollectionName, id);
}

const centuryExistsAsync = async (name) => {
    return await firestoreRecordExistsAsync(centuriesCollectionName, "name", name);
}

const centuriesService = {
    getAllCenturiesAsync,
    getAllCenturiesWithDeletedAsync,
    getCenturyByIdAsync,
    createCenturyAsync,
    updateCenturyAsync,
    softDeleteCenturyAsync,
    hardDeleteCenturyAsync,
    centuryExistsAsync
}

export default centuriesService;