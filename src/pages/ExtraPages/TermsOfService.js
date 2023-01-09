import React from "react";
import { Helmet } from "react-helmet";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import MobileDrawer from '../landing/MobileDrawer';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    sections: {
        height: '95vh',
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
        padding: '10px 20px',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
            width:'95%',
            margin:'0 auto'
        },
    },

    GroupHeader: {
        textAlign: 'center',
        textShadow: ' 0px 0px 10px #3a6f73',
        [theme.breakpoints.down('xs')]: {
            paddingTop: 30,
            paddingBottom: 10,
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
    },
    contextWrapper: {
        [theme.breakpoints.down('xs')]: {
            height: '55vh',
            overflow: 'scroll',
        },
    }
}))
export default function TermsOfService() {
    const classes = useStyles();

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>قوانین و شرایط</title>
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
                            قوانین و شرایط
                        </h1>
                        {/* tokens images*/}
                        <p className={classes.contextWrapper}>عضویت در سایت به منزله پذیرفتن تمام قوانین است.‌
                            ‌<br></br>
                            ‌کلیه قوانین مطابق با قانون تجارت الکترونیک و قوانین حمایت از حقوق مصرف کنندگان جمهوری اسلامی ایران می‌باشد.‌‌
                            ‌<br></br>
                            -تمام اطلاعات موجود در این وبسایت جنبه ی آموزشی داشته و خارج از هرگونه پیشنهاد و مشاوره مالی برای سرمایه گذاری است. طبیعتاً مسئولیت هرگونه فعالیت اقتصادی به تبع محتوای این سایت بر عهده‌ی کاربر است.‌
                            ‌<br></br>
                            -مسئولیت هر آموزه در این وبسایت بر عهده نگارنده آن است.‌‌
                            ‌<br></br>
                            ‌-به علت حفظ حقوق مادی و معنوی ناشر و همچنین حمایت از حقوق مصرف کنندگان، نشر یا استفاده از تمام مطالب این وبسایت به هر نحو، تحت پیگرد قانونی قرار خواهد گرفت.‌‌
                            ‌<br></br>
                            -صحت اطلاعات مندرج هنگام ثبت نام بر عهده کاربر می‌باشد.‌‌ همچنین کاربر مجاز به قرار دادن اطلاعات خود به شخص دیگر نمیباشد و تخلف محسوب میگردد.
                            ‌<br></br>
                            -به علت  پویایی در دنیای رمزنگاری و ریسک بسیار بالای سرمایه گذاری، همواره کاربر باید با تحقیق شخصی خود مسئولیت فعالیت های خود را در این حوزه به عهده گیرد.‌
                            ‌<br></br>
                            -در صورت عدم رعایت هر یک از موارد فوق  و یا به تشخیص مدیریت در موارد دیگر، وبسایت به عنوان مرجع تصمیم گیرنده، نظر نهایی را نسبت به کاربر اعلام خواهد کرد.</p>
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
