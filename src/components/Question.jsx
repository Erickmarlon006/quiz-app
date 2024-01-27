import React from "react"
import { useContext, useEffect, useState } from "react"
import { QuizContext } from "../context/quiz"
import Option from "./Option"

import "./Question.css"

const Question = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const [isUsingTip, setIsUsingTip] = useState(false);
    const [isDeletedOption, setIsDeletedOption] = useState(false);


    useEffect(() => {
        if (quizState.questions) {
            dispatch({ type: "REORDER_QUESTIONS" });
        }
    }, [quizState.questions, dispatch])

    const selectOption = (option) => {
        dispatch({
            type: "CHECK_ANSWER",
            payload: { answer: currentQuestion.answer, option }
        })
    }

    const currentQuestion = quizState.questions[quizState.currentQuestion];

    return (

        <div id="question">
            {quizState.questions && (
                <>
                    <p>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
                    <h2>{currentQuestion.question}</h2>
                    <div id="options-container">
                        {currentQuestion.options.map((option) => (
                            <Option
                                key={option}
                                option={option}
                                answer={currentQuestion.answer}
                                handleSelect={() => selectOption(option)} />
                        ))}
                    </div>
                    {quizState.answerSelected && (
                        <button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>Continuar</button>
                    )}
                    {currentQuestion.tip && !isUsingTip && !isDeletedOption && !quizState.answerSelected && (
                        <>
                            <button onClick={() => setIsUsingTip(true)}>Dica</button>
                            <button onClick={() => {
                                setIsDeletedOption(true);
                                dispatch({ type: "DELETE_OPTION" });
                            }}>Excluir uma</button>
                        </>
                    )}
                    {isUsingTip && !quizState.answerSelected && (
                        <p>{currentQuestion.tip}</p>
                    )}


                </>
            )
            }
        </div >
    )
}


export default Question