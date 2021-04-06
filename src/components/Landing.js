import React, {useRef, useEffect, useState, Fragment} from "react";


function Landing() {
    /*** affichage des btn insciption ***/
    const [btn, setBtn] = useState(false);
    
    /*** effet de griffe sur wolverine ***/
    const refWolverine = useRef(null);

    useEffect(()=>{
        refWolverine.current.classList.add("startingImg");
        setTimeout(()=>{
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 1000 )
 }, [])

    const displayBtn = btn && (
        <Fragment>
            <div className="leftBox">
                <button className="btn-welcome">Inscription</button>
            </div>
            <div className="rightBox">
                <button className="btn-welcome">Connexion</button>
            </div>
        </Fragment>
    )


  return (
    
    <main ref={refWolverine} className= "welcomePage">
       {displayBtn}
      
    </main>
  );
}

export default Landing;