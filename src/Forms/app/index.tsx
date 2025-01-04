import {View, Text, StyleSheet} from "react-native";
import {Link, Stack, useNavigation} from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/src/components/CustomButton";
import {useEffect} from "react";

export default function App() {
    const navigation = useNavigation();
    useEffect(() => navigation.setOptions({ headerShown: false}), [navigation]);

    return (
        <View style={styles.container}>
            {/*<Stack.Screen options={{title: 'Home', headerShown: false}} />*/}

            <Link href='/checkout/personal' asChild>
                <CustomButton title='Checkout'
                />
            </Link>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})