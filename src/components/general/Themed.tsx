import {Colors} from "@/constants/Colors";
import {
    TextInput as DefaultTextInput,
    TextInputProps as DefaultTextInputProps,
    Text as DefaultText,
    View as DefaultView,
    TextProps as DefaultTextProps,
    useColorScheme,
    ViewProps as DefaultViewProps,
} from "react-native";
import { Link as DefaultLink, LinkProps as DefaultLinkProps } from "expo-router";

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
}
export type TextProps = ThemeProps & DefaultTextProps;
export type ViewProps = ThemeProps & DefaultViewProps;
export type TextInputProps = ThemeProps & DefaultTextInputProps;
export type LinkProps = ThemeProps & DefaultLinkProps;

export function useThemeColor (
    props: {light?: string; dark?: string},
    colorTheme: keyof typeof Colors.light & keyof typeof Colors.dark
) {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorTheme];
    }
}

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...restProps } = props;
    const color = useThemeColor(
        {light: lightColor, dark: darkColor},
        "text"
    );

    return <DefaultText style={[ {color }, style]} {...restProps} />;
}

export function View(props: ViewProps) {
    const { style, lightColor, darkColor, ...restProps } = props;
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background"
    );

    return <DefaultView
        style={[  [{backgroundColor}], style]}
        {...restProps}
    />;
}

export function TextInput(props: TextInputProps) {
    const { style, lightColor, darkColor, ...restProps } = props;
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "textInputBackground"
    );
    const color = useThemeColor(
        { light: lightColor, dark: darkColor },
        "text"
    );
    return (
        <DefaultTextInput
            style={[ { backgroundColor, color } , style]}
            {...restProps}
        />
    );
}

export function Link(props: LinkProps) {
    const { style, lightColor, darkColor, ...restProps } = props;
    const color = useThemeColor(
        {light: lightColor, dark: darkColor},
        "text"
    );

    return <DefaultLink style={[ {color }, style]} {...restProps} />;
}