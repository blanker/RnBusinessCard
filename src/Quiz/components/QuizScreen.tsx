import React, {useEffect} from 'react';
import {View, Text, Pressable, StyleSheet, SafeAreaView} from 'react-native';
import QuestionCard from './QuestionCard';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import LottieView from 'lottie-react-native';

import Card from "./Card";
import CustomButton from "./CustomButton";
import {useQuizContext} from "../providers/QuizProvider";
import useTimer from '../hooks/useTimer';
import animationParty from '../../assets/animations/party.json';

export default function QuizScreen() {
    const { question, questionIndex, score, bestScore, totalQuestions, onNext } = useQuizContext();
    const { time, startTimer, clearTimer } = useTimer(20);
    const animation = React.useRef<LottieView>(null);

    useEffect(() => {
        startTimer();
        return clearTimer;
    }, [question]);

    useEffect(() => {
        if (time <= 0) {
            onNext();
        }
    }, [time]);

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.container}>
                {/* Header */}
                <View>
                    <Text style={styles.title}>Question {questionIndex+1}/{totalQuestions}</Text>
                </View>

                {/* Body */}
                <View>
                    {question ? (
                        <QuestionCard question={question} />
                    ) : (
                        <>
                            <LottieView 
                                source={require('../../assets/animations/party.json')} 
                                autoPlay 
                                loop 
                                ref={animation}
                                style={StyleSheet.absoluteFill}
                            />
                            <Card title='Well done'>
                        
                                <Text>Correct Answers: {score}/{totalQuestions} </Text>
                                <Text>Best Score: {bestScore} </Text>
                            </Card>
                        </>
                        
                    )}

                    <Text style={styles.time}>{time} sec</Text>
                </View>

                {/* Footer */}
                <CustomButton 
                    title="Next" 
                    rightIcon={<FontAwesome6 name='arrow-right-long' size={16} color='white' />} 
                    onPress={onNext}
                    onLongPress={()=>{ console.warn("Custom Button LongPressed")}}
                />
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#FDFEF4',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    title: {
        textAlign: 'center',
        color: '#005055',
    },
    time: {
        textAlign: 'center',
        marginTop: 15,
        color: '#005055',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#005055',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1.5,
    },
    buttonIcon: {
        position: 'absolute',
        right: 20,
    },
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
    },
});