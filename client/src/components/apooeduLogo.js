import { Avatar, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    logo: {
        margin: "auto",

        [theme.breakpoints.down("sm")]: {
            marginLeft: theme.spacing(0.5),
        },
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),

        display: "flex",
    },
    text: {
        marginLeft: theme.spacing(2),
        margin: "auto",
        color: "green",
    },
}));

const ApooEduLogo = () => {
    const classes = useStyles();
    return (
        <div className={classes.logo}>
            <Avatar src="https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/100697307_101676934911666_6083521600815104000_n.png?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=qdV-DClWQh8AX88T8K9&_nc_ht=scontent-tpe1-1.xx&oh=67ea94482bf3cec657bc243541b403dc&oe=6128DD72"></Avatar>
            <Typography variant="h6" className={classes.text}>
                阿柏教育
            </Typography>
        </div>
    );
};

export default ApooEduLogo;
