import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYQ1TG7QNGCoEw75_bDiJiksX0OpKyXrM",
  authDomain: "codeleap-test-acffd.firebaseapp.com",
  projectId: "codeleap-test-acffd",
  storageBucket: "codeleap-test-acffd.firebasestorage.app",
  messagingSenderId: "282706109410",
  appId: "1:282706109410:web:76374031bedd9ace23cfbb",
  measurementId: "G-KYR4XB4R7M"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();