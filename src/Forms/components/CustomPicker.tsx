import countries from "@/assets/countries.json";
import RNPickerSelect from "react-native-picker-select";
import {ComponentProps} from "react";
import {useController} from "react-hook-form";
import {Text, View, StyleSheet} from "react-native";

type CustomPicker = {
    name: string;
} & Omit<ComponentProps<typeof RNPickerSelect>, 'onValueChange'>;

export default function CustomPicker({ name, pickerProps}: CustomPicker) {
    const {
        field: {value, onBlur, onChange},
        fieldState: {error},
    } = useController({ name });
    return (
        <View>
            <RNPickerSelect
                { ...pickerProps }
                value={value}
                onValueChange={onChange}
                onClose={onBlur}
                placeholder={ { label: 'Choose a country'   }}
                items={countries.map(country => ({
                    label: country.name,
                    value: country.code,
                }))}
                style={{
                    viewContainer: {
                        marginTop: 4,
                        marginBottom: 4,
                    },
                    inputIOS: {
                        borderColor: error ? 'crimson' : 'gainsboro',
                        borderWidth: 1,
                        width: '100%',
                        padding: 10,
                        borderRadius: 5,
                    },
                }}
            />
            <Text
                style={styles.error}
                numberOfLines={1}
            >
                { error?.message}
            </Text>
    </View>
    )
}

const styles = StyleSheet.create({
    error: {
        color: 'crimson',
        height: 17,
    },
})