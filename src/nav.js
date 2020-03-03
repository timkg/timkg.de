import React, { Component } from "react";
import { Link } from "gatsby";

export default class Nav extends Component {

    render() {
        const { links } = this.props;

        return (
            <nav>
                    <ul>
                        {links.map(([anchor, title]) => {
                            return <li key={anchor}><a href={anchor}>{title}</a></li>
                        })}
                        <li key="back"><Link to="/">&larr; Back</Link></li>
                    </ul>
                </nav>
        );
    }

}
