import React from "react"
import BackgroundImage from "gatsby-background-image"

const SvgCompatibleBackgroundImage = props => {
    if (!!props.image.publicURL && !!props.image.childImageSharp) {
        return (
            <BackgroundImage
                fluid={props.image.childImageSharp.fluid}
                Tag="section"
                className={props.className}
                fadeIn="soft"
            >
                {props.children}
            </BackgroundImage>
        )
    }

    if (!!props.image && typeof props.image.publicURL === "string")
        return (
            <section
                className={props.className}
                style={{
                    backgroundImage: `url(${props.image.publicURL})`,
                }}
            >
                {props.children}
            </section>
        )

    return null
}

export default SvgCompatibleBackgroundImage
