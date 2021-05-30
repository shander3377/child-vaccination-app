import firebase from "firebase";
require("@firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyBOdJMRsOav_jj0garugYgVPNX7K5I86xc",
    authDomain: "child-vaccine-app.firebaseapp.com",
    projectId: "child-vaccine-app",
    storageBucket: "child-vaccine-app.appspot.com",
    messagingSenderId: "505128496555",
    appId: "1:505128496555:web:752e66dcf9a8020301b6ee"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
