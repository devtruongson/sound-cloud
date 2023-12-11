import TrackWaveSurfer from "@/components/client/TrackWaveSurfer/TrackWaveSurfer";
import { getDetailTrack } from "@/lib/services/get-track";
import { configApp } from "@/utils/enum";
import { Grid } from "@mui/material";
import { notFound } from "next/navigation";

interface IPops {
    params: {
        slug: string[];
    };
    searchParams: {
        pid: string | undefined;
        edit: "0" | undefined;
    };
}

export default async function DetailTrackPage({
    params: { slug },
    searchParams: { pid, edit },
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
                    <TrackWaveSurfer detail={data} trackName={fileTrack} />
                </Grid>
                <Grid item sm={3}>
                    Render bên phải
                </Grid>
            </Grid>
        </div>
    );
}
