import { addDoc, collection } from "firebase/firestore"
import { firestore } from "../firebase"

const mapQuerySnapshot = (querySnapshot) => {
    return querySnapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }))
}

const addNewRecordToFirestoreAsync = async(collectionName, recordObject) => {
    await addDoc(collection(firestore, collectionName), recordObject);
}

export {
    mapQuerySnapshot,
    addNewRecordToFirestoreAsync
}