import {StyleSheet, Text, View} from "react-native";
import {router, useNavigation} from "expo-router";
import CustomButton from "@/src/components/CustomButton";
import KeyboardAwareScrollView from "@/src/components/KeyboardAwareScrollView";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import CustomTextInput from "@/src/components/CustomTextInput";
import {PaymentInfo, PaymentInfoSchema, useCheckoutForm} from "@/src/contexts/CheckoutFormProvider";
import CustomCheckbox from "@/src/components/CustomCheckbox";
import CustomSwitch from "@/src/components/CustomSwitch";
import {useEffect} from "react";

export default function PaymentDetailsForm() {
    const navigation = useNavigation();
    useEffect(() => navigation.setOptions({ headerShown: false}), [navigation]);

    const { setPaymentInfo, paymentInfo } = useCheckoutForm();
    const form = useForm<PaymentInfo>({
        resolver: zodResolver(PaymentInfoSchema),
        defaultValues: paymentInfo,
    });

    const onNext: SubmitHandler<PaymentInfo> = (data) => {
        // data is valid
        setPaymentInfo(data);

        // redirect next
        router.push('/checkout/confirm');
    }

    return (
        <KeyboardAwareScrollView>
            <FormProvider {...form}>
                <CustomTextInput
                    name='cardNumber'
                    label='Card number'
                    placeholder='12345688'
                />

                <View style={{ flexDirection:'row', gap: 5 }}>
                    <CustomTextInput
                        name='expireDate'
                        label='Expire date'
                        placeholder='01/30'
                        containerStyle={{ flex: 3}}
                    />

                    <CustomTextInput
                        name='cvv'
                        label='cvv'
                        placeholder='321'
                        containerStyle={{ flex: 2}}
                        inputMode='numeric'
                        keyboardType={'numeric'}
                    />
                </View>

                <CustomCheckbox name='saveCard' label='Save credit card' />
                <CustomSwitch name='switchValue' label='On or off?' />

                <CustomButton
                    title='Next'
                    style={styles.nextButton}
                    onPress={form.handleSubmit(onNext)}
                />
            </FormProvider>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    nextButton: {
        marginTop: 'auto',
    }
})