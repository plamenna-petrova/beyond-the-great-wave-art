import { 
    addNewRecordToFirestoreAsync, 
    hardDeleteFirestoreRecordAsync, 
    firestoreRecordExistsAsync, 
    getAllFirestoreRecordsAsync, 
    getFirestoreRecordByIdAsync, 
    updateFirestoreRecordAsync 
} from "./firebase-service";

const artMovementsCollectionName = "art-movements";

const getAllArtMovementsAsync = async () => {
    return await getAllFirestoreRecordsAsync(artMovementsCollectionName);
}

const getArtMovementByIdAsync = async (id) => {
    return await getFirestoreRecordByIdAsync(artMovementsCollectionName, id);
}

const createArtMovementAsync = async (artMovementToCreate) => {
    await addNewRecordToFirestoreAsync(artMovementsCollectionName, artMovementToCreate);
}

const updateArtMovementAsync = async (artMovementToUpdateId, updateArtMovementData) => {
    await updateFirestoreRecordAsync(artMovementsCollectionName, artMovementToUpdateId, updateArtMovementData);
}

const deleteArtMovementAsync = async (artMovementToDeleteId) => {
    await hardDeleteFirestoreRecordAsync(artMovementsCollectionName, artMovementToDeleteId);
}

const artMovementExistsAsync = async (artMovementNameToFind) => {
    return await firestoreRecordExistsAsync(artMovementsCollectionName, "name", artMovementNameToFind);
}

export {
    getAllArtMovementsAsync,
    getArtMovementByIdAsync,
    createArtMovementAsync,
    updateArtMovementAsync,
    deleteArtMovementAsync,
    artMovementExistsAsync
}