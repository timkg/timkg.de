import React, { Component } from "react";
import { Link } from "gatsby";
import Nav from "../nav";

class ContrivedExample extends React.Component {
    render() {
        const person = this.props.person;

        return (
            React.createElement("p", {}, `Hi ${person}, I'm a contrived example!`)
        );
    }
}

export default class ReactPage extends Component {

    componentDidMount() {
        document.querySelectorAll('pre code').forEach((block) => {
            window.hljs.highlightBlock(block);
        });

    }

    render() {
        return (
            <article>
                <Nav links={[
                    ["#components", "Components and Elements"],
                    ["#jsx", "JSX"]
                ]}></Nav>
                
                <section>
                    <h1>React</h1>
                    <p>
                        React is a library for building User Interfaces. You can think of a React application as a function
                        which receives data as input and produces your UI as output. Things like data fetching, advanced state management,
                        routing, etc. are outside of the scope of React itself.
                    </p>

                    <h2 id="components">Components and Elements</h2>

                    <p>
                        React abstracts away DOM manipulation. You won't create DOM nodes and attach and remove event handlers.
                        Instead, you'll write your own Components - UI structures with lifecycle methods and data handling - and 
                        compose these Components together to form a nested tree of Elements - pure JS objects representing
                        the desired form of your App. React will take this representation of your app and perform the necessary
                        DOM manipulation for you.
                    </p>

                    <pre className="code">
                    <code className="javascript">
                    {`
// defining a component...
class ContrivedExample extends React.Component {
    render() {
        const person = this.props.person;

        return (
            React.createElement("p", {}, \`Hi \${person}, I'm a contrived example!\`)
        );
    }
}

// and creating a representation of how we want our App to look like
const contrivedExample = 
    React.createElement(ContrivedExample, { person: "Visitor" }, [])

// and injecting our "app" into the page
ReactDOM.render(contrivedExample, document.body)
`}
                    </code>
                    </pre>

                    <p>
                        This will render a <code>p</code> tag with a greeting into the document:
                    </p>

                    <section className="react-example">
                        <ContrivedExample person="Visitor" />
                    </section>

                    <p>
                        We have seen a few things in the example above:
                    </p>
                    <ol>
                        <li>
                            We define our custom UI pieces as Components with a render function,
                            which returns React Elements
                        </li>
                        <li>
                            React Elements are used to represent simple DOM tags as well as 
                            our custom, more complex Components
                        </li>
                        <li>
                            We never instantiate DOM elements directly - we only create React Elements whose <em>type</em>&nbsp;
                            (the first argument to React.createElement) is a string of the DOM element we want
                        </li>
                        <li>
                            In order to instruct React to use our custom components, we simply call React.createElement with a 
                            reference to our custom Component.
                        </li>
                        <li>
                            We can pass data to our Components using props.
                        </li>
                        <li>
                            Our job as UI developer consists of writing the components we need and assembling
                            them together as a tree of React Elements.
                        </li>
                        <li>
                            The actual rendering and DOM manipulation of the app is done by ReactDOM.
                        </li>
                    </ol>
                    
                    <p>
                        This concludes our first look at React. Next we'll have a look at React's infamous JSX templating library.
                    </p>
                </section>
                
                <section>
                    <h2 id="jsx">JSX</h2>

                    <p>
                        Before React came onto the scene a good five years ago, it was considered best practice to keep a clear
                        separation between HTML, CSS, and JavaScript. A page should use semantic HTML which renders fine without CSS,
                        be enriched with CSS to communicate the brand and aid in readability, and finally, JavaScript *could* be added
                        to add interactivity to a page. But each part of the whole should be kept separate, and work independently from
                        each other.
                    </p>

                    <p>
                        Actually, let me rephrase that. That is still considered best practice. There are exceptions to this rule, however.
                        Whenever a page includes client-side data fetching or provides means for interaction which go beyond following links,
                        a clear separation between HTML and JS is not possible anymore.
                    </p>

                    <p>
                        The JS logic which adds interactivity to a website needs to be aware of the structure of
                        the markup it operates on. Otherwise, the JS code can't target the relevant pieces of a page.
                        The markup and the code are tightly coupled by nature, and if one changes, the other has to change as well.
                    </p>

                    <p>
                        The authors of React embraced this need for co-location of markup and code, and enabled it via 
                        the introduction of JSX - React's templating language, or in their own words, "syntax extension". 
                        It looks like HTML embedded in JavaScript code:
                    </p>

                    <pre className="code">
                    <code className="javascript">
                    {`
class ContrivedExample extends React.Component {
    render() {
        const person = this.props.person;

        return (
            // notice the embedded <p> tag...
            <p>Hi {person}, I'm a contrived example!</p>
        );
    }
}

// ...and how we treat our custom component just like an extension of HTML,
// passing in data as we would define attributes on a tag
const contrivedExample = <ContrivedExample person="Visitor" />

ReactDOM.render(contrivedExample, document.body)
                    `}
                    </code>
                    </pre>

                    <p>
                        These tags are actually not tags at all. They are instructions to a JSX-aware compiler to transform
                        them into calls to React.createElement. That's all. We are not suddenly writing HTML in our JavaScript.
                        Every single line in the example above is still JS code, executed by a browser's JS interpreter
                        after being loaded on the page.
                    </p>

                    <p>
                        The way it works:
                    </p>

                    <ul>
                        <li>
                            If the tag is lowercase, React creates an Element whose type is a string representing a native HTML tag. 
                            If it is uppercase, React creates an Element whose type is a reference to a developer-defined custom Component.
                            <pre className="code">
                            <code className="html">
                            {`
<p></p> // React.createElement("p")

class P extends React.Component { /* */ }
<P></P> // React.createElement(P)
                            `}
                            </code>
                            </pre>
                        </li>
                       <li>
                           The content between the tags is passed to the React Element as its <em>children</em> property.
                           <pre className="code">
                            <code className="html">
                            {`
<p>
    This example will be compiled to one React Element of type "p".
    It will have a children property, and its value will be a string.
</p>

// will compile to...
{
    'type': 'p',
    'props': {
      'children': 'This example will...'
    }
}

<CustomComponent>
    <p>
        This example will be compiled to three React Elements. 
        One of type CustomComponent.
    </p>
    <p>
        The CustomComponent Element will have a children property 
        with an array of two React Elements of type "p".
    </p>
</CustomComponent>

// will compile to...
{
    'type': CustomComponent,
    'props': {
      'children': [
        {
          'type': 'p',
          'props': {
            'children': 'This example will...'
          }
        },
        {
          'type': 'p',
          'props': {
            'children': 'The CustomComponent...'
          }
        }
      ]
    },
}
                            `}
                            </code>
                            </pre>
                            <small>
                                (In the two examples above, when I say "will be compiled to an Element...", I actually mean "will be compiled to a call
                                to React.createElement which will create an Element...")
                            </small>
                       </li>
                       <li>
                           Attribute assignments are passed to the React Element as its <em>props</em>.
                       </li>
                    </ul>

                </section>


                <Link to="/" className="back">&larr; Back</Link>

            </article>
        );
    }

}
