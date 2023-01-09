import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import MobileDrawer from '../landing/MobileDrawer';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link } from "react-router-dom";

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

    GroupHeader: {
        textAlign: 'center',
        textShadow: ' 0px 0px 10px #3a6f73',
        [theme.breakpoints.down('xs')]: {
            paddingTop: 40,
        },
        "@media (max-width: 350px)": {
            paddingTop: 20,
        },
        [theme.breakpoints.between('sm', 'md')]: {
            paddingTop: 80,
        },
        "@media (min-width: 1000px)": {
            paddingTop: 120,
        },
        "@media (min-width: 1280px)": {
            paddingTop: 70,
            paddingBottom: 20,
            fontSize: '50px'
        }
    },
    groupImage: {
        [theme.breakpoints.down('xs')]: {
            width: '60%',
        },
        "@media (max-width: 350px)": {
            width: '50%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '80%',
        },
        "@media (min-width: 1000px)": {
            width: '80%',
        },
        "@media (min-width: 1280px)": {
            width: '30%',
        }
    },
    groupText: {
        textAlign: 'justify',
        textJustify: 'inter-word',
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
        bottom: 40,
        width: '100%',
        "@media (max-width: 350px)": {
            bottom: 20,
        },
    },
    socialIcons: {
        color: '#64c5ba',
        fontSize: '3rem !important',
        margin: '0px 5px',
        "@media (max-width: 350px)": {
            fontSize: '2rem !important',
        },
        "@media (min-width: 1000px)": {
            fontSize: '3rem !important',

        }
    }
}))
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function ContactUs() {
    const position = [35.73098021435048, 51.35044235766309]
    const [loading, setLoading] = useState(false);
    const [information, setInformation] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    });
    const [inputError, setInputError] = useState('');
    const handleChange = e => {
        var tmp = { ...information };
        tmp[e.target.name] = e.target.value;
        setInformation(tmp);
    }
    const classes = useStyles();

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>تماس با ما</title>
                <link rel="canonical" href="http://aqua.ir/terms-of-service" />
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
            </div>
            {/* <ReactPageScroller> */}
            <section className={classes.sections}>
                {/* place holder */}
                <div className="container">
                    <div className={classes.placeHolder} style={{
                        backgroundImage: BG_URL(PUBLIC_URL('images/place-holder.png')),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} >

                        <h1 className={classes.GroupHeader}>
                            تماس با ما
                        </h1>
                        {/* tokens images*/}
                        <div>
                            <MapContainer style={{ width: '90%', height: '30vh', margin: '0 auto' }} center={position} zoom={20} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        IMEXB
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                        <div style={{ width: '90%', height: '300px', margin: '10px auto' }} >
                            <p>آدرس: <span>شهرک آزمایش، بزرگراه یادگار امام، ایثار، نامدار ششم،  پلاک ۲ واحد۳ طبقه۲ </span></p>
                            <div style={{ overflow: 'hidden' }}>
                                <p style={{ fontFamily: 'Spartan', float: 'right' }}>تلفن:
                                    <a href="tel: 02144207988" style={{ fontFamily: 'Spartan', direction: 'ltr !important', float: 'left' }}>
                                        021-44207988
                                    </a>
                                </p>
                                <p style={{ display: 'block', width: '100%', overflow: 'hidden' }}>ایمیل:  <span to="tel: 09121901056" style={{ fontFamily: 'Spartan' }}>aquaex@gmail.com</span></p>

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
            </section>
            {/* <Stuff />
      </ReactPageScroller> */}
        </>
    );
}
