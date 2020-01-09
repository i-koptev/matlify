/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    /* Your site config here */
    plugins: [
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-top-layout",
        {
            // keep as first gatsby-source-filesystem plugin for gatsby image support
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/static/img`,
                name: "uploads",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src/pages`,
                name: "pages",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src/img`,
                name: "images",
            },
        },
        "gatsby-remark-prismjs",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-relative-images",
                        options: {
                            name: "uploads",
                        },
                    },
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 2048,
                        },
                    },
                    {
                        resolve: "gatsby-remark-copy-linked-files",
                        options: {
                            destinationDir: "static",
                        },
                    },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-material-ui",
            // If you want to use styled components you should change the injection order.
            options: {
                // stylesProvider: {
                //   injectFirst: true,
                // },
            },
        },
        // If you want to use styled components you should add the plugin here.
        // 'gatsby-plugin-styled-components',
        /* 
        {
            resolve: "gatsby-plugin-netlify-cms",
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`,
            },
        },
         */
        "gatsby-plugin-netlify-cms",
        "gatsby-plugin-netlify", // make sure to keep it last in the array
    ],
}
