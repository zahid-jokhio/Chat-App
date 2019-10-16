import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDwxbS8y3d2ZprBxaTvdTBNkPWhCN0K-P8",
  authDomain: "chatapp-3a0e7.firebaseapp.com",
  databaseURL: "https://chatapp-3a0e7.firebaseio.com",
  projectId: "chatapp-3a0e7",
  storageBucket: "",
  messagingSenderId: "322619727811",
  appId: "1:322619727811:web:4c80a87e868b5cf7cfa776",
  measurementId: "G-6MTE993EHJ"
};
firebase.initializeApp(firebaseConfig);
export default firebase
