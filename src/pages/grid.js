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
        // marginTop: 0,
        // marginBottom: 0,
    },
}))

const GridPage = () => {
    const classes = useStyles()
    const theme = useTheme()

    const small = useMediaQuery(theme.breakpoints.down("sm"))
    const medium = useMediaQuery(theme.breakpoints.down("md"))
    const firstOuter = small ? 2 : medium ? 3 : 5
    const firstInner = small ? 2 : medium ? 3 : 5
    return (
        <Layout>
            {/* Блог */}
            <div
                style={{
                    // margin: "1rem 0",
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
                    Блог{" "}
                </h2>
            </div>
            <Container
                //  defined in pages/blog/index.js
                maxWidth={theme.siteContainer.maxWidth}
            >
                <Grid
                    container
                    spacing={10}
                    style={{
                        color: "white",
                        // backgroundColor: "tomato",
                    }}
                >
                    {/* defined in pages/blog/index.js */}
                    <Grid component="section" item xs={12} md={8}>
                        {/* defined in BlogRoll */}
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                md={5}
                                style={{
                                    backgroundColor: "tomato",
                                }}
                            >
                                {" "}
                                <div
                                    style={{
                                        minHeight: 383,
                                        // backgroundColor: "navy",
                                    }}
                                ></div>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={7}
                                style={{
                                    backgroundColor: "teal",
                                }}
                            >
                                {" "}
                                <Grid
                                    container
                                    // spacing={10}
                                    direction="column"
                                    justify="space-between"
                                    wrap="nowrap"
                                    // alignItems="flex-start"
                                    style={{
                                        minHeight: 383,
                                        padding: 40,
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Grid item>
                                        <div
                                            style={{
                                                minHeight: 70,
                                                backgroundColor: "tomato",
                                            }}
                                        >
                                            sdfsdf
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <div
                                            style={{
                                                minHeight: 70,
                                                backgroundColor: "tomato",
                                            }}
                                        >
                                            sdfsdf
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        justify="flex-end"
                                        alignItems="flex-end"
                                    >
                                        <div
                                            style={{
                                                // minHeight: 70,
                                                backgroundColor: "tomato",
                                                padding: "1rem 2rem",
                                                border: "2px solid black",
                                            }}
                                        >
                                            BUTTON
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        component="section"
                        item
                        xs={12}
                        md={4}
                        style={
                            {
                                // backgroundColor: "teal",
                            }
                        }
                    >
                        <div
                            style={{
                                minHeight: 200,
                                backgroundColor: "navy",
                            }}
                        >
                            LatestPosts AllCategoriesList
                        </div>
                    </Grid>
                </Grid>
            </Container>

            {/* Блоки с фоном до границ области просмотра */}
            <div
                style={{
                    // margin: "1rem 0",
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
                    Блоки с фоном до границ области просмотра{" "}
                </h2>
            </div>
            <div
                style={{
                    display: "flex",
                }}
            >
                <div
                    style={{
                        backgroundColor: "navy",
                        minHeight: "200px",
                        width: "calc(1472px / 12 * 4 + (100% - 1472px) / 2)",
                    }}
                >
                    <div
                        style={{
                            paddingLeft: "32px",
                            minHeight: "200px",
                            maxWidth: "calc( 1472px / 12 * 4 )",
                            marginLeft: "auto",
                        }}
                    >
                        <div
                            style={{
                                minHeight: "200px",
                                backgroundColor: "#ccc3",
                                padding: "1rem",
                                color: "#eee",
                            }}
                        >
                            <h3>Heading</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Incidunt aperiam consectetur
                                voluptatibus debitis excepturi impedit, delectus
                                sed iure nisi. Quos impedit obcaecati debitis
                                cum magni unde veritatis aspernatur,
                                perspiciatis corporis.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: "tomato",
                        minHeight: "200px",
                        width: "calc(1472px / 12 * 8 + (100% - 1472px) / 2)",
                    }}
                >
                    {" "}
                    <div
                        style={{
                            paddingRight: "32px",
                            height: "200px",
                            maxWidth: "calc( 1472px / 12 * 8 )",
                            marginRight: "auto",
                        }}
                    >
                        <div
                            style={{
                                height: "200px",
                                backgroundColor: "#ccc3",
                                padding: "1rem",
                                color: "#eee",
                            }}
                        >
                            <h3>Heading</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Corporis eligendi blanditiis
                                architecto, quos adipisci, quas illo quo ipsam
                                iste earum sunt vero, autem iusto odio nobis est
                                illum reprehenderit nemo!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    // marginBottom: "1rem",
                }}
            >
                <div
                    style={{
                        backgroundColor: "teal",
                        minHeight: "200px",
                        width: "calc(1472px / 12 * 8 + (100% - 1472px) / 2)",
                    }}
                >
                    {" "}
                    <div
                        style={{
                            paddingLeft: "32px",
                            height: "200px",
                            maxWidth: "calc( 1472px / 12 * 8 )",
                            marginLeft: "auto",
                        }}
                    >
                        <div
                            style={{
                                height: "200px",
                                backgroundColor: "#ccc3",
                                padding: "1rem",
                                color: "#eee",
                            }}
                        >
                            <h3>Heading</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Corporis eligendi blanditiis
                                architecto, quos adipisci, quas illo quo ipsam
                                iste earum sunt vero, autem iusto odio nobis est
                                illum reprehenderit nemo!
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: "navy",
                        minHeight: "200px",
                        width: "calc(1472px / 12 * 4 + (100% - 1472px) / 2)",
                    }}
                >
                    <div
                        style={{
                            paddingRight: "32px",
                            minHeight: "200px",
                            maxWidth: "calc( 1472px / 12 * 4 )",
                            marginRight: "auto",
                        }}
                    >
                        <div
                            style={{
                                minHeight: "200px",
                                backgroundColor: "#ccc3",
                                padding: "1rem",
                                color: "#eee",
                            }}
                        >
                            <h3>Heading</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Incidunt aperiam consectetur
                                voluptatibus debitis excepturi impedit, delectus
                                sed iure nisi. Quos impedit obcaecati debitis
                                cum magni unde veritatis aspernatur,
                                perspiciatis corporis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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
