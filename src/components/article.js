import React, { Component } from "react";
import { Link } from "gatsby";

export default class Article extends Component {

    render() {
        return (
            <article>
                {this.props.children}
                <Link to="/" className="back">&larr; Back</Link>
            </article>
        );
    }

}
