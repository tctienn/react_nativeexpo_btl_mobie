import { url } from '@/api/dataApi';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';




export default function VideoScreen(props) {
    console.log('test', url + '/' + props.movie)
    const videoSource = url + '/' + props.movie
    const ref = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    useEffect(() => {
        const subscription = player.addListener('playingChange', isPlaying => {
            setIsPlaying(isPlaying);
        });

        return () => {
            subscription.remove();
        };
    }, [player]);

    return (
        <View style={styles.contentContainer}>
            <VideoView
                ref={ref}
                style={styles.video}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
            />

        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 10,

        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    video: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
