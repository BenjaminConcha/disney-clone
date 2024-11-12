import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ10ZUwul4CnIxLTkg7vKmyC-sodiUVrs",
  authDomain: "disney-clone-103b6.firebaseapp.com",
  projectId: "disney-clone-103b6",
  storageBucket: "disney-clone-103b6.appspot.com",
  messagingSenderId: "355418918132",
  appId: "1:355418918132:web:edb8b89eec9b4463b8a2a1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

// Export Services
export { auth, provider, storage };
export default db;
