import React, { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { BrowserRouter as Router, Route, Switch, Link, useHistory, Redirect } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions';

export default function LogOut() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(logout())
    }, [])
    return <Redirect to="/" />
}
