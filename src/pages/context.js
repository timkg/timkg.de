import React, { Component } from "react";

const loggedOutUser = {
    loggedIn: false
}

const UserContext = React.createContext(loggedOutUser);

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: loggedOutUser
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                user: {
                    username: "timkg"
                }
            })
        }, 1000);
    }

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                <Stuff>
                    <ContextExample></ContextExample>
                </Stuff>
            </UserContext.Provider>
        );
    }
}

function Stuff (props) {
    return (
        <div>{props.children}</div>
    );
}

class ContextExample extends Component {

    render() {
        return (
            <div>
                <p>UserContext</p>
                <p>{JSON.stringify(this.context, null, 2)}</p>
            </div>
        );
    }

}

ContextExample.contextType = UserContext;
