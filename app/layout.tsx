import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// * components
import Protected from "./(protected)/Layout";
import AppLayout from "./(protected)/components/layout/Layout";

// * etc
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "토박이 - 동네 정보 공유 플랫폼",
    description: "Generated by create next app",
};

declare global {
    interface Window {
        kakao: any;
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Protected>
                    <AppLayout>{children}</AppLayout>
                </Protected>
                <Script
                    type='text/javascript'
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&autoload=false&libraries=services`}
                ></Script>
            </body>
        </html>
    );
}
