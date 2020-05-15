import React from "react"
import clsx from "clsx"

import { makeStyles, useTheme, createMuiTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import useMediaQuery from "@material-ui/core/useMediaQuery"

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "tomato",
        position: "fixed",
        width: "100%",
        height: "128px",
        zIndex: 4,
        [theme.breakpoints.down("md")]: {
            height: "96px",
        },
    },
    container: {
        height: "100%",
    },
}))

const Header = () => {
    const classes = useStyles()
    const theme = useTheme()

    const small = useMediaQuery(theme.breakpoints.down("sm"))
    const medium = useMediaQuery(theme.breakpoints.down("md"))
    const firstOuter = small ? 1 : medium ? 3 : 5
    const firstInner = small ? 1 : medium ? 3 : 5

    return (
        <div className={classes.header}>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                // component="section"
                className={classes.container}
            >
                <Grid container justify="center" alignItems="center">
                    <Grid item>Item</Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Header
