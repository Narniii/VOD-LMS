import axios from 'axios';
export const GET_USER = 'GET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const TIMER = 'TIMER'


const emptyUser = {
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
    user_ssid:" "
}
export const getuser = () => {
    const localtoken = localStorage.getItem("accessToken")
    if (localtoken != undefined || localtoken != null) {
        try {
            return async dispatch => {
                const response = await axios.post("https://api.aqua.ir:8283/user/check-token/", {
                    token: localtoken,
                })
                let information = {}
                if (response.data.message == "Valid token") {
                    information = response.data.data
                    information.accessToken = localtoken
                    information.isLoggedIn = true
                    dispatch({
                        type: GET_USER,
                        payload: information
                    });
                } else {
                    dispatch({
                        type: GET_USER,
                        payload: emptyUser
                    });
                }
            };
        } catch (error) {
            // Add custom logic to handle errors
            console.log(error);
        }
    }
    else return async dispatch => {
        dispatch({
            type: GET_USER,
            payload: emptyUser
        });
    }
};
export const logout = () => {
    localStorage.clear()
    return async dispatch => {
        dispatch({
            type: LOGOUT_USER,
            payload: emptyUser
        });
    }
}

export const timer = (time) => {
    return async dispatch => {
        dispatch({
            type: TIMER,
            payload: time
        });
    }
}