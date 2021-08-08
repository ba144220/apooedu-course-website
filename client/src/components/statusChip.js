import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { amber, green, lightBlue, red, deepOrange } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
    ac: { borderColor: green["A700"], color: green["A700"] },
    pa: { borderColor: lightBlue[400], color: lightBlue[400] },
    na: { borderColor: red[400], color: red[400] },
    tle: { borderColor: amber[600], color: amber[600] },
    rte: { borderColor: deepOrange[900], color: deepOrange[900] },
}));

const StatusChip = ({ status }) => {
    const classes = useStyles();
    switch (status) {
        case "AC":
            return <Chip label={status} variant="outlined" className={classes.ac} />;
        case "PA":
            return <Chip label={status} variant="outlined" className={classes.pa} />;
        case "NA":
            return <Chip label={status} variant="outlined" className={classes.na} />;
        case "TLE":
            return <Chip label={status} variant="outlined" className={classes.tle} />;
        case "RTE":
            return <Chip label={status} variant="outlined" className={classes.rte} />;
        default:
            return <Chip label={status} variant="outlined" />;
    }
};

export default StatusChip;
