import { addDoc, collection, query, where } from "firebase/firestore"
import { firestore } from "../firebase"

const executeSimpleFilterQueryToFirestore = (collectionName, ...queryParams) => {
    const [columnName, rule, checkValue] = [...queryParams];
    return query(
        collection, (firestore, collectionName),
        where(columnName, rule, checkValue)
    );
}

const addNewRecordToFirestoreAsync = async(collectionName, recordObject) => {
    await addDoc(collection(firestore, collectionName), recordObject);
}

export {
    executeSimpleFilterQueryToFirestore,
    addNewRecordToFirestoreAsync
}