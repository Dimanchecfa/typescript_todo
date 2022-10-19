import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";


const app = firebase.initializeApp({
  apiKey: "AIzaSyBzIu5xQ_yOS-d3amtJLRLCYx9nMm6RobQ",
  authDomain: "todo-app-19fa2.firebaseapp.com",
  projectId: "todo-app-19fa2",
  storageBucket: "todo-app-19fa2.appspot.com",
  messagingSenderId: "498504176949",
  appId: "1:498504176949:web:2430b2f7ef4032e3f5287c",
  measurementId: "G-3Z8T8RY0V3",
});
export default app;
export const auth = app.auth();
export const db = getFirestore();

