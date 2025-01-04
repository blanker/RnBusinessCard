import {StyleSheet, Text, View} from "react-native";
import {Link, router, useNavigation} from "expo-router";
import CustomButton from "@/src/components/CustomButton";
import KeyboardAwareScrollView from "@/src/components/KeyboardAwareScrollView";
import {useCheckoutForm} from "@/src/contexts/CheckoutFormProvider";
import {useEffect} from "react";


export default function ConfirmDetailsForm() {
    const navigation = useNavigation();
    useEffect(() => navigation.setOptions({ headerShown: false}), [navigation]);

    const { personalInfo, paymentInfo, onSubmit} = useCheckoutForm();

    return (
        <KeyboardAwareScrollView>
            <View style={{ flex: 1, gap: 10 }}>

                { personalInfo && (
                    <View style={styles.dataContainer}>
                        <View style={styles.dataContainerHeader}>
                            <Text style={styles.title}>Personal</Text>
                            <Link href='/checkout/personal' style={{ color: '#005055', fontWeight: '600'}}>
                                Edit
                            </Link>
                        </View>
                        {Object.entries(personalInfo).map(([key, value]) => (
                                <Text key={key}>{key}: {value?.toString()}</Text>
                            ))}
                    </View>
                )}

                { paymentInfo && (
                    <View style={styles.dataContainer}>
                        <View style={styles.dataContainerHeader}>
                            <Text style={styles.title}>Payment</Text>
                            <Link href='/checkout/payment' style={{ color: '#005055', fontWeight: '600'}}>
                                Edit
                            </Link>
                        </View>
                        {Object.entries(paymentInfo).map(([key, value]) => (
                            <Text key={key}>{key}: {value?.toString()}</Text>
                        ))}
                    </View>
                )}

            </View>

            <CustomButton
                title='Submit'
                style={styles.nextButton}
                onPress={onSubmit}
            />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        paddingBottom: 25,
        gap: 15,
    },
    dataContainer: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 10,
        borderRadius: 10,
        gap: 3,
    },
    dataContainerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    nextButton: {
        marginTop: 'auto',
    },
})