import {Stack} from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{  headerTintColor: 'red', headerShown: true }}>
            <Stack.Screen name='index' options={{ title: 'Home'}}/>
            <Stack.Screen name='workout/current' options={{ title: 'Workout'}}/>
            <Stack.Screen name='workout/[id]' options={{ title: 'Workout'}}/>
        </Stack>
    );
}