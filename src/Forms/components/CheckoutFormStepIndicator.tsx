import { useSegments } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
    { key: 'personal', title: 'Personal' },
    { key: 'payment', title: 'Payment' },
    { key: 'confirm', title: 'Confirm' },
];

export default function CheckoutFormStepIndicator() {
    const segments = useSegments();
    const currentScreen = segments[segments.length - 1];

    const stepIndex = steps.findIndex((step) => step.key === currentScreen);
    return (
        <SafeAreaView
            edges={['top']}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 100,
                padding: 0,
                gap: 15,
            }}
        >
            {steps.map((step, index) => (
                <View
                    key={step.key}
                    style={{
                        height: '100%',
                        borderBottomWidth: 3,
                        borderColor: stepIndex >= index ? '#005055' : 'lightgray',
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: stepIndex >= index ? '#005055' : 'gray',
                        }}
                    >
                        {step.title}
                    </Text>
                </View>
            ))}
        </SafeAreaView>
    );
}
