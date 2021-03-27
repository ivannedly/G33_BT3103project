import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCExVMMu5mW2jwxpTxRD7fuzG__Bk0fh18",
    authDomain: "bt3103-project-5558d.firebaseapp.com",
    projectId: "bt3103-project-5558d",
    storageBucket: "bt3103-project-5558d.appspot.com",
    messagingSenderId: "918759954533",
    appId: "1:918759954533:web:7f138df5645f799d568e8c",
    measurementId: "G-B0S5ZY2507"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default databse;