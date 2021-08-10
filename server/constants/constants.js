export const USER = {
    USER: "USER",
    ADMIN: "ADMIN",
};
export const SUBMISSION_STATUS = {
    AC: "AC",
    PA: "PA",
    WA: "WA",
    TLE: "TLE",
    CE: "CE",
    RE: "RE",
    IE: "IE",
    EFE: "EFE",
};

export const DIFFICULTY = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD",
};

export const submission_status = [
    {
        id: 3,
        abbr: "AC",
        description: "執行過程皆正常，並通過所有的測試資料",
    },
    {
        id: 4,
        abbr: "WA",
        description: "執行過程皆正常，但所有的測試資料皆未通過",
    },
    {
        id: 5,
        abbr: "TLE",
        description: "執行超出時間限制",
    },
    {
        id: 6,
        abbr: "CE",
        description: "編譯錯誤",
    },
    {
        id: 7,
        abbr: "RE",
        description: "運行期間發生錯誤 (SIGSEGV)",
    },
    {
        id: 8,
        abbr: "RE",
        description: "運行期間發生錯誤 (SIGXFSZ)",
    },
    {
        id: 9,
        abbr: "RE",
        description: "運行期間發生錯誤 (SIGFPE)",
    },
    {
        id: 10,
        abbr: "RE",
        description: "運行期間發生錯誤 (SIGABRT)",
    },
    {
        id: 11,
        abbr: "RE",
        description: "運行期間發生錯誤 (NZEC)",
    },
    {
        id: 12,
        abbr: "RE",
        description: "運行期間發生錯誤 (Other)",
    },
    {
        id: 13,
        abbr: "IE",
        description: "內部錯誤",
    },
    {
        id: 14,
        abbr: "EFE",
        description: "執行檔案格式錯誤",
    },
    {
        id: 15,
        abbr: "PA",
        description: "執行過程正常，但只有通過一部分的測試資料",
    },
    {
        id: 16,
        abbr: "JE",
        description: "批改程式格式有誤",
    },
];
