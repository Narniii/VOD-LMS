import { makeStyles } from '@material-ui/core/styles';
import { PUBLIC_URL } from '../../../utils/utils';
import React, { useEffect, useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import UserDashboard from '../common/UserDashboard';

const useStyles = makeStyles((theme) => ({
    navbarWrapper: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        "@media (min-width:576px)": {
            display: 'none'
        }
    },
    menu: {
        alignItems: 'center',
        float: 'right',
        position: 'absolute',
        right: '5vw',
        top: '3vh',
    },
    logoContainer: {
        display: 'flex',
        flex: 100,
        justifyContent: "center",

    },
    navlogo: {
        width: '25%',
        top:2,
    },
}));
export default function Navbar(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    return (
        <div className={classes.navbarWrapper} >
            <div className='text-center' style={{ width: '100%' }}>
                <Link to="/">
                    <img
                        className={classes.navlogo}
                        src={PUBLIC_URL("images/logo.svg")}
                    />
                </Link>
            </div>
            <MenuIcon
                onClick={toggleDrawer('right', true)}
                className={classes.menu}
                style={{ fontSize: '30px' }}
            />

            <SwipeableDrawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >
                <div className='text-dark' style={{ width: '100vw' }}>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer('right', false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                {props.children}
            </SwipeableDrawer>
        </div >
    );
}
