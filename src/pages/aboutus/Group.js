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
export default function Group() {
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
                fontSize: '45px'
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
                width: '45%',
            },
            "@media (min-width: 1000px)": {
                width: '20%',
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
                fontSize: '20px',
            },
            "@media (min-width: 1280px)": {
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
            bottom: 20,
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
    }));
    const classes = useStyles();

    return (
        <section className={classes.sections}>
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
                            <img className={classes.photo} src={PUBLIC_URL('images/logo2.png')} alt="aqua" />
                        </Link>
                    </div> */}
                    {/* place holder header */}
                    <h1 className={classes.GroupHeader}>
                        درباره بیتداد
                    </h1>
                    {/* tokens images*/}
                    <div className='text-center'>
                        <img className={classes.groupImage} src={PUBLIC_URL('images/asdasdasd.svg')} alt="aqua" />
                        <p className={classes.groupText}>
                            گروه بیتداد در سال ۱۳۹۹ توسط محمد مهدی پورداد تاسیس شد. اولین اقدام، تاسیس «صرافی رمزارز ها» برای مشترکین بود که در ادامه با توسعه ی تراکنش ها، این خدمت توسط شرکت های همکار صورت میگیرد. گام بعدی، آموزش و انتقال مفاهیم در امور رمزنگاری، در «قالب آکادمی» بیتداد بود. سپس در فاز «تبدیل دانش به سرمایه»، با بررسی فرصت ها و تهدیدات سرمایه گذاری در بازار رمزارز ها، موفق شد سبد سرمایه ای با ارزش بالا را بدست آورده، و با مدیریت فعال، آنرا توسعه دهد. در ادامه، گروه بیتداد به همراه تیم فنی خود تصمیم به «توسعه ی اپلیکیشن های وب۳ و محصولات نرم‌افزاری بر بستر بلاکچین» گرفت. و پس از آن با «ایجاد یک متاورس» جدید و در موازات، انجام تمام امور مربوط به «توکن های غیر مثلی (NFT)» به ادامه ی مسیر می پردازد.
                        </p>
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
    )
}
