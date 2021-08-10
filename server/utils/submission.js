import axios from "axios";

// 實現一個等待函數
const delay = (interval) => {
    return new Promise((resolve) => {
        setTimeout(resolve, interval);
    });
};

export const singleSubmission = async (code, judge) => {
    let get_token_options = {
        method: "POST",
        url: "http://140.112.21.13:2358/submissions",
        params: { base64_encoded: "false", fields: "*" },
        headers: {
            "content-type": "application/json",
        },
        data: {
            language_id: 71,
            source_code: code + "\n" + judge,
        },
    };

    let {
        data: { token },
    } = await axios.request(get_token_options);

    let status_id = 1;

    let result = null;

    while (status_id < 3) {
        // 等待 1 秒
        await delay(1000);

        let { data } = await axios.get(
            `http://140.112.21.13:2358/submissions/${token}?base64_encoded=false&fields=*`
        );
        console.log("pending...");
        status_id = data.status.id;
        result = data;
    }
    console.log(result.stdout);

    let res = { exeTime: result.time, status: result.status.id };

    if (res.status === 3) {
        const sub_status = result.stdout
            .split("|")
            .reverse()[0]
            .replace(/(\r\n|\n|\r)/gm, "");
        if (sub_status === "AC") {
            res.status = 3;
        } else if (sub_status === "WA") {
            res.status = 4;
        } else if (sub_status === "PA") {
            res.status = 15;
        } else {
            res.status = 16;
        }
    }
    return res;
};
