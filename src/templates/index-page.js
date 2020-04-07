import React from "react"
import { injectIntl } from "gatsby-plugin-intl"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
// import Intro from "../components/Intro"
import IntroGsap from "../components/IntroGsap"

const IndexPage = ({ intl }) => {
    return (
        <Layout
            title={intl.formatMessage({
                id: `seoSiteTitle`,
            })}
            description={intl.formatMessage({
                id: `seoSiteDescription`,
            })}
            lang={intl.locale}
        >
            <Hero />
            <IntroGsap />
            {/* <Intro /> */}
        </Layout>
    )
}

export default injectIntl(IndexPage)
