import React from "react"
import Prism from "prismjs"
require("prismjs/components/prism-jsx.min")
// https://betterstack.dev/blog/code-highlighting-in-react-using-prismjs/#heading-creating-a-prismjs-component
// TODO - refactor as in https://dev.to/fidelve/the-definitive-guide-for-using-prismjs-in-gatsby-4708
export class PrismCode extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }
    componentDidMount() {
        this.highlight()
    }
    componentDidUpdate() {
        this.highlight()
    }
    highlight = () => {
        if (this.ref && this.ref.current) {
            Prism.highlightElement(this.ref.current)
        }
    }
    render() {
        const { code, plugins, language } = this.props
        return (
            <pre className={!plugins ? "" : plugins.join(" ")}>
                <code ref={this.ref} className={`language-${language}`}>
                    {code.trim()}
                </code>
            </pre>
        )
    }
}
