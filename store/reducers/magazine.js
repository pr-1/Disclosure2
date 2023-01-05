import { GET_INFO } from "../actions/magazine";

const initialState = {
  newOffers: [],
  featuredCompanies: [],
  magazine: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO:
      return {
        newOffers: action.offers,
        featuredCompanies: action.featured,
        magazine: action.magazine,
      };
  }
  return state;
};
