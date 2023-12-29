import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5PjLMflZti6bIo8K5BHwZx7spC8mauZQ",
  authDomain: "kawasakiweb-f28ec.firebaseapp.com",
  projectId: "kawasakiweb-f28ec",
  storageBucket: "kawasakiweb-f28ec.appspot.com",
  messagingSenderId: "839927293129",
  appId: "1:839927293129:web:35702fcf0835d54a741918",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = getFirestore(app);
const projectStorage = getStorage(app);

export { projectFirestore, projectStorage };
