import {View, Text} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function WorkoutScreen() {
    const {id} = useLocalSearchParams();

    return (
        <View>
            <Text>Workout Screen: {id}</Text>
        </View>
    );
}