import {Text, View, StyleSheet, TextInput} from "react-native";
import CustomButton from "@/src/components/CustomButton";
import {router, useNavigation} from "expo-router";
import { useForm, Controller, SubmitHandler, FormProvider } from 'react-hook-form';
import CustomTextInput from "@/src/components/CustomTextInput";
import KeyboardAwareScrollView from "@/src/components/KeyboardAwareScrollView";
import { zodResolver } from "@hookform/resolvers/zod";
import {PersonalInfo, PersonalInfoSchema, useCheckoutForm} from "@/src/contexts/CheckoutFormProvider";
import RNPickerSelect from 'react-native-picker-select';
import countries from "@/assets/countries.json";
import CustomPicker from "@/src/components/CustomPicker";
import CustomDateTimePicker from "@/src/components/CustomDateTimePicker";
import {useEffect} from "react";

export default function PersonalDetailsForm() {
    const navigation = useNavigation();
    useEffect(() => navigation.setOptions({ headerShown: false}), [navigation]);

    const { setPersonalInfo, personalInfo } = useCheckoutForm();
    const form = useForm<PersonalInfo>({
        resolver: zodResolver(PersonalInfoSchema),
        defaultValues: personalInfo,
    });

    const onNext: SubmitHandler<PersonalInfo> = (data) => {
        // data is valid
        setPersonalInfo(data);
        // redirect next
        router.push('/checkout/payment');
    }

    return (
        <KeyboardAwareScrollView>
            <FormProvider {...form}>

                <CustomTextInput
                    name='fullName'
                    label='Full name'
                    placeholder='Full name'
                />

                <CustomTextInput
                    name='address'
                    label='Address'
                    placeholder='Address'
                />

                <View style={{ flexDirection: 'row', gap: 2}}>
                    <CustomTextInput
                        name='city'
                        label='City'
                        placeholder='NY'
                        containerStyle={{flex: 3}}
                    />
                    <CustomTextInput
                        name='postCode'
                        label='Post code'
                        placeholder='1234'
                        containerStyle={{flex: 2}}
                    />
                </View>


                <CustomPicker
                    name='country'
                    placeholder={ { label: 'Select country'   }}
                    items={countries.map(country => ({
                            label: country.name,
                            value: country.code,
                        }))}
                />

                <CustomTextInput
                    name='phoneNumber'
                    label='Phone number'
                    placeholder='12345688'
                    inputMode='tel'
                />

                <CustomDateTimePicker
                    name='birthdate'
                />

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
    },

})