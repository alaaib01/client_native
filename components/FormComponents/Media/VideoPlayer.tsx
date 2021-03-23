import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
interface IMedia {
    id: string,
    uri: string,
    fileName: string
}
export default function VidePlayer({ videoSrc }: { videoSrc: IMedia }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({ isPlaying: false, });
    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: videoSrc.uri,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        marginVertical: 10
    },
    video: {
        alignSelf: 'center',
        width: 300,
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
