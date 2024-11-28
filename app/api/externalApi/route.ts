import { NextResponse } from "next/server";
import { logger } from "../logger";
export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const dongCode = searchParams.get("dongCode");
    logger.info("polygon api key : ", process.env.POLYGON_API_KEY);
    const apiUrl = `https://api.vworld.kr/req/data?service=data&version=2.0&request=GetFeature&data=LT_C_ADEMD_INFO&key=${process.env.POLYGON_API_KEY}&domain=http://localhost:3000&attrFilter=emd_cd:=:${dongCode}`;

    logger.info(apiUrl);
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
                // 필요한 경우 추가 헤더를 여기에 포함시킵니다
            },
        });

        logger.info("response : ", response);
        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
