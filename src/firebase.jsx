import * as firebase from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserSessionPersistence} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCjjdnPaYnE7vTopDKD-6UqoTyEmlvZzKA",
  authDomain: "masterschool-team-project.firebaseapp.com",
  projectId: "masterschool-team-project",
  storageBucket: "masterschool-team-project.appspot.com",
  messagingSenderId: "373187820267",
  appId: "1:373187820267:web:c8a984c0022d1ec1aadcae"
};


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
setPersistence(auth, browserSessionPersistence)

export default firebaseApp
