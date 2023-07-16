import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVNFX5Qn2hlguYcKn-LKAJ_GZnxf2vuxE",
    authDomain: "beyond-the-great-wave-art.firebaseapp.com",
    projectId: "beyond-the-great-wave-art",
    storageBucket: "beyond-the-great-wave-art.appspot.com",
    messagingSenderId: "447890115276",
    appId: "1:447890115276:web:0ec68e021d387f9b2fd069"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {
    auth,
    firestore
}