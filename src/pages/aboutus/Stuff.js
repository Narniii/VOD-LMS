import React from 'react'
import { PUBLIC_URL, BG_URL } from '../../utils/utils';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MobileDrawer from '../landing/MobileDrawer';
export default function Stuff() {
    const useStyles = makeStyles((theme) => ({
        sections: {
            height: '100vh',
            scrollSnapAlign: 'start',
            // height: '100%',
            // width: '100%',
            // padding: '50px',
            [theme.breakpoints.down('xs')]: {
                padding: '70px 0px'
            },
            [theme.breakpoints.between("sm", "md")]: {
                paddingTop: 100
            },
            "@media (min-width: 1280px)": {
                paddingTop: '100px',
            }
        },
        wrapper: {
            scrollSnapType: 'y mandatory',
            height: '100vh',
        },
        placeHolder: {
            position: 'relative',
            borderRadius: '50px',
            boxShadow: ' 0px 8px 15px 4px rgba(0,0,0,0.2)',
            [theme.breakpoints.down('xs')]: {
                height: window.innerHeight - 130,
                borderRadius: '20px',

            },
            [theme.breakpoints.between("sm", "md")]: {
                height: window.innerHeight - 150
            },
            "@media (min-width: 1280px)": {
                height: window.innerHeight - 150,
            }
        },

        innerBox: {
            width: '100px',
            height: '100px',
            alignSelf: 'center',
        },

        logoContainer: {
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            [theme.breakpoints.down('xs')]: {
                top: -50,
            },
            [theme.breakpoints.between("sm", "md")]: {
                top: -100,
            },
            "@media (min-width: 1280px)": {
                top: -80,
            }
        },
        photo: {
            [theme.breakpoints.down('xs')]: {
                width: '25%',
            },
            [theme.breakpoints.between("sm", "md")]: {
                width: '20%',

            },
            "@media (min-width: 1000px)": {
                width: '20%',
            },
            "@media (min-width: 1280px)": {
                width: '10%',

            }
        },
        stuffHeader: {
            textAlign: 'center',
            textShadow: ' 0px 0px 10px #3a6f73',
            [theme.breakpoints.down('xs')]: {
                paddingTop: window.innerHeight / 4,
            },
            [theme.breakpoints.between("sm", "md")]: {
                paddingTop: window.innerHeight / 4,
            },
            "@media (min-width: 1000px)": {
                paddingTop: window.innerHeight / 4,
            },
            "@media (min-width: 1280px)": {
                paddingTop: window.innerHeight / 18,
            }
        },
        stuffImages: {
            padding: '10px',
            [theme.breakpoints.down('xs')]: {
                width: '100%',

            },
            [theme.breakpoints.between("sm", "md")]: {
            },
            "@media (min-width: 1280px)": {
                width: '100%',
            }
        },
        overlayParent: {
            position: 'relative',
        },
        overlay: {
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            '&:hover': {
                display: 'block',
                transition: '1s',
                backgroundColor: 'rgba(0,0,0,0.6)',
                opacity: 1
            },
        },
        buttonWrapper: {
            position: 'absolute',
            bottom: -30,
            textAlign: 'center',
            width: '100%',
            display: 'none',
            [theme.breakpoints.down('xs')]: {
                display: 'block'
            },
        }
    }));
    const classes = useStyles();
    let views = [];
    for (var i = 0; i < 12; i++) {
        views.push(
            <div className="col-md-4 col-3 text-center" key={i}>
                <div style={{ width: '50%', margin: '0 auto' }}>
                    <div className={classes.overlayParent}>
                        <img className={classes.stuffImages} src={PUBLIC_URL('images/avatar-1.png')} alt="aqua-avatar-crew" />
                        <div className={classes.overlay}>
                            a
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <section className={classes.sections} style={{
            // backgroundImage: BG_URL(PUBLIC_URL('images/bg.png')),
            // backgroundSize: 'auto 100%',
            // backgroundPosition: 'center'
        }} >
            {/* place holder */}
            <div className="container">
                <div className={classes.placeHolder} style={{
                    backgroundImage: BG_URL(PUBLIC_URL('images/place-holder.png')),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} >
                    {/* logo in place holder */}
                    <div className={classes.logoContainer}>
                        <Link to="/">
                            <img className={classes.photo} src={PUBLIC_URL('images/logo.svg')} alt="aqua-logo" />
                        </Link>
                    </div>
                    {/* place holder header */}
                    <h1 className={classes.stuffHeader}>
                        گروه بیتداد
                    </h1>
                    {/* tokens images*/}
                    <div className="row text-center">
                        {views}
                    </div>
                    <div className={classes.buttonWrapper}>
                        <MobileDrawer />
                    </div>
                </div>
            </div>
        </section >
    )
}
