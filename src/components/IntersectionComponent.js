import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Observer from "@researchgate/react-intersection-observer"

import gsap, { Power1, Power2, Power3, Power4 } from "gsap"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import { injectIntl } from "gatsby-plugin-intl"

import SvgCompatibleBackgroundImage from "../components/SvgCompatibleBackgroundImage"

const useStyles = makeStyles(theme => ({
    hero: {
        position: "relative",
        minHeight: 300,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    tomato: {
        // backgroundColor: "tomato",
        minHeight: 300,
        // outline: "1px solid black",
        justifyContent: "center",
        alignItems: "center",
    },
    violet: {
        // backgroundColor: "violet",
        minHeight: 300,
        // outline: "1px solid black",
        justifyContent: "center",
        alignItems: "center",
    },

    div4ik: {
        // backgroundColor: "teal",
        // outline: "1px solid tomato",
        color: "white",
        width: "100%",
        height: "100%",
        // padding: "1rem",
        // paddingLeft: "2rem",
        // paddingRight: "2rem",
        opacity: 0,
    },
}))

const IntersectionComponent = ({ intl }) => {
    const classes = useStyles()
    const theme = useTheme()

    const norm = (value, min, max) => (value - min) / (max - min)

    const handleShiftFromLeft = (event, unobserve) => {
        // const shiftFromLeft = ({ intersectionRatio }) => {
        if (event.isIntersecting) {
            gsap.fromTo(
                event.target,
                {
                    x: -20,
                    ease: Power4,
                    scale: 0.9,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    scale: 1,
                }
            )

            unobserve()
            //     if (this.isPlaying) return
            //     this.isPlaying = true
            //     console.log(this.isPlaying)
            //     this.mainTl.play()
            //     // this.mainTl.duration(1).play()
            //     this.isPlaying = false
            // }
            // this.mainTl.progress((intersectionRatio - 0.3) / 0.4)
            // this.mainTl.progress(this.norm(intersectionRatio, 0.3, 0.7))
            // console.log(intersectionRatio)
            // console.log(this.norm(intersectionRatio, 0.3, 0.7))
        }
    }
    const handleShiftFromRight = (event, unobserve) => {
        if (event.isIntersecting) {
            gsap.fromTo(
                event.target,
                {
                    x: 20,
                    ease: Power4,
                    scale: 0.9,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    scale: 1,
                }
            )
            unobserve()
        }
    }

    const data = useStaticQuery(graphql`
        query Test {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            featuredimage {
                                childImageSharp {
                                    fluid(maxWidth: 1600) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    // const image = data.markdownRemark.frontmatter.indexSectionHero.heroImage
    const image =
        data.allMarkdownRemark.edges[2].node.frontmatter.featuredimage
            .childImageSharp.fluid

    return (
        <Container
            maxWidth={theme.siteContainer.maxWidth}
            style={{ marginTop: "2rem", marginBottom: "16px" }}
        >
            {/* <pre style={{ color: "white" }}>
                {JSON.stringify(theme, null, 4)}
            </pre> */}
            <Grid container spacing={4}>
                <Grid item container spacing={4}>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        className={classes.violet}
                    >
                        <Observer
                            onChange={handleShiftFromLeft}
                            threshold="0.7"
                            // threshold={thresholds}
                        >
                            <div className={classes.div4ik}>
                                {/* <SvgCompatibleBackgroundImage
                                    image={image}
                                    className={classes.hero}
                                > */}
                                {/* <img src={image} /> */}
                                {/* </SvgCompatibleBackgroundImage> */}
                                <Img fluid={image} />
                            </div>
                        </Observer>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        className={classes.tomato}
                    >
                        <Observer
                            onChange={handleShiftFromRight}
                            threshold="0.3"
                            // threshold={thresholds}
                        >
                            <div className={classes.div4ik}>
                                <h3>Header</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Est debitis mollitia
                                    voluptatum ratione eos eveniet nemo esse
                                    distinctio maxime? Voluptates quaerat
                                    nostrum repellat repellendus. Laborum
                                    maiores quibusdam alias beatae error.
                                </p>
                            </div>
                        </Observer>
                    </Grid>
                </Grid>
                <Grid item container spacing={4}>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        className={classes.tomato}
                    >
                        <Observer
                            onChange={handleShiftFromLeft}
                            threshold="0.3"
                            // threshold={thresholds}
                        >
                            <div className={classes.div4ik}>
                                <h3>Header</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Est debitis mollitia
                                    voluptatum ratione eos eveniet nemo esse
                                    distinctio maxime? Voluptates quaerat
                                    nostrum repellat repellendus. Laborum
                                    maiores quibusdam alias beatae error.
                                </p>
                            </div>
                        </Observer>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        className={classes.violet}
                    >
                        {" "}
                        <Observer
                            onChange={handleShiftFromRight}
                            threshold="0.7"
                            // threshold={thresholds}
                        >
                            <div className={classes.div4ik}>
                                <Img fluid={image} />
                            </div>
                        </Observer>
                    </Grid>
                </Grid>

                <Grid item container spacing={4}>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        className={classes.violet}
                    >
                        <Observer
                            onChange={handleShiftFromLeft}
                            threshold="0.7"
                            // threshold={thresholds}
                        >
                            <div className={classes.div4ik}>
                                <Img fluid={image} />
                            </div>
                        </Observer>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        className={classes.tomato}
                    >
                        <Observer
                            onChange={handleShiftFromRight}
                            threshold="0.3"
                            // threshold={thresholds}
                        >
                            <div className={classes.div4ik}>
                                <h3>Header</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Est debitis mollitia
                                    voluptatum ratione eos eveniet nemo esse
                                    distinctio maxime? Voluptates quaerat
                                    nostrum repellat repellendus. Laborum
                                    maiores quibusdam alias beatae error.
                                </p>
                            </div>
                        </Observer>
                    </Grid>
                </Grid>
                <Grid item container spacing={4}>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        className={classes.tomato}
                    >
                        <Observer
                            onChange={handleShiftFromLeft}
                            threshold="0.3"
                            // threshold={thresholds}
                        >
                            <div className={classes.div4ik}>
                                <h3>Header</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Est debitis mollitia
                                    voluptatum ratione eos eveniet nemo esse
                                    distinctio maxime? Voluptates quaerat
                                    nostrum repellat repellendus. Laborum
                                    maiores quibusdam alias beatae error.
                                </p>
                            </div>
                        </Observer>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        className={classes.violet}
                    >
                        {" "}
                        <Observer
                            onChange={handleShiftFromRight}
                            threshold="0.7"
                            // threshold={thresholds}
                        >
                            <div className={classes.div4ik}>
                                <div>
                                    <Img fluid={image} />
                                </div>
                            </div>
                        </Observer>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default injectIntl(IntersectionComponent)
