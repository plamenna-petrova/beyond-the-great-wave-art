
import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc, query, where, Timestamp } from "firebase/firestore"
import { firestore } from "../firebase"

import { firebaseAuthErrorCodes } from "../helpers/firebase-helper";

const getAllFirestoreRecordsAsync = async (collectionName) => {
    const allFirestoreRecordsQuery = query(collection(firestore, collectionName));
    const allFirestoreRecordsQuerySnapshot = await getDocs(allFirestoreRecordsQuery);
    const mappedAllFirestoreRecordsQuerySnapshot = 
        mapQuerySnapshot(allFirestoreRecordsQuerySnapshot)
        .filter(record => !record.isDeleted);
    return mappedAllFirestoreRecordsQuerySnapshot;
}

const getAllFirestoreRecordsWithDeletedAsync = async (collectionName) => {
    const allFirestoreRecordsWithDeletedQuery = query(collection(firestore, collectionName));
    const allFirestoreRecordsWithDeletedQuerySnapshot = await getDocs(allFirestoreRecordsWithDeletedQuery);
    const mappedAllFirestoreRecordsWithDeletedQuerySnapshot = mapQuerySnapshot(allFirestoreRecordsWithDeletedQuerySnapshot);
    return mappedAllFirestoreRecordsWithDeletedQuerySnapshot;
}

const getFirestoreRecordByIdAsync = async (collectionName, id) => {
    const firestoreRecordByIdReference = doc(firestore, collectionName, id);
    const firestoreRecordByIdSnapshot = await getDoc(firestoreRecordByIdReference);
    const firestoreRecordByIdData = firestoreRecordByIdSnapshot.exists() ? firestoreRecordByIdSnapshot.data() : null;
    return { id, ...firestoreRecordByIdData };
}

const addNewRecordToFirestoreAsync = async (collectionName, recordToAdd) => {
    recordToAdd.createdOn = Timestamp.now();
    recordToAdd.modifiedOn= null;
    recordToAdd.modifiedBy = null;
    recordToAdd.isDeleted = false;
    recordToAdd.deletedOn = null;
    recordToAdd.deletedBy = null;
    await addDoc(collection(firestore, collectionName), recordToAdd);
}

const updateFirestoreRecordAsync = async (collectionName, recordToUpdateId, updateRecordData) => {
    updateRecordData.modifiedOn = Timestamp.now();
    console.log('UPDATED TO SOFT DELETE');
    console.log(updateRecordData);
    await updateDoc(doc(firestore, collectionName, recordToUpdateId), updateRecordData);
}

const softDeleteFirestoreRecordAsync = async (collectionName, recordToSoftDeleteId, softDeleteData) => {
    softDeleteData.isDeleted = true;
    softDeleteData.deletedOn = Timestamp.now();
    await updateFirestoreRecordAsync(collectionName, recordToSoftDeleteId, softDeleteData);
}

const hardDeleteFirestoreRecordAsync = async (collectionName, recordToHardDeleteId) => {
    await deleteDoc(doc(firestore, collectionName, recordToHardDeleteId));
}

const restoreFirestoreRecordAsync = async (collectionName, recordToRestoreId) => {
    const restoreRecordData = { isDeleted: false, deletedOn: null, deletedBy: null };
    await updateFirestoreRecordAsync(collectionName, recordToRestoreId, restoreRecordData);
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
    getAllFirestoreRecordsWithDeletedAsync,
    getFirestoreRecordByIdAsync,
    addNewRecordToFirestoreAsync,
    updateFirestoreRecordAsync,
    softDeleteFirestoreRecordAsync,
    hardDeleteFirestoreRecordAsync,
    restoreFirestoreRecordAsync,
    firestoreRecordExistsAsync,
    handleFirebaseAuthError
}