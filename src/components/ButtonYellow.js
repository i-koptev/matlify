import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

// We can inject some CSS into the DOM.
const styles = {
    root: {
        // background: 'linear-gradient(45deg, #FFBF55 20%, #FFBF55 50%, #FFBF55 90%)',
        // backgroundColor: "#EFAF45",
        backgroundColor: "transparent",
        borderRadius: 0,
        border: "3px solid #ffffff33",
        // color: "black",
        color: "#ffffff77",
        // height: 48,
        padding: "0.4em 2em",
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        "&:hover": {
            // backgroundColor: "#FBBB51",
            backgroundColor: "#ffffff33",
            color: "#fff",
        },
    },
}

function ClassNames(props) {
    const { classes, children, className, ...other } = props

    return (
        <Button className={clsx(classes.root, className)} {...other}>
            {children || "class names"}
        </Button>
    )
}

ClassNames.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
}

export default withStyles(styles)(ClassNames)
