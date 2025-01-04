import { PropsWithChildren, useState, useEffect } from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { ActivityIndicator, Image, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Thumbnails = {
    video: string;
}

export default function Thumbnails({ video }: PropsWithChildren<Thumbnails>) {
    const [image, setImage] = useState<string | null>(null);

    const generateThumbnail = async () => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                video, { time: 200 }
            );
            setImage(uri);
        } catch (e) {
            //console.warn(e);
        }
    };

    useEffect(() => {
        generateThumbnail();
    }, [video]);

    if (!image) {
        return (
            <ActivityIndicator />
        )
    };

    return (
        <View>
            <Image
                source={{ uri: image }}
                style={{ aspectRatio: 3 / 4, borderRadius: 5 }}
            />
            <MaterialIcons
                name="play-circle-outline"
                size={24}
                color="white"
                style={styles.play}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    play: {
        position: 'absolute',
        top: 5,
        left: 5,
    }
})