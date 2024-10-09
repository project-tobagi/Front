"use client";

// * basic
import { useState } from "react";

// * install libraries
import _ from "lodash";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// * etc
import { CATEGORY_GROUP_CODES } from "../../_utils/constants";

const CategorySelector = ({ setSelectedCategory }: any) => {
    return (
        <div>
            <div className='w-full'>
                <label className='text-xs text-gray-500 ml-2' htmlFor=''>
                    카테고리 지정
                </label>
                <Select
                    required
                    onValueChange={(e) => {
                        setSelectedCategory(e);
                    }}
                >
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder='카테고리 선택해주세요.' />
                    </SelectTrigger>
                    <SelectContent>
                        {_.map(CATEGORY_GROUP_CODES, (item: any) => {
                            return (
                                <SelectItem
                                    key={`select-item-${item.code}`}
                                    value={item.code}
                                >
                                    {item.type}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default CategorySelector;
