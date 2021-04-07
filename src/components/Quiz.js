import React, { Component, Fragment} from "react";
import Levels from "./Levels";
import ProgressBar from "./ProgressBar";
import QuizOver from "./QuizOver";
import {QuizMarvel} from "./QuizMarvel";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Quizz extends Component {

  state = {
    levelNames : ["debutant","confirme","expert"],
    quizLevel : 0,
    maxQuestions : 10,
    storedQuestions : [],
    question : null,
    options: [],
    idQuestion : 0, 
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: false,
    quizEnd: false,
  }

  storedDataRef = React.createRef();

  loadQuestions = quizz => {
     const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
     if(fetchedArrayQuiz.length >= this.state.maxQuestions){

      this.storedDataRef.current = fetchedArrayQuiz;
      //console.log(this.storedDataRef.current);

      const newArray = fetchedArrayQuiz.map(({answer, ...keepRest})=> keepRest); // nouveau tableau sans la réponse de la question 

      this.setState({   // Mettre a jour le state
        storedQuestions : newArray 
      })

     } else {
       console.log("Pas assez de questions !!")
     }
  }

  showWelcomeMsg = pseudo => {
    if(!this.state.showWelcomeMsg){

         this.setState({
            showWelcomeMsg : true,
          })

      toast.warn(`Bienvenue ${pseudo}, et bonne chance!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        });
    }

  }

 componentDidMount () {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
 }

 componentDidUpdate(prevProps, prevState) {

   if (this.state.storedQuestions !== prevState.storedQuestions) {
       
        this.setState({
          question: this.state.storedQuestions[this.state.idQuestion].question,
          options: this.state.storedQuestions[this.state.idQuestion].options
        })
   }
   if( this.state.idQuestion !== prevState.idQuestion){
     this.setState ({
      question: this.state.storedQuestions[this.state.idQuestion].question,
      options: this.state.storedQuestions[this.state.idQuestion].options,
      userAnswer: null,
      btnDisabled: true,
     })
   }
  
   if (this.props.userData.pseudo){
     this.showWelcomeMsg(this.props.userData.pseudo)
   }

 }

 submitAnswer = selectedAnswer => {
      this.setState({                   // active le bouton quand une reponse active
        userAnswer: selectedAnswer,
        btnDisabled: false,
      })
 }

 nextQuestion = () => {
   if(this.state.idQuestion === this.state.maxQuestions -1 ){
     this.gameOver()

   } else {
     this.setState (prevState => ({
       idQuestion: prevState.idQuestion +1
     }))
   }

   const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
   if ( this.state.userAnswer === goodAnswer ) {
     this.setState ( prevState => ({
          score: prevState.score + 1 
     }))
     toast.success(`Bravo +1`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      });
   } else {
    toast.error(`Raté 0`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      });
   }
   
 }

 gameOver =() =>{
      this.setState({
        quizEnd: true
      })
 }
 

  render () {

    const displayOptions = this.state.options.map((option, index)=>{
          return (
            <p key={index} className={`answerOptions ${this.state.userAnswer === option ? " selected" : null}`} 
              onClick={()=>this.submitAnswer(option)} >{option}</p>
          )
    })


   return !this.state.quizEnd ? (
      <QuizOver ref={this.storedDataRef}/>
    ) : (
      <Fragment>
       
      <Levels />
      <ProgressBar idQuestion={this.state.idQuestion} maxQuestions={this.state.maxQuestions}/>

      <h2>{this.state.question}</h2>

      {displayOptions}

      <button 
             disabled={this.state.btnDisabled}
              className="btnSubmit"
              onClick={this.nextQuestion}
            >
              {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"} 
            </button>

     </Fragment>
    )
  }
}

export default Quizz;