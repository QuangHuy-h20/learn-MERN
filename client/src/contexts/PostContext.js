import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiURL } from "./constants";
import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  FIND_POST,
} from "../constants/post";
import axios from "axios";

export const PostContext = createContext();
const PostContextProvider = ({ children }) => {
  //State
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postLoading: true,
  });

  const [showModal, setShowModal] = useState(false);
	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  //Get all posts

  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiURL}/posts`);
      if (response.data.success) {
        dispatch({ type: GET_POSTS_SUCCESS, payload: response.data.posts });
      }
    } catch (error) {
      dispatch({ type: GET_POSTS_FAILED, error: error.response.data });
    }
  };

  //Add post

  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiURL}/posts`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  	// Find post when user is updating post
	const findPost = postId => {
		const post = postState.posts.find(post => post._id === postId)
		dispatch({ type: FIND_POST, payload: post })
	}

  // Update post
	const updatePost = async updatedPost => {
		try {
			const response = await axios.put(
				`${apiURL}/posts/${updatedPost._id}`,
				updatedPost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE_POST, payload: response.data.post })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

  //Delete post

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiURL}/posts/${postId}`);
      if (response.data.success)
        dispatch({ type: DELETE_POST, payload: postId });
    } catch (error) {
      console.log(error);
    }
  };

  //Post context data
  const postContextData = {
    postState,
    getPosts,
    showModal,
    setShowModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
    showUpdatePostModal,
		setShowUpdatePostModal,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
