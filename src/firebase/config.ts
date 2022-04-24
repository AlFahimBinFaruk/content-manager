import { initializeApp } from "firebase/app";
//firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "content-manager-a91b8.firebaseapp.com",
  projectId: "content-manager-a91b8",
  storageBucket: "content-manager-a91b8.appspot.com",
  messagingSenderId: "378606295403",
  appId: "1:378606295403:web:573f717196f7b52467542e",
  measurementId: "G-TGRLH28GJK",
};

const initializeFirebaseApp = () => {
  let app = initializeApp(firebaseConfig);
};

export default initializeFirebaseApp;
