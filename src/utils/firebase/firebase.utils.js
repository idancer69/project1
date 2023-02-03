import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCQ_3iYzO8Vadx9h3-FupTIA8oWXPWSZs4",
    authDomain: "crown-db-62707.firebaseapp.com",
    projectId: "crown-db-62707",
    storageBucket: "crown-db-62707.appspot.com",
    messagingSenderId: "281972360816",
    appId: "1:281972360816:web:30d6b6adf8d403161f56b5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email, photoURL } = userAuth;
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                photoURL,
                createdAt: new Date()
            });
        } catch (error) {
            console.error('Error creating user document: ', error.message);
        }
    }
    return userDocRef;
};