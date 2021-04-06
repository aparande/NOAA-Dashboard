import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBVM9APH05qcaq3oFIPdXhdPi95bSSlVIc",
  authDomain: "noaa-dashboard-6abd6.firebaseapp.com",
  projectId: "noaa-dashboard-6abd6",
  storageBucket: "noaa-dashboard-6abd6.appspot.com",
  messagingSenderId: "244093041117",
  appId: "1:244093041117:web:7a41e3d7d09a1cdff09e34"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;