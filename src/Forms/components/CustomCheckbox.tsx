import Checkbox from "expo-checkbox";
import {StyleSheet, View, Text} from "react-native";
import {useController} from "react-hook-form";

type CustomCheckbox = {
    name: string;
    label?: string;
}

export default function CustomCheckbox({name, label}: CustomCheckbox) {
    const { field: {value, onChange}} = useController({ name})
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Checkbox
                style={styles.checkbox}
                value={value}
                onValueChange={onChange}
            />
            <Text>{label}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    checkbox: {

    }
})