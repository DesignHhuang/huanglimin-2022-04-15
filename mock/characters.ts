import { MockMethod } from "vite-plugin-mock";

type character = {
    id: number;
    name: string;
};

const characterList = (size: number): Array<character> => {
    const result: Array<character> = [];
    for (let index = 0; index < size; index++) {
        result.push({
            id: index,
            name: "黄丽民",
        });
    }
    return result;
};

const lastFour = (): Array<character> => {
    const result: Array<character> = [];
    for (let index = 0; index < 4; index++) {
        result.push({
            id: 10 + index,
            name: "剩余4个",
        });
    }
    return result;
};

export default [
    {
        url: "/getCharacters",
        method: "post",
        response: ({ query }) => {
            return characterList(query.size);
        }
    },
    {
        url: "/getLastFour",
        method: "get",
        response: () => {
            return lastFour();
        }
    }
] as MockMethod[];