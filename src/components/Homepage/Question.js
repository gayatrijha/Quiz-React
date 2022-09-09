import React from "react";
import { nanoid } from "nanoid";
const Question = ({
  question,
  correctAnswer,
  incorrectAnswers,
  handleSelectAnswer,
  id,
  selectedAnswer,
}) => {
  const incorrectAnswersElements = incorrectAnswers.map((ans) => {
    const incorrectAnswerClassName = `
    ${selectedAnswer === ans ? "question-btn-selected" : "question-btn"}`;
    return (
      <button
        className={incorrectAnswerClassName}
        key={nanoid()}
        onClick={() => handleSelectAnswer(id, ans)}
      >
        {ans}
      </button>
    );
  });
  const correctAnswerClassName = `
		${selectedAnswer === correctAnswer ? "question-btn-selected" : "question-btn"}`;
  const correctAnswerElement = (
    <button
      className={correctAnswerClassName}
      onClick={() => handleSelectAnswer(id, correctAnswer)}
    >
      {correctAnswer}
    </button>
  );

  incorrectAnswersElements.push(correctAnswerElement);

  const sortedAnswerElements = incorrectAnswersElements.sort((a, b) =>
    a.props.children.localeCompare(b.props.children)
  );
  // console.log(sortedAnswerElements);
  return (
    <main>
      <div className="container cards ">
        <h3 className="question-text container">{question}</h3>
        <span>{sortedAnswerElements}</span>
        <hr></hr>
      </div>
    </main>
  );
};

export default Question;
