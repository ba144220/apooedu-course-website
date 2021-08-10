import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { createCodingProblem, getCodingProblem } from "../../../actions/codingProblems";
import {
    FormControl,
    Grid,
    InputLabel,
    Paper,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import CodeEditor from "../../../components/codeEditor";
import { makeStyles } from "@material-ui/core/styles";
import MDEditor from "@uiw/react-md-editor";
import { useLocation, useHistory } from "react-router";
import { updateCodingProblem } from "../../../actions/codingProblems";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: "scroll",
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    top: {
        display: "flex",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    btn: {
        marginRight: theme.spacing(3),
        margin: "auto",
        height: "100%",
        padding: theme.spacing(2),
    },
}));

const CreateCodingProblem = () => {
    const classes = useStyles();

    const [isEdit, setIsEdit] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(async () => {
        const id = location.pathname.split("/").reverse()[0];

        if (id === "create") {
            setIsEdit(false);
        } else {
            try {
                const data = await getCodingProblem(id);
                console.log(data);
                setTitle(data.title);
                setJudge(data.judge);
                setMd(data.markdown);
                setDiff(data.difficulty);

                setIsEdit(true);
            } catch (error) {
                console.log(error);
                alert("找不到題目");
                history.push("/test/create");
            }
        }
        //console.log(location.pathname.split("/").reverse()[0]);
    }, []);

    const [title, setTitle] = useState("");
    const [diff, setDiff] = useState("");
    const [md, setMd] = useState("");
    const [temp, setTemp] = useState("");
    const [judge, setJudge] = useState("");
    const [testData, setTestData] = useState("");

    const jsonCheck = (t) => {
        try {
            const obj = JSON.parse(t);
            return JSON.stringify(obj);
        } catch (error) {
            return "error";
        }
    };
    const handleClick = () => {
        const id = location.pathname.split("/").reverse()[0];
        if (isEdit) {
            updateCodingProblem(id, {
                title: title,
                difficulty: diff,
                markdown: md,
                template: temp,
                judge: judge,
                testData: testData,
            }).then((data) => console.log(data));
        } else {
            createCodingProblem({
                title: title,
                difficulty: diff,
                markdown: md,
                template: temp,
                judge: judge,
                testData: testData,
            }).then((data) => console.log(data));
        }
    };
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={`${classes.paper} ${classes.top}`}>
                        <TextField
                            label="title"
                            variant="outlined"
                            className={classes.formControl}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">difficulty</InputLabel>
                            <Select
                                native
                                value={diff}
                                onChange={(e) => setDiff(e.target.value)}
                                label="difficulty"
                                inputProps={{
                                    name: "age",
                                    id: "outlined-age-native-simple",
                                }}
                            >
                                <option value={"EASY"}>easy</option>
                                <option value={"MEDIUM"}>medium</option>
                                <option value={"HARD"}>hard</option>
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            disableElevation
                            className={classes.btn}
                            onClick={handleClick}
                        >
                            {isEdit ? "update" : "submit"}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <MDEditor value={md} onChange={setMd} />
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography>Template</Typography>
                        <CodeEditor code={temp} setCode={setTemp} />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography>Judge</Typography>
                        <CodeEditor code={judge} setCode={setJudge} />
                    </Paper>
                </Grid>
                {/* <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography>Test Data</Typography>
                        <CodeEditor code={testData} setCode={setTestData} />
                        <Typography>{jsonCheck(testData)}</Typography>
                    </Paper>
                </Grid> */}
            </Grid>
        </div>
    );
};

export default CreateCodingProblem;
