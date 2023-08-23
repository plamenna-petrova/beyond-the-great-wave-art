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

const createFieldAsync = async (field) => {
    await addNewRecordToFirestoreAsync(fieldsCollectionName, field);
}

const updateFieldAsync = async (id, field) => {
    await updateFirestoreRecordAsync(fieldsCollectionName, id, field);
}

const deleteFieldAsync = async (fieldToDeleteId) => {
    await deleteFirestoreRecordAsync(fieldsCollectionName, fieldToDeleteId);
}

const fieldExistsAsync = async (fieldNameToFind) => {
    return await firestoreRecordExistsAsync(fieldsCollectionName, "name", fieldNameToFind);
}

const fieldsService =  {
    getAllFieldsAsync,
    getFieldByIdAsync,
    createFieldAsync,
    updateFieldAsync,
    deleteFieldAsync,
    fieldExistsAsync
}

export default fieldsService;