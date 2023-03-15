import { initializeApp } from 'firebase/app';
import {getAuth, 
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,

} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZpfcHHMDCCPd54ff5arQViRFaneZXlHg",
    authDomain: "crwn-clothing-db-b6e9f.firebaseapp.com",
    projectId: "crwn-clothing-db-b6e9f",
    storageBucket: "crwn-clothing-db-b6e9f.appspot.com",
    messagingSenderId: "943147985076",
    appId: "1:943147985076:web:9ed0d8ac065a4c8de50fe1"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const {displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }


  }

  return userDocRef;
};