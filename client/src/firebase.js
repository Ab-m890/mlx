// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4bpDx6kTeo98QCh7K9ZjgdX9vW3fmSQo",
  authDomain: "mlx-olx.firebaseapp.com",
  projectId: "mlx-olx",
  storageBucket: "mlx-olx.appspot.com",
  messagingSenderId: "502213370704",
  appId: "1:502213370704:web:0362383b80d1d2a8698255",
  measurementId: "G-4V6D27GF0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app