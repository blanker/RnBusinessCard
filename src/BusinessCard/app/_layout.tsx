import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets  } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function DisplayInsets() {
    const insets = useSafeAreaInsets();
    return (
        <Text>Insets: {JSON.stringify(insets)}</Text>
    );
}
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });



    useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // return (
  //     <SafeAreaProvider>
  //         <SafeAreaView edges={['bottom']} style={style.all}>
  //             <View style={style.content}>
  //               <Text style={style.textTitle}>Title</Text>
  //                 <DisplayInsets />
  //               <Text style={style.textFooter}>Footer</Text>
  //             </View>
  //         </SafeAreaView>
  //     </SafeAreaProvider>
  // );
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
    all: {
        backgroundColor: 'red'
    },
    textTitle: {
        fontSize: 100,
    },
    textFooter: {
        marginTop: 'auto',
    },
    content: {
        backgroundColor: 'palegreen',
        height: '100%',
        alignItems: 'center'
    }
})