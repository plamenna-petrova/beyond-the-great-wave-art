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

const mediaCollectionName = "media";

const getAllMediaAsync = async () => {
    return await getAllFirestoreRecordsAsync(mediaCollectionName);
}

const getAllMediaWithDeletedAsync = async () => {
    return await getAllFirestoreRecordsWithDeletedAsync(mediaCollectionName);
}

const getMediumByIdAsync = async (id) => {
    return await getFirestoreRecordByIdAsync(mediaCollectionName, id);
}

const createMediumAsync = async (medium) => {
    await addNewRecordToFirestoreAsync(mediaCollectionName, medium);
}

const updateMediumAsync = async (id, medium) => {
    await updateFirestoreRecordAsync(mediaCollectionName, id, medium);
}

const softDeleteMediumAsync = async (id, medium) => {
    await softDeleteFirestoreRecordAsync(mediaCollectionName, id, medium);
}

const hardDeleteMediumAsync = async (id) => {
    await hardDeleteFirestoreRecordAsync(mediaCollectionName, id);
}

const mediumExistsAsync = async (name) => {
    return await firestoreRecordExistsAsync(mediaCollectionName, "name", name);
}

const mediaService = {
    getAllMediaAsync,
    getAllMediaWithDeletedAsync,
    getMediumByIdAsync,
    createMediumAsync,
    updateMediumAsync,
    softDeleteMediumAsync,
    hardDeleteMediumAsync,
    mediumExistsAsync
}

export default mediaService;