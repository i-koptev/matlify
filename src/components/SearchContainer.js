import React, { Component } from "react"
import Axios from "axios"
import * as JsSearch from "js-search"

import {
    changeLocale,
    injectIntl,
    Link,
    FormattedMessage,
} from "gatsby-plugin-intl"

import { withStyles } from "@material-ui/core/styles"
import { ThemeProvider, withTheme } from "@material-ui/styles"

import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import DirectionsIcon from "@material-ui/icons/Directions"

import { CSSTransitionGroup } from "react-transition-group"
import "./test.css"

const styles = theme => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.25)",
        },
        // boxShadow: "none",
    },
    input: {
        marginLeft: theme.spacing(2),
        flex: 1,
        color: "rgba(255, 255, 255, 0.9)",
    },
    searchIcon: {
        paddingLeft: 10,
        color: "rgba(255, 255, 255, 0.9)",
        fontSize: "2rem",
    },
})

class Search extends Component {
    state = {
        bookList: [],
        search: [],
        searchResults: [],
        isLoading: true,
        isError: false,
        searchQuery: "",
        inputFocused: false,
        searchResultsMouseOvered: false,
    }
    /**
     * React lifecycle method to fetch the data
     */
    async componentDidMount() {
        // Axios.get("https://i-koptev.github.io/matlify/src/test.json")
        let source = ""
        switch (this.props.intl.locale) {
            case "ru":
                source =
                    // "https://matlify.netlify.app/searchIndex/ruSearchIndexBlog.json"
                    "https://i-koptev.github.io/matlify/static/searchIndex/ruSearchIndexBlog.json"
                break
            case "en":
                source =
                    // "https://matlify.netlify.app/searchIndex/enSearchIndexBlog.json"
                    "https://i-koptev.github.io/matlify/static/searchIndex/enSearchIndexBlog.json"
                break
        }
        Axios.get(source)
            .then(result => {
                const bookData = result.data
                // this.setState({ bookList: bookData.books })
                this.setState({ bookList: bookData.posts })
                this.rebuildIndex()
            })
            .catch(err => {
                this.setState({ isError: true })
                console.log("====================================")
                console.log(
                    `Something bad happened while fetching the data\n${err}`
                )
                console.log("====================================")
            })
    }

    /**
     * rebuilds the overall index based on the options
     */
    rebuildIndex = () => {
        const { bookList } = this.state
        // const dataToSearch = new JsSearch.Search("isbn")
        const dataToSearch = new JsSearch.Search("slug")
        /**
         *  defines a indexing strategy for the data
         * more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
         */
        dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
        /**
         * defines the sanitizer for the search
         * to prevent some of the words from being excluded
         *
         */
        dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
        /**
         * defines the search index
         * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
         */
        // dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("isbn")
        dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("slug")

        // dataToSearch.addIndex("title") // sets the index attribute for the data
        // dataToSearch.addIndex("author") // sets the index attribute for the data
        // dataToSearch.addIndex("isbn") // sets the index attribute for the data
        dataToSearch.addIndex("title") // sets the index attribute for the data
        dataToSearch.addIndex("content") // sets the index attribute for the data

        dataToSearch.addDocuments(bookList) // adds the data to be searched
        this.setState({ search: dataToSearch, isLoading: false })
    }

    /**
     * handles the input change and perform a search with js-search
     * in which the results will be added to the state
     */
    searchData = e => {
        const { search } = this.state
        const queryResult = search.search(e.target.value)
        this.setState({
            searchQuery: e.target.value,
            searchResults: queryResult,
        })
    }
    handleSubmit = e => {
        e.preventDefault()
    }

    handleInputFocus = () => this.setState({ inputFocused: true })
    handleInputBlur = () => this.setState({ inputFocused: false })

    handleSearchResultsMouseEnter = () => {
        this.setState({ searchResultsMouseOvered: true })
    }
    handleSearchResultsMouseLeave = () => {
        this.setState({ searchResultsMouseOvered: false })
    }

    render() {
        const { classes, theme } = this.props
        const { bookList, searchResults, searchQuery } = this.state
        const queryResults = searchQuery === "" ? bookList : searchResults
        return (
            <div>
                <Paper
                    component="form"
                    className={classes.root}
                    onSubmit={this.handleSubmit}
                    autocomplete="off"
                >
                    {/* <IconButton className={classes.iconButton} aria-label="search"> */}
                    <SearchIcon className={classes.searchIcon} />
                    {/* </IconButton> */}
                    <InputBase
                        className={classes.input}
                        placeholder="Поиск по блогу"
                        inputProps={{ "aria-label": "search the blog" }}
                        onChange={this.searchData}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputBlur}
                        value={searchQuery}
                        id="Search"
                    />
                </Paper>

                <div style={{ margin: "0 auto", position: "relative" }}>
                    {/* <form onSubmit={this.handleSubmit}>
                        <div style={{ margin: "0 auto" }}>
                            <label
                                htmlFor="Search"
                                style={{ paddingRight: "10px" }}
                            >
                                Enter your search here
                            </label>
                            <input
                                id="Search"
                                value={searchQuery}
                                onChange={this.searchData}
                                placeholder="Enter your search here"
                                style={{ margin: "0 auto", width: "400px" }}
                            />
                        </div>
                    </form> */}
                    {/* {searchQuery.length > 2 && queryResults.length ? ( */}
                    {(searchQuery && this.state.inputFocused) ||
                    (searchQuery && this.state.searchResultsMouseOvered) ? (
                        <CSSTransitionGroup
                            transitionName="example"
                            transitionAppear={true}
                            transitionAppearTimeout={300}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                        >
                            <div
                                onMouseEnter={
                                    this.handleSearchResultsMouseEnter
                                }
                                onMouseLeave={
                                    this.handleSearchResultsMouseLeave
                                }
                                style={{
                                    padding: "1rem 2rem",
                                    width: "100%",
                                    backgroundColor: "rgba(0, 41, 63, 1)",
                                    border:
                                        "1px solid rgba(255, 255, 255 ,0.3)",
                                    borderRadius: "4px",
                                    position: "absolute",
                                    top: "1rem",
                                    boxShadow: "0 0 13px 1px #ffffff25",
                                }}
                            >
                                {" "}
                                Найдено совпадений: {queryResults.length}
                                {queryResults.map(item => {
                                    return (
                                        <div key={`row_${item.slug}`}>
                                            <Link to={item.slug}>
                                                <h2>{item.title}</h2>
                                            </Link>

                                            {item.content.substr(0, 100)}
                                        </div>
                                    )
                                })}
                            </div>
                        </CSSTransitionGroup>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        )
    }
}
// export default Search
export default injectIntl(withTheme(withStyles(styles)(Search)))
