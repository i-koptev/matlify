import React, { useState } from "react"

import { graphql } from "gatsby"
import { injectIntl } from "gatsby-plugin-intl"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/Layout"

import { Formik, Form, Field, ErrorMessage } from "formik"
// import { string, object } from "yup"
import * as Yup from "yup"

import { PrismCode } from "../components/Prism"

import Content, { HTMLContent } from "../components/Content"
import {
    Grid,
    withStyles,
    Button,
    TextField,
    Checkbox,
} from "@material-ui/core"

import "../formInput.css"

const styles = {
    root: {
        maxWidth: 345,
        color: "white",
    },
}
/* 
<SEO
        title={title ? title - data.site.siteMetadata.title : data.site.siteMetadata.title}
        description={description ? description : data.site.siteMetadata.description}
        lang="ru"
      />
*/
const useStyles = makeStyles(theme => ({
    container: {
        outline: theme.mainNavigationBorderBottom,
        marginTop: `${theme.siteSpacing.aboutPage * 8}px`,
        marginBottom: `${theme.siteSpacing.aboutPage * 8}px`,
        // backgroundColor: "rgba(255,200,200,0.1)",
    },
    htmlContent: {
        "& h2": {
            ...theme.typography.h5,
            paddingBottom: `${theme.siteSpacing.aboutPage * 4}px`,
            paddingLeft: `${theme.siteSpacing.aboutPage * 8}px`,
            // textAlign: "center",
        },
        "& p": {
            ...theme.html.paragraph,
            // color: "olive",
        }, //переопределение!!!
    },
    paragraph: theme.html.paragraph,
    contactForm: {
        // width: "100%",
        border: "1px solid skyblue",
        backgroundColor: "rgba(0,0,0,0.3)",
        padding: "2rem",

        // html form label
        "& label": {
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.1rem",
            letterSpacing: "0.125rem",
        },

        // MatUI form label
        "& .MuiFormLabel-root": {
            color: "red",
            fontSize: "1rem",
            letterSpacing: "0.1rem",
        },
        // label focused styles - when it moves up
        "& label.Mui-focused": {
            color: "tomato",
        },

        // input and textarea fields
        "& .MuiTextField-root": {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(4),
            // width: "25ch",
            // width: "100%",
        },

        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "skyblue",
            },
            // fieldset hover styles
            "&:hover fieldset": {
                borderColor: "skyblue",
                boxShadow: "0 0 5px 0px rgba(255, 255, 255, 0.3)",
                // backgroundColor: "#eee2",
            },
            // fieldset focused styles
            "&.Mui-focused fieldset": {
                borderColor: "tomato",
                borderWidth: "1px",
                color: "yellow",
            },
        },
        // input field typed symbols color
        "& input": { color: "rgba(255, 255, 255, 0.8)" },

        // textarea field typed symbols color
        // "& .MuiOutlinedInput-inputMultiline": { color: "yellow" },
        "& textarea": {
            color: "rgba(255, 255, 255, 0.8)",
        },
        "& .MuiFormHelperText-root": {
            color: "tomato",
        },
    },

    checkbox: {
        // color: "tomato",
        "& .MuiIconButton-label": {
            color: "tomato",
        },
    },

    // MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-buttonSubmit-397 MuiButton-containedPrimary Mui-disabled Mui-disabled

    buttonSubmit: {
        "&.Mui-disabled": {
            backgroundColor: "rgba(255,255,255,0.3)",
            color: "rgba(255,255,255,0.7)",
        },
    },
    buttonReset: {
        backgroundColor: "tomato",
        "&:hover": {
            backgroundColor: "red",
        },
        color: "rgba(255,255,255,0.7)",
        marginLeft: "0.5rem",
    },
}))

const code = `
const postLinks = posts.map(post => (
    <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
            <h2>{post.node.frontmatter.title}</h2>
        </Link>
    </li>
))
`
const getIntlStringById = id => {
    return injectIntl(({ intl }) => {
        // return intl.locale
        return intl.formatMessage({ id: id })
    })()
}

const ContactSchema = Yup.object().shape({
    email: Yup.string()
        .required(getIntlStringById("contactFormErrorEnterEmailAddressPlease"))
        .email(
            getIntlStringById(
                "contactFormErrorWeNeedYourEmailAddressToContactYou"
            )
        ),
    message: Yup.string()
        .required(getIntlStringById("contactFormErrorFieldIsRequired"))
        .min(8, getIntlStringById("contactFormErrorMessageMustBeAtLeast8")),
})

const AboutPage = ({ intl, data }) => {
    const theme = useTheme()
    const classes = useStyles()

    return (
        <Layout>
            <Container
                maxWidth={theme.siteContainer.maxWidth}
                component="section"
                className={classes.container}
            >
                {/* <PrismCode
                    code={code}
                    language="jsx"
                    plugins={["line-numbers"]}
                /> */}
                <Grid
                    container
                    direction="column"
                    spacing={theme.siteSpacing.aboutPage}
                >
                    <Grid item xs={12}>
                        <div style={{ margin: "2rem", color: "white" }}>
                            <Formik
                                initialValues={{ email: "", message: "" }}
                                validationSchema={ContactSchema}
                                onSubmit={(values, actions) => {
                                    // first param is the data you submit, second  is
                                    //the object with extra formik stuff you can destructure or not
                                    // onSubmit={(data, { setSubmitting, resetForm }) => {
                                    setTimeout(() => {
                                        actions.setSubmitting(true)
                                        console.log(
                                            `EMail: ${values.email} Message: ${values.message}`
                                        )
                                        alert(JSON.stringify(values, null, 2))
                                        actions.setSubmitting(false)
                                        // actions.resetForm()
                                    }, 1000)
                                }}
                            >
                                {({
                                    values,
                                    isSubmitting,
                                    dirty,
                                    handleReset,
                                    isValid,
                                }) => (
                                    <Form className={classes.contactForm}>
                                        {/* <div style={{ margin: "1rem 0" }}> */}
                                        <label htmlFor="email">Email: </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            autoComplete="off"
                                            // placeholder="Email"
                                            as={TextField}
                                            // MaterialUI stuff goes further
                                            // required
                                            fullWidth
                                            // label="Enter Your EMail"
                                            label={
                                                <ErrorMessage name="email" />
                                            }
                                            variant="outlined"
                                            // helperText={
                                            //     <ErrorMessage name="email" />
                                            // }
                                            // as={TextField}
                                            // className={classes.textfield}
                                        />
                                        {/* </div> */}
                                        {/* <div style={{ margin: "1rem 0" }}> */}
                                        <label htmlFor="message">
                                            Message:{" "}
                                        </label>
                                        <Field
                                            name="message"
                                            // placeholder="Your message"
                                            label={
                                                <ErrorMessage name="message" />
                                            }
                                            variant="outlined"
                                            multiline
                                            rows={10}
                                            // defaultValue="Default Value"
                                            fullWidth
                                            as={TextField}
                                            // helperText={
                                            //     <ErrorMessage name="message" />
                                            // }
                                        />
                                        {/* <ErrorMessage name="message" /> */}
                                        {/* </div> */}
                                        {/*  {props.errors.email &&
                                        props.touched.email &&
                                        props.errors.email} */}

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={
                                                !isValid ||
                                                !dirty ||
                                                isSubmitting
                                            }
                                            className={classes.buttonSubmit}
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            type="button"
                                            onClick={handleReset}
                                            className={classes.buttonReset}
                                        >
                                            Reset
                                        </Button>
                                        {/*   <pre>
                                            {JSON.stringify(values, null, 2)}
                                        </pre> */}
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h3"
                            component="h1"
                            align="center"
                            // color="error"
                            // color="textPrimary"
                            // color={theme.palette.primary.ikky}
                        >
                            {intl.formatMessage({ id: `aboutHeading` })}
                        </Typography>
                        <Typography variant="h4" component="h2" align="center">
                            {intl.formatMessage({ id: `aboutSubheading` })}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <div
                            className={classes.htmlContent}
                            dangerouslySetInnerHTML={{
                                __html: intl.formatMessage({
                                    id: `aboutText`,
                                }),
                            }}
                        ></div>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={theme.siteSpacing.aboutPage}>
                            <Grid
                                item
                                xs={12}
                                md={4}
                                component="section"
                                id="footerSection"
                                className="footerSection"
                            >
                                <Typography
                                    variant="h5"
                                    align="center"
                                    gutterBottom
                                >
                                    Section 1
                                </Typography>
                                <Typography
                                    variant="body2"
                                    paragraph
                                    className={classes.paragraph}
                                >
                                    Lorem ipsum dolor siiit, amet consectetur
                                    adipisicing elit. Iste officiis assumenda
                                    excepturi dignissimos! Neque, nostrum
                                    expedita, tempora suscipit dolorum quaerat
                                    cum rerum quod reiciendis cumque at
                                    voluptate! Reiciendis, tenetur veniam?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    className={classes.paragraph}
                                >
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Iste officiis assumenda
                                    excepturi dignissimos! Neque, nostrum
                                    expedita, tempora suscipit dolorum quaerat
                                    cum rerum quod reiciendis cumque at
                                    voluptate! Reiciendis, tenetur veniam?
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    gutterBottom
                                >
                                    Section 2
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    paragraph="true"
                                    className={classes.paragraph}
                                >
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Iste officiis assumenda
                                    excepturi dignissimos! Neque, nostrum
                                    expedita, tempora suscipit dolorum quaerat
                                    cum rerum quod reiciendis cumque at
                                    voluptate! Reiciendis, tenetur veniam?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    className={classes.paragraph}
                                >
                                    Lorem ipsum d dolor sit, amet consectetur
                                    adipisicing elit. Iste officiis assumenda
                                    excepturi dignissimos! Neque, nostrum
                                    expedita, tempora suscipit dolorum quaerat
                                    cum rerum quod reiciendis cumque at
                                    voluptate! Reiciendis, tenetur veniam?
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    gutterBottom
                                >
                                    Section 3
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    className={classes.paragraph}
                                >
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Iste officiis assumenda
                                    excepturi dignissimos! Neque, nostrum
                                    expedita, tempora suscipit dolorum quaerat
                                    cum rerum quod reiciendis cumque at
                                    voluptate! Reiciendis, tenetur veniam?
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* <HTMLContent
                        content={intl.formatMessage({ id: `aboutText` })}
                    ></HTMLContent> */}
                {/* <pre style={{ color: "white" }}>
                    {JSON.stringify(theme, null, 4)}
                </pre> */}
            </Container>
        </Layout>
    )
}

export default injectIntl(AboutPage)

export const pageQuery = graphql`
    query AboutPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
            frontmatter {
                title
            }
        }
    }
`
