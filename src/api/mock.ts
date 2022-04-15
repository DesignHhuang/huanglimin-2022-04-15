import { http } from "../ajax";

// 获取任务角色数据
export const getCharacters = (params?: object) => {
    return http.request("post", "/getCharacters", { params });
};

export const getLastFour = () => {
    return http.request("get", "/getLastFour",);
};
