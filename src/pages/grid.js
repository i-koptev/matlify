import React from "react"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "rgba(0,0,255,0.3)",
        // paddingTop: "1rem",
    },
    gridContainer: {
        // backgroundColor: "rgba(0,255,0,0.3)",
    },

    gridItem: {
        // backgroundColor: "rgba(255,0, 0,0.3)",
    },
    div: {
        height: "200px",
        width: "100%",
        backgroundColor: "tomato",
        padding: "1rem",
    },
}))

const GridPage = () => {
    const classes = useStyles()
    const theme = useTheme()
    const first = 4
    const second = 1
    const third = 4
    const fourth = 0
    const fifth = 0
    return (
        <Container
            maxWidth={theme.siteContainer.maxWidth}
            // component="section"
            className={classes.container}
            // className={classes.section}
        >
            <Grid
                container
                spacing={first}
                className={classes.gridContainer}
                direction="column"
            >
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    // spacing={first}
                    className={classes.gridItem}
                >
                    <Grid item xs={12} className={classes.gridItem}>
                        <Grid container spacing={first}>
                            <Grid item xs={12} md={6}>
                                <div className={classes.div}>div content 1</div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className={classes.div}>div content 2</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.div}>div content</div>
                </Grid>
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    // spacing={first}
                    className={classes.gridItem}
                >
                    <Grid item xs={12} className={classes.gridItem}>
                        <Grid container spacing={first}>
                            <Grid item xs={12} md={6}>
                                <div className={classes.div}>div content 1</div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className={classes.div}>div content 2</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
export default GridPage
