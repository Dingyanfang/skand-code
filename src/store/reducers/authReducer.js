import * as actionTypes from '../actions';

const initialState = {
    token: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                token: action.token
            }
    }
    return state;
}

export default reducer;