"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Slider, duration } from "@mui/material";
import { TrackContext } from "@/lib/TrackContext/TrackContext";
import WaveSurfer from "wavesurfer.js";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { ITRackSaveLocal } from "@/utils/interface";

export default function Footer() {
    const [percentTime, setPercentTime] = React.useState<number>(0);
    const AudioGlobal = React.useContext(TrackContext).AudioTrack().current;
    const ActionAudio = React.useContext(TrackContext);
    const refAudio = React.useRef<HTMLDivElement>(null);
    const ref = React.useRef<WaveSurfer | null>(null);

    React.useEffect(() => {
        if (!ref.current) return;
        if (AudioGlobal) {
            ref.current.load(AudioGlobal.options.url || "");
        } else {
            const listMusic = JSON.parse(
                localStorage.getItem("list_music") || "[]"
            ) as ITRackSaveLocal[];
            if (!listMusic.length) return;
            const track = listMusic.find((trackItem) => trackItem.is_active);
            if (!track || !track.fileName) return;
            const url = `${process.env.NEXT_PUBLIC_BASE_BE}/track/listen/${track?.fileName}`;
            ref.current.load(url);
        }
    }, [ref.current, AudioGlobal]);

    const handleUpdatePercent = (percent: number) => {
        if (!ref.current) return;
        const currentTimeSeek = (percent * ref.current.getDuration()) / 100;
        ActionAudio.setAudio().setCurrentTime(currentTimeSeek);
    };

    const handleUpdatePercentEvent = (time: number) => {
        if (!ref.current) return;
        const durations = ref.current.getDuration();
        const percentMath = Math.floor((time / durations) * 100);
        setPercentTime(percentMath);
    };

    React.useEffect(() => {
        if (!refAudio.current) return;
        ref.current = WaveSurfer.create({
            container: refAudio.current,
        });
        ref.current.addEventListener("timeupdate", handleUpdatePercentEvent);
    }, []);

    const hanleTogglePlay = () => {
        if (!ref.current) return;
        ActionAudio.setAudio().SetIsPlay(!ActionAudio.AudioTrack().isPlay);
        ActionAudio.AudioTrack().isPlay
            ? ref.current.pause()
            : ref.current.play();
    };

    React.useEffect(() => {
        if (!ActionAudio.AudioTrack().currentTime || !ref.current) return;
        ref.current.setTime(ActionAudio.AudioTrack().currentTime);
    }, [ActionAudio.AudioTrack().currentTime]);

    return (
        <div className="fixed bottom-[0px] w-full h-[40px]">
            <div className="hidden">
                <div ref={refAudio}></div>
            </div>
            <div className="flex justify-center items-center gap-[10px]">
                <div>
                    <Button onClick={hanleTogglePlay} className="h-[34px]">
                        {ActionAudio.AudioTrack().isPlay ? (
                            <PauseIcon />
                        ) : (
                            <PlayArrowIcon />
                        )}
                    </Button>
                </div>
                <div className="w-[60%] h-[34px] flex items-center pt-[5px]">
                    <Box sx={{ width: "100%" }}>
                        <Slider
                            size="small"
                            defaultValue={percentTime}
                            value={percentTime}
                            aria-label="Small"
                            valueLabelDisplay="off"
                            min={0}
                            max={100}
                            onChange={(...rest: any) =>
                                handleUpdatePercent(rest[1])
                            }
                            color="warning"
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
}
