import slugify from "slugify";

interface IProps {
    title: string;
}
export default function SlugGenerate({ title }: IProps): string {
    return slugify(title, {
        locale: "vi",
        lower: true,
    });
}
