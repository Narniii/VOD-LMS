import React, { createContext, useState } from 'react';


export const CurrentUserContext = createContext();

const CurrentUserContextProvider = (props) => {

    const [globalUser, setGlobalUser] = useState({
        email: '',
        image_url: '',
        phone_number: '',
        user_group: '',
        user_id: undefined,
        user_points: undefined,
        username: '',
        accessToken: '',
        refreshToken: '',
        isLoggedIn: false,
    });

    const checkTokenFiller = (user, access, refresh) => {
        let uu = user
        uu.email = user.email;
        uu.image_url = user.image_url
        uu.phone_number = user.phone_number
        uu.user_group = user.user_group
        uu.user_id = user.user_id
        uu.user_points = user.user_points
        uu.username = user.username
        uu.accessToken = access
        uu.refreshToken = refresh
        uu.isLoggedIn = true
        setGlobalUser(uu)
    }
    const logoutHadler = () => {
        localStorage.clear()
        setGlobalUser({
            email: '',
            image_url: '',
            phone_number: '',
            user_group: '',
            user_id: undefined,
            user_points: undefined,
            username: '',
            accessToken: '',
            refreshToken: '',
            isLoggedIn: false,
        });
    }
    return (
        <CurrentUserContext.Provider value={{ globalUser, checkTokenFiller, logoutHadler }}>
            {props.children}
        </CurrentUserContext.Provider>
    )
}
export default CurrentUserContextProvider
