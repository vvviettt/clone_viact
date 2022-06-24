// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDweKgUweCpuW9vTliJ-aNno2J9s8Ox-SI",
  authDomain: "viact-354220.firebaseapp.com",
  projectId: "viact-354220",
  storageBucket: "viact-354220.appspot.com",
  messagingSenderId: "998535019266",
  appId: "1:998535019266:web:994c28d99a23e027a0e01b",
  measurementId: "G-FQ5HN9N3JM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const email = result.user.email;
        const name = result.user.displayName;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        resolve({ success: true });
      })
      .catch((err) => {
        reject({ error: true });
      });
  });
};
