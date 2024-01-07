
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC3y8yAx218Xj2nIBbFYUj5QbjXE9NiPqA",
  authDomain: "article-35135.firebaseapp.com",
  projectId: "article-35135",
  storageBucket: "article-35135.appspot.com",
  messagingSenderId: "1060244018818",
  appId: "1:1060244018818:web:773b6bf590eabaa5edc69b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
export {app, db, storage}