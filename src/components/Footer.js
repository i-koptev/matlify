import React from "react"

import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles"

import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Slider from "@material-ui/core/Slider"

const useStyles = makeStyles(theme => ({
    textField: {
        //color: "red",
    },
}))
const MyTextField = withStyles(theme => ({
    root: {
        "& input": { color: "#639" },
        "& label": { color: "#008a80" },
        // label focused styles
        "& label.Mui-focused": {
            color: "#639",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "lime",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#db8a32",
            },
            //border hover styles
            "&:hover fieldset": {
                borderColor: "red",
            },
            // border focused styles
            "&.Mui-focused fieldset": {
                borderColor: "#639",
                color: "white",
                // backgroundColor: "#eee2",
            },
        },
    },
}))(TextField)

const Footer = () => {
    const theme = useTheme()
    const classes = useStyles()

    return (
        <footer
            className="site-footer"
            style={{
                borderTop: "1px solid rgba(255,255,255, 0.2)",
                backgroundColor: "rgba(0,0,0,0.1)",
                // backgroundColor: "rgba(0,0,0,0.1)",
                color: "white",
                // padding: "3rem",
                fontSize: "1.2rem",
                height: 300,
            }}
        >
            <Container
                // disableGutters="true"
                maxWidth={theme.siteContainer.maxWidth}
            >
                <div style={{ padding: "3rem" }}>
                    <p>Footeris</p>
                    {/* <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        defaultValue={20}
                        step={0.001}
                        onChange={handleChange}
                        valueLabelFormat={x => x.toFixed(0)}
                    /> */}
                    <MyTextField
                        id="outlined-basic"
                        label="Your EMail"
                        variant="outlined"
                        // InputProps={InputProps}
                        className={classes.textField}
                        // fullWidth="true"
                    />
                </div>
            </Container>
        </footer>
    )
}
export default Footer
