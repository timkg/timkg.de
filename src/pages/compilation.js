import React, { Component } from "react"
import Article from "../components/article";
import Nav from "../nav";

export default class CompilationPage extends Component {

    componentDidMount() {
        document.querySelectorAll('pre code').forEach((block) => {
            window.hljs.highlightBlock(block);
        });

    }

    render() {
        return (
            <Article>
                <Nav links={[
                    ["#compilation-intro", "JS Compilation?"],
                    ["#evolution", "Evolution of JS"],
                    ["#deploying", "Deploying into the Unknown"],
                    ["#babel", "Babel.js"]
                ]}></Nav>
                <section id="compilation">
                    <h1 id="compilation-intro">Compilation? Isn't this JavaScript?</h1>
                    <p>
                        JavaScript was designed to be embedded in HTML pages.
                        So why do we have to care about JS compilation?
                    </p>
                    <h2 id="evolution">The evolution of JavaScript and its implications</h2>
                    <p>
                        JavaScript is a continuously evolving language. 
                        &nbsp;<a href="https://www.ecma-international.org/memento/tc39-rf-tg.htm">TC39</a>&nbsp;
                        is the steering committee which proposes new syntax and other constructs. 
                        These proposals go through various stages of refinement, potentially ending in stage 4 - accepted. 
                        The set of proposals which reached stage 4 during a given calendar year is 
                        later standardized by
                        &nbsp;<a href="https://www.ecma-international.org/ecma-262/10.0/index.html#Title">ECMA</a>&nbsp;
                        as a new version of JavaScript, named after the given calendar year (ES2015, ES2016, etc).
                    </p>

                    <p>
                        So our programming language of choice is constantly evolving. That's great. But still,
                        a few years ago nobody needed to compile their JavaScript. Why do we need to do that now?
                    </p>


                    <h2 id="deploying">Deploying into the unknown</h2>
                    <p>
                        The frontend code we write is not executed on machines under our control. We might write code on a machine running 
                        a modern JavaScript engine which understands all of the modern syntax and implements all of the modern APIs. 
                        But this code is not written to be executed on our machine. It is delivered together with the website it enriches, 
                        or the web app it enables, and executed on a device with unknown form factor and unknown JavaScript engine. 
                    </p>
                    <p>
                        Traditionally, the approach to solve the difficulties arising from this deployment into the unknown 
                        was to rely on a DOM library such as jQuery. Back in the early 2000's, the biggest problem 
                        JavaScript programmers were facing was different implementations of the DOM API - 
                        the functions which a browser provides to allow manipulation of the content of a web page. 
                        jQuery abstracted away these differences and provided a convenient way to manipulate 
                        the content of a page without caring about different DOM implementations. 
                        So why does "frontend bad, use jQuery" not cut it anymore?
                    </p>
                    <p>
                        The evolution of the JavaScript language through the work of TC39 has made a big leap in 2015, 
                        with the standardization of ES2015 (then still called ES6, but the year-based naming convention 
                        has been introduced since then). This version introduced a whole array of 
                        syntax changes to JavaScript. The problem with syntax changes, as opposed to API changes,
                        is that a JavaScript engine cannot parse and execute a file with unknown syntax. 
                        A call to an unknown API method can be mitigated by declaring the missing method manually, 
                        or checking for the existence of alternative methods. Changed syntax however breaks the program. 
                    </p>

                </section>

                <section>
                    <h2 id="babel">Babel.js</h2>

                    <p>
                        ES2015's syntax changes led to the introduction of compilers to the frontend build process. Using a compiler,
                        Developers can use new syntax and language features, compile their code down to a better supported older version, 
                        and release this version to their users.
                    </p>

                    <p>
                        Gatsby includes <a href="https://babeljs.io/">babel.js</a>, which is such a compiler for modern JavaScript. It takes JavaScript as input and produces JavaScript as output, 
                        transforming it during the process so that the resulting code can be executed by older browsers.
                    </p>

                    <p>
                        Babel.js works in three phases:
                    </p>

                    <ol>
                        <li>
                            parse JS source code into an Abstract Syntax Tree (AST)
                        </li>
                        <li>
                            perform transformations on the parsed AST
                        </li>
                        <li>
                            output target source code from the transformed AST
                        </li>
                    </ol>

                    <p>
                        These three functionalities are implemented via three different npm modules:
                    </p>

                    <ol>
                        <li>
                            <a href="https://babeljs.io/docs/en/next/babel-parser.html">@babel/parser</a> to parse JS source code into an AST
                        </li>
                        <li>
                            <a href="https://babeljs.io/docs/en/next/babel-traverse.html">@babel/traverse</a> to walk the AST and perform transformations on it
                        </li>
                        <li>
                            <a href="https://babeljs.io/docs/en/next/babel-generator.html">@babel/generator</a> to output the transformed AST as target code.
                        </li>
                    </ol>

                    <p>
                        All of these three modules are included in the <code>@babel/core</code> package. We just need to include <code>@babel/core</code>.
                        The relevant transformations are implemented individually as <a href="https://babeljs.io/docs/en/next/plugins">plugins</a>.
                    </p>

                </section>

                <section>

                    <h2>Parsing</h2>

                    <p>
                        The parser takes in source code and produces an Abstract Syntax Tree representation of it. Let's take an ES2015 arrow function expression
                        as an example.
                    </p>

                    <pre><code>
                        {`
var babel = require("@babel/core");
var arrowFnCode = "const square = (x) => x * 2";
var ast = babel.parse(arrowFnCode);

// this will parse the following JSON tree:

{
    "type": "VariableDeclaration",
    "kind": "const",
    "declarations": [
        {
            "id": {
                "identifierName": "square"
            },
            "name": "square"
        },
        {
            "type": "ArrowFunctionExpression",
            "params": [
                {
                    "type": "Identifier",
                    "name": "x"
                }
            ],
            "body": {
                "type": "BinaryExpression",
                "left": {
                    "type": "Identifier",
                    "name": "x"
                },
                "operator": "*",
                "right": {
                    "type": "NumericLiteral",
                    "value": 2
                }
            }
        }
    ]
}
                        `}
                    </code></pre>

                </section>

                <section>
                    <h2>Transformation</h2>

                    <p>
                        After parsing the source code into an AST, babel will 
                        traverse the tree and perform transformations on it. In order to instruct babel.js 
                        to transform a certain piece of code, we need to load the relevant <a href="https://babeljs.io/docs/en/next/plugins">plugin</a>.
                    </p>

                    <p>
                        For example, we can instruct babel to transform ES2015 arrow functions into standard JS functions:
                    </p>

                    <pre><code>
                        {`
var babel = require("@babel/core");
var arrowFnCode = "const square = (x) => x * 2";

var res = babel.transform(arrowFnCode, {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});

// res.code will be:
const square = function (x) {
    return x * 2;
};
                        `}
                    </code></pre>

                    <p>
                        Since specifying every single transformation indvidually would be pretty cumbersome,
                        babel.js introduced the concept of <a href="https://babeljs.io/docs/en/next/presets">presets</a>, which 
                        include a series of relevant plugins.
                    </p>

                </section>
            


            </Article>
        );
    }


}
