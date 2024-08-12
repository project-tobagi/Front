import { env } from "process";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        APP_ENV: process.env.APP_ENV,
        NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
        NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
        KAKAO_APP_KEY: process.env.KAKAO_APP_KEY,
        KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
        DEPLOY_URL: process.env.DEPLOY_URL,
    },
};

export default nextConfig;
