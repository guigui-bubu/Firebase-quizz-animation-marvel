import app from 'firebase/app';
import 'firebase/auth'; // firebase authentification
import 'firebase/firestore'; // firebase cloud collection


const config = {
    apiKey: "AIzaSyAEzM81GxqbxLPRzXBC321f28SOnwUegWA",
    authDomain: "marvel-quiz-5effe.firebaseapp.com",
    projectId: "marvel-quiz-5effe",
    storageBucket: "marvel-quiz-5effe.appspot.com",
    messagingSenderId: "932383927675",
    appId: "1:932383927675:web:948ef9c82084965a27e1de"
  };


class Firebase {
    constructor () {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    //inscription
    signupUser = (email, password)=> 
    this.auth.createUserWithEmailAndPassword(email, password);

    //connexion
    loginUser = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);

    //deconnexion
    signoutUser =()=> this.auth.signOut();
    
    //ResetPassword
    passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

    //Cloud FireStore
    user = uid => this.db.doc(`users/${uid}`);


};
export default Firebase;