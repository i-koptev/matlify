import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Footer from "./Footer"
import Navigation from "./Navigation"
import SEO from "./Seo"

const Layout = ({ title, description, lang, children }) => {
    return (
        <div
            style={{
                backgroundImage: "url(/img/bg_16.jpg)",
                backgroundRepeat: "repeat",
                minHeight: "100vh",
                height: "100%",
            }}
        >
            <SEO title={title} description={description} lang={lang} />
            <Navigation />
            <div>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout