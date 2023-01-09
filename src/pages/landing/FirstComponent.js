import React from 'react'
import { PUBLIC_URL, BG_URL } from '../../utils/utils';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function AllInOne() {
  const useStyles = makeStyles((theme) => ({
    sections: {
      height: '100vh',
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
        height: '72vh',
        borderRadius: '20px',
      },
      [theme.breakpoints.between("sm", "md")]: {
        height: '80vh'
      },
      "@media (min-width: 1280px)": {
        height: '80vh',
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
    FirstPageHeader: {
      textAlign: 'center',
      textShadow: ' 0px 0px 10px #3a6f73',
      [theme.breakpoints.down('xs')]: {
        paddingTop: '110px',
      },
      [theme.breakpoints.between("sm", "md")]: {
        paddingTop: '200px',
      },
      "@media (min-width: 1000px)": {
        paddingTop: '30vh',
      },
      "@media (min-width: 1280px)": {
        paddingTop: window.innerHeight / 4,
      }
    },
    subDescription: {
      textAlign: 'center',
      textShadow: ' 0px 0px 10px #3a6f73',
      [theme.breakpoints.down('xs')]: {
        padding: '15px',
      },
      [theme.breakpoints.between("sm", "md")]: {
        padding: '25px',
      },
      "@media (min-width: 1280px)": {
        padding: '25px',

      }
    },
    token: {
      marginTop: '60px',
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: '90%'

      },
    },
    buttonWrapper: {
      position: 'absolute',
      bottom: -40,
      textAlign: 'center',
      width: '100%',
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'block'
      },
    },
    socialWrapper: {
      textAlign: 'center'
    },
    socialIcons: {
      color: '#64c5ba',
      fontSize: '3rem !important',
      margin: '0px 5px'
    }
  }));
  const classes = useStyles();

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
          {/* <div className={classes.logoContainer}>
            <Link to="/">
              <img className={classes.photo} src={PUBLIC_URL('images/logo.svg')} alt="" />
            </Link>
          </div> */}
          {/* place holder header */}
          <h1 className={classes.FirstPageHeader}>بیتداد</h1>
          <h3 className={classes.subDescription}>
            Immersed in DeFi
          </h3>
          <div className={classes.socialWrapper}>
            <a href="https://t.me/aquadex" target="_blank" rel="noreferrer" >
              <TelegramIcon className={classes.socialIcons} />
            </a>
            <a href="https://instagram.com/aquaex?utm_medium=copy_link" target="_blank" rel="noreferrer" >
              <InstagramIcon className={classes.socialIcons} />
            </a>
            <a href="https://twitter.com/aquaex?s=11" target="_blank" rel="noreferrer" >
              <TwitterIcon className={classes.socialIcons} />
            </a>
            <a href="https://www.youtube.com/c/aquaDEFI" target="_blank" rel="noreferrer" >
              <YouTubeIcon className={classes.socialIcons} />
            </a>
            <a href="https://www.linkedin.com/company/aqua/" target="_blank" rel="noreferrer" >
              <LinkedInIcon className={classes.socialIcons} />
            </a>
          </div>


          <div className={classes.buttonWrapper}>
            <MobileDrawer />
          </div>
        </div>
      </div>
    </section >
  )
}
