import React, { Component } from "react"

export default class CompilationPage extends Component {

    render() {
        return (
            <article>
                <h1>Compilation? Isn't this JavaScript?</h1>
                <p>
                    JavaScript was designed to be embedded in HTML pages. A web developer writes
                    JS and embeds it directly in the HTML via script tags. It is 
                    the responsibility of the browser vendors to implement a JS interpreter, which
                    loads and executes the JS code embedded in a page.
                    So why do we as web developers have to care about JS compilation, suddenly?
                </p>
                <h2>The evolution of JavaScript and its implications</h2>
                <p>
                    JavaScript is a continually evolving language. TC39 is the steering committee 
                    which proposes new syntax and other constructs. These proposals go through 
                    various stages of refinement, potentially ending in stage 4 - accepted. 
                    The set of proposals which reached stage 4 during a given calendar year is 
                    later standardized as a new version of JavaScript, named after the given calendar year.
                </p>
                <p>
                    The body responsible for the specification (not the proposal management process, that's TC39) 
                    is ECMA, the European Computer Manufacturers Association. That's why the official name of JavaScript 
                    is actually ECMAScript, ES for short. The official specifications of JavaScript are named ES2015, ES2016, etc.
                </p>
                <p>
                    Why do we, as programmers using the JavaScript language, care about the processes and organisations 
                    which drive the evolution of the language? We need to care because there is a mismatch between the 
                    development of the language on one side and the devices on which our code gets executed on the other side.
                </p>

                <h2>Deploying into the unknown</h2>
                <p>
                    The frontend code we write is not executed on machines under our control. While we might write code on a machine running 
                    a modern JavaScript engine which understands all of the modern syntax and implements all of the modern APIs, 
                    this code is not written for us, but for our users. It is delivered together with the website it enriches, 
                    or the web app it enables, and executed on a device with unknown form factor and unknown JavaScript engine. 
                </p>
                <p>
                    Traditionally, the approach to solve the difficulties arising from this deployment into the unknown was to rely on a DOM library such as jQuery. 
                    Back in the early 2000's, the biggest problem JavaScript programmers were facing was different implementations of the DOM API - 
                    the functions which a browser provides to allow manipulation of the content of a web page. 
                    jQuery abstracted away these differences and provided a convenient way to manipulate the content of a page without
                    caring about different DOM implementations. So why don't we just rely on jQuery anymore?
                </p>
                <p>
                    The evolution of the JavaScript language through the work of TC39 has made a big leap in 2015, 
                    with the release of ES2015 (then still called ES6, but the year-based naming convention has been introduced since then). 
                    This release introduced a whole array of syntax changes to JavaScript. The problem with syntax changes, 
                    as opposed to API changes, is that a JavaScript engine cannot parse and execute a file with unknown syntax. 
                    A call to an unknown API method can be mitigated by declaring the missing method manually, 
                    or checking for the existence of alternative methods. Changed syntax however breaks the program. 
                </p>

                <h2>Compilers</h2>
                <p>
                    ES2015 introduced a lot of new syntax to JavaScript. New syntax can't be worked around like API inconsistencies. 
                    This led to the introduction of compilers to the frontend build process. A compiler is a piece of software 
                    which takes code as input and produces another representation of the code as output, while keeping 
                    the intended functionality. It can be understood as a translator, making sure that the programmer's 
                    intent and the functionality of the code can be understood by other people and machines.
                </p>
                <p>
                    Babel.js is a compiler for modern JavaScript. It takes JavaScript as input and produces JavaScript as output, 
                    transforming it during the process so that the resulting code can be executed by older browsers. 
                    In this chapter, we'll get acquinted with babel.js and explore some of the transformations it performs to make modern 
                    JavaScript executable on older JS engines.
                </p>

            </article>
        );
    }


}
