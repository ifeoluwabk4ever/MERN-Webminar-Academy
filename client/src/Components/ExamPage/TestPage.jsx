import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import { BsClock } from 'react-icons/all'
import axios from 'axios'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'


import TestSubmit from './TestSubmit';
import questions from '../../Utils/Misc/QuestionData'
import { timeFrame } from '../../Utils/Misc/QuestionData'
import { loadNewUser } from '../../Data/Actions/InitRegAction'
import { FadeLoader } from 'react-spinners'


const TestPage = ({ loadNewUser, isLoading }) => {
   const [currentQuestion, setCurrentQuestion] = useState(0);
   const [showScore, setShowScore] = useState(false);
   const [score, setScore] = useState(0);
   const [time, setTime] = useState({
      min: timeFrame,
      sec: 0,
      msg: ''
   })

   let { min, sec, msg } = time
   useEffect(() => {
      let timer = setInterval(() => {
         if (sec > 0) {
            setTime({ ...time, sec: sec - 1 })
         }
         if (sec === 0) {
            if (min === 0) {
               clearInterval(timer)
               if (msg !== 'Submitted') {
                  setTime({
                     ...time,
                     msg: 'Time Up'
                  })
               }
               setShowScore(true)
            } else {
               setTime({ ...time, min: min - 1, sec: 59 })
            }
         }
      }, 1000);
      return () => {
         clearInterval(timer)
      };
   }, [min, sec, msg, time]);

   const handleAnswerOptionClick = (isCorrect) => {
      if (isCorrect) {
         setScore(score + 1);
      }

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
         setCurrentQuestion(nextQuestion);
      } else {
         setShowScore(true);
      }
   };

   let percentage = (score / questions.length * 100).toFixed(2)

   let submitBtn = async () => {
      try {
         if (msg !== 'Time Up') {
            setTime({
               ...time,
               min: 0,
               sec: 0,
               msg: 'Submitted'
            })
         }
         let testScore = { percentage: Number(percentage), isPassed: percentage >= 70 ? true : false }
         await axios.patch(`/webminar/new-student/add-test-update`, { testScore, hadTest: true })
         loadNewUser()
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }


   return (
      <Container className="my-5 py-4">
         <div className="d-flex justify-content-between">
            <p className="text-muted">Question <span className="text-success">{currentQuestion + 1}</span> of <span className="text-success">{questions.length}</span></p>
            <div>
               <div className="d-inline-flex">
                  <p className="mr-2"><BsClock color="#198754" /> :- </p>
                  <div>
                     {
                        min === 0 && sec === 0 ?
                           <p className={`${msg === 'Submitted' ? "text-dark" : "text-danger"}`}>{msg}</p>
                           : <p>{min < 10 ? `0${min}m` : `${min}m`} : {sec < 10 ? `0${sec}s` : `${sec}s`}</p>
                     }
                  </div>
               </div>
            </div>
         </div>
         <div className="mb-4 test-ques">
            {showScore ? (
               <div className='d-flex justify-content-center align-content-center'>
                  { isLoading ?
                     <div className="my-3">
                        <FadeLoader color='#198754' />
                     </div>
                     :
                     <TestSubmit score={score} questions={questions} submitBtn={submitBtn} percentage={percentage} />
                  }
               </div>
            ) : (
                  <div>
                     <p className='question-text mb-4'><span className="text-muted mr-3">Que {currentQuestion + 1}.</span>{questions[currentQuestion].questionText}</p>
                     <div className='answer-section mx-5'>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                           <button
                              onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                              key={index}
                              className="btn btn-outline-success"
                           >{answerOption.answerText}</button>
                        ))}
                     </div>
                  </div>
               )}
         </div>
      </Container>
   )
}

const mapStateToProps = state => ({
   isLoading: state.initReg.isLoading
})

export default connect(mapStateToProps, { loadNewUser })(TestPage)
