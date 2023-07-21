import { 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut,
    GoogleAuthProvider
} from "firebase/auth";
import { auth, firestore } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { mapQuerySnapshot } from "../services/firebase-service";

const googleProvider = new GoogleAuthProvider();

const createUserWithEmailAndPasswordAsync = async(email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const signInWithEmailAndPasswordAsync = async(email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const signInWithGoogleAsync = async() => {
    return signInWithPopup(auth, googleProvider);
}

const signOutAsync = async() => {
    await signOut(auth);
}

const sendPasswordResetLinkToEmailAsync = async(email) => {
    await sendPasswordResetEmail(auth, email);
}

const getSignedInUserDetailsFromQuerySnapshot = async (uid) => {
    const signedInUserQuerySnapshot = await getUserQuerySnapshot(uid);
    const mappedSignedInUserQuerySnapshot = mapQuerySnapshot(signedInUserQuerySnapshot);
    const signedInUser = mappedSignedInUserQuerySnapshot[0];
    return signedInUser;
}

const getUserQuerySnapshot = async (uid) => {
    const usersCollectionRefence = collection(firestore, "users");
    const userQuery = query(usersCollectionRefence, where("uid", "==", uid));
    const userQuerySnapshot = await getDocs(userQuery);
    return userQuerySnapshot;
}

export {
    createUserWithEmailAndPasswordAsync,
    signInWithEmailAndPasswordAsync,
    signOutAsync,
    getSignedInUserDetailsFromQuerySnapshot,
    getUserQuerySnapshot,
    signInWithGoogleAsync,
    sendPasswordResetLinkToEmailAsync
}