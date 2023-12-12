"use client";
import WaveSurfer from "wavesurfer.js";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ITRack, ITRackSaveLocal, IUser } from "@/utils/interface";
import Track from "./Track";
import { TrackContext } from "@/lib/TrackContext/TrackContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TrackWaveSurfer = ({
    trackName,
    detail,
}: {
    trackName: string;
    detail: ITRack<IUser | undefined>;
}) => {
    const TrackAction = useContext(TrackContext).AudioTrack()
        .current as WaveSurfer;
    const patname = usePathname();

    useEffect(() => {
        const listTrack = JSON.parse(
            localStorage.getItem("list_music") || "[]"
        ) as ITRackSaveLocal[];

        const newTrackList = listTrack.map((track) => {
            track.is_active = false;
            return track;
        });

        const checkTrackExit = newTrackList.find(
            (track) => track.fileName === trackName
        );

        if (checkTrackExit) {
            checkTrackExit.is_active = true;
        } else {
            newTrackList.push({
                fileName: trackName,
                is_active: true,
                track_parent: detail._id,
                url_current: patname,
            });
        }

        localStorage.setItem("list_music", JSON.stringify(newTrackList));
    }, []);

    return (
        <div id="detail-track">
            <div className="info-track">
                <div>
                    <button onClick={async () => {}}>Play</button>
                    <button
                        className="ml-[60px]"
                        onClick={async () => {
                            TrackAction.setTime(120);
                        }}
                    >
                        Tua
                    </button>
                    <h1>{detail.title}</h1>
                    <Link href="/detail/no-account/anh-se-di-tim-mot-giac-mo-khac-Id5e1d531caa8197f0f36009ed1e41dfa.html?pid=6575692d6043ef61152b0b6f&edit=0&isPLay=1">
                        Chuyen Link
                    </Link>
                </div>
            </div>
            <Track fileName={trackName} />
        </div>
    );
};

export default TrackWaveSurfer;
