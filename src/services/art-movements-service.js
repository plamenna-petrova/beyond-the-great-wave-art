import { 
    addNewRecordToFirestoreAsync, 
    hardDeleteFirestoreRecordAsync, 
    firestoreRecordExistsAsync, 
    getAllFirestoreRecordsAsync, 
    getFirestoreRecordByIdAsync, 
    updateFirestoreRecordAsync, 
    softDeleteFirestoreRecordAsync
} from "./firebase-service";

const artMovementsCollectionName = "art-movements";

const getAllArtMovementsAsync = async () => {
    return await getAllFirestoreRecordsAsync(artMovementsCollectionName);
}

const getAllArtMovementWithDeletedAsync = async () => {
    return await getAllArtMovementWithDeletedAsync(artMovementsCollectionName);
}

const getArtMovementByIdAsync = async (id) => {
    return await getFirestoreRecordByIdAsync(artMovementsCollectionName, id);
}

const createArtMovementAsync = async (artMovement) => {
    await addNewRecordToFirestoreAsync(artMovementsCollectionName, artMovement);
}

const updateArtMovementAsync = async (id, artMovement) => {
    await updateFirestoreRecordAsync(artMovementsCollectionName, id, artMovement);
}

const softDeleteArtMovementAsync = async (id, artMovement) => {
    await softDeleteFirestoreRecordAsync(artMovementsCollectionName, id, artMovement);
}

const hardDeleteArtMovementAsync = async (id) => {
    await hardDeleteFirestoreRecordAsync(artMovementsCollectionName, id);
}

const artMovementExistsAsync = async (name) => {
    return await firestoreRecordExistsAsync(artMovementsCollectionName, "name", name);
}

const artMovementsService = {
    getAllArtMovementsAsync,
    getAllArtMovementWithDeletedAsync,
    getArtMovementByIdAsync,
    createArtMovementAsync,
    updateArtMovementAsync,
    softDeleteArtMovementAsync,
    hardDeleteArtMovementAsync,
    artMovementExistsAsync
}

export default artMovementsService;