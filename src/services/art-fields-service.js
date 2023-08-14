import { collection, getDoc, getDocs, query, doc, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { addNewRecordToFirestoreAsync, deleteFirebaseRecordAsync, mapQuerySnapshot, updateFirebaseRecordAsync } from "./firebase-service";

const fieldsCollectionName = "fields";

const getAllFieldsAsync = async () => {
    const allFieldsQuery = query(collection(firestore, fieldsCollectionName));
    const allFieldsQuerySnapshot = await getDocs(allFieldsQuery);
    const mappedAllFieldsQuerySnapshot = mapQuerySnapshot(allFieldsQuerySnapshot);
    return mappedAllFieldsQuerySnapshot;
}

const getFieldByIdAsync = async (id) => {
    const fieldByIdReference = doc(firestore, fieldsCollectionName, id);
    const fieldByIdSnapshot = await getDoc(fieldByIdReference);
    const fieldByIdData = fieldByIdSnapshot.exists() ? fieldByIdSnapshot.data() : null;
    return { id, ...fieldByIdData };
}

const createFieldAsync = async (fieldToCreate) => {
    await addNewRecordToFirestoreAsync(fieldsCollectionName, fieldToCreate);
}

const updateFieldAsync = async (fieldToUpdateId, updateFieldData) => {
    await updateFirebaseRecordAsync(fieldsCollectionName, fieldToUpdateId, updateFieldData);
}

const deleteFieldAsync = async (fieldToDeleteId) => {
    await deleteFirebaseRecordAsync(fieldsCollectionName, fieldToDeleteId);
}

const fieldExistsAsync = async (fieldName) => {
    const fieldExistsQuery = query(collection(firestore, fieldsCollectionName), where("name", "==", fieldName));
    const fieldExistsQuerySnapshot = await getDocs(fieldExistsQuery);
    const fieldExistsDocs = fieldExistsQuerySnapshot.docs;
    return fieldExistsDocs.shift();
}

export {
    getAllFieldsAsync,
    getFieldByIdAsync,
    createFieldAsync,
    updateFieldAsync,
    deleteFieldAsync,
    fieldExistsAsync
}