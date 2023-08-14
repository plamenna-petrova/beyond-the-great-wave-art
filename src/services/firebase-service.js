
import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc, query, where } from "firebase/firestore"
import { firestore } from "../firebase"

import { firebaseAuthErrorCodes } from "../helpers/firebase-helper";

const getAllFirestoreRecordsAsync = async (collectionName) => {
    const allFirestoreRecordsQuery = query(collection(firestore, collectionName));
    const allFirestoreRecordsQuerySnapshot = await getDocs(allFirestoreRecordsQuery);
    const mappedAllFirestoreRecordsQuerySnapshot = mapQuerySnapshot(allFirestoreRecordsQuerySnapshot);
    return mappedAllFirestoreRecordsQuerySnapshot;
}

const getFirestoreRecordByIdAsync = async (collectionName, id) => {
    const firestoreRecordByIdReference = doc(firestore, collectionName, id);
    const firestoreRecordByIdSnapshot = await getDoc(firestoreRecordByIdReference);
    const firestoreRecordByIdData = firestoreRecordByIdSnapshot.exists() ? firestoreRecordByIdSnapshot.data() : null;
    return { id, ...firestoreRecordByIdData };
}

const addNewRecordToFirestoreAsync = async (collectionName, recordToAdd) => {
    await addDoc(collection(firestore, collectionName), recordToAdd);
}

const updateFirestoreRecordAsync = async (collectionName, recordToUpdateId, updateRecordData) => {
    await updateDoc(doc(firestore, collectionName, recordToUpdateId), updateRecordData);
}

const deleteFirestoreRecordAsync = async (collectionName, recordToDeleteId) => {
    await deleteDoc(doc(firestore, collectionName, recordToDeleteId));
}

const firestoreRecordExistsAsync = async (collectionName, targetPropertyName, valueToCheck) => {
    const firestoreRecordExistsQuery = query(
        collection(firestore, collectionName), 
        where(targetPropertyName, "==", valueToCheck)
    );
    const firestoreRecordExistsQuerySnapshot = await getDocs(firestoreRecordExistsQuery);
    const firestoreRecordExistsDocs = firestoreRecordExistsQuerySnapshot.docs;
    return firestoreRecordExistsDocs.shift();
}

const mapQuerySnapshot = (querySnapshot) => {
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

const handleFirebaseAuthError = (error, notificationMessage, errorNotificationHandler) => {
    if (error.code) {
        const errorCodeKey = error.code;
        const registerFirebaseAuthErrorInfo = getFirebaseAuthErrorInfo(errorCodeKey);

        if (registerFirebaseAuthErrorInfo !== []) {
            const [authErrorType, authErrorDescription] = registerFirebaseAuthErrorInfo;

            switch (authErrorType) {
                case "user-friendly":
                    errorNotificationHandler(
                        'error', notificationMessage, authErrorDescription
                    );
                    break;
                case "system":
                    errorNotificationHandler(
                        'error', notificationMessage, 'A system error has occurred. Try again later'
                    );
                    console.log('error', authErrorDescription);
                    break;
                default:
                    break;
            }
        } else {
            console.log('error', error);
        }
    } else {
        console.log('error', error);
    }
}

const getFirebaseAuthErrorInfo = (receivedFirebaseErrorCode) => {
    let firebaseAuthErrorInfo = [];

    if (receivedFirebaseErrorCode) {
        for (const firebaseAuthErrorTypeKey of Object.keys(firebaseAuthErrorCodes)) {
            if (Object.keys(firebaseAuthErrorCodes[firebaseAuthErrorTypeKey]).includes(receivedFirebaseErrorCode)) {
                firebaseAuthErrorInfo = [
                    firebaseAuthErrorTypeKey,
                    firebaseAuthErrorCodes[firebaseAuthErrorTypeKey][receivedFirebaseErrorCode]
                ];
                break;
            }
        }
    }

    return firebaseAuthErrorInfo;
}

export {
    firebaseAuthErrorCodes,
    mapQuerySnapshot,
    getAllFirestoreRecordsAsync,
    getFirestoreRecordByIdAsync,
    addNewRecordToFirestoreAsync,
    updateFirestoreRecordAsync,
    deleteFirestoreRecordAsync,
    firestoreRecordExistsAsync,
    handleFirebaseAuthError
}