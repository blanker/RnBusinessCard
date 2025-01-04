import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, Image, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

import { getMediaType } from '../utils/media';
import Video from '../components/video';

export default function ImageScreen() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const fullUri = (FileSystem.documentDirectory || '') + (name || '');
    const type = getMediaType(name);

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    const onDelete = async () => {
        await FileSystem.deleteAsync(fullUri);
        router.back();
    };
    const onSave = async () => {
        if (permissionResponse?.status !== 'granted') {
            await requestPermission();
        }
        const assert = MediaLibrary.createAssetAsync(fullUri);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Media',
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <MaterialIcons
                                name="delete"
                                size={26}
                                color='crimson'
                                onPress={onDelete}
                            />
                            <MaterialIcons
                                name="save"
                                size={26}
                                color='dimgray'
                                onPress={onSave}
                            />
                        </View>
                    )
                }}
            />
            {
                type === 'video' ? (
                    <View style={styles.image}>
                        <Video video={fullUri} />
                    </View>
                ) : (
                    <Image source={{ uri: fullUri }} style={styles.image} />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
});