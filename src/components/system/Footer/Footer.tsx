"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Slider } from "@mui/material";
import { TrackContext } from "@/lib/TrackContext/TrackContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

export default function Footer() {
    const [percentTime, setPercentTime] = React.useState<number>(0);
    const AudioGlobal = React.useContext(TrackContext).AudioTrack().current;
    const ActionAudio = React.useContext(TrackContext);

    function hanleTogglePlay() {
        ActionAudio.AudioTrack().isPlay
            ? AudioGlobal?.pause()
            : AudioGlobal?.play();
        ActionAudio.setAudio().SetIsPlay(!ActionAudio.AudioTrack().isPlay);
    }

    const handleUpdatePercent = (percent: number) => {
        if (!AudioGlobal) return;
        setPercentTime(percent);
        const timeSeek = (percent * AudioGlobal.getDuration()) / 100;
        ActionAudio.setAudio().setCurrentTime(timeSeek);
    };

    React.useEffect(() => {
        if (!AudioGlobal) return;
        if (!ActionAudio.AudioTrack().currentTime) {
            setPercentTime(0);
        } else {
            const percent =
                (ActionAudio.AudioTrack().currentTime * 100) /
                AudioGlobal.getDuration();
            setPercentTime(percent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ActionAudio.AudioTrack().currentTime]);

    const handleUpdatePercentEvent = (time: number) => {
        if (!time || !AudioGlobal) return;
        const percent = Math.floor((time * 100) / AudioGlobal.getDuration());
        setPercentTime(percent);
    };

    React.useEffect(() => {
        if (!AudioGlobal) return;
        AudioGlobal.on("timeupdate", handleUpdatePercentEvent);
    }, [AudioGlobal]);

    return (
        <div className="fixed bottom-[0px] w-full h-[40px] left-0 right-0">
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
                            value={percentTime ? percentTime : 0}
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
