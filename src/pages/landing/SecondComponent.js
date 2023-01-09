import React from 'react'
import { PUBLIC_URL, BG_URL } from '../../utils/utils';
import { makeStyles } from '@material-ui/core/styles';
import MobileDrawer from './MobileDrawer';
import { Link } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function AllInOne() {
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
        height: '75vh',
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
      paddingTop: window.innerHeight / 4,
      textShadow: ' 0px 0px 10px #3a6f73',
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

    academyHeader: {
      textAlign: 'center',
      paddingTop: window.innerHeight / 10,
      textShadow: ' 0px 0px 10px #3a6f73',
      color: '#64c5ba',
      [theme.breakpoints.down('xs')]: {
        paddingTop: '40px',
      },
      "@media (max-width: 350px)": {
        paddingTop: '15px !important',
      },
    },

    btc: {
      [theme.breakpoints.down('xs')]: {
        width: '30%',
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: '15%',
      },
      "@media (min-width: 1280px)": {
        width: '40%',
      },
      animation: '$xAxis 2s 0.5 forwards cubic-bezier(0.02, 0.01, 0.21, 1)',
    },
    animate: {
      position: 'absolute',
      animation: '$yAxis 2s 0.5 forwards cubic-bezier(0.3, 0.27, 0.07, 1.64)',
      [theme.breakpoints.down('xs')]: {
        top: 0,
        right: 0,
      },
      [theme.breakpoints.between("sm", "md")]: {
        top: -30,
        right: -35,
      },
      "@media (min-width: 1280px)": {
        top: 0,
        right: 0,
      },

    },
    cake: {
      position: 'absolute',

      [theme.breakpoints.down('xs')]: {
        top: -40,
        left: 0,
        width: '30%',
      },
      [theme.breakpoints.between("sm", "md")]: {
        top: -10,
        left: -35,
        width: '15%',
      },
      "@media (min-width: 1280px)": {
        top: -50,
        left: -50,
        width: '10%',
      }
    },
    bnb: {
      position: 'absolute',
      [theme.breakpoints.down('xs')]: {
        bottom: -10,
        right: -10,
        width: '30%',
      },
      [theme.breakpoints.between("sm", "md")]: {
        bottom: -20,
        right: -30,
        width: '15%',
      },
      "@media (min-width: 1280px)": {
        bottom: -50,
        right: -50,
        width: '10%',
      }
    },
    teth: {
      position: 'absolute',
      [theme.breakpoints.down('xs')]: {
        bottom: -40,
        left: 0,
        width: '25%',
      },
      [theme.breakpoints.between("sm", "md")]: {
        bottom: -30,
        left: -30,
        width: '15%',
      },
      "@media (min-width: 1280px)": {
        bottom: -50,
        left: -50,
        width: '10%',
      }

    },
    blockchainWrapper: {
      position: 'relative'
    },
    blockchainLogo: {
      position: 'absolute',
      [theme.breakpoints.down('xs')]: {
        top: 30,
        right: -10,
        width: '32%',
      },
      "@media (max-width: 350px)": {
        top: 0,
      },
      [theme.breakpoints.between("sm", "md")]: {
        top: 0,
        right: -20,
        width: '30%',
      },
      "@media (min-width: 1000px)": {
        top: -10,
        width: '23%',
        right: -20,
      },
      "@media (min-width: 1280px)": {
        top: -50,
        right: -30,
        width: '25%',
      }
    },
    blockchainText: {
      textShadow: '0px 0px 10px #3a6f73',
      fontWeight: 600,
      color: '#64c5ba',
      textAlign: 'justify',
      textJustify: 'inter-word',
      paddingLeft: '5px',
      "@media (max-width: 350px)": {
        marginTop: '0px !important',
        marginBottom: '0px'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px',
        marginTop: '30px',
      },
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: '18px',
        marginTop: '20px',
        marginLeft: '10px'
      },
      "@media (min-width: 1000px)": {
        fontSize: '22px',
      },
      "@media (min-width: 1280px)": {
        marginTop: '30px',
        fontSize: '20px',
      }
    },

    BrainText: {
      marginTop: '200px',
      textShadow: '0px 0px 10px #3a6f73',
      fontWeight: 600,
      fontSize: '20px',
      color: '#64c5ba',
      textAlign: 'justify',
      textJustify: 'inter-word',
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px',
        marginTop: '10px',
        padding: '5px'
      },
      "@media (max-width: 350px)": {
        marginTop: '0px !important',
      },
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: '18px',
        marginTop: '150px',
        marginRight: '30px'

      },
      "@media (min-width: 1000px)": {
        fontSize: '20px',
        marginLeft: '50px',
        marginTop: '80px',
      },
      "@media (min-width: 1280px)": {
        fontSize: '20px',
        marginTop: '15vh'
      }
    },

    brainLogo: {
      position: 'absolute',
      [theme.breakpoints.down('xs')]: {
        top: 20,
        left: -10,
        width: '35%',
      },
      [theme.breakpoints.between("sm", "md")]: {
        top: 150,
        left: -20,
        width: '33%',
      },
      "@media (min-width: 1000px)": {
        width: '30%',
        left: -30,
        top: '15%',
      },
      "@media (min-width: 1280px)": {
        top: '20%',
        left: -30,
        width: '25%',
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
      position: 'absolute',
      textAlign: 'center',
      bottom: 50,
      width: '100%'
    },
    socialIcons: {
      color: '#64c5ba',
      fontSize: '3rem !important',
      margin: '0px 5px'
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
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
            {/* logos around place holder */}
            {/* <div className={classes.animate}>
              <img className={classes.btc} src={PUBLIC_URL('images/bit.png')} alt=""/>
            </div>
            <img className={classes.cake} src={PUBLIC_URL('images/cake.png')} alt=""/>
            <img className={classes.bnb} src={PUBLIC_URL('images/bnb.png')} alt=""/>
            <img className={classes.teth} src={PUBLIC_URL('images/teth.png')} alt=""/> */}


            {/* aqua logo in place holder */}
            {/* <div className={classes.logoContainer}>
              <Link to="/">
                <img className={classes.photo} src={PUBLIC_URL('images/logo.svg')} alt="" />
              </Link>
            </div> */}
            {/* place holder header */}
            <h2 className={classes.academyHeader}>
              {/* . 01 . */}
            </h2>
            {/* <h2 style={{ textAlign: 'center', textShadow: ' 0px 0px 10px #3a6f73' }}>آموزش</h2> */}
            {/* block chain and text  */}
            <div className={classes.blockchainWrapper}>
              <div className="row">
                <div className="col-4 col-lg-3">
                  <img className={classes.blockchainLogo} src={PUBLIC_URL('images/blockchain.png')} alt="" />
                </div>
                <div className="col-8 col-lg-7">
                  <p className={classes.blockchainText}>
                    روزانه شاهد ارائه تعداد زیادی تعریف، مفهوم، ایده، پروژه، نرم‌افزار و انواع خدمات متفاوت در صنعت بلاکچین و دنیای رمزنگاری هستیم. اما پیچیدگی تعاریف و سختی در انتقال مفاهیم همچنان در فعالیت های غیر متمرکز مانعی برای شتاب گیری بیشتر در ترویج و توسعه است.
                  </p>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>

            {/* brain logo and text */}
            <div className={classes.blockchainWrapper}>

              <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-8 col-lg-7">
                  <p className={classes.BrainText}>
                    گروه بیتداد با اتکا به تجربه و دانش تخصصی خود در حوزه فعالیت های مالی غیر متمرکز، همواره با شناخت و تحلیل فرصت ها و تهدیدات به پالایش اطلاعات پرداخته و از این طریق به تسهیل راههای تعامل هر فرد در جامعه با فعالیت های مالی غیر متمرکز از هر طریق میپردازد.
                  </p>
                </div>
                <div className="col-4 col-lg-3"><img className={classes.brainLogo} src={PUBLIC_URL('images/brain.png')} alt="" /></div>
                <div className="col-lg-1"></div>
              </div>
            </div>
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
      </section >


    </div>
  )
}
