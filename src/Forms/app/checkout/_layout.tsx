import {Stack, useNavigation} from "expo-router";
import CheckoutFormProvider from "@/src/contexts/CheckoutFormProvider";
import CheckoutFormStepIndicator from "@/src/components/CheckoutFormStepIndicator";
import {useEffect} from "react";

export default function CheckoutLayout() {
    const navigation = useNavigation();
    useEffect(() => navigation.setOptions({ headerShown: false}), [navigation]);

    return (
        <CheckoutFormProvider>
            <CheckoutFormStepIndicator />
            {/*<Stack screenOptions={{headerShown: false}}>*/}
            <Stack>
                <Stack.Screen name='personal' options={{ title: 'Personal' }} />
                <Stack.Screen name='payment' options={{ title: 'Payment' }} />
                <Stack.Screen name='confirm' options={{ title: 'Confirm' }} />
            </Stack>
        </CheckoutFormProvider>
    );
}