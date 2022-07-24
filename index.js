const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

// INITIAL STATE
const initialTodoState = {
  todos: [],
  isLoading: false,
  error: null,
};
// ALL VARIABLE
const TODO_LOADING = "TODO_LOADING";
const TODO_SUCCESS = "TODO_SUCCESS";
const TODO_FAILED = "TODO_FAILED";
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

// ACTIONS
const getRequest = () => {
  return {
    type: TODO_LOADING,
  };
};
const getTodoSuccess = (success) => {
  return {
    type: TODO_LOADING,
    payload: success,
  };
};
const getTodoFailed = (error) => {
  return {
    type: TODO_LOADING,
    payload: error,
  };
};
// ACTION REDUCER
const actionReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case TODO_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case TODO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// FETCH TODOS DATA
const fetchData = () => {
  return (dispatch) => {
    dispatch(getRequest());
    axios
      .get(TODOS_URL)
      .then((res) => {
        const todos = res.data;
        const title = todos.map((todo) => todo.title);
        dispatch(getTodoSuccess(title));
        // console.log(title);
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getTodoFailed(error));
        console.log(errorMessage);
      });
  };
};
// STORE
const store = createStore(actionReducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchData());

// REDUX PRACTIS
// INITIAL STATE
const initialState = {
  stock: ["salt", "sugar"],
  count: 2,
};

// ALL VARIABLE
const INCREMENT_STATE = "INCREMENT_STATE";
// const DECREMENT_STATE = "DECREMENT_STATE";
const RESET_STATE = "RESET_STATE";

// ACTION
const incrementAction = (data) => {
  return {
    type: INCREMENT_STATE,
    payload: data,
  };
};
// const decrementAction = (data) => {
//   return {
//     type: DECREMENT_STATE,
//   };
// };
const resetAction = () => {
  return {
    type: RESET_STATE,
  };
};

// ACTION REDUCER
const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_STATE:
      return {
        stock: [...state.stock, action.payload],
        count: state.count + 1,
      };
    case RESET_STATE:
      return {
        stock: [],
        count: 0,
      };
    default:
      return state;
  }
};
// const store = createStore(storeReducer);
// store.subscribe(() => {
//   console.log(store.getState());
// });
// store.dispatch(incrementAction("onion"));
// store.dispatch(incrementAction("hello"));
// store.dispatch(resetAction());
