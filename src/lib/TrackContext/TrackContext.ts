import { createContext } from "react";
import WaveSurfer from "wavesurfer.js";

const store: {
    AudioTrack: () => {
        current: null | WaveSurfer;
        isPlay: boolean;
        currentTime: number;
    };
    setAudio: () => {
        setAudioRef: (props: { current: any }) => any;
        SetIsPlay: Function;
        setCurrentTime: Function;
    };
} = {
    AudioTrack: () => ({
        current: null,
        isPlay: false,
        currentTime: 0,
    }),
    setAudio() {
        return {
            setAudioRef() {},
            SetIsPlay() {},
            setCurrentTime() {},
        };
    },
};
export const TrackContext = createContext(store);
