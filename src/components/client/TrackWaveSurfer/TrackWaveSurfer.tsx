"use client";
import WaveSurfer from "wavesurfer.js";

import React, { useEffect, useRef } from "react";
import { ITRack, IUser } from "@/utils/interface";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";
import Track from "./Track";

const TrackWaveSurfer = ({
    trackName,
    detail,
}: {
    trackName: string;
    detail: ITRack<IUser | undefined>;
}) => {
    return (
        <div id="detail-track">
            <div className="info-track">
                <div>
                    <h1>{detail.title}</h1>
                </div>
            </div>
            <Track fileName={trackName} />
        </div>
    );
};

export default TrackWaveSurfer;
