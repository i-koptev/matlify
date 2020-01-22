import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import Container from "@material-ui/core/Container"

const Footer = () => {
    const theme = useTheme()

    return (
        <footer
            className="site-footer"
            style={{
                borderTop: "1px solid rgba(255,255,255, 0.2)",
                backgroundColor: "rgba(0,0,0,0.1)",
                color: "white",
                padding: "3rem",
                fontSize: "1.2rem",
                height: 200,
            }}
        >
            <Container maxWidth={theme.siteContainer.maxWidth}>
                Footer
            </Container>
        </footer>
    )
}
export default Footer
