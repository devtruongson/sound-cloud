import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getTrack } from "@/lib/services/get-track";
import { CardActionArea, Grid } from "@mui/material";
import Link from "next/link";
import { configApp } from "@/utils/enum";
import SlugGenerate from "@/helpers/generateSlug";

export default async function HomePage() {
    const data = await getTrack(1, 10);

    return (
        <div>
            <div className="item">
                <Grid container spacing={2}>
                    {data.docs.map((item) => (
                        <Grid item xs={3} key={item._id} className="py-[6px]">
                            <Link
                                href={`/detail/${
                                    item.user
                                        ? item.user.slug
                                        : configApp.noAccount
                                }/${SlugGenerate({
                                    title: item.title,
                                })}-I${item.file}.html?pid=${item._id}&edit=0`}
                            >
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt={item.title}
                                            image={`${process.env.NEXT_PUBLIC_BASE_BE}/upload/get/405022506_969056761241192_7508085814485345611_n-4288.jpg?format=webp`}
                                            className="h-[200px] object-cover"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="h3"
                                            >
                                                <span className="text-[18px] line-clamp-1">
                                                    {item.title}
                                                </span>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}
