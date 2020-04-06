import showdown from "showdown"
import theme from "../../theme"
import React from "react"
import PropTypes from "prop-types"
import { AboutPageTemplate } from "../../templates/about-page"
import Content, { HTMLContent } from "../../components/Content"

const styles = {
    wrapperStyle: {
        fontFamily: theme.typography.fontFamily,
        backgroundColor: "#eee",
        padding: "2rem 3rem",
    },
    headerStyle: {
        textAlign: "center",
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.primary.main,
    },
}

const AboutPagePreview = ({ entry, widgetFor }) => {
    const converter = new showdown.Converter({ noHeaderId: true })
    const lang = entry.getIn(["data", "adminlang"])
    return (
        <div style={styles.wrapperStyle}>
            <h1 style={styles.headerStyle}>
                {entry.getIn(["data", "aboutHeading", lang])}
            </h1>
            <h2>{entry.getIn(["data", "aboutSubheading", lang])}</h2>
            <HTMLContent
                content={converter.makeHtml(
                    entry.getIn(["data", "aboutText", lang])
                )}
            ></HTMLContent>
        </div>
        // <div>
        //     <AboutPageTemplate
        //         heading={entry.getIn(["data", "aboutHeading", lang])}
        //         subheading={entry.getIn(["data", "aboutSubheading", lang])}
        //         // text={widgetFor("aboutText")}
        //         text={converter.makeHtml(
        //             entry.getIn(["data", "aboutText", lang])
        //         )}
        //         // content={widgetFor('body')}
        //     />
        // </div>
    )
}

AboutPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default AboutPagePreview
