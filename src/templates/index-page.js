import React from "react"
import { injectIntl } from "gatsby-plugin-intl"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import IntersectionComponent from "../components/IntersectionComponent"
import SectionAdvantages from "../components/sections/SectionAdvantages"
import SectionBestWorks from "../components/sections/SectionBestWorks"
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
            <SectionBestWorks />
            <SectionAdvantages />
            <IntersectionComponent />
            <IntroGsap />
            {/* <Intro /> */}
        </Layout>
    )
}

export default injectIntl(IndexPage)
