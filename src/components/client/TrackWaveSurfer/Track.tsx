import { TrackContext } from "@/lib/TrackContext/TrackContext";
import { usePathname } from "next/navigation";
import React, { memo, useContext, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";

const Track = ({ fileName }: { fileName: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const AudioRef = useContext(TrackContext);
    const patname = usePathname();

    useEffect(() => {
        if (ref.current) {
            const audio = WaveSurfer.create({
                container: ref.current,
                url: `${process.env.NEXT_PUBLIC_BASE_BE}/track/listen/${fileName}`,
                plugins: [
                    HoverPlugin.create({
                        labelBackground: "#000",
                        lineColor: "rgba(255,255,255,0.5)",
                        labelColor: "red",
                        labelSize: 12,
                        lineWidth: 3,
                    }),
                ],
            });
            audio.setMuted(true);
            audio.on("seeking", (time: number) => {
                if (!time) return;
                AudioRef.setAudio().setCurrentTime(time);
            });
            AudioRef.setAudio().setAudioRef({
                current: audio,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileName]);

    useEffect(() => {
        if (
            !AudioRef.AudioTrack().currentTime ||
            !AudioRef.AudioTrack().current
        )
            return;
        AudioRef.AudioTrack().current?.setTime(
            AudioRef.AudioTrack().currentTime
        );
    }, [AudioRef.AudioTrack().currentTime]);

    useEffect(() => {
        const DivELement = ref.current;
        if (!DivELement) return;
        const divELements: NodeList = DivELement.querySelectorAll("div");
        let indexHidden: 0 | 1 = 0;
        if (patname.slice(1, 7) === "detail") {
            indexHidden = 1;
        }

        if (divELements && divELements.length > 1) {
            divELements.forEach((element, index: number) => {
                if (element instanceof HTMLElement) {
                    if (indexHidden === 0) {
                        element.style.display = "none";
                    } else {
                        if (index > 0) {
                            element.style.display = "none";
                        }
                    }
                }
            });
        }
    }, [ref, AudioRef, patname]);

    return (
        <div>
            <div ref={ref}></div>
        </div>
    );
};

export default memo(Track);
