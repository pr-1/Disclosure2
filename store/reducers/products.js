import {
  SET_COUNT,
  SET_PRODUCTS,
  CLEAR_PRODUCTS,
  SET_CATEGORIES,
  SET_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS,
} from "../actions/products";

const initialState = {
  availableProducts: [],
  searchResults: [],
  categories: [],
  count: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      let newPayload;

      if (action.clear) {
        //search value declared -  show only search results
        newPayload = action.products;
      } else {
        if (state.availableProducts.length > 0) {
          const newArr = state.availableProducts.concat(action.products);
          const idPositions = newArr.map((el) => el.id);
          newPayload = newArr.filter((item, pos, arr) => {
            return idPositions.indexOf(item.id) === pos;
          });
        } else {
          newPayload = action.products;
        }
      }

      return {
        availableProducts: newPayload,
        searchResults: state.searchResults,
        categories: state.categories,
        count: state.count,
      };
    case CLEAR_PRODUCTS:
      return {
        availableProducts: initialState.availableProducts,
        searchResults: state.searchResults,
        categories: state.categories,
        count: initialState.count,
      };
    case SET_CATEGORIES:
      return {
        availableProducts: state.availableProducts,
        searchResults: state.searchResults,
        categories: action.categories,
        count: state.count,
      };
    case SET_COUNT:
      return {
        availableProducts: state.availableProducts,
        searchResults: state.searchResults,
        categories: state.categories,
        count: action.count,
      };
    case SET_SEARCH_RESULTS:
      let searchPayload;
      if (action.clear) {
        //search value declared -  show only search results
        searchPayload = action.products;
      } else {
        if (state.searchResults.length > 0) {
          const newArr = state.searchResults.concat(action.products);
          const idPositions = newArr.map((el) => el.id);
          searchPayload = newArr.filter((item, pos, arr) => {
            return idPositions.indexOf(item.id) === pos;
          });
        } else {
          searchPayload = action.products;
        }
      }
      return {
        availableProducts: state.availableProducts,
        searchResults: searchPayload,
        categories: state.categories,
        count: state.count,
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        availableProducts: state.availableProducts,
        searchResults: initialState.searchResults,
        categories: state.categories,
        count: state.count,
      };
  }
  return state;
};
