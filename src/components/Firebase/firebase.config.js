// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqSmt1MHzHPzACK6SJsUiIySR-pI602To",
  authDomain: "yellow-digital.firebaseapp.com",
  projectId: "yellow-digital",
  storageBucket: "yellow-digital.appspot.com",
  messagingSenderId: "34721831478",
  appId: "1:34721831478:web:3e5f6c0922c5f91a5e5697"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;