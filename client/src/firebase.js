import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBvpGI8nCz7CgR3b8ZJDhogYJVOLSKa1vc",
  authDomain: "video-84377.firebaseapp.com",
  projectId: "video-84377",
  storageBucket: "video-84377.appspot.com",
  messagingSenderId: "409206774285",
  appId: "1:409206774285:web:67877ccfdeb46166e9d344"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;