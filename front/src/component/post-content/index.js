import "./index.css"

import Grid from "../grid";
import { memo, useContext } from "react";
import { THEME_TYPE, ThemeContext } from "../../App";

function Component({ username, date, text}) {

    const theme = useContext(ThemeContext)

    return (
        <Grid>
            <div className="post-content">
                <span style={{ color: theme.value === THEME_TYPE.DARK && "white"}} className="post-content__username">@{username}</span>
                <span className="post-content__date">{date}</span>
            </div>

            <p style={{ color: theme.value === THEME_TYPE.DARK && "white"}} className="post-content__text">{text}</p>
        </Grid>
    );
}

export default memo(Component)