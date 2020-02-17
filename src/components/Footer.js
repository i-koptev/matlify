import React, { useRef, useEffect, useState } from "react"
import { gsap, TweenMax, Power3 } from "gsap"
import pic from "../img/workspace.svg"
import intropic from "../img/sectionIntro.svg"

import { makeStyles, useTheme } from "@material-ui/core/styles"

import Container from "@material-ui/core/Container"

const Footer = () => {
    const theme = useTheme()

    let myGsapItem1 = useRef(null)
    let myGsapItem2 = useRef(null)
    let myGsapItem3 = useRef(null)
    let svg = useRef(null)

    /*  const handleClick = e => {
        TweenMax.to(e.target, 2, {
            
            ease: Power3.easeIn,
            rotation: 360,
            yoyo: true,
            repeat: 1,
        })
    } */

    useEffect(() => {
        gsap.set("rect", {
            transformOrigin: "50%, 50%",
        })
        var tl2 = gsap.timeline({ repeat: -1 })
        tl2.to("#rectRed", { duration: 1, rotation: 360, ease: "none" })

        var tl = gsap.timeline({ repeat: -1, yoyo: true })

        // gsap.from([myGsapItem1, myGsapItem2, myGsapItem3], {
        tl.from("rect", {
            delay: 1,
            duration: 1.5,
            x: "random(0, 1200)",
            // x: () => Math.random() * 1000 - 500,
            scale: 0.1,
            opacity: 0,
            ease: "elastic",
            // ease: "bounce",
            // ease: "slow(0.9, 0.7, false)",
            // rotation: 360,
            stagger: 0.5,
        })
        /* tl.to("#rectRed", { duration: 1, rotation: 360 })
        tl.to("#rectYellow", { duration: 1, rotation: 360 }, "-=0.5")
        tl.to("#rectBlue", { duration: 1, rotation: 360 }, "3.5") */
        tl.to("rect", { delay: 1 })
    }, [])

    return (
        <footer
            className="site-footer"
            style={{
                borderTop: "1px solid rgba(255,255,255, 0.2)",
                backgroundColor: "rgba(0,0,0,0.1)",
                // backgroundColor: "rgba(0,0,0,0.1)",
                color: "white",
                padding: "3rem",
                fontSize: "1.2rem",
                height: 1600,
            }}
        >
            <Container maxWidth={theme.siteContainer.maxWidth}>
                <svg
                    style={{
                        overflow: "visible",
                    }}
                    id="test"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1340 1000"
                    // viewBox="0 0 173 192"
                    ref={el => {
                        svg = el
                    }}
                >
                    <rect
                        ref={el => {
                            myGsapItem1 = el
                        }}
                        // onClick={handleClick}
                        id="rectBlue"
                        class="rectBlue"
                        x="1.5"
                        y="1.5"
                        width="170"
                        height="51"
                        rx="9.08"
                        ry="9.08"
                        stroke="#f7931e"
                        fill="none"
                        stroke-miterlimit="10"
                        stroke-width="3"
                    />
                    <rect
                        ref={el => {
                            myGsapItem2 = el
                        }}
                        id="rectRed"
                        x="1.5"
                        y="70.5"
                        width="170"
                        height="51"
                        rx="9.08"
                        ry="9.08"
                        stroke="#d4145a"
                        fill="none"
                        stroke-miterlimit="10"
                        stroke-width="3"
                    />
                    <rect
                        ref={el => {
                            myGsapItem3 = el
                        }}
                        id="rectYellow"
                        x="1.5"
                        y="139.5"
                        width="170"
                        height="51"
                        rx="9.08"
                        ry="9.08"
                        stroke="#0071bc"
                        fill="none"
                        stroke-miterlimit="10"
                        stroke-width="3"
                    />
                </svg>
            </Container>
        </footer>
    )
}
export default Footer
