import { 
    addNewRecordToFirestoreAsync, 
    deleteFirestoreRecordAsync, 
    firestoreRecordExistsAsync, 
    getAllFirestoreRecordsAsync, 
    getFirestoreRecordByIdAsync, 
    updateFirestoreRecordAsync 
} from "./firebase-service";

const fieldsCollectionName = "fields";

const getAllFieldsAsync = async () => {
    return await getAllFirestoreRecordsAsync(fieldsCollectionName);
}

const getFieldByIdAsync = async (id) => {
    return await getFirestoreRecordByIdAsync(fieldsCollectionName, id);
}

const createFieldAsync = async (fieldToCreate) => {
    await addNewRecordToFirestoreAsync(fieldsCollectionName, fieldToCreate);
}

const updateFieldAsync = async (fieldToUpdateId, updateFieldData) => {
    await updateFirestoreRecordAsync(fieldsCollectionName, fieldToUpdateId, updateFieldData);
}

const deleteFieldAsync = async (fieldToDeleteId) => {
    await deleteFirestoreRecordAsync(fieldsCollectionName, fieldToDeleteId);
}

const fieldExistsAsync = async (fieldNameToFind) => {
    return await firestoreRecordExistsAsync(fieldsCollectionName, "name", fieldNameToFind);
}

export {
    getAllFieldsAsync,
    getFieldByIdAsync,
    createFieldAsync,
    updateFieldAsync,
    deleteFieldAsync,
    fieldExistsAsync
}