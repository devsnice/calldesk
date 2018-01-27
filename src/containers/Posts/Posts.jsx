import React, { Component } from 'react';

import postStoreService from '../../services/postsStoreService';

class Posts extends Component {
  render() {
    console.log(postStoreService.getAll());

    return <div>Posts</div>;
  }
}

export default Posts;
