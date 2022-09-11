import React, { useReducer, useContext, useState } from "react";
import sublinks from "../utils/data";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  CREATE_HEALTH_POST_BEGIN,
  CREATE_HEALTH_POST_SUCCESS,
  CREATE_HEALTH_POST_ERROR,
  CREATE_EVENT_BEGIN,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  GET_POST_BEGIN,
  GET_POST_SUCCESS,
  GET_HEALTH_POST_BEGIN,
  GET_HEALTH_POST_SUCCESS,
  DELETE_POST_BEGIN,
  EDIT_POST_BEGIN,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  SET_EDIT_HEALTH_POST,
  DELETE_HEALTH_POST_BEGIN,
  EDIT_HEALTH_POST_BEGIN,
  EDIT_HEALTH_POST_SUCCESS,
  EDIT_HEALTH_POST_ERROR,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  CREATE_REQUEST_BEGIN,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_ERROR,
  GET_REQUEST_BEGIN,
  GET_REQUEST_SUCCESS,
  DELETE_REQUEST_BEGIN,
  GET_EVENTS_BEGIN,
  GET_EVENTS_SUCCESS,
  SET_EDIT_EVENT,
  DELETE_EVENT_BEGIN,
  EDIT_EVENT_BEGIN,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_ERROR,
  CREATE_POSITION_BEGIN,
  CREATE_POSITION_SUCCESS,
  CREATE_POSITION_ERROR,
} from "./actions";
import axios from "axios";

import reducer from "./reducer";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userPosition = localStorage.getItem("position");
export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  leader: null,
  token: token,
  userPosition: userPosition || "",
  isEditing: false,
  editHealthId: "",
  healthTitle: "",
  healthDesc: "",
  showSidebar: false,
  posts: [],
  events: [],
  totalEvents: 0,
  numOfEventsPages: 1,
  editEventId: "",
  totalPost: 0,
  numOfpages: 1,
  page: 1,
  healthPosts: [],
  totalHealthPost: 0,
  numOfHealthPages: 1,
  search: "",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  name: "",
  phone: "",
  email: "",
  day: "",
  message: "",
  purposeOptions: ["prayer", "baptism", "membership", "wedding"],
  purpose: "prayer",
  requests: [],
  totalRequests: 0,
  numOfRequestPages: 1,
  searchPurpose: "all",
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [page, setPage] = useState({ page: "", links: [] });
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSubmenu = (text, coordinates) => {
    const page = sublinks.find((link) => link.page === text);
    setPage(page);
    setIsSubmenuOpen(true);
    setLocation(coordinates);
  };
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, position }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("position", position);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("position");
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  /****************************************** USER *********************************** */

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token, position } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
          position,
        },
      });
      addUserToLocalStorage({ user, token, position });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, position } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, position },
      });

      addUserToLocalStorage({ user, token, position });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, position, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, position, token },
      });
      addUserToLocalStorage({ user, position, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  /**********************************************POSTS ******************************************* */

  const createPost = async (currentPost) => {
    dispatch({ type: CREATE_POST_BEGIN });
    try {
      await authFetch.post("/posts", currentPost);
      dispatch({ type: CREATE_POST_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getPosts = async () => {
    const { page, search, sort } = state;
    let url = `/api/v1/posts?page=${page}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_POST_BEGIN });
    try {
      const { data } = await axios.get(url);
      const { posts, totalPost, numOfpages } = data;

      dispatch({
        type: GET_POST_SUCCESS,
        payload: {
          posts,
          totalPost,
          numOfpages,
        },
      });
    } catch (error) {
      console.log(error);
    }

    clearAlert();
  };

  const editPost = async (postId, currentPost) => {
    dispatch({ type: EDIT_POST_BEGIN });

    try {
      await authFetch.patch(`/posts/${postId}`, { currentPost });

      dispatch({ type: EDIT_POST_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deletePost = async (postId) => {
    dispatch({ type: DELETE_POST_BEGIN });
    try {
      await authFetch.delete(`/posts/${postId}`);
      getPosts();
    } catch (error) {
      console.log(error);
      logoutUser();
    }
  };
  /********************************************** POSTS END******************************************* */
  /********************************************** HEALTH POSTS ******************************************* */
  const createHealthPost = async () => {
    dispatch({ type: CREATE_HEALTH_POST_BEGIN });
    try {
      const { healthTitle, healthDesc } = state;

      await authFetch.post("/health", {
        healthTitle,
        healthDesc,
      });

      dispatch({ type: CREATE_HEALTH_POST_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_HEALTH_POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getHealthPost = async () => {
    const { search, sort, page } = state;
    let url = `/api/v1/health?page=${page}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_HEALTH_POST_BEGIN });
    try {
      const { data } = await axios.get(url);
      const { healthPosts, totalHealthPost, numOfHealthPages } = data;
      dispatch({
        type: GET_HEALTH_POST_SUCCESS,
        payload: {
          healthPosts,
          totalHealthPost,
          numOfHealthPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const setEditHealthPost = (id) => {
    dispatch({ type: SET_EDIT_HEALTH_POST, payload: { id } });
  };

  const editHealth = async () => {
    dispatch({ type: EDIT_HEALTH_POST_BEGIN });
    try {
      const { healthTitle, healthDesc } = state;

      await authFetch.patch(`/health/${state.editHealthId}`, {
        healthTitle,
        healthDesc,
      });
      dispatch({ type: EDIT_HEALTH_POST_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_HEALTH_POST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteHealthPost = async (healthPostId) => {
    dispatch({ type: DELETE_HEALTH_POST_BEGIN });
    try {
      await authFetch.delete(`/health/${healthPostId}`);
      getHealthPost();
    } catch (error) {
      logoutUser();
    }
  };

  /************************************ EVENTS ********************************* */

  const createEvent = async (currentEvent) => {
    dispatch({ type: CREATE_EVENT_BEGIN });
    try {
      await authFetch.post("/events", currentEvent);
      dispatch({ type: CREATE_EVENT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_EVENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getEvents = async () => {
    let url = `/api/v1/events`;
    dispatch({ type: GET_EVENTS_BEGIN });

    try {
      const { data } = await axios.get(url);
      const { events, totalEvents, numOfEventsPages } = data;

      dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: {
          events,
          totalEvents,
          numOfEventsPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };
  const setEditEvent = (id) => {
    dispatch({ type: SET_EDIT_EVENT, payload: { id } });
  };
  const editEvent = async (eventId, event) => {
    dispatch({ type: EDIT_EVENT_BEGIN });

    try {
      await authFetch.patch(`events/${eventId}`, { event });
      dispatch({ type: EDIT_EVENT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_EVENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteEvent = async (eventId) => {
    dispatch({ type: DELETE_EVENT_BEGIN });
    try {
      await authFetch.delete(`events/${eventId}`);
      getEvents();
    } catch (error) {
      loginUser();
    }
  };
  /************************************ EVENT END********************************* */
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  /************************************ REQUEST START********************************* */
  const createRequest = async () => {
    dispatch({ type: CREATE_REQUEST_BEGIN });

    try {
      const { name, date, phone, purpose, email, message } = state;

      await axios.post("/api/v1/contact", {
        name,
        date,
        phone,
        purpose,
        email,
        message,
      });
      dispatch({ type: CREATE_REQUEST_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      dispatch({
        type: CREATE_REQUEST_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getRequests = async () => {
    const { searchPurpose, page, sort } = state;
    let url = `/contact?page=${page}&purpose=${searchPurpose}&sort=${sort}`;

    dispatch({ type: GET_REQUEST_BEGIN });

    try {
      const { data } = await authFetch(url);
      const { requests, totalRequests, numOfRequestPages } = data;
      dispatch({
        type: GET_REQUEST_SUCCESS,
        payload: {
          requests,
          totalRequests,
          numOfRequestPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      loginUser();
    }
    clearAlert();
  };

  const deleteRequest = async (requestId) => {
    dispatch({ type: DELETE_REQUEST_BEGIN });
    try {
      await authFetch.delete(`/contact/${requestId}`);
      getRequests();
    } catch (error) {
      loginUser();
    }
  };

  /************************************ REQUEST END********************************* */
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const createPosition = async (currentLeader) => {
    console.log(currentLeader);
    dispatch({ type: CREATE_POSITION_BEGIN });
    try {
      const response = await authFetch.post("/position", currentLeader);
      console.log(response);
      const { leader } = response.data;
      dispatch({ type: CREATE_POSITION_SUCCESS, payload: leader });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_POSITION_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        authFetch,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createPost,
        createHealthPost,
        createEvent,
        getPosts,
        getHealthPost,
        deletePost,
        editPost,
        setEditHealthPost,
        deleteHealthPost,
        editHealth,
        clearFilters,
        changePage,
        createRequest,
        getRequests,
        deleteRequest,
        getEvents,
        setEditEvent,
        deleteEvent,
        editEvent,
        createPosition,
        closeSubmenu,
        openSubmenu,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        isSidebarOpen,
        location,
        page,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
