import {Redirect, Stack, useNavigation} from "expo-router";
import {useEffect} from "react";

export default function InitCheckoutForm() {
    const navigation = useNavigation();
    useEffect(() => navigation.setOptions({ headerShown: false}), [navigation]);

    return (
        <Redirect href='/checkout/payment' >

        </Redirect>
    );
}