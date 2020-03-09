import React, { Component } from "react";

var DataSource = {

    comments: [],

    listeners: [],
    
    getComments() {

        if (this.comments.length < 4) {
            setTimeout(() => {
                this.comments.push(`Comment number ${this.comments.length + 1}`);
                this.listeners.forEach(listener => {
                    listener(this.comments);
                })
            }, 1000);
        }

        return this.comments;
    },

    addChangeListener(fn) {
        this.listeners.push(fn);
    },

    removeChangeListener(fn) {
        this.listeners = this.listeners.filter(listener => listener !== fn)
    },
}

const Comment = (props) => {
    return <p>{props.comment}</p>;
}

export default class CommentList extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            comments: DataSource.getComments()
        }
    }

    componentDidMount() {
        DataSource.addChangeListener(this.handleChange)
    }

    componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange)
    }

    handleChange() {
        this.setState({
            comments: DataSource.getComments()
        })
    }

    render() {
        return (
            <div>
                {this.state.comments.map((comment) => (
                    <Comment key={comment.replace(" ", "-")} comment={comment} />
                ))}
            </div>
        );
    }

}
