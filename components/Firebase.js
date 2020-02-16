import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBjcptTydzCZiL6F8OFRp8TvItKGBOiEIA",
  authDomain: "oyejarvis-hwyuls.firebaseapp.com",
  databaseURL: "https://oyejarvis-hwyuls.firebaseio.com",
  projectId: "oyejarvis-hwyuls",
  storageBucket: "oyejarvis-hwyuls.appspot.com",
  messagingSenderId: "219835909521",
  appId: "1:219835909521:web:f13e4f488838c7e024c630"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
