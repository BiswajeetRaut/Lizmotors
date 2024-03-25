import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBV4oEy5-Wvzc1BNZ7I5bpHy0Wd8UPXlqA",
  authDomain: "lizmotors-6f975.firebaseapp.com",
  projectId: "lizmotors-6f975",
  storageBucket: "lizmotors-6f975.appspot.com",
  messagingSenderId: "155396484410",
  appId: "1:155396484410:web:e095bdf7766b0c847ef403",
  measurementId: "G-7F25LRS75D"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
