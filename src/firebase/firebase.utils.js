import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup } from "firebase/auth";


import { GoogleAuthProvider } from "firebase/auth";


const config = {
  apiKey: "AIzaSyBJjX4ClU6CvQ88KAawJDGxOz6-5Zd-8u8",
  authDomain: "crown-shop-db-bed3b.firebaseapp.com",
  projectId: "crown-shop-db-bed3b",
  storageBucket: "crown-shop-db-bed3b.appspot.com",
  messagingSenderId: "457026861277",
  appId: "1:457026861277:web:c8c5243887a63a5e584334",
  measurementId: "G-8NF6MPSR9H"
};
// firebase.initializeApp(config);
const firebase = initializeApp(config);
// const analytics = getAnalytics(firebase);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};


export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth,provider);

export default firebase;
