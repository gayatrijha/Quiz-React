import "./App.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "./components/Homepage/Question";
import getQuestions from "./components/Homepage/getQuestion";

function App() {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    getQuestions().then((questions) => {
      return setQuestionsArray(
        questions.map((question) => {
          return {
            ...question,
            id: nanoid(),
            selectedAnswer: "",
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    if (questionsArray.length !== 0) {
      let correctAnswers = 0;

      questionsArray.forEach((question) => {
        if (question.correct_answer === question.selectedAnswer)
          correctAnswers++;
      });

      setCorrectAnswersCount(correctAnswers);
    }
  }, [questionsArray]);

  const handleSelectAnswer = (questionId, answer) => {
    console.log("option selected")
    if (!isGameOver) {
			setQuestionsArray(prevQuestionsArray => (
				prevQuestionsArray.map(question => (
					question.id === questionId
						? {...question, selectedAnswer: answer }
						: question
				))
			));
		}
	}

  const questionElements = questionsArray.map((question) => (
    <Question
      key={question.id}
      id={question.id}
      question={question.question}
      correctAnswer={question.correct_answer}
      incorrectAnswers={question.incorrect_answers}
      handleSelectAnswer={handleSelectAnswer}
      selectedAnswer={question.selectedAnswer}
    />
  ));


  const checkAnswers = () => {
	
			setIsGameOver(true);

			setQuestionsArray(prevQuestionsArray => (
				prevQuestionsArray.map(question => ({...question, showAnswer: true }))
			));
		
	}
  const resetGame=()=>{
    console.log("rest")
  }
  return (
    <>
      <main className="questionback">{questionElements}</main>
      <div className="bottom-container">
          {isGameOver && 
            <h3  className="correct-answers-text">You scored {correctAnswersCount}/ 5 correct answers</h3>
          }
          <button className="submit" onClick={isGameOver ? resetGame : checkAnswers}>{isGameOver ? "Play Again " : "Check Answers"}</button>
      </div>
      {/* <main className="questionback">
        <div className="container">
          {questions.map((element, id) => {
            return (
              <div key={id}>
                <Question
                  question={element.question}
                  // answers={element.options}
                  correctAnswer={element.correct_answer}
                  incorrectAnswers={element.incorrect_answers}
                  score={score}
                  setScore={setScore}
                  held={held}
                  setHeld={setHeld}
                />
              </div>
            );
          })}
        </div>

        <div className="container bottom">
          <div style={{marginLeft:"70px"}}>
          {btnclick ? (
            <p className="bottomtxt">
              You scored {score} / {questions.length} correct answers
            </p>
          ) : (
            ""
          )}
          </div>
   
          <button 
            type="button"
            className="btn submit text-center flex"
            onClick={onCheck}
          >
            Check Answers
          </button>
       
        </div>
      </main> */}
    </>
  );
}

export default App;
