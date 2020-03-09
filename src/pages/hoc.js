import React, { Component } from "react";

var DataSource = {

    listeners: [],
    
    blogPosts: {
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

                this.listeners.forEach(listener => {
                    listener();
                })
            }, 750);

        }

        return this.blogPosts.data[id];
    },

    comments: null,
    
    getComments() {

        if (!this.comments) {
            this.comments = { data: [] }

            setTimeout(() => {
                this.comments.data.push(`Comment number 1`);
                this.comments.data.push(`Comment number 2`);

                this.listeners.forEach(listener => {
                    listener();
                })
            }, 1500);
        }

        return this.comments.data;
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

class RepetitiveCommentList extends Component {

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

class RepetitiveBlogPost extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        }

    }

    componentDidMount() {
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
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

function withSubscription(WrappedComponent, selectData) {

    return class extends Component {

        constructor(props) {
            super(props);

            this.handleChange = this.handleChange.bind(this);

            this.state = {
                data: selectData(DataSource, props)
            }
        }

        componentDidMount() {
            DataSource.addChangeListener(this.handleChange);
          }
      
          componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
          }
      
          handleChange() {
            this.setState({
              data: selectData(DataSource, this.props)
            });
          }
      
          render() {
            return <WrappedComponent data={this.state.data} {...this.props} />;
          }

    }

}

class CommentList extends Component {

    render() {
        const comments = this.props.data;

        return (
            <div>
                {comments.map((comment) => (
                    <Comment key={comment.replace(" ", "-")} comment={comment} />
                ))}
            </div>
        );
    }

}

class BlogPost extends Component {

    render() {
        const { title, body } = this.props.data;

        return (
            <div>
                <h2>{title ? title : "loading..."}</h2>
                <p>{body}</p>
            </div>
        );
    }

}

const WrappedCommentList = withSubscription(
    CommentList,
    (DataSource) => {
        return DataSource.getComments();
    }
)

const WrappedBlogPost = withSubscription(
    BlogPost,
    (DataSource, props) => {
        return DataSource.getBlogPost(props.id);
    }
)



export default class HoCPage extends Component {
    render() {
        return (
            <div>
                <h2>Repetition</h2>
                <RepetitiveCommentList />
                <RepetitiveBlogPost id="1" />
                <h2>Wrapped</h2>
                <WrappedCommentList />
                <WrappedBlogPost id="2" />
            </div>
        );
    }
}
