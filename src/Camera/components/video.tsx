import { useVideoPlayer, VideoView } from 'expo-video';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

type Video = {
    video: string;
}

export default function Video({ video }: PropsWithChildren<Video>) {
    const player = useVideoPlayer(video, player => {
        player.loop = true;
        player.play();
    });

    return (
        <VideoView
            contentFit="cover"
            style={styles.video}
            player={player}
        />
    );
}

const styles = StyleSheet.create({
    video: {
        flex: 1,
        width: '100%',
        // borderRadius: 5,
        // aspectRatio: 3 / 4,
    }
});