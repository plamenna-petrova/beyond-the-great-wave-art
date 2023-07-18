import { GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { addNewRecordToFirestoreAsync } from "../helpers/firebase-helper";

const googleProvider = new GoogleAuthProvider();

const createUserWithEmailAndPasswordAsync = async(email, password) => {
    try {
        return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log('error', error);
    }
}

const signInWithEmailAndPasswordAsync = async(email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log('error', error);
    }
}

const signOutAsync = async() => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log('error', error);
    }
}

const signInWithGoogleAsync = async() => {
    try {
        const signInWithPopupResponse = await signInWithPopup(auth, googleProvider);
        const authenticatedUserByGoogle = signInWithPopupResponse.user;

        const usersCollectionReference = collection(firestore, "users");

        const authenticatedUserByGoogleQuery = query(
            collection(usersCollectionReference), 
            where("uid", "==", authenticatedUserByGoogle.uid)
        );

        const queriedUserDocs = await getDocs(authenticatedUserByGoogleQuery);

        if (queriedUserDocs.docs.length === 0) {
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
    sendPasswordResetLinkToEmailAsync,
    fogotPassword
}