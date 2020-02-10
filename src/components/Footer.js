import React, { useRef, useEffect } from "react"
import { TweenMax, Power3 } from "gsap"
import pic from "../img/workspace.svg"

import { makeStyles, useTheme } from "@material-ui/core/styles"

import Container from "@material-ui/core/Container"

const Footer = () => {
    const theme = useTheme()

    let myGsapItem = useRef(null)
    useEffect(() => {
        console.log(myGsapItem)
        TweenMax.to(myGsapItem, 2, {
            opacity: 0.5,
            y: -50,
            ease: Power3.easeOut,
            delay: 3,
        })
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
                height: 600,
            }}
        >
            <Container maxWidth={theme.siteContainer.maxWidth}>
                Footer
                <div
                    style={{
                        width: "50%",
                        margin: "0 auto",
                    }}
                >
                    <img
                        ref={el => {
                            myGsapItem = el
                        }}
                        src={pic}
                        alt=""
                    />
                </div>
            </Container>
        </footer>
    )
}
export default Footer
