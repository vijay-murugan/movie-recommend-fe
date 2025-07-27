// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCrsysfedop6QDE0WhlhZZ-5l70apgNo8k",
  authDomain: "movie-recommend-eeb1a.firebaseapp.com",
  projectId: "movie-recommend-eeb1a",
  storageBucket: "movie-recommend-eeb1a.firebasestorage.app",
  messagingSenderId: "925859987871",
  appId: "1:925859987871:web:2dd16911e2d5e06a16fdaa",
  measurementId: "G-TCDVEEMX3J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
