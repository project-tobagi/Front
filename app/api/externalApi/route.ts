import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "";
    const donGrpCd = searchParams.get("donGrpCd");
    const rank = searchParams.get("rank");
    const apiUrl = `${process.env.API_URL}${path}&donGrpCd=${donGrpCd}&rank=${rank}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
                // 필요한 경우 추가 헤더를 여기에 포함시킵니다
            },
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
