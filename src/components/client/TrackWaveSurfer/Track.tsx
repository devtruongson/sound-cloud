import React, { memo, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";

const Track = ({ fileName }: { fileName: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref.current) {
            WaveSurfer.create({
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
        }
    }, [fileName]);

    return (
        <div>
            <div ref={ref}></div>
        </div>
    );
};

export default memo(Track);
