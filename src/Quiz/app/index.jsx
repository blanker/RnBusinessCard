import {View, Text, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import QuizScreen from "../components/QuizScreen";
import QuizProvider from "../providers/QuizProvider";

export default function App() {
    return (
        <>
            <QuizProvider>
                <QuizScreen />
            </QuizProvider>
            
            <StatusBar style="auto" />
        </>
    )
}

