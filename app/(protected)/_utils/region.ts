export const generateAreaData = (setState: any) => {
    fetch("/dong.txt")
        .then((response) => response.text()) // 텍스트로 변환
        .then((text) => {
            // 텍스트 파일을 줄 단위로 분리하고, 각 줄을 객체로 변환
            const lines = text.split("\n").filter(Boolean); // 빈 줄 제거
            const jsonData = lines
                .map((line) => {
                    const [code, name, valid] = line.split("\t");
                    const parts = name.split(" ");
                    // 첫 번째 요소는 si, 마지막 요소는 dong, 나머지는 가운데 부분
                    const si = parts[0];
                    let dong: string = parts[parts.length - 1];
                    let gu: string = parts.slice(1, -1).join(" ");

                    if (dong.includes("리")) {
                        dong = parts[parts.length - 2];
                        gu = parts.slice(1, -2).join(" ");
                    }

                    return { code, si, gu, dong, valid };
                })
                .filter((item) => item.valid.includes("존재"))
                .map(({ code, si, gu, dong }) => ({ code, si, gu, dong }));

            const cityData = jsonData.reduce(
                (acc: any, { code, si, gu, dong }) => {
                    let city: any = acc.find((c: any) => c.si === si);

                    if (!city) {
                        city = { si, guList: [] };
                        acc.push(city);
                    }

                    let guItem: any = city.guList.find(
                        (item: any) => item.gu === gu
                    );

                    // gu가 빈값인 경우
                    if (gu !== "") {
                        if (!guItem) {
                            guItem = { gu, dongList: [] };
                            city.guList.push(guItem);
                        }

                        let dongItem: any = guItem.dongList.find(
                            (item: any) => item.dong === dong
                        );

                        if (!dongItem) {
                            dongItem = { dong, code };
                            guItem.dongList.push(dongItem);
                        }
                    }
                    return acc;
                },
                []
            );

            setState(cityData);
        });
};
