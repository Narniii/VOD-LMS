import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../utils/utils';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CloseIcon from '@mui/icons-material/Close';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    appbarContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '10px 0px',
        "@media (max-width:576px)": {
            display: 'none'
        }
    },
    barTabs: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 600,
        paddingTop: 15,
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: '#64c5ba'
        },
        "@media (min-width: 1000px)": {
            fontSize: '20px',
        },

    },
    navlogo: {
        position: 'absolute',
        width: '130px',
        marginLeft: ' auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        top: 2,
        zIndex: 1
    },
    navbarWrapper: {
        backgroundColor: '#1a2335',
        height: '10vh',
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
    Mobilenavlogo: {
        width: '40%',
    },
    mobileBarTabs: {
        display: 'block',
        textAlign: 'center',
        fontWeight: 600,
        fontSize: '20px',
        margin: '10px',
        color: 'black',
        textDecoration: 'none',
        '&:hover': {
            color: '#64c5ba'
        },
        "@media (min-width: 1000px)": {
            fontSize: '20px',
        },

    }
}));

export default function Navbar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });
    const { globalUser } = useSelector(state => state.userReducer)
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
        <section>
            <div style={{ width: '100%', backgroundColor: '#1a2335' }}>
                {/* navbar */}
                <div className='container'>

                    <div className={classes.appbarContainer}>
                        {globalUser != undefined ?
                            <>
                                {globalUser.isLoggedIn === true ?
                                    <>
                                        <Link className={classes.barTabs} to="/welcome">داشبورد</Link>
                                        <Link className={classes.barTabs} to="/logout">خروج</Link>
                                    </>
                                    :
                                    <>
                                        <Link className={classes.barTabs} to="/login">ورود</Link>
                                        <Link className={classes.barTabs} to="/signup">عضویت</Link>
                                    </>
                                }
                            </>
                            :
                            <>
                                <Link className={classes.barTabs} to="/login">ورود</Link>
                                <Link className={classes.barTabs} to="/signup">عضویت</Link>
                            </>

                        }
                        <Link className={classes.barTabs} to="/academy">آکادمی</Link>
                        <Link className={classes.barTabs} to="/">
                            <img src={PUBLIC_URL('images/logo.svg')} className={classes.navlogo} />
                        </Link>
                        <Link className={classes.barTabs} to="/blog">وبلاگ</Link>
                        <Link className={classes.barTabs} to="/about-us">درباره ما</Link>
                        <Link className={classes.barTabs} to="/contact-us">تماس با ما</Link>
                    </div>
                </div>

                <div className={classes.navbarWrapper} >
                    <div className='text-center' style={{ width: '100%' }}>
                        <Link to="/">
                            <img
                                className={classes.navlogo}
                                src={PUBLIC_URL("images/academy/logoaqua.svg")}
                            />
                        </Link>
                    </div>
                    <MenuIcon
                        onClick={toggleDrawer('right', true)}
                        className={classes.menu}
                        style={{ fontSize: '30px', color: 'white' }}
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
                        <div style={{ marginTop: '40px' }}>
                            <Link className={classes.mobileBarTabs} to="/">
                                <img src={PUBLIC_URL('images/academy/logoaqua.svg')} className={classes.Mobilenavlogo} />
                            </Link>
                            <div style={{ marginTop: '20px' }}>
                                {globalUser.isLoggedIn ?
                                    <Link onClick={toggleDrawer('right', false)} className={classes.mobileBarTabs} to="/welcome">داشبورد</Link>
                                    :
                                    <>
                                        <Link onClick={toggleDrawer('right', false)} className={classes.mobileBarTabs} to="/signup">عضویت</Link>
                                        <Link onClick={toggleDrawer('right', false)} className={classes.mobileBarTabs} to="/login">ورود</Link>
                                    </>
                                }
                                <Link onClick={toggleDrawer('right', false)} className={classes.mobileBarTabs} to="/contact-us">تماس با ما</Link>
                                <Link onClick={toggleDrawer('right', false)} className={classes.mobileBarTabs} to="/about-us">درباره ما</Link>
                                <Link onClick={toggleDrawer('right', false)} className={classes.mobileBarTabs} to="/blog">وبلاگ</Link>
                                <Link onClick={toggleDrawer('right', false)} className={classes.mobileBarTabs} to="/academy">آکادمی</Link>
                                <Link onClick={toggleDrawer('right', false)} className={classes.mobileBarTabs} to="/logout">خروج</Link>
                                <div className="text-center" style={{ marginTop: '30px' }}>
                                    <a href="https://t.me/aquadex" target="_blank" rel="noreferrer">
                                        <TelegramIcon style={{ fontSize: '40px', color: '#64c5ba' }} />
                                    </a>
                                    <a href="https://instagram.com/aquaex?utm_medium=copy_link" target="_blank" rel="noreferrer">
                                        <InstagramIcon style={{ fontSize: '40px', color: '#64c5ba' }} />
                                    </a>
                                    <a href="https://twitter.com/aquaex?s=11" target="_blank" rel="noreferrer">
                                        <TwitterIcon style={{ fontSize: '40px', color: '#64c5ba' }} />
                                    </a>
                                    <a href="https://www.youtube.com/c/aquaDEFI" target="_blank" rel="noreferrer">
                                        <YouTubeIcon style={{ fontSize: '40px', color: '#64c5ba' }} />
                                    </a>
                                    <a href="https://www.linkedin.com/company/aqua/" target="_blank" rel="noreferrer">
                                        <LinkedInIcon style={{ fontSize: '40px', color: '#64c5ba' }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwipeableDrawer>
                </div >
            </div>
        </section>
    )
}
