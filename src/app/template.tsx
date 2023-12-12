import Footer from "@/components/system/Footer/Footer";
import Header from "@/components/system/Header/Header";
import Container from "@mui/material/Container";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="mt-[10px]">
                <Container>{children}</Container>
            </div>
            <Footer />
        </>
    );
}
