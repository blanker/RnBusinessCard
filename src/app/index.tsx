import {View, Text} from "react-native";
import {Link} from "expo-router";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', gap: 10}}>
            <Link href='/workout/current'>Resume Current Workout</Link>
            <Link href='/workout/123'>Open Workout with id 123</Link>

            <Text>Home Screen</Text>
        </View>
    );
}