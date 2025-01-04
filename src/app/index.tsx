import {View, StyleSheet} from "react-native";
import Game from "@/components/Game";
import {StatusBar} from "expo-status-bar";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <Game />

            <StatusBar style='auto' />

        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})