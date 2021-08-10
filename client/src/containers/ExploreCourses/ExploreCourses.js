import React, { useEffect } from "react";
import { useHistory } from "react-router";

const ExploreCourses = () => {
    const history = useHistory();
    useEffect(() => {
        history.push("/coding-problems");
    }, []);
    return <div>ExploreCourses</div>;
};

export default ExploreCourses;
