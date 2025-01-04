import {StyleSheet, View, Text, Switch} from "react-native";
import {useController} from "react-hook-form";

type CustomSwitch = {
    name: string;
    label?: string;
}

export default function CustomSwitch({name, label}: CustomSwitch) {
    const { field: {value, onChange}} = useController({ name})
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 5
        }}>
            <Text style={{fontSize: 16, fontWeight: 'semibold'}}>{label}</Text>
            <Switch
                style={styles.checkbox}
                value={value}
                onValueChange={onChange}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    checkbox: {

    }
})