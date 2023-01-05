import { SET_LOCATION } from "../actions/location";

const initialState = {
    lat : '0',
    long: '0'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATION:
            return {
                lat: action.lat,
                long: action.long,
            }

        default:
            return state;
    }
}
