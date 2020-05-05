import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Observer from "@researchgate/react-intersection-observer"

import gsap, { Power1, Power2, Power3, Power4 } from "gsap"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import { injectIntl } from "gatsby-plugin-intl"

import SvgCompatibleBackgroundImage from "../components/SvgCompatibleBackgroundImage"

const useStyles = makeStyles(theme => ({
    htmlContent: {
        // backgroundColor: "tomato",
        width: "100%",
        height: "100%",
        opacity: 0,
        "& h3": {
            ...theme.typography.h5,
            // paddingBottom: `${theme.siteSpacing.aboutPage * 4}px`,
            paddingLeft: `${theme.siteSpacing.aboutPage * 8}px`,
            fontFamily: "PT Sans Narrow",
            fontWeight: 400,
            color: "#fffc",
            // textAlign: "center",
        },
        "& p": {
            ...theme.html.paragraph,
            textIndent: "3%",
        },
    },

    observableImage: {
        width: "100%",
        height: "100%",
        // padding: "1rem",
        // backgroundColor: "teal",
        // border: "1px solid rgba(255,255,255,0.3)",
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
                    x: -120,
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
                    x: 120,
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
        query SectionIntro {
            markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
                frontmatter {
                    indexSectionIntro {
                        introBlock {
                            imagePosition
                            introBlockImage {
                                publicURL
                                childImageSharp {
                                    fluid(maxWidth: 800, quality: 100) {
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
    const image =
        data.markdownRemark.frontmatter.indexSectionIntro.introBlock[0]
            .introBlockImage.childImageSharp.fluid
    const {
        introBlock: blocks,
    } = data.markdownRemark.frontmatter.indexSectionIntro
    const smallerThanXSViewport = useMediaQuery(theme.breakpoints.down("xs"))
    return (
        <Container
            maxWidth={theme.siteContainer.maxWidth}
            style={{ marginTop: "2rem", marginBottom: "16px" }}
        >
            {/* <pre style={{ color: "white" }}>
                {JSON.stringify(blocks, null, 4)}
            </pre> */}
            <Grid container spacing={4}>
                {blocks &&
                    blocks.map((block, index) => {
                        if (
                            block.imagePosition === "left" ||
                            smallerThanXSViewport
                        ) {
                            return (
                                <Grid item container spacing={4}>
                                    <Grid item container xs={12} sm={6}>
                                        <Observer
                                            onChange={handleShiftFromLeft}
                                            threshold="0.7"
                                            // threshold={thresholds}
                                        >
                                            <div
                                                className={
                                                    classes.observableImage
                                                }
                                            >
                                                <Img
                                                    fluid={
                                                        block.introBlockImage
                                                            .childImageSharp
                                                            .fluid
                                                    }
                                                />
                                            </div>
                                        </Observer>
                                    </Grid>
                                    <Grid item container xs={12} sm={6}>
                                        <Observer
                                            onChange={handleShiftFromRight}
                                            threshold="0.3"
                                            // threshold={thresholds}
                                        >
                                            <div
                                                className={classes.htmlContent}
                                                dangerouslySetInnerHTML={{
                                                    __html: intl.formatMessage({
                                                        id: `indexSectionIntro.text.${index}`,
                                                    }),
                                                }}
                                            ></div>
                                        </Observer>
                                    </Grid>
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid item container spacing={4}>
                                    <Grid item container xs={12} sm={6}>
                                        <Observer
                                            onChange={handleShiftFromLeft}
                                            threshold="0.3"
                                            // threshold={thresholds}
                                        >
                                            <div
                                                className={classes.htmlContent}
                                                dangerouslySetInnerHTML={{
                                                    __html: intl.formatMessage({
                                                        id: `indexSectionIntro.text.${index}`,
                                                    }),
                                                }}
                                            ></div>
                                        </Observer>
                                    </Grid>
                                    <Grid item container xs={12} sm={6}>
                                        <Observer
                                            onChange={handleShiftFromRight}
                                            threshold="0.7"
                                            // threshold={thresholds}
                                        >
                                            <div
                                                className={
                                                    classes.observableImage
                                                }
                                            >
                                                <Img
                                                    fluid={
                                                        block.introBlockImage
                                                            .childImageSharp
                                                            .fluid
                                                    }
                                                />
                                            </div>
                                        </Observer>
                                    </Grid>
                                </Grid>
                            )
                        }
                    })}
            </Grid>
        </Container>
    )
}

export default injectIntl(IntersectionComponent)
