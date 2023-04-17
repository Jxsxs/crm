import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnVHiabkRt2zsfiS5eJOtu1y0-sYmKfa8",
  authDomain: "crmauth-bd927.firebaseapp.com",
  databaseURL: "https://crmauth-bd927-default-rtdb.firebaseio.com",
  projectId: "crmauth-bd927",
  storageBucket: "crmauth-bd927.appspot.com",
  messagingSenderId: "461028285050",
  appId: "1:461028285050:web:f265edff880009c60979c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;