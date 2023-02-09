import { initializeApp } from 'firebase/app';
import {
getAuth,
signInWithRedirect,
signInWithPopup,
GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
NextOrObserver,
User
} from 'firebase/auth';
import {
getFirestore,
doc,
getDoc,
setDoc,
collection,
writeBatch,
query,
getDocs,
QueryDocumentSnapshot,
DocumentReference
} from 'firebase/firestore';

const firebaseConfig = {
apiKey: "AIzaSyCfYRg5xDSO0DDBxeBMB275zzYwMrT_ARQ",
authDomain: "clothing-db-dda9e.firebaseapp.com",
projectId: "clothing-db-dda9e",
storageBucket: "clothing-db-dda9e.appspot.com",
messagingSenderId: "64606570493",
appId: "1:64606570493:web:8fd0e43d5c0af1eb443b94"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type objectsToAdd = {
title: string;
}

export const addCollectionAndDocuments = async <T extends objectsToAdd>(
collectionKey: string,
objectsToAdd: T[],
): Promise<void> => {
const collectionRef = collection(db, collectionKey);
const batch = writeBatch(db);

objectsToAdd.forEach((object) => {
const docRef = doc(collectionRef, object.title.toLowerCase());
batch.set(docRef, object);
});

await batch.commit();
console.log('done');
};

export type Category = {
title: string;
imageUrl: string;
items: CategoryItem[];
};

export type CategoryItem = {
id: number;
imageUrl: string;
name: string;
price: number;
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
const collectionRef = collection(db, 'categories');
const q = query(collectionRef);

const querySnapshot = await getDocs(q);
return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export type AdditionalInformation = {
displayName?: string;
}

export type UserData = {
createdAt: Date;
displayName: string;
email: string;
}

export const createUserDocumentFromAuth = async (
userAuth: User,
additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
if (!userAuth) return;

const userDocRef = doc(db, 'users', userAuth.uid);

const userSnapshot = await getDoc(userDocRef);

if (!userSnapshot.exists()) {
const { displayName, email } = userAuth;
const createdAt = new Date();

try {
await setDoc(userDocRef, {
displayName,
email,
createdAt,
...additionalInformation,
});
} catch (error) {
console.log('error creating the user', error);
}
}

return  userSnapshot as  QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
if (!email || !password) return;

return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
if (!email || !password) return;

return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
onAuthStateChanged(auth, callback); 


