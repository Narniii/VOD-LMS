// import Image from 'next/image';
import { Link } from 'react-router-dom';
import '../style/home.css'
import moment from 'jalali-moment'
import AboutCard from './cards/AboutCards';

const Footer = () => {
    const newYear = new Date().getFullYear()  // returns the current year
    const year = moment(newYear, 'YYYY/MM/DD').locale('fa').format('yyyy ')

    const scrollTo = () => {
        window.document.getElementById('contact-us').scrollIntoView()
        // window.scrollTo({
        //   top: 2250,
        //   behavior: 'smooth',
        // });
    };

    return (
        <div className={'footer'}>
            {/* <div className={footerLogo}>
                <Image src='/svg/footer_logo.svg' width={70} height={70} />
            </div> */}
            <div className={'footerLogo'}>
                <div className={'footerLinks'}>
                    <Link to='/terms-of-service'><a><p>شرایط و قوانین</p></a></Link>
                    {/* <Link to='/#contact-us'><a><p>تماس با ما</p></a></Link> */}
                    <div><a href='/#contact-us'><p>تماس با ما</p></a></div>
                    <Link to='/privacy-policy'><a><p>قوانین حریم خصوصی</p></a></Link>
                </div>

                <div className={'footerPics'}>
                    <AboutCard />
                    <AboutCard />
                </div>
            </div>
            <div className={'footerContent'}>
                <div className={'footerContactLinks'}>
                    <a target='blank' href='https://instagram.com/aquaex'><img style={{ width: "25px", height: "25px" }} src='/svg/insta.svg' /></a>
                    <a target='blank' href='https://t.me/aquadefi'><img style={{ width: "25px", height: "25px" }} src='/svg/telegram.svg' /></a>
                    <a target='blank' href='https://twitter.com/aquaex'><img style={{ width: "25px", height: "25px" }} src='/svg/twitter.svg' /></a>
                    <a target='blank' href='https://linkedin.com/company/aqua'><img style={{ width: "25px", height: "25px" }} src='/svg/linkedin.svg' /></a>
                    <a target='blank' href='https://youtube.com/c/aquaDEFI'><img style={{ width: "25px", height: "25px" }} src='/svg/youtube.svg' /></a>
                    <a target='blank' href='/https://discord.com/invite/cS26RRFeGJ'><img style={{ width: "25px", height: "25px" }} src='/svg/discord logo.svg' /></a>
                </div>
                <div className={'copyRight'}>
                    <p>کلیه حقوق این سایت متعلق به شرکت نوآوری دیجیتال پورداد میباشد     &copy;     {year}</p>
                </div>
            </div>
        </div>

    );
}

export default Footer;