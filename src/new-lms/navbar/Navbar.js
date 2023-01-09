import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux'
import '../style/home.css'
import Search from './Search';
import { SwipeableDrawer, Typography } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import DashBoardMenu from '../dashboard/DashBoardMenu';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    wrapper: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        paddingTop: '10px',
        [theme.breakpoints.down('xs')]: {
            height: "90vh",
            display: 'block',
            height: '100vh',
            background: "#2f3835",
            width: '80vw'
        },
        [theme.breakpoints.between("sm", "md")]: {
            height: "90vh",
            display: 'block',
            height: '100vh',
            background: "#2f3835",
            width: '50vw'
        },
        [theme.breakpoints.up('md')]: {
            width: 'inherit',
            height: 'inherit'
        },
    },
}));
export default function Navbar({ submenu }) {
    const classes = useStyles();
    const { globalUser } = useSelector(state => state.userReducer)
    const [tempUser, setTempUser] = React.useState(false)
    React.useEffect(() => {
        if (window.location.pathname === '/' || window.location.pathname.indexOf('courses') !== -1) {
            window.addEventListener("scroll", changeCss, false)
            window.addEventListener("scroll", changeCss, true)
        }
        else {
            var navElement = document.getElementById("AppBar");
            if (navElement != null && navElement !== undefined) {
                window.removeEventListener("scroll", changeCss, false)
                window.removeEventListener("scroll", changeCss, true)
                navElement.style.backgroundColor = "#2f3835";
            }
        }
    }, [window.location.pathname])
    function changeCss() {
        var navElement = document.getElementById("AppBar");
        if (navElement != null && navElement !== undefined) {
            this.scrollY < 100 ? navElement.style.boxShadow = "inherit" : navElement.style.boxShadow = "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)";
            this.scrollY < 100 ? navElement.style.backgroundColor = "inherit" : this.scrollY < 600 ? navElement.style.backgroundColor = "#144047" : this.scrollY < 1300 ? navElement.style.backgroundColor = "#0D2D3E" : navElement.style.backgroundColor = "#144047";
        }
    }
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
        <nav id='AppBar' style={{ flexGrow: 1, position: "relative", width: "100%", height: "80px", position: "fixed", boxShadow: "inherit", zIndex: "3", transition: "800ms ease", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", }}>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, height: "auto", alignSelf: "center", justifyContent: "flex-start", width: "40%" }}>
                    {globalUser != undefined ?
                        <>
                            {globalUser.isLoggedIn ?
                                <div style={{ display: "flex", width: "100%", justifyContent: "flex-start" }}>
                                    {/* <> */}
                                    <Link to='/logout'>
                                        <div className={'logOutButton'}>
                                            {/* <img src="../svg/logout_button.svg" style={{ visibility: "hidden" }} /> */}
                                            <p>خروج</p>
                                        </div>
                                    </Link>
                                    <Link to='/welcome'>
                                        <div className={'dashButton'}>
                                            <p>ورود به داشبورد</p>
                                        </div>
                                    </Link>
                                    {/* </> */}
                                </div>
                                :
                                <div style={{ display: "flex", width: "100%", justifyContent: "flex-start" }}>
                                    <Link to='/auth'>
                                        <div className={'loginButton'}>
                                            {/* <img src="../svg/login_button.svg" style={{ visibility: "hidden" }} /> */}
                                            <p>ورود / عضویت</p>
                                        </div>
                                    </Link>
                                </div>
                            }
                        </>
                        :
                        <>
                            <div style={{ display: "flex", width: "50%", justifyContent: "flex-start" }}>
                                <Link to='/auth'>
                                    <div className={'loginButton'}>
                                        {/* <img src="../svg/login_button.svg" style={{ visibility: "hidden" }} /> */}
                                        <p>ورود / عضویت</p>
                                    </div>
                                </Link>
                            </div>
                        </>
                    }
                </Box>

                {/* mobile menu */}
                {globalUser != undefined ?
                    <>
                        {!globalUser.isLoggedIn ?
                            <Box className={'loginButton'} sx={{ marginRight: "10px", textAlign: 'center', display: { xs: "block", md: "none" } }}>
                                <Link to='/auth'>
                                    <p style={{ fontSize: "13px", margin: 0 }} >ورود / عضویت</p>
                                </Link>
                            </Box>
                            :
                            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: "auto", alignSelf: "center", justifyContent: "flex-start", width: "40%" }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 2%' }}>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={toggleDrawer('right', true)}
                                        sx={{ flex: 1 }}
                                    >
                                        <MenuIcon sx={{ fontSize: 40 }} />
                                    </IconButton>
                                </Box>
                                <SwipeableDrawer
                                    anchor={'right'}
                                    open={state['right']}
                                    onClose={toggleDrawer('right', false)}
                                    onOpen={toggleDrawer('right', true)}
                                >
                                    {window.location.pathname.length == 1 || window.location.pathname.indexOf('blog') != -1 || window.location.pathname.indexOf('courses') != -1 ?
                                        globalUser && globalUser.isLoggedIn == true ?
                                            <div className="new-dashboard" style={{ background: '#33343f', height: '100%' }}>
                                                <DashBoardMenu globalUser={globalUser} />
                                            </div>
                                            :
                                            undefined
                                        // <div className={classes.wrapper}>
                                        //     <Link to='/'>
                                        //         <div style={{ textAlign: 'end', fontSize: '26px', letterSpacing: '1px' }}>
                                        //             <span style={{ color: '#64c5ba', marginLeft: '5px' }}>BIT</span>DAD
                                        //             <img src={PUBLIC_URL('svg/header_logo.svg')} style={{ width: '60px', height: '60px', marginLeft: '5px' }} />
                                        //         </div>
                                        //     </Link>
                                        //     <Link to='/auth'>
                                        //         <div className={'loginButton'} style={{ textAlign: 'center', margin: '30px auto' }}>
                                        //             <p>ورود / عضویت</p>
                                        //         </div>
                                        //     </Link>
                                        // </div>
                                        :
                                        <div className="new-dashboard" style={{ background: '#33343f', height: '100%' }}>
                                            {submenu}
                                        </div>
                                    }

                                </SwipeableDrawer>
                            </Box>
                        }
                    </>
                    :
                    <Box className={'loginButton'} sx={{ marginRight: "10px", textAlign: 'center', display: { xs: "block", md: "none" } }}>
                        <Link to='/auth'>
                            <p style={{ fontSize: "13px", margin: 0 }} >ورود / عضویت</p>
                        </Link>
                    </Box>
                }
                {/* end of mobile menu */}
                <Box sx={{ width: "100px", visibility: { xs: "hidden", md: "hidden" }, }}>
                    {/* <Box className={'logoHolder'} sx={{ display: { xs: 'block', md: 'none' } }} /> */}
                </Box>
                <Box sx={{ height: "auto", alignSelf: "center", display: "flex", alignContent: "center", alignItems: "center", justifyContent: "flex-end", width: "40%", justifySelf: "flex-end" }}>
                    <Search />
                    <Link to='/'>
                        <Box className={'aqua'} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <p><span>BIT</span>DAD</p>
                        </Box>
                    </Link>
                    <Box className={'logoHolder'} sx={{ display: { xs: 'none', md: 'block' } }} >
                        {/* <img src={PUBLIC_URL('svg/header_logo.svg')} style={{ width: '60px', height: '60px' }} /> */}
                    </Box>
                </Box>
            </div>
        </nav>
    );
}

