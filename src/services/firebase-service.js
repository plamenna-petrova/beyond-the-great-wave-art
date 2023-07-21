
import { addDoc, collection } from "firebase/firestore"
import { firestore } from "../firebase"

import { firebaseAuthErrorCodes } from "../helpers/firebase-helper";

const mapQuerySnapshot = (querySnapshot) => {
    return querySnapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
}

const addNewRecordToFirestoreAsync = async (collectionName, recordObject) => {
    await addDoc(collection(firestore, collectionName), recordObject);
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
    addNewRecordToFirestoreAsync,
    handleFirebaseAuthError
}