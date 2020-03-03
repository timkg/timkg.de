import React, { Component } from "react";

class ContrivedExample extends React.Component {
    render() {
        const person = this.props.person;

        return (
            React.createElement("p", {}, `Hi ${person}, I'm a contrived example!`)
        );
    }
}

export default class ReactPage extends Component {

    render() {
        return (
            <article>
                <h1>React</h1>
                <p>
                    React is a library for building User Interfaces. You can think of a React application as a function
                    which receives data as input and produces your UI as output. Things like data fetching, advanced state management,
                    routing, etc. are outside of the scope of React itself.
                </p>
                <p>
                    React abstracts away DOM manipulation. You won't create DOM nodes and attach and remove event handlers.
                    Instead, you'll write your own Components - UI structures with lifecycle methods and data handling - and 
                    compose these Components together to form a nested tree of Elements - pure JS objects representing
                    the desired form of your App. React will take this representation of your app and perform the necessary
                    DOM manipulation for you.
                </p>

                <pre className="code">
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
                </pre>

                <p>
                    This will render a <code>p</code> tag with a greeting into the document:
                </p>

                <section className="react-example">
                    <ContrivedExample person="Visitor" />
                </section>

                <p>
                    We have seen a few things in the example above:
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
                            We never instantiate DOM elements directly - we only create React Elements whose <em>type</em>
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
                </p>

                <p>
                    This concludes our first look at React. Next we'll have a look at React's infamous JSX templating library.
                </p>

            </article>
        );
    }

}
