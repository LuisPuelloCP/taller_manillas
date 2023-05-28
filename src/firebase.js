// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgIXoojKj8H36NVCKtpzJmmITo80CuYxU",
  authDomain: "tallermanillas.firebaseapp.com",
  projectId: "tallermanillas",
  storageBucket: "tallermanillas.appspot.com",
  messagingSenderId: "968665247804",
  appId: "1:968665247804:web:993dee703410eec7431339"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}