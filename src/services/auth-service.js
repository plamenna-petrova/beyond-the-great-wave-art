import { GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { getDocs } from "firebase/firestore";
import { addNewRecordToFirestoreAsync, executeSimpleFilterQueryToFirestore } from "../helpers/firebase-helper";

const googleProvider = new GoogleAuthProvider();

const createUserWithEmailAndPasswordAsync = async(username, email, password) => {
    try {
        const createUserWithAndPasswordResponse = await createUserWithEmailAndPassword(
            auth, email, password
        );
        const authenticatedUser = createUserWithAndPasswordResponse.user;
        const userToCreate = {
            uid: authenticatedUser.uid,
            username,
            authProvider: "local",
            email
        };
        await addNewRecordToFirestoreAsync("users", userToCreate);
    } catch (error) {
        console.log('error', error);
    }
}

const signInWithEmailAndPasswordAsync = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log('error', error);
    }
}

const signOutAsync = async() => {
    await signOut(auth);
}

const signInWithGoogleAsync = async() => {
    try {
        const signInWithPopupResponse = await signInWithPopup(auth, googleProvider);
        const authenticatedUserByGoogle = signInWithPopupResponse.user;
        const authenticatedUserByGoogleQuery = executeSimpleFilterQueryToFirestore(
            "users", "uid", "==", authenticatedUserByGoogle.uid
        )
        const queriedUserDocs = await getDocs(authenticatedUserByGoogleQuery);
        if (queriedUserDocs.docs.length == 0) {
            const userToCreate = {
                uid: authenticatedUserByGoogle.uid,
                username: authenticatedUserByGoogle.displayName,
                authProvider: "google",
                email: authenticatedUserByGoogle.email
            };
            await addNewRecordToFirestoreAsync("users", userToCreate);
        }
    } catch (error) {
        console.log('error', error);
    }
}

const sendPasswordResetLinkToEmailAsync = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.log('error', error);
    }
}

const fogotPassword = async(email) => {
    try {
        await fogotPassword(email);
    } catch (error) {
        console.log('error', error);
    }
}

export {
    createUserWithEmailAndPasswordAsync,
    signInWithEmailAndPasswordAsync,
    signOutAsync,
    signInWithGoogleAsync,
    sendPasswordResetLinkToEmailAsync
}