import { createStore, applyMiddleware, compose } from 'redux';
import {connect} from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import {fakeGet} from './fakeFetch';

const rootReducer = combineReducers({
  posts: (state = [], action) => {
    if (action.type === 'SET_POSTS') {
      return action.posts;
    }
    if (action.type === 'ADD_POST') {
      // state.unshift(action.post);
      // return state;
      return [
        action.post,
        ...state,
      ];
    }
    return state;
  }
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
 );



import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Posts from './Posts';
import Postform from './Postform';
import './App.css';

class App_notConnected extends Component {
  render() {
    return (
      <div>
        <Postform
          createPost={this.props.createPost}
        />
        <hr />
        <Posts
          fetchPosts={this.props.fetchPosts}
          posts={this.props.posts}
        />
      </div>
    )
  }
}

const App = connect(
  ({posts}) => {
    return {
      posts,
    };
  },
  {
    fetchPosts: () => async (dispatch) => {
      const posts = await fakeGet();
      dispatch({
        type: 'SET_POSTS',
        posts,
      })
    },
    createPost: (post) => {
      return (dispatch) => {
        dispatch({
          type: 'ADD_POST',
          post
        })
      }
    },
  },
)(App_notConnected);

export default () => <Provider store={store}><App /></Provider>;

window.reduxStore = store;