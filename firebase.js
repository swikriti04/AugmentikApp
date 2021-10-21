import * as firebase from 'firebase';
import '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCN2HGxWnqpmyH3MNXe040gaIqO7zzYcJU",
    authDomain: "employeesignin-a4254.firebaseapp.com",
    projectId: "employeesignin-a4254",
    storageBucket: "employeesignin-a4254.appspot.com",
    messagingSenderId: "753650567669",
    appId: "1:753650567669:web:e8e4df37db5aa6cc3038bc",
    measurementId: "G-V9PMK4TP3Y"
};

firebase.initializeApp(firebaseConfig);
export default firebase;