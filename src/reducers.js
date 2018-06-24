import { combineReducers } from "redux";
import {
  SELECT_SEARCH,
  INVALIDATE_SEARCH,
  REQUEST_RECIPES,
  RECEIVE_RECIPES
} from "./actions";

function selectedSearch(state = "omelet", action) {
  switch (action.type) {
    case SELECT_SEARCH:
      return action.subreddit;
    default:
      return state;
  }
}

function recipes(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SEARCH:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_RECIPES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_RECIPES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.recipes,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function recipesByTerm(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SEARCH:
    case RECEIVE_RECIPES:
    case REQUEST_RECIPES:
      return Object.assign({}, state, {
        [action.subreddit]: recipes(state[action.subreddit], action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  recipesByTerm,
  selectedSearch
});

export default rootReducer;
