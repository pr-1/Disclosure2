import { AUTHENTICATE, LOGOUT, VALIDATE } from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    email: null,
    phone: null,
    fname: null,
    lname: null,
    postcode: null,
    imageUri: null,
    tokenChecked: false,
    dob: null,
    gender: null,
    mailingList: false,
    expires: null

};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                email: action.email,
                phone: action.phone,
                fname: action.fname,
                lname: action.lname,
                postcode: action.postcode,
                imageUri: action.imageUri,
                tokenValid: true,
                dob: action.dob,
                gender: action.gender,
                mailingList: action.mailingList,
                expires: action.expires
            }
        case LOGOUT:
            return initialState;

        case VALIDATE:
            return {
                ...state,
                tokenValid: action.valid
            }

        default:
            return state;
    }
};