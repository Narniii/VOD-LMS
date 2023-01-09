import { GET_USER } from './actions';
import { LOGOUT_USER } from './actions';
const initialState = {
    email: '',
    image_url: '',
    phone_number: '',
    user_group: '',
    user_id: undefined,
    user_points: undefined,
    username: '',
    accessToken: '',
    isLoggedIn: false,
    first_name: '',
    last_name: '',
    user_ssid: '',
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return { ...state, globalUser: action.payload };
        case LOGOUT_USER:
            return { ...state, globalUser: action.payload };
        default:
            return state;
    }
}

export default userReducer;