import { CameraView, CameraType, useMicrophonePermissions, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { Link, router, Stack } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { View, Button, StyleSheet, ActivityIndicator, Pressable, Image, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import path from 'path';
import Video from '../components/video';
// import { Video } from 'expo-av';
// import { useVideoPlayer, VideoView } from 'expo-video';


export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [status, requestMicrophonePermission] = useMicrophonePermissions();

    const [facing, setFacing] = useState<CameraType>('back');
    const camera = useRef<CameraView>(null);
    const [picture, setPicture] = useState<CameraCapturedPicture | null | undefined>(null);

    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [video, setVideo] = useState<string | null | undefined>(null);
    const [mode, setMode] = useState<'picture' | 'video'>('video');
    // const player = useVideoPlayer(video || '', player => {
    //     player.loop = true;
    //     player.play();
    // });

    useEffect(() => {
        if (permission && !permission.granted && permission.canAskAgain) {
            requestPermission();
        }
        if (status && !status.granted && status.canAskAgain) {
            requestMicrophonePermission();
        }
    }, [permission]);

    const takePicture = async () => {
        console.log('Begin to takePicture');
        if (camera.current) {
            console.log('Begin to takePicture now');
            const picture = await camera.current.takePictureAsync();
            // router.push('/image', { picture });
            // {"height": 4096, "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FBusinessCard-1ec4a741-5f42-4672-a4a1-5e6d3869e62c/Camera/9e80e171-a529-4ef7-ae6d-552b449d4c6e.jpg", "width": 3072}
            if (Platform.OS === 'web') console.log(picture);
            console.log('Begin to takePicture now', picture);
            setPicture(picture);
        }
    }
    const startRecording = async () => {
        if (camera.current) {
            setMode('video');
            setTimeout(async () => {
                setIsRecording(true);
                const video = await camera?.current?.recordAsync({ maxDuration: 60 });
                setVideo(video?.uri);
                setIsRecording(false);
            }, 0);

        }
    };
    const onPress = () => {
        console.log('onPress', isRecording);
        if (isRecording) {
            camera.current?.stopRecording();
        } else {
            setMode('picture');
            setTimeout(() => takePicture(), 0);
        }
    };

    const saveFile = async (uri: string) => {
        const filename = path.parse(uri).base;
        await FileSystem.copyAsync({
            from: uri,
            to: FileSystem.documentDirectory + filename,
        });
        setPicture(null);
        setVideo(null);
        router.back();
    }

    if (!permission?.granted) {
        return (
            <ActivityIndicator size='large' color='royalblue' />
        )
    }

    if (picture || video) {
        return (
            <View style={styles.container}>
                {picture && (
                    <Image
                        source={{ uri: picture.uri }}
                        style={styles.camera}
                    />
                )}

                {video && (
                    // <Video
                    //     source={{ uri: video }}
                    //     style={styles.camera}
                    // />
                    // <VideoView
                    //     style={styles.video}
                    //     player={player}
                    //     allowsFullscreen
                    //     allowsPictureInPicture
                    // />
                    <Video video={video} />
                )}

                {/* <View style={{ padding: 10 }}>
                    <SafeAreaView edges={['bottom']}>
                        <Button title='save' onPress={() => saveFile(picture?.uri || video || '')} />
                    </SafeAreaView>
                </View> */}

                <MaterialIcons
                    name="save"
                    size={35}
                    color="white"
                    style={styles.saveButton}
                    onPress={() => saveFile(picture?.uri || video || '')}
                />

                <MaterialIcons
                    name="close"
                    size={35}
                    color="white"
                    style={styles.closeButton}
                    onPress={() => {
                        setPicture(null);
                        setVideo(null);
                    }}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>

            <CameraView ref={camera} mode={mode} style={styles.camera} facing={facing}>
                <View style={styles.footer}>
                    <View />

                    <Pressable
                        style={[styles.recordButton, { backgroundColor: isRecording ? 'crimson' : 'white' }]}
                        onPress={onPress}
                        onLongPress={startRecording}
                    />

                    <MaterialIcons
                        name="flip-camera-android"
                        size={24}
                        color="white"
                        onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
                    />
                </View>
            </CameraView>

            <MaterialIcons
                name="close"
                size={30}
                color="white"
                style={styles.closeButton}
                onPress={() => router.back()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        marginTop: 'auto',
        padding: 20,
        paddingBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    camera: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    saveButton: {
        position: 'absolute',
        top: 15,
        right: 75,
    },
    recordButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
    },
    video: {
        width: '100%',
        height: '100%',
    },
});