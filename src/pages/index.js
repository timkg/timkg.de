import React, { Component } from "react"
import { Link } from "gatsby";

export default class IndexPage extends Component {

    render() {
        return (
            <article>
                <h1>What the Gatsby</h1>
                <p>
                    I've been a frontend developer for most of my career. 
                    And my career has been going for quite a few years now.
                    I started with jQuery, migrated to Backbone.js,
                    tried out Angular, and settled on React.js. I know my way around Node.js, use Webpack,
                    and consider myself quite proficient at what I do.
                </p>
                <p>
                    Recently I wanted to try out Gatsby.js, a supposedly "static site generator". Well,
                    it generates static sites. But I was flabbergasted by all of the stuff which 
                    kind of happens automatically. Don't get me wrong. Using tools which automate repetitive tasks is 
                    a good thing. However, things become less simple when we start using 
                    tools which automate stuff we don't really understand. So I decided to start breaking down
                    what Gatsby actually does, and explore these concepts separately, one at a time.
                </p>
                <p>
                    I'll have a look at the following Gatsby features:
                    <ul>
                        <li><Link to="/compilation">Compilation</Link></li>
                        <li>Module Bundling</li>
                        <li>Live-reloading dev server</li>
                        <li>React</li>
                        <li>Static site generation</li>
                        <li>Client-side routing</li>
                    </ul>
                </p>
            </article>
        );
    }


}
