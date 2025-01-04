import { Link, useFocusEffect } from 'expo-router';
import { StatusBar, Dimensions, Text, View, Image, StyleSheet, Pressable, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { useCallback, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as fileType from 'file-type';
import { getMediaType, isImageOrVideo, MediaType } from '../utils/media';
import Video from '../components/video';
import Thumbnails from '../components/video-thumbnail';

type Media = {
    name: string;
    uri: string;
    type: MediaType;
}

export default function HomeScreen() {
    const [images, setImages] = useState<Media[]>([]);

    useFocusEffect(
        useCallback(() => {
            loadFiles()
        }, [])
    );

    const loadFiles = async () => {
        if (!FileSystem.documentDirectory) {
            return;
        }
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        setImages(
            files
                .filter(name => isImageOrVideo(name))
                .map(name => ({
                    name,
                    uri: FileSystem.documentDirectory + name,
                    type: getMediaType(name),
                }))
        );
    }

    // console.log(FileSystem.documentDirectory);
    // const { width, height } = Dimensions.get('window');
    // console.log(images);


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={images}
                    numColumns={3}
                    contentContainerStyle={{ gap: 1, paddingVertical: 3, paddingHorizontal: 1 }}
                    columnWrapperStyle={{ gap: 1 }}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <Link href={`/${item.name}`} asChild>
                            <Pressable
                                style={{
                                    flex: 1, maxWidth: '33%'
                                }}
                            >
                                {
                                    item.type === 'image' ? (
                                        <Image
                                            source={{ uri: item.uri }}
                                            style={{ aspectRatio: 3 / 4, borderRadius: 5 }}
                                        />
                                    ) : (
                                        <Thumbnails video={item.uri} />
                                        // <Video video={item.uri} />
                                    )
                                }

                            </Pressable>
                        </Link>
                    )}
                />

                <Link href="/camera" asChild>
                    <Pressable style={styles.floattingButton}>
                        <MaterialIcons name="photo-camera" size={30} color="white" />
                    </Pressable>
                </Link>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floattingButton: {
        backgroundColor: 'royalblue',
        padding: 15,
        borderRadius: 50,
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});

