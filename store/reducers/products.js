import {
  SET_COUNT,
  SET_PRODUCTS,
  CLEAR_PRODUCTS,
  SET_CATEGORIES,
} from "../actions/products";

const initialState = {
  availableProducts: [],
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
        categories: state.categories,
        count: state.count,
      };
    case CLEAR_PRODUCTS:
      return {
        availableProducts: initialState,
        categories: state.categories,
        count: initialState,
      };
    case SET_CATEGORIES:
      return {
        availableProducts: state.availableProducts,
        categories: action.categories,
        count: state.count,
      };
    case SET_COUNT:
      return {
        availableProducts: state.availableProducts,
        categories: state.categories,
        count: action.count,
      };
  }
  return state;
};
