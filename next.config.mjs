import { env } from "process";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "export",
    env: {
        API_URL: process.env.API_URL,
        NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
        NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
        KAKAO_APP_KEY: process.env.KAKAO_APP_KEY,
        KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
        DEPLOY_URL: process.env.DEPLOY_URL,
        DATA_API_KEY: process.env.DATA_API_KEY,
    },
};

export default nextConfig;
