import TrackWaveSurfer from "@/components/client/TrackWaveSurfer/TrackWaveSurfer";
import { getDetailTrack } from "@/lib/services/get-track";
import { configApp } from "@/utils/enum";
import { Grid } from "@mui/material";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface IPops {
    params: {
        slug: string[];
    };
    searchParams: {
        pid: string | undefined;
        edit: "0" | undefined;
        isPLay: "1" | undefined;
    };
}

export default async function DetailTrackPage({
    params: { slug },
    searchParams: { pid, edit, isPLay },
}: IPops) {
    const slugUser = slug[0];
    const fileTrack = slug[1].split(".")[0].split("I")[1];
    const isHasAuthor = slugUser !== configApp.noAccount;

    if (!pid || !edit || edit !== "0") {
        return notFound();
    }

    const [data] = await Promise.all([getDetailTrack({ _id: pid || "" })]);
    console.log(data);

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item sm={12}>
                    <Suspense fallback={<div>Dang Tai Trang .......</div>}>
                        <TrackWaveSurfer detail={data} trackName={fileTrack} />
                    </Suspense>
                </Grid>
                <Grid item sm={3}>
                    Render bên phải
                </Grid>
            </Grid>
        </div>
    );
}
