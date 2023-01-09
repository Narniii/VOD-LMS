import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../utils/utils';
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    appbarWrapper: {
        position: 'sticky',
        top: '0px',
        left: '0px',
        backgroundColor: 'transparent',
        height: '100px'

    },
    appbarContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '10px 20px',
        position: 'absolute',
        top: '0px',
        left: '0px',
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
        }
    },
    navlogo: {
        position: 'absolute',
        width: '130px',
        marginLeft: ' auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        top: 2
    },
    noMobile: {
        [theme.breakpoints.down("xs")]: {
            display: 'none'
        },

    }
}));

export default function Appbar() {
    const { globalUser } = useSelector(state => state.userReducer)
    const classes = useStyles();
    return (
        <div className="no-mobile" style={{ position: 'absolute', width: '100%', zIndex: 10 }}>
            <div className={classes.appbarWrapper}>
                <div className="container">
                    {/* navbar */}
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
                                <Link className={classes.barTabs} to="/signup">عضویت</Link>
                                <Link className={classes.barTabs} to="/login">ورود</Link>
                            </>

                        }
                        <Link className={classes.barTabs} to="/academy">آکادمی</Link>
                        <Link className={classes.barTabs} to="/">
                            <img src={PUBLIC_URL('images/logo.svg')} className={classes.navlogo} />
                        </Link>
                        <Link className={classes.barTabs} to="/blog">وبلاگ</Link>
                        <Link className={classes.barTabs} to="/contact-us">تماس با ما</Link>
                        <Link className={classes.barTabs} to="/about-us">درباره ما</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
