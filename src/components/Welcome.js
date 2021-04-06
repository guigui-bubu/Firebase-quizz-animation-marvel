import React, {Fragment, useState, useContext, useEffect} from "react";
import {FirebaseContext} from '../components/Firebase';
import Logout from "./Logout";
import Quiz from "./Quiz";


function Welcome(props) {

  const [userSession, setUserSession] = useState(null);
  const firebase = useContext(FirebaseContext);


  useEffect(()=>{
   let listener =  firebase.auth.onAuthStateChanged(user =>{
      user ? setUserSession(user) : props.history.push('/');
    })
      return () => {
        listener()
      };
  })
 

  return userSession === null ? (
      <Fragment>
      <div className='loader'></div>
      <p className="loaderText">Loading</p>
      </Fragment>
  ) : (
    <div className="quiz-bg">
    <div className="container">
    <Logout />
    <Quiz />
    </div>
 </div>
  )
}

export default Welcome;