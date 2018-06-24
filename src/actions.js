import fetch from "cross-fetch";

export const REQUEST_RECIPES = "REQUEST_RECIPES";
export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const SELECT_SEARCH = "SELECT_SEARCH";
export const INVALIDATE_SEARCH = "INVALIDATE_SEARCH";

export function selectSearch(subreddit) {
  return {
    type: SELECT_SEARCH,
    subreddit
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SEARCH,
    subreddit
  };
}

function requestRecipes(term) {
  return {
    type: REQUEST_RECIPES,
    term
  };
}

function receiveRecipes(subreddit, json) {
  return {
    type: RECEIVE_RECIPES,
    subreddit,
    recipes: json.results,
    receivedAt: Date.now()
  };
}

function fetchRecipes(term) {
  return dispatch => {
    dispatch(requestRecipes(term));
    return fetch(`http://www.recipepuppy.com/api/?q=${term}`)
      .then(response => response.json())
      .then(json => dispatch(receiveRecipes(term, json)));
  };
}

function shouldfetchRecipes(state, term) {
  const recipes = state.recipesByTerm[term];
  if (!recipes) {
    return true;
  } else if (recipes.isFetching) {
    return false;
  } else {
    return recipes.didInvalidate;
  }
}

export function fetchRecipesIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldfetchRecipes(getState(), subreddit)) {
      return dispatch(fetchRecipes(subreddit));
    }
  };
}
