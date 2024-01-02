import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCjFBG_wDrku8i31kPUyHEDk2GDUySdl7I",
    authDomain: "disneyplus-clone-bf5b8.firebaseapp.com",
    projectId: "disneyplus-clone-bf5b8",
    storageBucket: "disneyplus-clone-bf5b8.appspot.com",
    messagingSenderId: "453974820938",
    appId: "1:453974820938:web:15eb1fa1ed7467c6da7eb3",
    measurementId: "G-KZXSSGV2B2"
  };
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export {auth, provider, storage};
  export default db;