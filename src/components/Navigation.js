import React from "react"
// import { Link } from 'gatsby';
import hat from "../img/hat.svg"

import {
    changeLocale,
    injectIntl,
    Link,
    FormattedMessage,
} from "gatsby-plugin-intl"
import Headroom from "react-headroom"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Hidden from "@material-ui/core/Hidden"
import Container from "@material-ui/core/Container"

const useStyles = makeStyles(theme => ({
    appBarHeader: {
        backgroundColor: "transparent", // need to be transparent in favor of Headroom colors
        boxShadow: "none",
        fontFamily: "PT Sans Narrow",
        [theme.breakpoints.up("md")]: {
            padding: "0.8rem 0", // navbar height
        },
    },

    headroom: {
        "& .headroom": {
            transition:
                "background-color 500ms linear, border-bottom 500ms linear",
            backgroundColor: theme.mainNavigationBackgroundColor,
            borderBottom: theme.mainNavigationBorderBottom,
            position: "fixed",
            width: "100%",
        },
        "& .headroom--pinned": {
            backgroundColor: theme.mainNavigationPinnedBackgroundColor,
            borderBottom: theme.mainNavigationPinnedBorderBottom,
        },
    },
    mainNaviationBrand: {
        transition: "color 200ms linear",
        marginRight: "auto",
        letterSpacing: "0.1em",

        color: theme.mainNavigationBrandColor,
        "&:hover": {
            color: theme.mainNavigationBrandHoverColor,
        },
        fontSize: "1.1rem",
    },
    mainNavigationLink: {
        transition: "color 200ms linear",
        color: theme.mainNavigationLinkColor,
        marginRight: "2.2rem",
        textDecoration: "none",
        textTransform: "uppercase",
        fontSize: "1em",
        letterSpacing: "0.1em",
        [theme.breakpoints.up("lg")]: {
            letterSpacing: "0.2em",
        },
        "&::after": {
            content: '""',
            width: "100%",
            height: "2px",
            margin: "0 auto",
            backgroundColor: theme.mainNavigationLinkActiveColor,
            display: "block",
            // margin-bottom: .3rem;
            opacity: "0",
            transitionDuration: "500ms",
            transitionProperty: "opacity",
        },
        "&:hover": {
            color: theme.mainNavigationLinkHoverColor,
            "&::after": {
                opacity: "0.5",
            },
        },
        "&.active": {
            color: theme.mainNavigationLinkActiveColor,
            "&:hover": {
                cursor: "default",
                "&::after": {
                    opacity: "1",
                },
            },
            "&::after": {
                content: '""',
                width: "100%",
                height: "2px",
                margin: "0 auto",
                backgroundColor: theme.mainNavigationLinkActiveColor,
                display: "block",
                // margin-bottom: .3rem;
                opacity: "1",
                transitionDuration: "500ms",
                transitionProperty: "opacity",
            },
        },
    },
    //   remove white color and shadow of mobile nav
    mainNavigationMobileBgTransparent: {
        backgroundColor: "transparent",
        boxShadow: "none",
    },
    mainNavigationMobile: {
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.mainNavigationMobileBackgroundColor,
    },
    mainNavigationMobileList: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        listStyle: "none",
        width: "80vw",
        padding: 0,
        paddingTop: "2.5em",
        paddingBottom: "3.5em",
        marginTop: "5em",
        backgroundColor: theme.mainNavigationMobileBoardColor,
        color: "white",
    },
    mainNavigationMobileListItem: {
        textAlign: "center",
        display: "block",
        width: "100%",
        marginTop: "1em",
        marginBottom: "1em",
    },
    mainNavigationMobileLink: {
        transition: "color 200ms linear",
        display: "block",
        color: theme.mainNavigationMobileLinkColor,
        textDecoration: "none",
        textTransform: "uppercase",
        fontFamily: "PT Sans Narrow, sans-serif",
        fontSize: "1.1rem",
        fonWeight: "400",
        letterSpacing: "0.1rem",
        "&.active": {
            color: theme.mainNavigationMobileLinkActiveColor,
        },
        "&:hover": {
            color: theme.mainNavigationMobileLinkHoverColor,
        },
    },
    root: {
        flexGrow: 1,
        minHeight: "48px",
    },

    menuButton: {
        // marginRight: theme.spacing(1),
    },
}))

const Navigation = ({ intl }) => {
    const classes = useStyles()
    const theme = useTheme()

    const [state, setState] = React.useState({
        open: false,
    })

    const toggleDrawer = open => event => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return
        }
        setState({ ...state, open: open })
    }

    return (
        <Headroom variant="header" className={classes.headroom}>
            <AppBar className={classes.appBarHeader} position="static">
                <Container maxWidth={theme.siteContainer.maxWidth}>
                    <Toolbar component="nav" disableGutters>
                        <Typography
                            variant="h6"
                            className={classes.mainNaviationBrand}
                        >
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                KOPTEFF IV
                            </Link>
                        </Typography>
                        <Hidden mdUp>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                onKeyDown={toggleDrawer(true)}
                            >
                                <img
                                    style={{
                                        height: "25px",
                                        width: "auto",
                                    }}
                                    src={hat}
                                    alt="Logo"
                                />
                                {/* <MenuIcon /> */}
                            </IconButton>
                            <SwipeableDrawer
                                classes={{
                                    paperAnchorTop:
                                        classes.mainNavigationMobileBgTransparent,
                                }}
                                anchor="top"
                                open={state.open}
                                onClose={toggleDrawer(false)}
                                onOpen={toggleDrawer(true)}
                            >
                                <div
                                    className={classes.mainNavigationMobile}
                                    role="presentation"
                                    onClick={toggleDrawer(false)}
                                    onKeyDown={toggleDrawer(false)}
                                >
                                    <ul
                                        className={
                                            classes.mainNavigationMobileList
                                        }
                                    >
                                        <li
                                            className={
                                                classes.mainNavigationMobileListItem
                                            }
                                        >
                                            <Link
                                                className={
                                                    classes.mainNavigationMobileLink
                                                }
                                                activeClassName="active"
                                                to="/"
                                            >
                                                {intl.formatMessage({
                                                    id: "navigation.main",
                                                })}
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                classes.mainNavigationMobileListItem
                                            }
                                        >
                                            <Link
                                                className={
                                                    classes.mainNavigationMobileLink
                                                }
                                                activeClassName="active"
                                                to="/grid"
                                            >
                                                {intl.formatMessage({
                                                    id: "navigation.works",
                                                })}
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                classes.mainNavigationMobileListItem
                                            }
                                        >
                                            <Link
                                                className={
                                                    classes.mainNavigationMobileLink
                                                }
                                                activeClassName="active"
                                                to="/about"
                                            >
                                                {intl.formatMessage({
                                                    id: "navigation.projects",
                                                })}
                                            </Link>
                                        </li>
                                        <li
                                            className={
                                                classes.mainNavigationMobileListItem
                                            }
                                        >
                                            <Link
                                                className={
                                                    classes.mainNavigationMobileLink
                                                }
                                                activeClassName="active"
                                                to="/blog"
                                            >
                                                {intl.formatMessage({
                                                    id: "navigation.blog",
                                                })}
                                            </Link>
                                        </li>
                                        <Button
                                            onClick={() => changeLocale("ru")}
                                            className={
                                                classes.mainNavigationMobileLink
                                            }
                                            color="inherit"
                                        >
                                            RU
                                        </Button>
                                        <Button
                                            onClick={() => changeLocale("en")}
                                            className={
                                                classes.mainNavigationMobileLink
                                            }
                                            color="inherit"
                                        >
                                            EN
                                        </Button>
                                    </ul>
                                </div>
                            </SwipeableDrawer>
                        </Hidden>
                        <Hidden smDown>
                            <Link
                                className={classes.mainNavigationLink}
                                activeClassName="active"
                                to="/"
                            >
                                {intl.formatMessage({
                                    id: "navigation.main",
                                })}
                            </Link>
                            <Link
                                className={classes.mainNavigationLink}
                                activeClassName="active"
                                to="/grid"
                            >
                                {intl.formatMessage({
                                    id: "navigation.works",
                                })}
                            </Link>
                            <Link
                                className={classes.mainNavigationLink}
                                activeClassName="active"
                                to="/about"
                            >
                                {intl.formatMessage({
                                    id: "navigation.projects",
                                })}
                            </Link>
                            <Link
                                className={classes.mainNavigationLink}
                                activeClassName="active"
                                to="/blog"
                            >
                                {intl.formatMessage({
                                    id: "navigation.blog",
                                })}
                            </Link>
                            <Button
                                onClick={() => changeLocale("ru")}
                                color="inherit"
                                style={{ paddingRight: "0px" }}
                            >
                                RU
                            </Button>
                            <Button
                                onClick={() => changeLocale("en")}
                                color="inherit"
                                style={{ paddingLeft: "0px" }}
                            >
                                EN
                            </Button>
                        </Hidden>
                    </Toolbar>
                </Container>
            </AppBar>
        </Headroom>
    )
}

export default injectIntl(Navigation)

/* import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import Container from "@material-ui/core/Container"

const Navigation = () => {
    const theme = useTheme()

    return (
        <nav
            className="site-footer"
            style={{
                borderTop: "13px solid rgba(25,25,25, 0.7)",
                borderBottom: "13px solid rgba(25,25,25, 0.7)",
                backgroundColor: "rgba(0,0,0,0.1)",
                color: "tomato",
                padding: "1rem 0",
                fontSize: "1.2rem",
                // height: 30,
            }}
        >
            <Container maxWidth={theme.siteContainer.maxWidth}>
                Navigation
            </Container>
        </nav>
    )
}
export default Navigation
 */
