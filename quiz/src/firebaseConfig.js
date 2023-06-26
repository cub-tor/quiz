// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//Importar autenticación de firebase
import { getAuth, createUserWithEmailAndPassword }from 'firebase/auth';

// Your web app's Firebase configuration
//Para poder asociar el front con el back
const firebaseConfig = {
  apiKey: "AIzaSyAG18bQr3kgIOtl43mBw7f82LF2gyYsY4Y",
  authDomain: "quiz-2023-385907.firebaseapp.com",
  projectId: "quiz-2023-385907",
  storageBucket: "quiz-2023-385907.appspot.com",
  messagingSenderId: "752050988255",
  appId: "1:752050988255:web:3c19801d58778cc7d8756a"
};

// Initialize Firebase const app = initializeApp(firebaseConfig);
//Dejo solo el método. Es para inicializar firebase
initializeApp(firebaseConfig);

//Autenticación de firebase
const auth = getAuth();

export { auth };