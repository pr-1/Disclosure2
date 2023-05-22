import { GET_INFO } from "../actions/magazine";

const initialState = {
  newOffers: [],
  magazine: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO:
      return {
        newOffers: action.offers,
        magazine: action.magazine,
      };
  }
  return state;
};
