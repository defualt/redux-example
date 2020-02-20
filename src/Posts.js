import React, { Component } from 'react';

class Posts extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;
    const postItems = posts && posts.map(p => (
      <div key={p.title}>
        <h3>{p.title}</h3>
        <p>{p.body}</p>
      </div>
    ))
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    )
  }
}

export default Posts;