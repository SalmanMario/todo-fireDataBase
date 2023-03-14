// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBs9ixkslPyKQHT2exeju1EKZuOAnXE_6s",
    authDomain: "todolist-ebfb4.firebaseapp.com",
    projectId: "todolist-ebfb4",
    storageBucket: "todolist-ebfb4.appspot.com",
    messagingSenderId: "9564125251",
    appId: "1:9564125251:web:24403999287d352e753cf6",
    measurementId: "G-K06726SWW1",
    databaseURL: "https://todolist-ebfb4-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();