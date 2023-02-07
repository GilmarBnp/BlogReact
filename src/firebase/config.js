// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByCa2Feyoi8Lyc0NrfuoTLCb9dGqkCWBY",
  authDomain: "mini-blog-react-5c133.firebaseapp.com",
  projectId: "mini-blog-react-5c133",
  storageBucket: "mini-blog-react-5c133.appspot.com",
  messagingSenderId: "1061945160791",
  appId: "1:1061945160791:web:af1e50676037722be09f12",
  measurementId: "G-4R29WBQSHH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
