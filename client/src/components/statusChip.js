import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { amber, green, lightBlue, red, deepOrange, purple } from "@material-ui/core/colors";
import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: "none",
    },
    paper: {
        padding: theme.spacing(1),
        maxWidth: "150px",
    },
}));

const StatusChip = ({ status }) => {
    const classes = useStyles();
    const sub_status = submission_status.find((s) => s.id === status);
    const color = sub_status?.color;
    const abbr = sub_status?.abbr;
    const des = sub_status?.description;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            {sub_status ? (
                <Chip
                    label={abbr}
                    variant="outlined"
                    style={{ borderColor: color, color: color, fontWeight: "bolder" }}
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                ></Chip>
            ) : (
                <Chip
                    label={"NaN"}
                    variant="outlined"
                    color="default"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                ></Chip>
            )}
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>{des ? des : "No Description"}</Typography>
            </Popover>
        </>
    );
};

export default StatusChip;

const submission_status = [
    {
        id: 3,
        abbr: "AC",
        description: "??????????????????????????????????????????????????????",
        color: green["A700"],
    },
    {
        id: 4,
        abbr: "WA",
        description: "????????????????????????????????????????????????????????????",
        color: red[400],
    },
    {
        id: 5,
        abbr: "TLE",
        description: "????????????????????????",
        color: amber[600],
    },
    {
        id: 6,
        abbr: "CE",
        description: "????????????",
        color: deepOrange[900],
    },
    {
        id: 7,
        abbr: "RE",
        description: "???????????????????????? (SIGSEGV)",
        color: deepOrange[900],
    },
    {
        id: 8,
        abbr: "RE",
        description: "???????????????????????? (SIGXFSZ)",
        color: deepOrange[900],
    },
    {
        id: 9,
        abbr: "RE",
        description: "???????????????????????? (SIGFPE)",
        color: deepOrange[900],
    },
    {
        id: 10,
        abbr: "RE",
        description: "???????????????????????? (SIGABRT)",
        color: deepOrange[900],
    },
    {
        id: 11,
        abbr: "RE",
        description: "???????????????????????? (NZEC)",
        color: deepOrange[900],
    },
    {
        id: 12,
        abbr: "RE",
        description: "???????????????????????? (Other)",
        color: deepOrange[900],
    },
    {
        id: 13,
        abbr: "IE",
        description: "????????????",
        color: deepOrange[900],
    },
    {
        id: 14,
        abbr: "EFE",
        description: "????????????????????????",
        color: deepOrange[900],
    },
    {
        id: 15,
        abbr: "PA",
        description: "????????????????????????????????????????????????????????????",
        color: lightBlue[400],
    },
    {
        id: 16,
        abbr: "JE",
        description: "????????????????????????",
        color: purple[600],
    },
];
