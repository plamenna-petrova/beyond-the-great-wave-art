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

const stylesCollectionName = "styles";

const getAllStylesAsync = async () => {
    return await getAllFirestoreRecordsAsync(stylesCollectionName);
}

const getAllStylesWithDeletedAsync = async () => {
    return await getAllFirestoreRecordsWithDeletedAsync(stylesCollectionName);
}

const getStyleByIdAsync = async (id) => {
    return await getFirestoreRecordByIdAsync(stylesCollectionName, id);
}

const createStyleAsync = async (style) => {
    await addNewRecordToFirestoreAsync(stylesCollectionName, style);
}

const updateStyleAsync = async (id, style) => {
    await updateFirestoreRecordAsync(stylesCollectionName, id, style);
}

const softDeleteStyleAsync = async (id, style) => {
    await softDeleteFirestoreRecordAsync(stylesCollectionName, id, style);
}

const hardDeleteStyleAsync = async (id) => {
    await hardDeleteFirestoreRecordAsync(stylesCollectionName, id);
}

const styleExistsAsync = async (name) => {
    return await firestoreRecordExistsAsync(stylesCollectionName, "name", name);
}

const stylesService = {
    getAllStylesAsync,
    getAllStylesWithDeletedAsync,
    getStyleByIdAsync,
    createStyleAsync,
    updateStyleAsync,
    softDeleteStyleAsync,
    hardDeleteStyleAsync,
    styleExistsAsync
}

export default stylesService;