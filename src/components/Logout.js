import React, {useEffect, useState, useContext} from "react";
import {FirebaseContext} from '../components/Firebase';


function Logout() {
    const firebase = useContext(FirebaseContext);
    const [checked, setChecked] = useState(false)

    useEffect (()=>{
        if(checked){
            console.log('déconnexion');
           firebase.signoutUser();
        }
    }, [checked, firebase])

    const handleChange = event => {
        setChecked(event.target.checked);
    }


  return (
    
    <div className="logoutContainer">
        <label className='switch'>
            <input type="checkbox" checked={checked} onChange={handleChange}></input>
            <span className='slider round'></span>
        </label>
      
    </div>
  );
}

export default Logout;