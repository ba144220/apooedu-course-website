import axios from "axios";

let get_token_options = {
    method: "POST",
    url: "http://140.112.21.13:2358/submissions/batch",
    params: { base64_encoded: "false", fields: "*" },
    headers: {
        "content-type": "application/json",
    },
    data: {
        submissions: [
            {
                language_id: 46,
                source_code: "echo hello from Bash",
            },
            // {
            //     language_id: 71,
            //     source_code: 'print("hello from Python")',
            // },
            // {
            //     language_id: 72,
            //     source_code: 'puts("hello from Ruby")',
            // },
        ],
        // expected_output: "0123456789",
        // language_id: 71,
        // source_code: "for i in range(1,10):\n  print(i,end='')",
    },
};

// 實現一個等待函數
const delay = (interval) => {
    return new Promise((resolve) => {
        setTimeout(resolve, interval);
    });
};

export const createSubmission = async (req, res) => {
    //const codingProblem = req.body;

    // const newCodingProblem = new CodingProblemModel({
    //     ...codingProblem,
    //     creator: req.userId,
    //     createdAt: new Date().toISOString(),
    // });

    try {
        const { data } = await axios.request(get_token_options);
        console.log(data);
        let tokens = "";
        for (let i = 0; i < data.length; i++) {
            if (i !== 0) {
                tokens += ",";
            }
            tokens += data[i].token;
        }
        console.log(tokens);

        await delay(1000);

        const { data: results } = await axios.get(
            `http://140.112.21.13:2358/submissions/batch?tokens=${tokens}&fields=stdout,stderr,status_id,time,language_id`
        );
        console.log(results);

        res.status(201).json({ result: "hi" });
    } catch (error) {
        res.status(409).json({ message: "發生錯誤" });
        console.log(error);
    }
};
