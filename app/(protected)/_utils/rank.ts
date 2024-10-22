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
                .flatten()
                .groupBy("key")
                .map((group, key) => {
                    return {
                        key,
                        value: _.map(group, "value"),
                    };
                })
                .value()
        )
            .groupBy((item) => item.value[0].rank)
            .map((group, rank) => ({
                rank: Number(rank),
                rankTxt: processRankValue(Number(rank)),
                category: _.uniq(
                    _.flatMap(group, (item) =>
                        _.map(item.value, (v) => switchRankText(v.category))
                    )
                ),
                storeType: _.uniq(
                    _.flatMap(group, (item) =>
                        _.map(item.value, (v) => v.storeType)
                    )
                ),
                storeTypeNm: _.uniq(
                    _.flatMap(group, (item) =>
                        _.map(item.value, (v) => v.storeTypeNm)
                    )
                ),
                count: _.flatMap(group, (item) =>
                    _.map(item.value, (v) => v.count)
                ),
                donCd: group[0].value[0].donCd,
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
