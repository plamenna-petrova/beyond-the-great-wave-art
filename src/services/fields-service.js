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

const fieldsCollectionName = "fields";

const getAllFieldsAsync = async () => {
    return await getAllFirestoreRecordsAsync(fieldsCollectionName);
}

const getAllFieldsWithDeletedAsync = async () => {
    return await getAllFirestoreRecordsWithDeletedAsync(fieldsCollectionName);
}

const getFieldByIdAsync = async (id) => {
    return await getFirestoreRecordByIdAsync(fieldsCollectionName, id);
}

const createFieldAsync = async (field) => {
    await addNewRecordToFirestoreAsync(fieldsCollectionName, field);
}

const updateFieldAsync = async (id, field) => {
    await updateFirestoreRecordAsync(fieldsCollectionName, id, field);
}

const softDeleteFieldAsync = async (id, field) => {
    await softDeleteFirestoreRecordAsync(fieldsCollectionName, id, field);
}

const hardDeleteFieldAsync = async (id) => {
    await hardDeleteFirestoreRecordAsync(fieldsCollectionName, id);
}

const fieldExistsAsync = async (name) => {
    return await firestoreRecordExistsAsync(fieldsCollectionName, "name", name);
}

const fieldsService = {
    getAllFieldsAsync,
    getAllFieldsWithDeletedAsync,
    getFieldByIdAsync,
    createFieldAsync,
    updateFieldAsync,
    softDeleteFieldAsync,
    hardDeleteFieldAsync,
    fieldExistsAsync
}

export default fieldsService;