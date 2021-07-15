import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from "../constants/post";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS_SUCCESS:
      return { ...state, posts: payload, postLoading: false };

    case GET_POSTS_FAILED:
      return { ...state, posts: [], postLoading: false };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };

      case FIND_POST:
        return { ...state, post: payload }
  
      case UPDATE_POST:
        const newPosts = state.posts.map(post =>
          post._id === payload._id ? payload : post
        )
  
        return {
          ...state,
          posts: newPosts
        }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    default:
      return state;
  }
};
