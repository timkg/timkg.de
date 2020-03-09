import React, { Component } from "react";

var DataSource = {
    
    blogPosts: {
        listeners: [],
        data: {}
    },

    getBlogPost(id) {

        if (!this.blogPosts.data[id]) {
            this.blogPosts.data[id] = {
                title: null,
                body: null
            }

            setTimeout(() => {
                this.blogPosts.data[id] = {
                    title: `Blog Post #${id}`,
                    body: `Lorem? Ipsum!`
                }
                this.blogPosts.listeners.forEach(listener => {
                    listener();
                })
            }, 1000);

        }

        return this.blogPosts.data[id];
    },

    comments: {
        listeners: [],
        data: []
    },
    
    getComments() {

        if (this.comments.data.length < 4) {
            setTimeout(() => {
                this.comments.data.push(`Comment number ${this.comments.data.length + 1}`);
                this.comments.listeners.forEach(listener => {
                    listener(this.comments.data);
                })
            }, 1000);
        }

        return this.comments.data;
    },

    addChangeListener(fn, topic = "comments") {
        this[topic].listeners.push(fn);
    },

    removeChangeListener(fn, topic = "comments") {
        this[topic].listeners = this[topic].listeners.filter(listener => listener !== fn)
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
                <BlogPost id="1" />
                {this.state.comments.map((comment) => (
                    <Comment key={comment.replace(" ", "-")} comment={comment} />
                ))}
            </div>
        );
    }

}

class BlogPost extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        }

    }

    componentDidMount() {
        DataSource.addChangeListener(this.handleChange, "blogPosts");
    }

    componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange, "blogPosts");
    }

    handleChange() {
        this.setState({
            blogPost: DataSource.getBlogPost(this.props.id)
        });
    }

    render() {
        return (
            <div>
                <h2>{this.state.blogPost.title ? this.state.blogPost.title : "loading..."}</h2>
                <p>{this.state.blogPost.body}</p>
            </div>
        );
    }

}
