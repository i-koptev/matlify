import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

const SvgCompatibleImage = props => {
    const imageStyle = {
        width: "100%",
        height: "100%",
    }
    const alt = props.alt ? props.alt : "meanless image"
    //   const imageStyle = { borderRadius: '5px' }
    // const { childImageSharp, image } = imageInfo
    // const { alt = "", childImageSharp, image } = imageInfo

    if (!!props.image && !!props.image.childImageSharp) {
        return (
            <Img
                style={imageStyle}
                fluid={props.image.childImageSharp.fluid}
                alt={alt}
            />
        )
    }

    if (!!props.childImageSharp) {
        return (
            <Img
                style={imageStyle}
                fluid={props.childImageSharp.fluid}
                alt={alt}
            />
            // <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />
        )
    }

    if (!!props.image && typeof props.image.publicURL === "string")
        return <img style={imageStyle} src={props.image.publicURL} alt={alt} />
    // return <img style={imageStyle} src={image} alt={alt} />

    return null
}

/* SvgCompatibleImage.propTypes = {
    imageInfo: PropTypes.shape({
        alt: PropTypes.string,
        childImageSharp: PropTypes.object,
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
            .isRequired,
        style: PropTypes.object,
    }).isRequired,
}
 */
export default SvgCompatibleImage
