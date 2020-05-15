import React from "react"
import clsx from "clsx"

import { makeStyles, useTheme, createMuiTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import Layout from "../components/Layout"

const useStyles = makeStyles(theme => ({
    container: {
        // backgroundColor: "rgba(255,0,0,0.7)",
    },
    gridContainer: {
        // backgroundColor: "rgba(0,127,0,0.7)",
    },

    gridItem: {
        // backgroundColor: "rgba(0,0, 255,0.7)",
    },
    div: {
        height: "100px",
        width: "100%",
        backgroundColor: "teal",
        // padding: "1rem",
    },
    wrapper: {
        marginTop: 0,
        marginBottom: 0,
    },
}))

const GridPage = () => {
    const classes = useStyles()
    const theme = useTheme()

    const small = useMediaQuery(theme.breakpoints.down("sm"))
    const medium = useMediaQuery(theme.breakpoints.down("md"))
    const firstOuter = small ? 1 : medium ? 3 : 5
    const firstInner = small ? 1 : medium ? 3 : 5
    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                // component="section"
                className={classes.container}
                // disableGutters
                // className={classes.section}
            >
                {/* ---------- START Адаптивные расстояния ------------------- */}
                <div
                    style={{
                        backgroundColor: "maroon",
                        height: "80px",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 400,
                    }}
                >
                    <h2
                        style={{
                            fontWeight: 400,
                            textTransform: "uppercase",
                            letterSpacing: "0.2rem",
                        }}
                    >
                        Адаптивные расстояния{" "}
                    </h2>
                </div>
                <Grid
                    container
                    spacing={firstOuter}
                    className={clsx(classes.wrapper, classes.gridContainer)}
                >
                    <Grid item xs={6}>
                        <Grid
                            container
                            spacing={firstInner}
                            className={classes.gridContainer}
                        >
                            <Grid item xs={12} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                            <Grid item xs={6} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                            <Grid item xs={6} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid
                            container
                            spacing={firstInner}
                            className={classes.gridContainer}
                        >
                            <Grid item xs={12} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                            <Grid item xs={4} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                            <Grid item xs={4} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                            <Grid item xs={4} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={firstInner}
                            className={classes.gridContainer}
                        >
                            <Grid item xs={6} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                            <Grid item xs={6} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                            <Grid item xs={6} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                            <Grid item xs={6} className={classes.gridItem}>
                                <div className={classes.div}>wr</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* ---------- END Адаптивные расстояния ------------------- */}

                {/* <Grid
                container
                spacing={0}
                className={classes.gridContainer}
                direction="column"
            >
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    spacing={first}
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
                    <div className={classes.div}>div content 3</div>
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
                                <div className={classes.div}>div content 4</div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className={classes.div}>div content 5</div>
                            </Grid>
                        </Grid>
                    </Grid>
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
                        <Grid
                            container
                            spacing={6}
                            justify="center"
                            style={{ paddingTop: "7vmin" }}
                        >
                            <Grid item xs={12} sm={6} md={5} lg={4}>
                                <div className={classes.div}>div content</div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5} lg={4}>
                                <div className={classes.div}>div content</div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5} lg={4}>
                                <div className={classes.div}>div content</div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5} lg={4}>
                                <div className={classes.div}>div content</div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5} lg={4}>
                                <div className={classes.div}>div content</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}
            </Container>
        </Layout>
    )
}
export default GridPage
