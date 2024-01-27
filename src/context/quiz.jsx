import React from "react";
import { createContext, useReducer } from "react";
import questionsComplete from "../data/Questions_complete"

const STAGES = ["Start", "Playing", "End"];

const initialState = {
    gameStage: STAGES[0],
    questionsComplete,
    questions: false,
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
}

const quizReducer = (state, action) => {

    switch (action.type) {
        case "CHANGE_STATE":
            const [filteredCategory] = questionsComplete.filter((question) => question.category.toLowerCase() === action.payload.category.toLowerCase())

            return {
                ...state,
                questions: filteredCategory.questions,
                gameStage: STAGES[1]
            };

        case "REORDER_QUESTIONS": {
            const reorderedQuestions = state.questions.sort(() => {
                return Math.random() - 0.5;
            });

            return {
                ...state,
                questions: reorderedQuestions,
            }

        }
        case "CHANGE_QUESTION": {
            const nextQuestion = state.currentQuestion + 1;
            let endGame = false;

            if (!state.questions[nextQuestion]) {
                endGame = true;
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[2] : state.gameStage,
                answerSelected: false,
            }
        }
        case "DELETE_OPTION": {
            const rightOptionIndex = state.questions[state.currentQuestion].options.indexOf(state.questions[state.currentQuestion].answer);

            const options = state.questions[state.currentQuestion].options
            const updatedOptions = options.filter((option) => option !== options[rightOptionIndex]);

            updatedOptions.sort(() => {
                return Math.random() - 0.5;
            }).splice(0, 1);
            updatedOptions.splice(rightOptionIndex, 0, options[rightOptionIndex]);
            console.log(updatedOptions);

            state.questions[state.currentQuestion].options = updatedOptions

            return state
        }

        case "CHECK_ANSWER": {

            if (state.answerSelected) return state;

            const answer = action.payload.answer;
            const option = action.payload.option;
            let correctAnswer = 0;

            if (answer === option) correctAnswer = 1;

            return {
                ...state,
                score: state.score + correctAnswer,
                answerSelected: option,
            }
        }
        case "NEW_GAME":
            return initialState;

        default:
            return state;
    }
}
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const value = useReducer(quizReducer, initialState);
    return <QuizContext.Provider value={value}>
        {children}
    </QuizContext.Provider>
}