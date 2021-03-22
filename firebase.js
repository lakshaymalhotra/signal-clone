import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDektPnMvbLKxxNJL6wItDLXk_gXzfiVhQ",
    authDomain: "singal-clone-build.firebaseapp.com",
    projectId: "singal-clone-build",
    storageBucket: "singal-clone-build.appspot.com",
    messagingSenderId: "253044354164",
    appId: "1:253044354164:web:d18036dfee20e1ca487521"
  };

  let app;
  if(firebase.apps.length === 0){
    app= firebase.initializeApp(firebaseConfig)
  }
  else{
    app=firebase.app();
  }

  const db=app.firestore();

  const auth=firebase.auth();

  export {db , auth};
  