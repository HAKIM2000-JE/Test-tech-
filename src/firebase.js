import * as firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAm9kKvZi4QnbpR3-WlNeV-u3UgAGZDkzc",
  authDomain: "testtech-90c34.firebaseapp.com",
  projectId: "testtech-90c34",
  storageBucket: "testtech-90c34.appspot.com",
  messagingSenderId: "738024391085",
  appId: "1:738024391085:web:c774c3191081db4e4ee124",
  measurementId: "G-E27NTMQ2YY"
};

firebase.initializeApp(config);

export default firebase.firestore();
