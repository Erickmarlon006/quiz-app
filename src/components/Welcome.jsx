import React from "react"
import { useContext, useState } from "react"
import { QuizContext } from "../context/quiz"

import quiz from "../img/quiz.svg"

import "./Welcome.css"

const Welcome = () => {
    const [quizState, dispatch] = useContext(QuizContext)
    const [isChoosingCategory, setIsChoosingCategory] = useState(false);

    return (
        <div id="welcome">
            {!isChoosingCategory && (
                <>
                    <h2>Seja bem-vindo</h2>
                    <p>Clique no botão abaixo para iniciar:</p>
                    <button onClick={() => {
                        setIsChoosingCategory(true);
                    }}>Iniciar</button>
                </>
            )}
            {isChoosingCategory && (
                <>
                    <p>Selecione a categoria:</p>
                    <button onClick={(e) => dispatch({ type: "CHANGE_STATE", payload: { category: e.target.innerText } })}>Html</button>
                    <button onClick={(e) => dispatch({ type: "CHANGE_STATE", payload: { category: e.target.innerText } })}>CSS</button>
                    <button onClick={(e) => dispatch({ type: "CHANGE_STATE", payload: { category: e.target.innerText } })}>Javascript</button>
                </>
            )}
            <img src={quiz} alt="welcome" />
        </div >
    )
}

export default Welcome