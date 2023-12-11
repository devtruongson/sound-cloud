import "server-only";
import { IResPagin, ITRack, IUser } from "@/utils/interface";
import { notFound } from "next/navigation";

export const getTrack = async (
    page: number,
    pageSize: number
): Promise<IResPagin<ITRack<IUser | undefined>>> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_BE}/track/get-track?page=${page}&pageSize=${pageSize}`,
        {
            cache: "no-store",
        }
    );
    const data = await res.json();
    return data;
};

export const getDetailTrack = async ({
    _id,
}: {
    _id: string;
}): Promise<ITRack<IUser | undefined>> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_BE}/track/info/${_id}`,
        {
            next: {
                tags: ["track-detail"],
            },
        }
    );

    if (res.status === 400) {
        return notFound();
    }

    const data = await res.json();
    return data;
};
