
import { View, Pressable, Text, StyleSheet, PressableProps } from 'react-native';
import React, { ComponentProps } from 'react';
import Card from './Card';

type CustomButton = {
    title: string;
    rightIcon?: React.ReactNode;
} & ComponentProps<typeof Pressable> & ComponentProps<typeof Card>;
//& PressableProps & typeOf Card;

export default function CustomButton({ title, rightIcon, ...otherProps }: CustomButton)  {  
  return (
    <Pressable
        {...otherProps}
        style={styles.button}
    >
        <Text style={styles.buttonText}>{title}</Text>
        <View style={styles.rightIcon}>
            { rightIcon }
        </View>       
    </Pressable>
  );
  
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#005055',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1.5,
    },
    rightIcon: {
        position: 'absolute',
        right: 20,
    },
});