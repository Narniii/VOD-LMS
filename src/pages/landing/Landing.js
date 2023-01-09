import React, { useEffect, useState } from "react";
import ReactPageScroller from 'react-page-scroller';
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
export default function Landing() {
  const useStyles = makeStyles((theme) => ({
    mt: {
      [theme.breakpoints.down('xs')]: {
        marginTop: '400px',
      },
      [theme.breakpoints.between("sm", "md")]: {
        marginTop: '600px',
      },
      "@media (min-width: 1000px)": {
        marginTop: '800px',
      },
      "@media (min-width: 1280px)": {
        marginTop: '65vh',
      }
    },
    staticLogos: {
      [theme.breakpoints.down('xs')]: {
        width: '70%'
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: '50%'
      },
      "@media (min-width: 1280px)": {
      }
    },
    bitcoinAnimate: {
      animation: '$xAxisUp 2s 0.5 forwards cubic-bezier(0.3, 0.27, 0.07, 1.64)',
      [theme.breakpoints.down('xs')]: {
        width: '50%'
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: '50%'
      },
      "@media (min-width: 1000px)": {
        width: '70%'

      }
    },
    btcAnimate: {
      animation: '$yAxisUp 2s 0.5 forwards cubic-bezier(0.3, 0.27, 0.07, 1.64)',
      position: "absolute",
      [theme.breakpoints.down('xs')]: {
        top: 150,
        right: 70,
        "@supports (-webkit-touch-callout: none)": {
          /* CSS specific to iOS devices */
          top: '100px',
          right: '70px',
        },
      },
      [theme.breakpoints.between("sm", "md")]: {
        top: 170,
        right: 100,
      },
      "@media (min-width: 1280px)": {
        top: '150px',
        right: '140px',
      }
    },
    binanceAnimate: {
      animation: '$xAxisUp 2s 0.5 forwards cubic-bezier(0.3, 0.27, 0.07, 1.64)',
      [theme.breakpoints.down('xs')]: {
        width: '50%'
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: '50%'
      },
      "@media (min-width: 1000px)": {
        width: '70%'
      }
    },
    bnbAnimate: {
      animation: '$yAxisDown 2s 0.5 forwards cubic-bezier(0.3, 0.27, 0.07, 1.64)',
      position: "absolute",
      [theme.breakpoints.down('xs')]: {
        bottom: 160,
        right: 70,
        "@supports (-webkit-touch-callout: none)": {
          /* CSS specific to iOS devices */
          bottom: '220px',
          right: '80px'
        },
      },
      [theme.breakpoints.between("sm", "md")]: {
        bottom: 160,
        right: 100
      },
      "@media (min-width: 1280px)": {
        bottom: '140px',
        right: '180px'
      }
    },
    pacncakeAnimate: {
      animation: '$xAxisDown 2s 0.5 forwards cubic-bezier(0.3, 0.27, 0.07, 1.64)',
      [theme.breakpoints.down('xs')]: {
        width: '50%'
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: '50%'
      },
      "@media (min-width: 1000px)": {
        width: '70%'
      }
    },
    cakeAnimate: {
      animation: '$yAxisUp 2s 0.5 forwards cubic-bezier(0.3, 0.27, 0.07, 1.64)',
      position: "absolute",
      [theme.breakpoints.down('xs')]: {
        top: 120,
        left: 60,
        "@supports (-webkit-touch-callout: none)": {
          /* CSS specific to iOS devices */
          bottom: '200px',
          right: '80px'
        },
      },
      [theme.breakpoints.between("sm", "md")]: {
        top: 150,
        left: 100
      },
      "@media (min-width: 1280px)": {
        top: '120px',
        left: '200px'
      }
    },
    ethereumAnimate: {
      animation: '$xAxisDown 2s 0.5 forwards cubic-bezier(0.3, 0.27, 0.07, 1.64)',
      position: "absolute",
      [theme.breakpoints.down('xs')]: {
        bottom: 200,
        left: 60,
        "@supports (-webkit-touch-callout: none)": {
          /* CSS specific to iOS devices */
          bottom: '240px',
          left: '80px'
        },
      },
      [theme.breakpoints.between("sm", "md")]: {
        bottom: 160,
        left: 100
      },
      "@media (min-width: 1280px)": {
        bottom: '120px',
        left: '200px'
      }
    },
    ethAnimate: {
      animation: '$yAxisDown 2s 0.5 forwards cubic-bezier(0.3, 0.27, 0.07, 1.64)',
      [theme.breakpoints.down('xs')]: {
        width: '50%'
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: '50%'
      },
      "@media (min-width: 1000px)": {
        width: '70%'

      }
    },
    '@keyframes yAxisUp': {
      '50%': {
        animationTimingFunction: ' ease-in',
        transform: 'translatey(-100px)'
      }
    },

    '@keyframes yAxisDown': {
      '50%': {
        animationTimingFunction: ' ease-out',
        transform: 'translatey(100px)'
      }
    },
    '@keyframes xAxisUp': {
      '50%': {
        animationTimingFunction: ' ease-in',
        transform: 'translatex(100px)'
      }
    },

    '@keyframes xAxisDown': {
      '50%': {
        animationTimingFunction: ' ease-out',
        transform: 'translatex(-100px)'
      }
    },
    mobileOnly: {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'block',
      },
    },
    noMobile: {
      display: 'block',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    }
  }));
  const classes = useStyles();


  const [animate, setAnimate] = useState(false)
  const handleScroll = () => {
    setAnimate(true);
  }
  useEffect(() => {
    setAnimate(false)
  }, [])
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>بیتداد</title>
        <link rel="canonical" href="http://aqua.ir/" />
      </Helmet>
      <div style={{
        position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0,
        backgroundImage: BG_URL(PUBLIC_URL('images/bg.png')),
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        zIndex: 0,
      }}>
      </div>
      <div style={{
        position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0,
        zIndex: 0,
      }}>
        <div className="container text-center">
          <div className={((animate ? '' : classes.mt))}> </div>
          <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1 }}>
              <div className={(animate ? classes.btcAnimate : '')}>
                <img className={(animate ? classes.bitcoinAnimate : classes.staticLogos)} src={PUBLIC_URL('images/bit.png')} alt="" />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={(animate ? classes.bnbAnimate : '')}>
                <img className={(animate ? classes.binanceAnimate : classes.staticLogos)} src={PUBLIC_URL('images/bnb.png')} alt="" />
              </div>
            </div>

            <div style={{ flex: 1 }}>

              <div className={(animate ? classes.cakeAnimate : '')}>
                <img className={(animate ? classes.pacncakeAnimate : classes.staticLogos)} src={PUBLIC_URL('images/cake.png')} alt="" />

              </div>
            </div>
            <div style={{ flex: 1 }}>

              <div className={(animate ? classes.ethereumAnimate : '')}>
                <img className={(animate ? classes.ethAnimate : classes.staticLogos)} src={PUBLIC_URL('images/teth.png')} alt="" />
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className={classes.mobileOnly}>
        <ReactPageScroller containerHeight={'90vh'} onBeforePageScroll={() => handleScroll(animate)} >
          <FirstComponent />
          <SecondComponent />
        </ReactPageScroller>
      </div>
      <div className={classes.noMobile}>
        <ReactPageScroller onBeforePageScroll={() => handleScroll(animate)} >
          <FirstComponent />
          <SecondComponent />
        </ReactPageScroller>
      </div>

    </>
  );
}
