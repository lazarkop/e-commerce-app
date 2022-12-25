import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCfYRg5xDSO0DDBxeBMB275zzYwMrT_ARQ",
    authDomain: "clothing-db-dda9e.firebaseapp.com",
    projectId: "clothing-db-dda9e",
    storageBucket: "clothing-db-dda9e.appspot.com",
    messagingSenderId: "64606570493",
    appId: "1:64606570493:web:8fd0e43d5c0af1eb443b94"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const db = getFirestore(); 

  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation={}
    ) => {

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);
    
    // if user does not exist
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }

        //if user does exist
        return userDocRef;
    }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}