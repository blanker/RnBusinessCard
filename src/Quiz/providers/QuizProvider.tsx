import React, { useEffect, useState, createContext, useContext, PropsWithChildren } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import questions from "../questions";
import { Question } from "../types";

type QuizContext = {
    question?: Question;
    questionIndex: number;
    onNext: () => void;
    selectedOption?: string;
    setSelectedOption: (newOption: string) => void;
    score: number;
    bestScore: number;
    totalQuestions: number;
}

const QuizContext = createContext<QuizContext>({
    questionIndex: 0,
    onNext: () => {},
    setSelectedOption: () => {},
    score: 0,
    bestScore: 0,
    totalQuestions: questions.length,
});

export default function QuizProvider({ children }: PropsWithChildren) { 
    const [questionIndex, setQuestionIndex] = useState(0);
    const question = questions[questionIndex];
    
    const [selectedOption, setSelectedOption] = useState<string | undefined>();
    const [score, setScore] = useState(0);
    const [bestScore, setBestscore] = useState(0);
    const isFinished = questionIndex >= questions.length;

    useEffect(() => { 
        getBestScore().then(setBestscore)
    }, []);

    useEffect(() => {
        if (isFinished === true && score > bestScore) {
            setBestscore(score);
            saveBestScore(score);
        }
    }, [isFinished]);

    const restart = () => { 
        setQuestionIndex(0);
        setSelectedOption('');
        setScore(0);
    }

    const onNext = () => {
        if (isFinished) {
            return restart();
        }

        // check if the selected option is correct
        if (selectedOption === question?.correctAnswer) {
            setScore((prev) => prev + 1);
        }
        setQuestionIndex((prev) => prev + 1);
    };

    return (
        <QuizContext.Provider
            value={{
                question, 
                questionIndex, 
                onNext, 
                selectedOption, 
                setSelectedOption,
                score,
                bestScore,
                totalQuestions: questions.length,
            }}
        >
            { children }
        </QuizContext.Provider>
    );
}

const getBestScore = async () => {
    try {
        const bestScore = await AsyncStorage.getItem('best-score');
        return bestScore ? parseInt(bestScore) : 0;
    } catch (e) {
        console.error(e);
        return 0;
    }
}

const saveBestScore = async (bestScore: number) => {
    try {
        await AsyncStorage.setItem('best-score', bestScore.toString());
    } catch (e) {
        console.error(e);
    }
};

export const useQuizContext = () => useContext(QuizContext);