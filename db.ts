// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAiR3YA8SFxj6c4TOST7_x8K9gU8rsVPUs",
  authDomain: "my-project-2021-333701.firebaseapp.com",
  projectId: "my-project-2021-333701",
  storageBucket: "my-project-2021-333701.appspot.com",
  messagingSenderId: "390641513105",
  appId: "1:390641513105:web:623b0bdb06ef8e6bcc0530",
  measurementId: "G-HYZERX7Y01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export default db