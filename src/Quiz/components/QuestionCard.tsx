import {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import AnswerOption from "./AnswerOption";
import { Question } from "../types";
import Card from "@/src/components/Card";

type QuestionCard = {
    question: Question;
}
export default function QuestionCard({ question }: QuestionCard) {
    const {title, options, correctAnswer} = question;

    return (
        <Card title={title}>
            <View style={styles.answerOptions}>
                {
                    options.map(option => ( 
                        <AnswerOption key={option} option={option} />
                    ))
                }
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    answerOptions: {
        gap: 5,
    },
});