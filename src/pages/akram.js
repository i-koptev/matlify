import React from "react"
import clsx from "clsx"

import { makeStyles, useTheme, createMuiTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import Header from "../components/akram/Header"

const useStyles = makeStyles(theme => ({
    root: {},
}))

const Akram = () => {
    return (
        <div>
            <Header />
        </div>
    )
}

export default Akram
