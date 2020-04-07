import React, { Component } from "react"
import gsap, { TweenMax, Power1, Power2, Power3, Power4 } from "gsap"
import { render } from "react-dom"
import Observer from "@researchgate/react-intersection-observer"
import { Transition } from "react-transition-group"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import classNames from "classnames"

import { ThemeProvider, withTheme } from "@material-ui/styles"

import Container from "@material-ui/core/Container"
import { injectIntl } from "gatsby-plugin-intl"
import ButtonYellow from "./ButtonYellow"

// icons will be animated using a stagger method
const iconsArray = [
    {
        src: "https://www.greensock.com/_img/codepen/icon_robust.png",
        width: "83",
        height: "59",
    },
    {
        src: "https://www.greensock.com/_img/codepen/icon_overwrite.png",
        width: "43",
        height: "59",
    },
    {
        src: "https://www.greensock.com/_img/codepen/icon_compatible.png",
        width: "73",
        height: "59",
    },
    {
        src: "https://www.greensock.com/_img/codepen/icon_support.png",
        width: "83",
        height: "59",
    },
    {
        src: "https://www.greensock.com/_img/codepen/icon_plugin.png",
        width: "76",
        height: "59",
    },
]

const styles = theme => ({
    test: {
        // color: "tomato",
        color: theme.palette.primary.main,
    },
    section: {
        minHeight: "700px",
        paddingTop: "4rem",
        textAlign: "center",
        overflow: "hidden",
    },
    sectionHeader: {
        display: "inline-block",
        color: "#ffbf55",
        fontWeight: "600",
        fontSize: "3rem",
        position: "relative",
        margin: "0",
        textShadow: "0 0 3px #ffbf55",
        "&::after": {
            content: '""',
            width: "120%",
            height: "2px",
            margin: "0 auto",
            backgroundColor: "#ffbf55",
            display: "block",
            position: "absolute",
            boxShadow: "0 0 3px #ffbf55",
            // top: -2px;
            // bottom: "-10px",
            left: "-10%",
            // right: "-350px",
        },
    },
    descriptionWrapper: {
        [theme.breakpoints.down("md")]: {
            minHeight: "600px",
        },
        position: "relative",
    },
    description: {
        // width: "100%",
        // height: "100%",
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
    },
    descriptionHeader: {
        fontSize: "2rem",
        textAlign: "center",
    },
    descriptionHeaderGatsby: { color: "#639", textShadow: "0 0 3px #639" },
    descriptionHeaderNetlify: {
        color: "#008a80",
        textShadow: "0 0 3px #008a80",
    },
    descriptionHeaderNetlifycms: {
        color: "#db8a32",
        textShadow: "0 0 3px #db8a32",
    },
    descriptionHeaderMaterialui: {
        color: "#0071bc",
        textShadow: "0 0 3px #0071bc",
    },
    descriptionHeaderGithub: {
        color: "#bf463d",
        textShadow: "0 0 3px #bf463d",
    },
    descriptionText: {
        color: "#aaa",
    },
})

class IntroGsap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
        }
        this.toggleComponent = this.toggleComponent.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        // this.getLineById = this.getLineById.bind(this)
        // this.getAllLittleEmptyCircles = this.getAllLittleEmptyCircles.bind(this)

        this.mainTl = null
        // this.mainTl = gsap.timeline({ paused: true })

        // ------- MY VARS -------
        this.myVars = {
            timings: {},
            brands: {
                gatsby: {
                    angle: 54,
                    lineZeroLengthAttrs: { x1: 297.09, y1: 170.16 },
                    lineFullLengthAttrs: { x1: 489.09, y1: 54.16 },
                },
                netlify: {
                    angle: 71,
                    lineZeroLengthAttrs: { x1: 320.09, y1: 216.16 },
                    lineFullLengthAttrs: { x1: 486.09, y1: 167.16 },
                },
                netlifycms: {
                    angle: 91,
                    lineZeroLengthAttrs: { x1: 329.59, y1: 277.66 },
                    lineFullLengthAttrs: { x1: 485.59, y1: 277.66 },
                },
                materialui: {
                    angle: 110,
                    lineZeroLengthAttrs: { x1: 319.58, y1: 337.32 },
                    lineFullLengthAttrs: { x1: 486.09, y1: 392.16 },
                },
                github: {
                    angle: 127,
                    lineZeroLengthAttrs: { x1: 295.09, y1: 383.16 },
                    lineFullLengthAttrs: { x1: 489.09, y1: 501.16 },
                },
            },
        }

        // Lines
        /*
        gatsby
        x1="489.09"
        x2="297.09"
        y1="54.16"
        y2="170.16"

        netlify
        x1="486.09"
        x2="320.09"
        y1="167.16"
        y2="216.16"

        netlifycms
        x1="485.59"
        x2="329.59"
        y1="277.66"
        y2="277.66"

        materialui
        x1="486.09"
        x2="319.58"
        y1="392.16"
        y2="337.32"

        github
        x1="489.09"
        x2="295.09"
        y1="501.16"
        y2="383.16"
        */

        // ------- REFS -------
        this.myRefs = {
            // div - right text section wrapper
            textSectionRef: null,

            bigCircleRef: null,
            bigCircleBlikRef: null,

            // text in circle
            textInCircleRef: null,
            textInCircleBigRef: null,
            textInCircleSmallRef: null,

            halfCircleRef: null,

            // brand group
            brands: {
                gatsby: {
                    groupRef: null,
                    boxRef: null,
                    textRef: null,
                    logoRef: null,
                    lineRef: null,
                    bigCircleRef: null,
                    smallCircleRef: null,
                    littleEmptyCircleRef: null,
                    description: null,
                },
                netlify: {
                    groupRef: null,
                    boxRef: null,
                    textRef: null,
                    logoRef: null,
                    lineRef: null,
                    bigCircleRef: null,
                    smallCircleRef: null,
                    littleEmptyCircleRef: null,
                    description: null,
                },
                netlifycms: {
                    groupRef: null,
                    boxRef: null,
                    textRef: null,
                    logoRef: null,
                    lineRef: null,
                    bigCircleRef: null,
                    smallCircleRef: null,
                    littleEmptyCircleRef: null,
                    description: null,
                },
                materialui: {
                    groupRef: null,
                    boxRef: null,
                    textRef: null,
                    logoRef: null,
                    lineRef: null,
                    bigCircleRef: null,
                    smallCircleRef: null,
                    littleEmptyCircleRef: null,
                    description: null,
                },
                github: {
                    groupRef: null,
                    boxRef: null,
                    textRef: null,
                    logoRef: null,
                    lineRef: null,
                    bigCircleRef: null,
                    smallCircleRef: null,
                    littleEmptyCircleRef: null,
                    description: null,
                },
            },
        }

        // div - svg wrapper
        this.sectionSvgRef = null
        this.icons = []
        this.isPlaying = false

        // Animation timings and easings
        this.blikToBrandTime = 0.3
        this.blikToInitialPositionTime = 0.7
        // this.blikToBrandEase = "bounce"
        this.blikToBrandEase = Power4.easeOut
    }

    // ------- getter functions -------
    getAllLittleEmptyCircles = () => {
        return [
            this.myRefs.brands.gatsby.littleEmptyCircleRef,
            this.myRefs.brands.netlify.littleEmptyCircleRef,
            this.myRefs.brands.netlifycms.littleEmptyCircleRef,
            this.myRefs.brands.materialui.littleEmptyCircleRef,
            this.myRefs.brands.github.littleEmptyCircleRef,
        ]
    }
    getLittleEmptyCircleById = id => {
        return this.myRefs.brands[id].littleEmptyCircleRef
    }
    getAllLogos = () => {
        return [
            this.myRefs.brands.gatsby.logoRef,
            this.myRefs.brands.netlify.logoRef,
            this.myRefs.brands.netlifycms.logoRef,
            this.myRefs.brands.materialui.logoRef,
            this.myRefs.brands.github.logoRef,
        ]
    }
    getLogoById = id => {
        return this.myRefs.brands[id].logoRef
    }
    getAllGroups = () => {
        return [
            this.myRefs.brands.gatsby.groupRef,
            this.myRefs.brands.netlify.groupRef,
            this.myRefs.brands.netlifycms.groupRef,
            this.myRefs.brands.materialui.groupRef,
            this.myRefs.brands.github.groupRef,
        ]
    }
    getGroupById = id => {
        return this.myRefs.brands[id].groupRef
    }
    getAllBoxes = () => {
        return [
            this.myRefs.brands.gatsby.boxRef,
            this.myRefs.brands.netlify.boxRef,
            this.myRefs.brands.netlifycms.boxRef,
            this.myRefs.brands.materialui.boxRef,
            this.myRefs.brands.github.boxRef,
        ]
    }
    getBoxById = id => {
        return this.myRefs.brands[id].boxRef
    }
    getAllTexts = () => {
        return [
            this.myRefs.brands.gatsby.textRef,
            this.myRefs.brands.netlify.textRef,
            this.myRefs.brands.netlifycms.textRef,
            this.myRefs.brands.materialui.textRef,
            this.myRefs.brands.github.textRef,
        ]
    }
    getTextById = id => {
        return this.myRefs.brands[id].textRef
    }
    getAllLines = () => {
        return [
            this.myRefs.brands.gatsby.lineRef,
            this.myRefs.brands.netlify.lineRef,
            this.myRefs.brands.netlifycms.lineRef,
            this.myRefs.brands.materialui.lineRef,
            this.myRefs.brands.github.lineRef,
        ]
    }
    getLineById = id => {
        return this.myRefs.brands[id].lineRef
    }
    getAllBigCircles = () => {
        return [
            this.myRefs.brands.gatsby.bigCircleRef,
            this.myRefs.brands.netlify.bigCircleRef,
            this.myRefs.brands.netlifycms.bigCircleRef,
            this.myRefs.brands.materialui.bigCircleRef,
            this.myRefs.brands.github.bigCircleRef,
        ]
    }
    getBigCircleById = id => {
        return this.myRefs.brands[id].bigCircleRef
    }
    getAllSmallCircles = () => {
        return [
            this.myRefs.brands.gatsby.smallCircleRef,
            this.myRefs.brands.netlify.smallCircleRef,
            this.myRefs.brands.netlifycms.smallCircleRef,
            this.myRefs.brands.materialui.smallCircleRef,
            this.myRefs.brands.github.smallCircleRef,
        ]
    }
    getSmallCircleById = id => {
        return this.myRefs.brands[id].smallCircleRef
    }
    getLineZeroLengthAttrsById = id => {
        return this.myVars.brands[id].lineZeroLengthAttrs
    }
    getLineFullLengthAttrsById = id => {
        return this.myVars.brands[id].lineFullLengthAttrs
    }
    getAngleById = id => {
        return this.myVars.brands[id].angle
    }
    getDescriptionById = id => {
        return this.myRefs.brands[id].description
    }

    getBigCircleBlik = () => {
        return this.myRefs.bigCircleBlikRef
    }

    // ------- helper functions -------
    norm = (value, min, max) => (value - min) / (max - min)

    // ------- event handlers -------
    //animate all icons with 0.1 second stagger) => {
    handleChange = ({ intersectionRatio }) => {
        /*handleChange = (event, unobserve) => {
    if (event.isIntersecting) {
            unobserve()

            if (this.isPlaying) return
            this.isPlaying = true
            console.log(this.isPlaying)
            this.mainTl.play()
            // this.mainTl.duration(1).play()
            this.isPlaying = false
        } */
        // this.mainTl.progress((intersectionRatio - 0.3) / 0.4)
        this.mainTl.progress(this.norm(intersectionRatio, 0.3, 0.7))
    }

    handleMouseEnter = e => {
        const id = e.target.id
        e.stopPropagation()
        e.preventDefault()
        this.mainTl.restart().pause()
        this.handleTl.play(id)

        // console.log(id)
        // this.bigCircleBlikMoveToId(id)
        // console.log(this.getSmallCircleById(id))
        // this.bubbleBoom(this.getSmallCircleById(id), 2)
        // this.lineConnectById(id)
        // this.activateLogoById(id)
        // this.bubbleBoom(this.getBigCircleById(id), 1.15)

        // this.lineDisconnectById(id)
        // this.lineConnectById(id)
        /*gsap.timeline()
            .to(this.getLogoById(e.target.id), {
                duration: 0.2,
                opacity: 1,
                transformOrigin: "50% 50%",
            })
            // .add(this.disconnectById(e.target.id))
            // .add(this.connectById("gatsby"))
            .add(this.bigCircleBlikMoveToId(e.target.id))
            .add(this.lineConnectById(e.target.id)) */
    }
    handleMouseLeave = e => {
        const id = e.target.id
        e.stopPropagation()
        e.preventDefault()
        this.disconnectById(id)
        this.handleTl.restart().pause()
        this.mainTl.play()

        // gsap.timeline().to(this.getLogoById(e.target.id), { opacity: 0.5 })
        // .add(this.bigCircleBliklMoveToInitialPosition())
    }

    toggleComponent() {
        this.setState({ show: !this.state.show })
    }

    // ------- animation functions -------
    bubbleBoom = (el, scale) => {
        var tl = gsap
            .timeline()
            .to(el, {
                transformOrigin: "50% 50%",
                duration: 0.2,
                scale: scale,
                opacity: 0.7,
                ease: "back.out(4)",
            })
            .to(el, {
                transformOrigin: "50% 50%",
                duration: 0.5,
                opacity: 1,
                scale: 1,
                ease: "back.out(1)",
            })
        return tl
    }
    smallBubblesInitialEmergence = () => {
        var tl = gsap.timeline().from(this.getAllLittleEmptyCircles(), {
            transformOrigin: "50% 50%",
            duration: 0.7,
            // y: 5,
            opacity: 0,
            scale: 0,
            // stagger: 0.2,
            stagger: {
                from: "center",
                amount: 1,
            },
            ease: "back.out(4)",
            // ease: "expo",
        })
        return tl
    }
    showDescriptionById = id => {
        var tl = gsap
            .timeline()
            .to(this.getDescriptionById(id), { duration: 0.7, opacity: 1 })
        return tl
    }
    hideDescriptionById = id => {
        var tl = gsap
            .timeline()
            .to(this.getDescriptionById(id), { duration: 0.7, opacity: 0 })
        return tl
    }
    textBoxInitialEmergence = () => {
        var tl = gsap
            .timeline()
            .to(this.myRefs.textSectionRef, {
                duration: 1,
                opacity: 1,
            })
            .from(
                this.myRefs.textSectionRef,
                {
                    duration: 1,
                    scale: 0.95,
                    y: 10,
                    // ease: "none",
                    ease: Power3.easeOut,
                },
                "-=1"
            )
        return tl
    }
    brandGroupCrazyRotationInitialEmergence = () => {
        var tl = gsap.timeline().from(this.getAllGroups(), {
            // delay: 3,
            svgOrigin: "146.01 275.66",
            duration: 1.5,
            rotation: -180,
            stagger: 0.2,
            opacity: 0,
            ease: "expo",
        })
        return tl
    }
    halfCircleLockBrands = () => {
        var tl = gsap.timeline().from(this.myRefs.halfCircleRef, {
            svgOrigin: "146.01 275.66",
            duration: 1,
            rotation: -180,
            ease: "sine",
        })
        return tl
    }
    bigCircleBliklMoveToInitialPosition = () => {
        var tl = gsap.timeline().to(this.myRefs.bigCircleBlikRef, {
            svgOrigin: "146.01 275.66",
            duration: this.blikToInitialPositionTime,
            rotation: 0,
            ease: Power4.easeOut,
        })
        return tl
    }
    bigCircleBlikMoveToId = id => {
        var tl = gsap.timeline().to(this.getBigCircleBlik(), {
            svgOrigin: "146.01 275.66",
            duration: this.blikToBrandTime, // TODO - move to vars
            rotation: this.getAngleById(id),
            ease: this.blikToBrandEase, // TODO - move to vars
        })
        return tl
    }
    lineConnectById = id => {
        var tl = gsap.timeline().to(this.getLineById(id), {
            duration: 0.3,
            attr: this.getLineFullLengthAttrsById(id),
            ease: Power3.easeIn,
        })
        return tl
    }
    lineDisconnectById = id => {
        console.log("trying to disconnect...")
        var tl = gsap.timeline().to(this.getLineById(id), {
            duration: 0.3,
            attr: this.getLineZeroLengthAttrsById(id),
            ease: Power3.easeIn,
        })
        return tl
    }
    activateLogoById = id => {
        const tl = gsap.timeline().to(this.getLogoById(id), { opacity: 1 })

        return tl
    }
    deactivateLogoById = id => {
        const tl = gsap.timeline().to(this.getLogoById(id), { opacity: 0.5 })

        return tl
    }
    connectById = id => {
        const tl = gsap
            .timeline()
            .add(this.bigCircleBlikMoveToId(id), id) //done
            .add(
                this.bubbleBoom(this.getSmallCircleById(id), 1.5), //done
                id.concat(`+=0.1`)
            )
            .add(this.lineConnectById(id), id.concat(`+=0.3`))
            .add(this.showDescriptionById(id))
            .add(this.activateLogoById(id))
            .add(
                this.bubbleBoom(this.getBigCircleById(id), 1.15),
                id.concat(`+=0.7`)
            )

        return tl
    }
    disconnectById = id => {
        const tl = gsap
            .timeline()
            .add(this.lineDisconnectById(id), id)
            .add(
                this.bubbleBoom(this.getSmallCircleById(id), 1.5),
                id.concat(`+=0.3`)
            )
            .add(this.hideDescriptionById(id))
            .add(this.deactivateLogoById(id))
        /* .add(
                this.bubbleBoom(this.getBigCircleById(id), 1.15),
                id.concat(`+=0.8`)
            ) */
        // .add(this.bigCircleBliklMoveToInitialPosition())

        return tl
    }
    componentDidMount() {
        this.initialTl = gsap
            .timeline()
            .add(this.smallBubblesInitialEmergence())
            .add(this.halfCircleLockBrands())
            .to(this.getAllGroups(), { opacity: 0.5, stagger: 0.2 })
            .to(this.getAllGroups(), { opacity: 1, stagger: 0.2 })
            .to(this.getAllLogos(), { opacity: 1 })
            .to(this.getAllLogos(), { opacity: 0.5 })

        this.mainTl = gsap
            .timeline({ delay: 3, repeat: -1 })
            .set(".brandBox", {
                transformOrigin: "0 50%",
            })
            // .add(this.brandGroupCrazyRotationInitialEmergence(), "start")
            .add(this.connectById("gatsby"))
            .add(this.disconnectById("gatsby"))
            .add(this.connectById("netlify"))
            .add(this.disconnectById("netlify"))
            .add(this.connectById("netlifycms"))
            .add(this.disconnectById("netlifycms"))
            .add(this.connectById("materialui"))
            .add(this.disconnectById("materialui"))
            .add(this.connectById("github"))
            .add(this.disconnectById("github"))
        // .timeScale(3)

        this.handleTl = gsap
            .timeline({ paused: true })
            /* .add(this.bigCircleBliklMoveToInitialPosition())

            .from(
                this.icons,
                {
                    x: 200,
                    y: 200,
                    delay: 0.2,
                    scale: 0,
                    autoAlpha: 0,
                    stagger: 0.1,
                },
                "start"
                // "-=3"
            ) */
            .addPause()
            .add("gatsby")
            .add(this.connectById("gatsby"))
            .addPause()
            .add(this.disconnectById("gatsby"))
            .add("netlify")
            .add(this.connectById("netlify"))
            .addPause()
            .add(this.disconnectById("netlify"))
            .add("netlifycms")
            .add(this.connectById("netlifycms"))
            .addPause()
            .add(this.disconnectById("netlifycms"))
            .add("materialui")
            .add(this.connectById("materialui"))
            .addPause()
            .add(this.disconnectById("materialui"))
            .add("github")
            .add(this.connectById("github"))
    }

    render() {
        let thresholds = []
        for (let i = 0.3; i <= 0.7; i += 0.002) {
            thresholds.push(i)
        }
        // thresholds.push(1)
        const { classes, theme } = this.props
        const { show } = this.state
        return (
            <Container
                // disableGutters="true"
                maxWidth={theme.siteContainer.maxWidth}
                component="section"
                className="introGsap"
                className={classes.section}
            >
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Observer
                            onChange={() => console.log("Header")}
                            threshold="0.5"
                        >
                            <h1
                                className={classes.sectionHeader}
                                dangerouslySetInnerHTML={{
                                    __html: this.props.intl.formatMessage({
                                        id: "introGsap.sectionHeader",
                                    }),
                                }}
                            ></h1>
                        </Observer>
                    </Grid>

                    <Grid item container spacing={10} justify="center">
                        <Grid
                            item
                            xs={10}
                            md={6}
                            lg={5}
                            style={{ marginTop: "3rem" }}
                        >
                            <div ref={div => (this.sectionSvgRef = div)}>
                                <svg
                                    preserveAspectRatio="xMidYMid meet"
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="blurb"
                                    // width="100%"
                                    viewBox="0 0 743.67 556.44"
                                    // overflow="visible"
                                    overflow="hidden"
                                >
                                    <defs>
                                        <filter
                                            id="AI_GaussianBlur_4"
                                            name="AI_GaussianBlur_4"
                                        >
                                            <feGaussianBlur stdDeviation="4" />
                                        </filter>
                                    </defs>
                                    <circle
                                        ref={el =>
                                            (this.myRefs.bigCircleRef = el)
                                        }
                                        fill="none"
                                        stroke-miterlimit="10"
                                        stroke-width="20"
                                        cx="146.01"
                                        cy="275.66"
                                        r="136.01"
                                        stroke="#7399b3"
                                    />
                                    <path
                                        ref={el =>
                                            (this.myRefs.bigCircleBlikRef = el)
                                        }
                                        stroke="#9dd1f5"
                                        stroke-width="20"
                                        d="M123.88 141.46a136.43 136.43 0 0142.74-.27"
                                    />

                                    <path
                                        ref={el =>
                                            (this.myRefs.halfCircleRef = el)
                                        }
                                        fill="none"
                                        stroke="#7399b3"
                                        stroke-miterlimit="10"
                                        stroke-width="4"
                                        d="M205.59 101.52a184.07 184.07 0 010 348.28"
                                        data-name="halfCircle"
                                    />
                                    <g
                                        ref={el =>
                                            (this.myRefs.textInCircleRef = el)
                                        }
                                        id="blurbText"
                                        fill="#fff"
                                        font-family="PTSans-Bold,PT Sans"
                                        font-weight="700"
                                    >
                                        <text
                                            ref={el =>
                                                (this.myRefs.textInCircleBigRef = el)
                                            }
                                            font-size="37"
                                            letter-spacing=".025em"
                                            transform="translate(46.98 274.34)"
                                        >
                                            INCREDIBLY
                                        </text>
                                        <text
                                            ref={el =>
                                                (this.myRefs.textInCircleSmallRef = el)
                                            }
                                            font-size="20"
                                            letter-spacing=".284em"
                                            transform="translate(76.71 301.66)"
                                        >
                                            EFFICIENT
                                        </text>
                                    </g>
                                    <g
                                        ref={el =>
                                            (this.myRefs.littleCirclesRef = el)
                                        }
                                    >
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.github.littleEmptyCircleRef = el)
                                            }
                                            fill="#bf463d"
                                            d="M482.42 1374.12a7.5 7.5 0 107.5 7.5 7.5 7.5 0 00-7.5-7.5zm0 13a5.5 5.5 0 115.5-5.5 5.5 5.5 0 01-5.5 5.5z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.materialui.littleEmptyCircleRef = el)
                                            }
                                            fill="#0071bc"
                                            d="M462.17 1374.12a7.5 7.5 0 107.5 7.5 7.5 7.5 0 00-7.5-7.5zm0 13a5.5 5.5 0 115.5-5.5 5.5 5.5 0 01-5.5 5.5z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.netlifycms.littleEmptyCircleRef = el)
                                            }
                                            fill="#db8a32"
                                            d="M441.92 1374.12a7.5 7.5 0 107.5 7.5 7.5 7.5 0 00-7.5-7.5zm0 13a5.5 5.5 0 115.5-5.5 5.5 5.5 0 01-5.5 5.5z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.netlify.littleEmptyCircleRef = el)
                                            }
                                            fill="#008a80"
                                            d="M421.67 1374.12a7.5 7.5 0 107.5 7.5 7.5 7.5 0 00-7.5-7.5zm0 13a5.5 5.5 0 115.5-5.5 5.5 5.5 0 01-5.5 5.5z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.gatsby.littleEmptyCircleRef = el)
                                            }
                                            fill="#639"
                                            d="M401.42 1374.12a7.5 7.5 0 107.5 7.5 7.5 7.5 0 00-7.5-7.5zm0 13a5.5 5.5 0 115.5-5.5 5.5 5.5 0 01-5.5 5.5z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                    </g>
                                    <g
                                        // style="pointer-events: all"

                                        ref={el =>
                                            (this.myRefs.brands.gatsby.groupRef = el)
                                        }
                                    >
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.gatsby.boxRef = el)
                                            }
                                            fill="#639"
                                            d="M1038.08 1053.87v70.93a4.54 4.54 0 01-4.54 4.54H810.83a2.11 2.11 0 01-2.14-1.84 2 2 0 011.9-2.21 36 36 0 00.14-71.9 2.11 2.11 0 01-2.05-1.87 2.05 2.05 0 01.59-1.59 2 2 0 011.44-.59h222.83a4.53 4.53 0 014.54 4.53z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.gatsby.bigCircleRef = el)
                                            }
                                            fill="#639"
                                            d="M808.41 1058.22a30.89 30.89 0 1030.89 30.89 30.89 30.89 0 00-30.89-30.89zm0 57.76a26.87 26.87 0 1126.87-26.87 26.87 26.87 0 01-26.87 26.89z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.gatsby.logoRef = el)
                                            }
                                            fill="#fff"
                                            d="M790.8 1089.72l17.34 17.19a18 18 0 01-12.25-5.1 17.24 17.24 0 01-5.09-12.09zm23.9-.45v3.27h7.84a14.81 14.81 0 01-9.47 10.62l-18.78-18.79a14.85 14.85 0 0113.87-9.8 15.08 15.08 0 0112.09 6.21l2.46-2.12a18 18 0 00-32 6.69l21.4 21.4a18 18 0 0014-17.48z"
                                            opacity=".5"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.gatsby.textRef = el)
                                            }
                                            id="gatsbyBoxWord"
                                            fill="#f2f2f2"
                                            d="M920.22 1082.11h5.2v18.55h-5.48V1098a5.66 5.66 0 01-5.45 3c-5.73 0-9.43-4.43-9.43-9.79 0-5.55 3.7-9.8 9.06-9.8a6.17 6.17 0 015.82 3v-2.23zm-9.61 9.07a4.94 4.94 0 005.17 5.17 5.06 5.06 0 005.18-5.17 5 5 0 00-5.18-5.18 5.06 5.06 0 00-5.17 5.18zm24.93-4.86v13.92h-5.06v-13.92h-2.11v-4.64h2.11v-5.9h5.06v5.9h3.38v4.64zm15.73 0a4.62 4.62 0 00-2.95-1.29c-1.3 0-2 .55-2 1.48 0 .55.19 1.1 1.67 1.66l1.29.37c1.48.55 3.7 1.11 4.62 2.59a5.23 5.23 0 01.92 3.14 5.92 5.92 0 01-2 4.62 8.2 8.2 0 01-5.54 2 9.45 9.45 0 01-7.21-3.14l2.77-3.14c1.11 1.11 2.59 2.22 4.07 2.22s2.58-.74 2.58-2a2 2 0 00-1.66-1.85l-1.11-.37a11.65 11.65 0 01-3.88-2.21 4.78 4.78 0 01-1.48-3.52 6.13 6.13 0 011.85-4.25 7.9 7.9 0 014.81-1.29 9.28 9.28 0 015.91 2zm10.84-2a8.25 8.25 0 016.35-3c5.36 0 9.06 4.25 9.06 9.8s-3.7 9.79-9.24 9.79c-1.11 0-5.75-3-5.75-3v2.65h-5.06v-31.21h4.64zm-.12 6.84a5 5 0 005.18 5.17 5 5 0 005.17-5.17 5.18 5.18 0 10-10.35 0zm24 6.62l-8.86-15.69h6.09l5.73 10.52 5.17-10.52h5.91l-14.78 28.25h-5.9zm-82.53-12.74h-12.62v5.06h6.69c-1.09 3.43-3.62 5.78-8.32 5.78-5.24 0-9-4.33-9-9.58s3.62-9.76 8.86-9.76a9.76 9.76 0 017.59 3.8l4.16-2.71a14.3 14.3 0 00-11.75-6 14.55 14.55 0 00-14.46 14.64 14.46 14.46 0 1028.92 0 2.94 2.94 0 00-.04-1.21z"
                                            opacity=".7"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <rect
                                            pointerEvents="all"
                                            visibility="hidden"
                                            // stroke="none"
                                            // fill="none"
                                            width="400"
                                            height="90"
                                            transform="translate(480 0)"
                                            id="gatsby"
                                            onMouseEnter={this.handleMouseEnter}
                                            onMouseOut={this.handleMouseLeave}
                                        />
                                        <circle
                                            ref={el =>
                                                (this.myRefs.brands.gatsby.smallCircleRef = el)
                                            }
                                            cx="296.97"
                                            cy="170.28"
                                            r="7.38"
                                            fill="#639"
                                        />

                                        <line
                                            ref={el =>
                                                (this.myRefs.brands.gatsby.lineRef = el)
                                            }
                                            // x1="489.09"
                                            x1="297.09"
                                            x2="297.09"
                                            // y1="54.16"
                                            y1="170.16"
                                            y2="170.16"
                                            fill="none"
                                            stroke="#639"
                                            stroke-miterlimit="10"
                                            stroke-width="2"
                                        />
                                    </g>
                                    <g
                                        ref={el =>
                                            (this.myRefs.brands.netlify.groupRef = el)
                                        }
                                        // onMouseEnter={handleMouseEnter}
                                        // onMouseOut={handleMouseLeave}
                                    >
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.netlify.boxRef = el)
                                            }
                                            fill="#008a80"
                                            d="M1038.08 1173.25v70.93a4.54 4.54 0 01-4.54 4.54H810.83a2.11 2.11 0 01-2.14-1.84 2 2 0 011.9-2.21 36 36 0 00.14-71.9 2.11 2.11 0 01-2.05-1.87 2.05 2.05 0 01.59-1.59 2 2 0 011.44-.59h222.83a4.53 4.53 0 014.54 4.53z"
                                            data-name="netlifyBoxBody"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.netlify.bigCircleRef = el)
                                            }
                                            fill="#008a80"
                                            d="M808.41 1177.22a30.89 30.89 0 1030.89 30.89 30.89 30.89 0 00-30.89-30.89zm0 57.76a26.87 26.87 0 1126.87-26.87 26.87 26.87 0 01-26.87 26.89z"
                                            data-name="netlifyBoxCircle"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <circle
                                            ref={el =>
                                                (this.myRefs.brands.netlify.smallCircleRef = el)
                                            }
                                            cx="319.97"
                                            cy="216.28"
                                            r="7.38"
                                            fill="#008a80"
                                            data-name="netlifyBoxLineEnd"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.netlify.logoRef = el)
                                            }
                                            fill="#fff"
                                            d="M818.08 1202.29a.08.08 0 010-.09l.8-4.89 3.75 3.75-3.9 1.66a1.94 1.94 0 00-.65-.43zm5.45-.29l4 4c.83.83 1.25 1.25 1.4 1.73a.79.79 0 01.06.22l-9.59-4.06s-.08 0-.08-.07.05-.06.09-.08zm5.31 7.25a7.38 7.38 0 01-1.3 1.47l-4.52 4.53-5.85-1.22c-.06 0-.11 0-.11-.06a1.8 1.8 0 00-.68-1.24.09.09 0 010-.09l1.1-6.75s0-.11.06-.11a1.8 1.8 0 001.2-.69h.1zm-6.86 7l-7.44 7.44 1.27-7.83h.06a1.85 1.85 0 00.72-.54.21.21 0 01.1-.06zm-9 9l-.84.84-9.27-13.4v-.07l.08-.13a.15.15 0 010-.06.11.11 0 01.08 0l10.27 2.12a.11.11 0 01.08 0 1.82 1.82 0 001.06 1.2v.13zm-1.75 1.75a4 4 0 01-1.39 1.07 2.05 2.05 0 01-1.25 0c-.48-.15-.9-.57-1.73-1.41l-9.31-9.31 2.43-3.77v-.05h.09a2.37 2.37 0 00.74.11 2.53 2.53 0 001-.19h.08zm-14.58-10.54l-2.14-2.14 4.22-1.8s.06 0 .08.07a1.25 1.25 0 00.12.17v.05zm-3.08-3.08l-2.71-2.71a14.29 14.29 0 01-1-1.08l8.21 1.71s.1 0 .1.07-.06.07-.11.09zm-4.2-5.18a2.28 2.28 0 01.09-.51c.15-.48.57-.9 1.4-1.73l3.46-3.46c.57.84 4.34 6.28 4.78 6.9s.06.08 0 .11a3.15 3.15 0 00-.41.55.15.15 0 01-.05.06zm5.88-6.62l4.65-4.65 3.45 1.46 2.36 1a.24.24 0 01.08.06v.06a1.73 1.73 0 000 .45 2 2 0 00.59 1.44v.12l-4.72 7.31h-.09a2.16 2.16 0 00-.56-.08 3.57 3.57 0 00-.54.06h-.06zm5.59-5.59l6-6a5.19 5.19 0 011.73-1.41 2.22 2.22 0 011.25 0 5.19 5.19 0 011.73 1.41l1.3 1.3-4.28 6.63h-.09a2.48 2.48 0 00-.65-.09 2.17 2.17 0 00-1.34.48.09.09 0 01-.1 0zm12.94-3.81l4 4-1 5.9a2 2 0 00-.54.28l-6-2.56s-.08 0-.08-.07a2.28 2.28 0 00-.31-.93s-.06-.1 0-.14zm-4.07 8.91l5.65 2.39a.24.24 0 01.08.06v.06a1.18 1.18 0 000 .27v.16s0 .06-.08.07l-12.58 5.35h-.05v-.12l4.64-7.18s.06-.09.11-.09h.3a2.13 2.13 0 001.75-.93.12.12 0 01.16.01zm-6.46 9.51l12.71-5.42.18.15v.06l-1.09 6.69c0 .06 0 .11-.07.11a1.8 1.8 0 00-1.42.88v.06h-.08l-10.13-2.09s-.11-.39-.12-.39z"
                                            data-name="netlifyBoxLogo"
                                            opacity=".5"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.netlify.textRef = el)
                                            }
                                            fill="#f2f2f2"
                                            d="M877.66 1197.33l.28 3.29a8.06 8.06 0 012.78-2.73 7.35 7.35 0 013.79-1 7.23 7.23 0 015.55 2.1c1.31 1.4 2 3.55 2 6.47v14h-4v-13.89c0-1.95-.38-3.34-1.15-4.16a4.63 4.63 0 00-3.53-1.23 5.73 5.73 0 00-3.09.84 6.18 6.18 0 00-2.13 2.29v16.15h-4v-22.14zm28.44 22.57a9.31 9.31 0 01-7.35-3.08 11.56 11.56 0 01-2.74-8v-.9a11.34 11.34 0 012.82-7.87 8.66 8.66 0 016.66-3.14q4.49 0 6.77 2.7a10.76 10.76 0 012.3 7.21v2.51h-14.37l-.06.1a8.75 8.75 0 001.61 5.24 5.15 5.15 0 004.36 2 10.14 10.14 0 003.6-.58 8.32 8.32 0 002.67-1.61l1.57 2.62a9.16 9.16 0 01-3.13 2 12.65 12.65 0 01-4.71.8zm-.61-19.81a4.4 4.4 0 00-3.46 1.7 8.12 8.12 0 00-1.76 4.28v.1h10.21v-.53a6.18 6.18 0 00-1.26-4 4.55 4.55 0 00-3.73-1.55zm18-8.1v5.34h4.19v3h-4.19v13.44a3 3 0 00.64 2.19 2.31 2.31 0 001.71.64 4.48 4.48 0 00.77-.08 5.7 5.7 0 00.75-.21l.53 2.76a3.53 3.53 0 01-1.32.61 7 7 0 01-1.75.23 5.22 5.22 0 01-3.91-1.48 6.44 6.44 0 01-1.45-4.66v-13.44h-3.53v-3h3.53V1192zm12.51 27.48h-4v-31.93h4zm9.6-27.81h-4v-4.12h4zm0 27.81h-4v-22.14h4zm6.92 0v-19.15h-3.46v-3h3.46v-2.81a7.57 7.57 0 011.85-5.47 6.8 6.8 0 015.17-1.94 8.36 8.36 0 011.4.12c.47.07 1 .18 1.56.31l-.49 3.08a7.1 7.1 0 00-.89-.15 9.56 9.56 0 00-1.09-.06 3.18 3.18 0 00-2.62 1 4.73 4.73 0 00-.86 3.06v2.81h4.6v3h-4.6v19.15zm18.6-8.2l.71 2.78h.17l5.44-16.72h4.48l-9.31 25.54a11.47 11.47 0 01-2.4 3.89 5.54 5.54 0 01-4.23 1.66 9.62 9.62 0 01-1.25-.11c-.5-.08-.89-.15-1.17-.22l.41-3.17a4.05 4.05 0 01.73 0l1.07.06a2.48 2.48 0 002.11-1.15 11.39 11.39 0 001.37-2.53l1-2.32-8.25-21.65h4.5z"
                                            opacity=".7"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <rect
                                            pointerEvents="all"
                                            visibility="hidden"
                                            // stroke="none"
                                            // fill="none"
                                            width="400"
                                            height="90"
                                            transform="translate(480 118)"
                                            id="netlify"
                                            onMouseEnter={this.handleMouseEnter}
                                            onMouseOut={this.handleMouseLeave}
                                        />
                                        <line
                                            ref={el =>
                                                (this.myRefs.brands.netlify.lineRef = el)
                                            }
                                            // x1="486.09"
                                            x1="320.09"
                                            x2="320.09"
                                            // y1="167.16"
                                            y1="216.16"
                                            y2="216.16"
                                            fill="none"
                                            stroke="#008a80"
                                            stroke-miterlimit="10"
                                            stroke-width="2"
                                            data-name="netlifyBoxLine"
                                        />
                                    </g>
                                    <g
                                        ref={el =>
                                            (this.myRefs.brands.netlifycms.groupRef = el)
                                        }
                                        // onMouseEnter={handleMouseEnter}
                                        // onMouseOut={handleMouseLeave}
                                    >
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.netlifycms.boxRef = el)
                                            }
                                            fill="#db8a32"
                                            d="M1038.08 1291.64v70.93a4.54 4.54 0 01-4.54 4.54H810.83a2.11 2.11 0 01-2.14-1.84 2 2 0 011.9-2.21 36 36 0 00.14-71.9 2.11 2.11 0 01-2.05-1.87 2.05 2.05 0 01.59-1.59 2 2 0 011.44-.59h222.83a4.53 4.53 0 014.54 4.53z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.netlifycms.bigCircleRef = el)
                                            }
                                            fill="#db8a32"
                                            d="M808.41 1296.22a30.89 30.89 0 1030.89 30.89 30.89 30.89 0 00-30.89-30.89zm0 57.76a26.87 26.87 0 1126.87-26.87 26.87 26.87 0 01-26.87 26.89z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <circle
                                            ref={el =>
                                                (this.myRefs.brands.netlifycms.smallCircleRef = el)
                                            }
                                            cx="329.97"
                                            cy="277.28"
                                            r="7.38"
                                            fill="#db8a32"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.netlifycms.logoRef = el)
                                            }
                                            fill="#fff"
                                            d="M818.08 1321.29a.08.08 0 010-.09l.8-4.89 3.75 3.75-3.9 1.66a1.94 1.94 0 00-.65-.43zm5.45-.29l4 4c.83.83 1.25 1.25 1.4 1.73a.79.79 0 01.06.22l-9.59-4.06s-.08 0-.08-.07.05-.06.09-.08zm5.31 7.25a7.38 7.38 0 01-1.3 1.47l-4.52 4.53-5.85-1.22c-.06 0-.11 0-.11-.06a1.8 1.8 0 00-.68-1.24.09.09 0 010-.09l1.1-6.75s0-.11.06-.11a1.8 1.8 0 001.2-.69h.1zm-6.86 7l-7.44 7.44 1.27-7.83h.06a1.85 1.85 0 00.72-.54.21.21 0 01.1-.06zm-9 9l-.84.84-9.27-13.4v-.07l.08-.13a.15.15 0 010-.06.11.11 0 01.08 0l10.27 2.12a.11.11 0 01.08 0 1.82 1.82 0 001.06 1.2v.13zm-1.75 1.75a4 4 0 01-1.39 1.07 2.05 2.05 0 01-1.25 0c-.48-.15-.9-.57-1.73-1.41l-9.31-9.31 2.43-3.77v-.05h.09a2.37 2.37 0 00.74.11 2.53 2.53 0 001-.19h.08zm-14.58-10.54l-2.14-2.14 4.22-1.8s.06 0 .08.07a1.25 1.25 0 00.12.17v.05zm-3.08-3.08l-2.71-2.71a14.29 14.29 0 01-1-1.08l8.21 1.71s.1 0 .1.07-.06.07-.11.09zm-4.2-5.18a2.28 2.28 0 01.09-.51c.15-.48.57-.9 1.4-1.73l3.46-3.46c.57.84 4.34 6.28 4.78 6.9s.06.08 0 .11a3.15 3.15 0 00-.41.55.15.15 0 01-.05.06zm5.88-6.62l4.65-4.65 3.45 1.46 2.36 1a.24.24 0 01.08.06v.06a1.73 1.73 0 000 .45 2 2 0 00.59 1.44v.12l-4.72 7.31h-.09a2.16 2.16 0 00-.56-.08 3.57 3.57 0 00-.54.06h-.06zm5.59-5.59l6-6a5.19 5.19 0 011.73-1.41 2.22 2.22 0 011.25 0 5.19 5.19 0 011.73 1.41l1.3 1.3-4.28 6.63h-.09a2.48 2.48 0 00-.65-.09 2.17 2.17 0 00-1.34.48.09.09 0 01-.1 0zm12.94-3.81l4 4-1 5.9a2 2 0 00-.54.28l-6-2.56s-.08 0-.08-.07a2.28 2.28 0 00-.31-.93s-.06-.1 0-.14zm-4.07 8.91l5.65 2.39a.24.24 0 01.08.06v.06a1.18 1.18 0 000 .27v.16s0 .06-.08.07l-12.58 5.35h-.05v-.12l4.64-7.18s.06-.09.11-.09h.3a2.13 2.13 0 001.75-.93.12.12 0 01.16.01zm-6.46 9.51l12.71-5.42.18.15v.06l-1.09 6.69c0 .06 0 .11-.07.11a1.8 1.8 0 00-1.42.88v.06h-.08l-10.13-2.09s-.11-.39-.12-.39z"
                                            opacity=".5"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <g
                                            ref={el =>
                                                (this.myRefs.brands.netlifycms.textRef = el)
                                            }
                                        >
                                            <path
                                                fill="#fff"
                                                d="M918.5 1316h3.34v-3.34h-3.34zm10.06-2a5.38 5.38 0 00-1.38 4v1.41h-2v2.59h2v12.69h3.34V1322h3.34v-2.67h-3.34V1318c0-1.7.79-2.54 2.4-2.54a7.7 7.7 0 011.27.1l.08-2.71a7.41 7.41 0 00-1.87-.25 5.08 5.08 0 00-3.84 1.4zm12.28 15.85l-3.2-10.47H934l5.33 15.35-.49 1.32a3 3 0 01-1 1.6 3.21 3.21 0 01-1.93.48h-.64v2.69a6.11 6.11 0 001.64.26c2.21 0 3.78-1.31 4.71-3.89l6-17.77h-3.63zm-22.34 5.56h3.34V1320h-3.34zm-15-3.27a1.85 1.85 0 01-.32-1.23V1322h2.67v-2h-2.67v-4h-3.38v3.34h-2.67v2.66h2.67v8.75c0 2.94 1.28 4.41 3.82 4.41a7.57 7.57 0 002.19-.33v-2.52a4.61 4.61 0 01-1.14.14 1.46 1.46 0 01-1.21-.35zm-11-6.08H886a5 5 0 011.11-2.78 3.14 3.14 0 014.48-.1 4.29 4.29 0 01.91 2.63v.25zm-3.14-6.43a6.44 6.44 0 00-3.52 1 6.79 6.79 0 00-2.47 2.84 9.61 9.61 0 00-.87 4.12v.42a7.62 7.62 0 002 5.53 6.94 6.94 0 005.24 2.09 7.67 7.67 0 003.42-.76 5.94 5.94 0 002.42-2.15l-1.82-1.78a4.59 4.59 0 01-3.8 1.93 3.74 3.74 0 01-2.76-1.11 4.63 4.63 0 01-1.26-3h9.9v-1.39a8.72 8.72 0 00-1.68-5.7 6 6 0 00-4.87-2.08zm-14.4.15a5.57 5.57 0 00-4.48 2l-.11-1.78h-3.23v15.36h3.34v-11a3.48 3.48 0 013.22-1.89 2.79 2.79 0 012.14.71 3 3 0 01.65 2.17v10h3.34v-10.15c-.11-3.62-1.73-5.46-4.94-5.46zm34.92 15.63h3.34v-22h-3.34z"
                                                transform="translate(-294.41 -1049.34)"
                                            />
                                            <path
                                                fill="#c9fa4b"
                                                d="M958 1331.92a3 3 0 002.07-.74 2.54 2.54 0 00.88-1.82h3.15a5.05 5.05 0 01-.87 2.62 5.74 5.74 0 01-2.2 1.93 6.49 6.49 0 01-3 .71 6.32 6.32 0 01-5-2 8.17 8.17 0 01-1.83-5.65v-.35a8 8 0 011.82-5.5A6.22 6.22 0 01958 1319a6.11 6.11 0 014.33 1.56 5.66 5.66 0 011.75 4.11h-3.15a3.17 3.17 0 00-.87-2.13 2.82 2.82 0 00-2.08-.83 2.94 2.94 0 00-2.51 1.19 6.16 6.16 0 00-.89 3.61v.54a6.24 6.24 0 00.87 3.65 2.93 2.93 0 002.55 1.22zm11.92-12.58l.1 1.6a5.6 5.6 0 014.48-1.88 4.31 4.31 0 014.27 2.35 5.53 5.53 0 014.77-2.35 4.89 4.89 0 013.84 1.4 6.2 6.2 0 011.28 4.15v10.09h-3.34v-10a3 3 0 00-.67-2.16 3.06 3.06 0 00-2.22-.68 3.11 3.11 0 00-2 .63 3.41 3.41 0 00-1.1 1.66v10.58h-3.36v-10.15c0-1.81-1-2.72-2.91-2.72a3.22 3.22 0 00-3.1 1.7v11.17h-3.34v-15.36zm30.74 11.36a1.6 1.6 0 00-.78-1.43 8.39 8.39 0 00-2.56-.86 13 13 0 01-3-1 4 4 0 01-2.63-3.68 4.16 4.16 0 011.7-3.38 6.74 6.74 0 014.34-1.36 7 7 0 014.53 1.39 4.39 4.39 0 011.74 3.62h-3.52a2.17 2.17 0 00-.75-1.68 2.85 2.85 0 00-2-.67 3 3 0 00-2.09.7 1.64 1.64 0 00-.51 1 1.46 1.46 0 00.66 1.51 9.31 9.31 0 002.75.9 13.05 13.05 0 013.24 1.09 4.55 4.55 0 011.75 1.51 3.86 3.86 0 01.57 2.14 4.06 4.06 0 01-1.75 3.41 7.39 7.39 0 01-4.58 1.31 8.1 8.1 0 01-3.42-.69 5.63 5.63 0 01-2.34-1.91 4.5 4.5 0 01-.84-2.61h3.41a2.48 2.48 0 00.94 1.91 3.64 3.64 0 002.3.67 3.52 3.52 0 002.11-.53 1.63 1.63 0 00.69-1.36z"
                                                transform="translate(-294.41 -1049.34)"
                                            />
                                        </g>
                                        <rect
                                            pointerEvents="all"
                                            visibility="hidden"
                                            // stroke="none"
                                            // fill="none"
                                            width="400"
                                            height="90"
                                            transform="translate(480 235)"
                                            id="netlifycms"
                                            onMouseEnter={this.handleMouseEnter}
                                            onMouseOut={this.handleMouseLeave}
                                        />
                                        <line
                                            ref={el =>
                                                (this.myRefs.brands.netlifycms.lineRef = el)
                                            }
                                            // x1="485.59"
                                            x1="329.59"
                                            x2="329.59"
                                            // y1="277.66"
                                            y1="277.66"
                                            y2="277.66"
                                            fill="none"
                                            stroke="#db8a32"
                                            stroke-miterlimit="10"
                                            stroke-width="2"
                                        />
                                    </g>
                                    <g
                                        ref={el =>
                                            (this.myRefs.brands.materialui.groupRef = el)
                                        }
                                        id="materialUiBox"
                                        // onMouseEnter={handleMouseEnter}
                                        // onMouseOut={handleMouseLeave}
                                    >
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.materialui.boxRef = el)
                                            }
                                            fill="#0071bc"
                                            d="M1038.08 1411v71a4.54 4.54 0 01-4.54 4.54H810.83a2.11 2.11 0 01-2.14-1.84 2 2 0 011.9-2.21 36 36 0 00.14-71.9 2.11 2.11 0 01-2.05-1.87 2.05 2.05 0 01.59-1.59 2 2 0 011.44-.59h222.83a4.53 4.53 0 014.54 4.46z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.materialui.bigCircleRef = el)
                                            }
                                            fill="#0071bc"
                                            stroke="#0071bc"
                                            stroke-miterlimit="10"
                                            d="M808.41 1415.22a30.89 30.89 0 1030.89 30.89 30.89 30.89 0 00-30.89-30.89zm0 57.76a26.87 26.87 0 1126.87-26.87 26.87 26.87 0 01-26.87 26.89z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <circle
                                            ref={el =>
                                                (this.myRefs.brands.materialui.smallCircleRef = el)
                                            }
                                            cx="318.97"
                                            cy="337.28"
                                            r="7.38"
                                            fill="#0071bc"
                                            stroke="#0071bc"
                                            stroke-miterlimit="10"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.materialui.textRef = el)
                                            }
                                            fill="#fff"
                                            d="M988.34 1452.31a4.84 4.84 0 01-3.37-1.16 4.25 4.25 0 01-1.32-3.19v-9h1.47v8.83a3.14 3.14 0 00.86 2.36 3.76 3.76 0 004.71 0 3.16 3.16 0 00.86-2.35v-8.8H993v8.91a4.61 4.61 0 01-.59 2.35 4 4 0 01-1.67 1.54 5.27 5.27 0 01-2.4.51zm9.53-.18V1439h1.48v13.16zm-33.51 0V1439h1.49v11.85h6.3v1.31zm-5.83 0l-1.32-3.58h-5.51l-1.32 3.58h-1.56l5-13.16h1.3l5 13.16zm-1.81-4.9l-2.27-6.17-2.27 6.17zm-13.15 4.9V1439h1.48v13.16zm-5.69 0l-3.08-5.32h-3.4v5.32h-1.48V1439h4.34a4.93 4.93 0 013.32 1 4 4 0 01.46 5.2 3.86 3.86 0 01-1.79 1.29l3.1 5.26v.37zm-3.37-6.63a2.84 2.84 0 002-.72 2.72 2.72 0 000-3.8 3.33 3.33 0 00-2.27-.7h-2.84v5.22zm-17.67 6.63V1439h8.3v1.31h-6.82v4.42h6v1.27h-6v4.81h6.86v1.31zm-9.51 0v-11.85H903V1439h10.22v1.31h-4.38v11.85zm-7 0l-1.33-3.58h-5.51l-1.32 3.58h-1.56l5-13.16h1.31l5 13.16zm-1.82-4.9l-2.27-6.17-2.27 6.17zm-12.92 4.9v-5.76l.07-4.67-4.4 10.43h-1.1l-4.39-10.38.07 4.59v5.79h-1.47V1439h1.76l4.57 10.94 4.59-10.94h1.78v13.16zm89-5.19v-1.28h4.6v1.28z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.materialui.logoRef = el)
                                            }
                                            fill="#fff"
                                            d="M788.41 1449.36v-16l14.25 8.23v5.24l-9.5-5.49v10.73zm15.25-7.74l14.25-8.23v16l-9.5 5.48-4.75-2.74 9.5-5.49v-5.24l-9.5 5.49zm0 11.23v5.49l9.5 5.48v-5.48zm10.5 10.93l14.25-8.23v-10.48l-4.75 2.74v5.19l-9.5 5.49zm9.5-21.16v-5.49l4.75-2.74v5.48z"
                                            opacity=".5"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <rect
                                            pointerEvents="all"
                                            visibility="hidden"
                                            // stroke="none"
                                            // fill="none"
                                            width="400"
                                            height="90"
                                            transform="translate(480 355)"
                                            id="materialui"
                                            onMouseEnter={this.handleMouseEnter}
                                            onMouseOut={this.handleMouseLeave}
                                        />
                                        <line
                                            ref={el =>
                                                (this.myRefs.brands.materialui.lineRef = el)
                                            }
                                            // x1="486.09"
                                            x1="319.58"
                                            x2="319.58"
                                            // y1="392.16"
                                            y1="337.32"
                                            y2="337.32"
                                            fill="none"
                                            stroke="#0071bc"
                                            stroke-miterlimit="10"
                                            stroke-width="2"
                                        />
                                    </g>
                                    <g
                                        ref={el =>
                                            (this.myRefs.brands.github.groupRef = el)
                                        }
                                        // onMouseEnter={handleMouseEnter}
                                        // onMouseOut={handleMouseLeave}
                                    >
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.github.boxRef = el)
                                            }
                                            fill="#bf463d"
                                            d="M1038.08 1530.3v70.93a4.54 4.54 0 01-4.54 4.54H810.83a2.11 2.11 0 01-2.14-1.84 2 2 0 011.9-2.21 36 36 0 00.14-71.9 2.11 2.11 0 01-2.05-1.87 2.05 2.05 0 01.59-1.59 2 2 0 011.44-.59h222.83a4.53 4.53 0 014.54 4.53z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.github.bigCircleRef = el)
                                            }
                                            fill="#bf463d"
                                            d="M808.41 1534.22a30.89 30.89 0 1030.89 30.89 30.89 30.89 0 00-30.89-30.89zm0 57.76a26.87 26.87 0 1126.87-26.87 26.87 26.87 0 01-26.87 26.89z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <circle
                                            ref={el =>
                                                (this.myRefs.brands.github.smallCircleRef = el)
                                            }
                                            cx="294.97"
                                            cy="383.28"
                                            r="7.38"
                                            fill="#bf463d"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.github.logoRef = el)
                                            }
                                            fill="#fff"
                                            fill-rule="evenodd"
                                            d="M808.41 1543.05a21.59 21.59 0 00-6.82 42.07c1.08.2 1.47-.47 1.47-1v-3.67c-6 1.31-7.27-2.89-7.27-2.89a5.7 5.7 0 00-2.39-3.16c-2-1.34.14-1.31.14-1.31a4.53 4.53 0 013.31 2.22c1.93 3.3 5 2.35 6.28 1.8a4.67 4.67 0 011.37-2.89c-4.79-.55-9.83-2.4-9.83-10.67a8.34 8.34 0 012.22-5.79 7.79 7.79 0 01.21-5.71s1.82-.58 5.94 2.21a20.37 20.37 0 0110.81 0c4.12-2.79 5.93-2.21 5.93-2.21a7.68 7.68 0 01.21 5.71 8.29 8.29 0 012.22 5.79c0 8.29-5 10.12-9.85 10.65a5.19 5.19 0 011.46 4v5.92c0 .71.38 1.25 1.48 1a21.59 21.59 0 00-6.84-42.07z"
                                            opacity=".5"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <path
                                            ref={el =>
                                                (this.myRefs.brands.github.textRef = el)
                                            }
                                            fill="#fff"
                                            d="M895 1562.2v13.54a.37.37 0 01-.13.32 14.49 14.49 0 01-7.81 2.07c-5.86 0-12.83-1.8-12.83-13.93s6.08-14.65 12-14.65c5.15 0 7.19 1.14 7.52 1.38a.4.4 0 01.16.32l-1 4.2a.42.42 0 01-.5.41 13.82 13.82 0 00-5.11-.79c-3.47 0-7.16 1-7.16 8.83s3.55 8.72 6.08 8.72a10.34 10.34 0 002.93-.27V1567h-3.45a.42.42 0 01-.42-.42v-4.34a.42.42 0 01.42-.42h8.88a.41.41 0 01.42.38zm45.36-11.2a.41.41 0 00-.41-.41h-5a.41.41 0 00-.42.41v9.67h-7.79V1551a.41.41 0 00-.41-.41h-5a.41.41 0 00-.42.41v26.17a.42.42 0 00.42.42h5a.41.41 0 00.41-.42V1566h7.79v11.19a.42.42 0 00.41.42h5a.41.41 0 00.41-.42zm-36.36 3.44a3.23 3.23 0 10-3.23 3.26 3.25 3.25 0 003.23-3.26zm-.36 17.21v-12.08a.41.41 0 00-.42-.41h-5a.47.47 0 00-.43.46v17.31c0 .51.31.66.72.66H903c.5 0 .62-.25.62-.67zm55.7-12.45h-5a.41.41 0 00-.41.41v12.83a5.57 5.57 0 01-3.05.93c-1.79 0-2.26-.81-2.26-2.57v-11.19a.41.41 0 00-.42-.41h-5a.41.41 0 00-.42.41v12c0 5.2 2.9 6.48 6.89 6.48a11.64 11.64 0 005.92-1.81 9.92 9.92 0 00.18 1.07.43.43 0 00.36.22h3.21a.41.41 0 00.41-.42v-17.57a.41.41 0 00-.39-.38zm20.55 8.53c0 8.06-2.61 10.38-7.17 10.38a9 9 0 01-5.93-1.95 7.71 7.71 0 01-.21 1.21.42.42 0 01-.36.22h-3.48a.42.42 0 01-.42-.42V1551a.41.41 0 01.42-.41h5a.41.41 0 01.41.41v8.86a9.39 9.39 0 014.74-1.25c2.85 0 7.02 1.05 7.02 9.12zm-5.76.31c0-4.26-1.73-4.8-3.51-4.64a6.51 6.51 0 00-2.57.83v8.29a6 6 0 002.89.83c2.43.07 3.21-.81 3.21-5.35zm-56.13-8.89h-3.75v-5c0-.19-.09-.28-.31-.28h-5.11c-.2 0-.31.08-.31.27v5.13l-2.73.66a.42.42 0 00-.3.4v3.22a.41.41 0 00.41.42h2.62v7.74c0 5.75 4 6.32 6.76 6.32a11.54 11.54 0 003-.49.4.4 0 00.23-.38v-3.54a.42.42 0 00-.41-.42c-.22 0-.78.09-1.35.09-1.85 0-2.47-.85-2.47-2V1564H918a.41.41 0 00.41-.42v-4a.41.41 0 00-.41-.43z"
                                            transform="translate(-294.41 -1049.34)"
                                        />
                                        <rect
                                            pointerEvents="all"
                                            visibility="hidden"
                                            // stroke="none"
                                            // fill="none"
                                            width="400"
                                            height="90"
                                            transform="translate(480 470)"
                                            id="github"
                                            onMouseEnter={this.handleMouseEnter}
                                            onMouseOut={this.handleMouseLeave}
                                        />
                                        <line
                                            ref={el =>
                                                (this.myRefs.brands.github.lineRef = el)
                                            }
                                            // x1="489.09"
                                            x1="295.09"
                                            x2="295.09"
                                            // y1="501.16"
                                            y1="383.16"
                                            y2="383.16"
                                            fill="none"
                                            stroke="#bf463d"
                                            stroke-miterlimit="10"
                                            stroke-width="2"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </Grid>
                        <Observer
                        //onChange={this.handleChange}
                        //reshold={thresholds}
                        // threshold="0.5"
                        >
                            <Grid item xs={12} md={6} lg={7}>
                                <div className={classes.descriptionWrapper}>
                                    <div
                                        className={classes.description}
                                        ref={div =>
                                            (this.myRefs.brands.gatsby.description = div)
                                        }
                                    >
                                        <h2
                                            className={classNames(
                                                classes.descriptionHeader,
                                                classes.descriptionHeaderGatsby
                                            )}
                                            dangerouslySetInnerHTML={{
                                                __html: this.props.intl.formatMessage(
                                                    {
                                                        id:
                                                            "introGsap.description.gatsbyHeader",
                                                    }
                                                ),
                                            }}
                                        ></h2>
                                        <p
                                            className={classes.descriptionText}
                                            dangerouslySetInnerHTML={{
                                                __html: this.props.intl.formatMessage(
                                                    {
                                                        id:
                                                            "indexSectionIntro.text",
                                                    }
                                                ),
                                            }}
                                        ></p>
                                    </div>
                                    <div
                                        className={classes.description}
                                        ref={div =>
                                            (this.myRefs.brands.netlify.description = div)
                                        }
                                    >
                                        <h2
                                            className={classNames(
                                                classes.descriptionHeader,
                                                classes.descriptionHeaderNetlify
                                            )}
                                            dangerouslySetInnerHTML={{
                                                __html: this.props.intl.formatMessage(
                                                    {
                                                        id:
                                                            "introGsap.description.netlifyHeader",
                                                    }
                                                ),
                                            }}
                                        ></h2>
                                        <p className={classes.descriptionText}>
                                            Netlify text. Lorem ipsum dolor sit
                                            amet consectetur adipisicing elit.
                                            Deleniti, maxime harum ipsa
                                            reprehenderit nesciunt numquam
                                            molestias delectus itaque temporibus
                                            pariatur officia, quidem deserunt
                                            nostrum! Iste fugit rem porro illo
                                            error dolor quo harum neque quos
                                            aspernatur esse, tenetur at sequi
                                            voluptate facere quod maxime
                                            cupiditate, magni aliquid nam in
                                            sint.
                                        </p>
                                    </div>
                                    <div
                                        className={classes.description}
                                        ref={div =>
                                            (this.myRefs.brands.netlifycms.description = div)
                                        }
                                    >
                                        <h2
                                            className={classNames(
                                                classes.descriptionHeader,
                                                classes.descriptionHeaderNetlifycms
                                            )}
                                            dangerouslySetInnerHTML={{
                                                __html: this.props.intl.formatMessage(
                                                    {
                                                        id:
                                                            "introGsap.description.netlifycmsHeader",
                                                    }
                                                ),
                                            }}
                                        ></h2>
                                        <p className={classes.descriptionText}>
                                            Netlifycms text. Lorem ipsum dolor
                                            sit amet consectetur adipisicing
                                            elit. Deleniti, maxime harum ipsa
                                            reprehenderit nesciunt numquam
                                            molestias delectus itaque temporibus
                                            pariatur officia, quidem deserunt
                                            nostrum! Iste fugit rem porro illo
                                            error dolor quo harum neque quos
                                            aspernatur esse, tenetur at sequi
                                            voluptate facere quod maxime
                                            cupiditate, magni aliquid nam in
                                            sint.
                                        </p>
                                    </div>
                                    <div
                                        className={classes.description}
                                        ref={div =>
                                            (this.myRefs.brands.materialui.description = div)
                                        }
                                    >
                                        <h2
                                            className={classNames(
                                                classes.descriptionHeader,
                                                classes.descriptionHeaderMaterialui
                                            )}
                                            dangerouslySetInnerHTML={{
                                                __html: this.props.intl.formatMessage(
                                                    {
                                                        id:
                                                            "introGsap.description.materialuiHeader",
                                                    }
                                                ),
                                            }}
                                        ></h2>
                                        <p className={classes.descriptionText}>
                                            Materialui text. Lorem ipsum dolor
                                            sit amet consectetur adipisicing
                                            elit. Deleniti, maxime harum ipsa
                                            reprehenderit nesciunt numquam
                                            molestias delectus itaque temporibus
                                            pariatur officia, quidem deserunt
                                            nostrum! Iste fugit rem porro illo
                                            error dolor quo harum neque quos
                                            aspernatur esse, tenetur at sequi
                                            voluptate facere quod maxime
                                            cupiditate, magni aliquid nam in
                                            sint.
                                        </p>
                                    </div>
                                    <div
                                        className={classes.description}
                                        ref={div =>
                                            (this.myRefs.brands.github.description = div)
                                        }
                                    >
                                        <h2
                                            className={classNames(
                                                classes.descriptionHeader,
                                                classes.descriptionHeaderGithub
                                            )}
                                            dangerouslySetInnerHTML={{
                                                __html: this.props.intl.formatMessage(
                                                    {
                                                        id:
                                                            "introGsap.description.githubHeader",
                                                    }
                                                ),
                                            }}
                                        ></h2>
                                        <p className={classes.descriptionText}>
                                            Github text. Lorem ipsum dolor sit
                                            amet consectetur adipisicing elit.
                                            Deleniti, maxime harum ipsa
                                            reprehenderit nesciunt numquam
                                            molestias delectus itaque temporibus
                                            pariatur officia, quidem deserunt
                                            nostrum! Iste fugit rem porro illo
                                            error dolor quo harum neque quos
                                            aspernatur esse, tenetur at sequi
                                            voluptate facere quod maxime
                                            cupiditate, magni aliquid nam in
                                            sint.
                                        </p>
                                    </div>
                                </div>

                                {/* <div
                                    ref={div =>
                                        (this.myRefs.textSectionRef = div)
                                    }
                                    style={{ opacity: "0" }}
                                >
                                    <h2
                                    ></h2>

                                    <p
                                        
                                    ></p>

                                    <div>
                                        {iconsArray.map((icon, index) => {
                                            const { src, width, height } = icon
                                            return (
                                                <img
                                                    key={`icon-${index}`}
                                                    src={src}
                                                    width={width}
                                                    height={height}
                                                    ref={img =>
                                                        (this.icons[
                                                            index
                                                        ] = img)
                                                    }
                                                />
                                            )
                                        })}
                                    </div>
                                </div> */}
                                {/* <ButtonYellow
                                    onClick={() =>
                                        this.setState({ show: false })
                                    }
                                />
                                <ButtonYellow onClick={this.toggleComponent} />
                                <br />
                                <ButtonYellow
                                    onClick={() =>
                                        this.mainTl.play().duration(3)
                                    }
                                >
                                    Play
                                </ButtonYellow>
                                <ButtonYellow
                                    onClick={() => this.mainTl.pause()}
                                >
                                    Pause
                                </ButtonYellow>
                                <ButtonYellow
                                    onClick={() => this.mainTl.restart()}
                                >
                                    Restart
                                </ButtonYellow>
                                <ButtonYellow
                                    onClick={() => this.mainTl.reverse()}
                                >
                                    Reverse
                                </ButtonYellow>
                                <Transition
                                    timeout={1000}
                                    mountOnEnter
                                    unmountOnExit
                                    in={show}
                                    addEndListener={(node, done) => {
                                        gsap.to(node, {
                                            duration: 1,
                                            y: show ? 0 : 100,
                                            autoAlpha: show ? 1 : 0,
                                            onComplete: done,
                                        })
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "1rem",
                                            // width: "200px",
                                            // height: "200px",
                                            backgroundColor: "tomato",
                                        }}
                                    >
                                        <p>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Neque
                                            nihil, quas minus expedita sed nam
                                            cupiditate nesciunt fuga deserunt
                                            modi quam. Neque nobis quibusdam
                                            nulla incidunt ipsa sequi cumque
                                            placeat.
                                        </p>
                                    </div>
                                </Transition> */}
                            </Grid>
                        </Observer>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
export default injectIntl(withTheme(withStyles(styles)(IntroGsap)))
