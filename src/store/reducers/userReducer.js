import * as actionTypes from '../actions';

const initialState = {
    users: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERLIST:
            return {
                ...state,
                user: action.users
            }
        
    }
    return state;
}

export default reducer;