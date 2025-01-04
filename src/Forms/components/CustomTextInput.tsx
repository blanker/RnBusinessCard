import {StyleSheet, TextInput, Text, View, ViewStyle, StyleProp} from "react-native";
import {ComponentProps, useState} from "react";
import {useController} from "react-hook-form";

type CustomTextInput = {
    label?: string;
    name: string;
    containerStyle?: StyleProp<ViewStyle>;
} & ComponentProps<typeof TextInput>;

type Error = {
    message?: string;
} | undefined;

export default function CustomTextInput(
    {
        label,
        name,
        containerStyle,
        ...textInputProps
    }: CustomTextInput
) {
    const {
        field: {value, onBlur, onChange} ,
        fieldState: {error}
    } = useController( { name });

    return (
        <View style={[containerStyle]}>
            {label && (
                <Text style={styles.label}>{label}</Text>
            ) }

            <TextInput
                {...textInputProps}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                style={[
                    styles.input,
                    textInputProps.style,
                    error ? styles.errorInput : null,
                ]}
            />

            <Text
                style={styles.error}
                numberOfLines={1}
            >
                { error?.message}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginTop: 4,
        marginBottom: 2,
    },
    errorInput: {
        borderColor: 'crimson',
    },
    label: {
        fontWeight: '600',
        color: 'dimgray',
    },
    error: {
        color: 'crimson',
        height: 17,
    },
})