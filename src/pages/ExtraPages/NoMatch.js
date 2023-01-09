import React from 'react'
import { PUBLIC_URL, BG_URL } from '../../utils/utils';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MobileDrawer from '../landing/MobileDrawer';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function NoMatch() {
    const useStyles = makeStyles((theme) => ({
        sections: {
            height: '100vh',
            scrollSnapAlign: 'start',
            [theme.breakpoints.down('xs')]: {
                paddingTop: '55px',
                paddingBottom: '10px'
            },
            [theme.breakpoints.between("sm", "md")]: {
                paddingTop: 100
            },
            "@media (min-width: 1280px)": {
                paddingTop: '80px',
            }
        },
        placeHolder: {
            position: 'relative',
            borderRadius: '50px',
            boxShadow: ' 0px 8px 15px 4px rgba(0,0,0,0.2)',
            height: '85vh',
            [theme.breakpoints.down('xs')]: {
                borderRadius: '20px',
            },
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
                top: -80,
            },
            "@media (min-width: 1000px)": {
                top: -100,
            },
            "@media (min-width: 1280px)": {
                top: -70,
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
        GroupHeader: {
            textAlign: 'center',
            textShadow: ' 0px 0px 10px #3a6f73',
            [theme.breakpoints.down('xs')]: {
                paddingTop: 40,
            },
            [theme.breakpoints.between('sm', 'md')]: {
                paddingTop: 80,
            },
            "@media (min-width: 1000px)": {
                paddingTop: 120,
            },
            "@media (min-width: 1280px)": {
                paddingTop: 90,
                paddingBottom: 20,
                fontSize: '50px'
            }
        },
        groupImage: {
            [theme.breakpoints.down('xs')]: {
                width: '60%',
            },
            [theme.breakpoints.between("sm", "md")]: {
                width: '50%',
            },
            "@media (min-width: 1000px)": {
                width: '30%',
            },
            "@media (min-width: 1280px)": {
                width: '30%',
                margin: '10px'
            }
        },
        groupText: {
            textAlign: 'cnetre',
            [theme.breakpoints.down('xs')]: {
                fontSize: '12px',
                paddingTop: '10px',
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingBottom: '0px',
                marginBottom: '0px'
            },
            [theme.breakpoints.between("sm", "md")]: {
                padding: '20px',
                fontSize: '16px',
            },
            "@media (min-width: 1000px)": {
                padding: '20px',
                fontSize: '25px',
            },
            "@media (min-width: 1280px)": {
                padding: '30px',
                fontSize: '16px',
            }
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
        },
        socialWrapper: {
            position: 'absolute',
            textAlign: 'center',
            bottom: 50,
            width: '100%'
        },
        socialIcons: {
            color: '#64c5ba',
            fontSize: '3rem !important',
            margin: '0px 5px'
        },
        linkToHome: {
            textDecoration: 'none',
            display: 'block',
            color: 'white',
            fontSize: '25px',
            marginTop: '30px',
            '&:hover': {
                textDecoration: 'none',
                color: '#64c5ba'
            },
        },
        academyHeader: {
            textAlign: 'center',
            textShadow: ' 0px 0px 10px #3a6f73',
            color: '#64c5ba',

            [theme.breakpoints.down('xs')]: {
                paddingTop: '40px',
            },
        },
    }));
    const classes = useStyles();

    return (
        <section className={classes.sections} style={{
            backgroundImage: BG_URL(PUBLIC_URL('images/bg.png')),
            backgroundSize: 'auto 100%',
            backgroundPosition: 'center'
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
                            <img className={classes.photo} src={PUBLIC_URL('images/logo2.png')} alt="logo" />
                        </Link>
                    </div>
                    {/* place holder header */}
                    <h1 className={classes.GroupHeader}>
                        صفحه مورد نظر یافت نشد
                    </h1>
                    <div className='text-center'>
                        <img className={classes.groupImage} src={PUBLIC_URL('images/blockchainerror.svg')} alt="404" />
                        <Link to="/" className={classes.linkToHome}>
                            بازگشت به خانه
                        </Link>
                    </div>
                    {/* tokens images*/}
                    <div className={classes.socialWrapper}>
                        <a href="https://t.me/aquadex" target="_blank" rel="noreferrer">
                            <TelegramIcon className={classes.socialIcons} />
                        </a>
                        <a href="https://instagram.com/aquaex?utm_medium=copy_link" target="_blank" rel="noreferrer">
                            <InstagramIcon className={classes.socialIcons} />
                        </a>
                        <a href="https://twitter.com/aquaex?s=11" target="_blank" rel="noreferrer">
                            <TwitterIcon className={classes.socialIcons} />
                        </a>
                        <a href="https://www.youtube.com/c/aquaDEFI" target="_blank" rel="noreferrer">
                            <YouTubeIcon className={classes.socialIcons} />
                        </a>
                        <a href="https://www.linkedin.com/company/aqua/" target="_blank" rel="noreferrer">
                            <LinkedInIcon className={classes.socialIcons} />
                        </a>
                    </div>
                    <div className={classes.buttonWrapper}>
                        <MobileDrawer />
                    </div>
                </div>
            </div>
        </section>
    )
}
