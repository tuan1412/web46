import firebase from 'firebase/app';
import 'firebase/firebase-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCacERamhiiG_J04g1RInEKjiwMF5X-j7w",
  authDomain: "web46-90471.firebaseapp.com",
  projectId: "web46-90471",
  storageBucket: "web46-90471.appspot.com",
  messagingSenderId: "483396932283",
  appId: "1:483396932283:web:30f587993369cb3bc68f9e",
  measurementId: "G-4JJ8VTZTHK"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;
