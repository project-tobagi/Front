// * install libraries
import _ from "lodash";

// * etc
import { CONDITION_TYPES } from "./constants";

interface Rank {
    donCd?: string;
    category?: string;
    rank?: number;
    storeType?: string;
    storeTypeNm?: string;
    count?: number;
}

const switchRankText = (category: any) => {
    switch (category) {
        case "mart":
            return "편의시설";
        case "security":
            "치안";
        case "culture":
            return "문화시설";
        case "restaurant":
            return "맛집";
        case "station":
            return "교통";
        case "infra":
            return "생활 인프라";
    }
};

const processRankValue = (value: number) => {
    switch (value) {
        case 1:
            return "상";
        case 2:
            return "중";
        case 3:
            return "하";

        default:
            return "중";
    }
};

const processRankCategory = (rank: any) => {
    return _.map(
        _(
            _(
                _.map(_.groupBy(rank, "category"), (data, key) => {
                    return _.map(data, (value) => {
                        return {
                            key,
                            value,
                        };
                    });
                })
            )
                .flatten() // 중첩 배열을 평탄화
                .groupBy("key") // key로 그룹화
                .map((group, key) => {
                    const values = _.map(group, "value");

                    return {
                        key,
                        value: {
                            donCd: values[0].donCd,
                            category: values[0].category,
                            rank: values[0].rank,
                            storeType: values[0].storeType,
                            storeTypeNm: values[0].storeTypeNm,
                            count: values[0].count,
                        },
                    };
                })
                .value()
        )
            .groupBy((item) => item.value.rank)
            .map((group, rank) => ({
                rank: Number(rank),
                rankTxt: processRankValue(Number(rank)),
                category: _.uniq(
                    _.map(group, (item) => switchRankText(item.value.category))
                ),
                storeType: _.uniq(_.map(group, (item) => item.value.storeType)),
                storeTypeNm: _.uniq(
                    _.map(group, (item) => item.value.storeTypeNm)
                ),
                count: _.uniq(_.map(group, (item) => item.value.count)),
                donCd: group[0].value.donCd,
            }))
            .value(),
        (rankItem: any) => {
            return rankItem;
        }
    );
};

export const generateRegionRank = (
    rankList: Rank | Rank[],
    isSingle: boolean = false
) => {
    if (isSingle) {
        return processRankCategory(rankList);
    } else {
        return _.map(rankList, (item: any) => {
            return { label: item.label, value: processRankCategory(item.list) };
        });
    }
};
