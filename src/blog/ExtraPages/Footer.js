import React, { useEffect, useState, useContext } from 'react';
import './Footer.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { PUBLIC_URL, BG_URL } from '../utils/utils';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InfoIcon from '@mui/icons-material/Info';
export default function Footer(props) {
    return (
        <section className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-6">
                        <a className="footer-aqua-link-to-home" style={{ display: 'block' }} href="https://aqua.ir">
                            <img width="30%" src={PUBLIC_URL('images/logo.svg')} alt="logo" />
                        </a>
                    </div>
                    <div className="col-md-4 col-6">
                        <h6 className="footer-headers">شبکه های اجتماعی</h6>
                        <div className="socialmedia-icons-wrapper">
                            <a href="https://t.me/aquadex" target="_blank" rel="noreferrer">
                                <TelegramIcon style={{ fontSize: '40px' }} />
                            </a>
                            <a href="https://instagram.com/aquaex?utm_medium=copy_link" target="_blank" rel="noreferrer">
                                <InstagramIcon style={{ fontSize: '40px' }} />
                            </a>
                            <a href="https://twitter.com/aquaex?s=11" target="_blank" rel="noreferrer">
                                <TwitterIcon style={{ fontSize: '40px' }} />
                            </a>
                            <a href="https://www.youtube.com/c/aquaDEFI" target="_blank" rel="noreferrer">
                                <YouTubeIcon style={{ fontSize: '40px' }} />
                            </a>
                            <a href="https://www.linkedin.com/company/aqua/" target="_blank" rel="noreferrer">
                                <LinkedInIcon style={{ fontSize: '40px' }} />
                            </a>
                        </div>
                    </div>
                    {/* <div className="col-md-3 col-6">
                        <Link className="footer-headers footer-links" to="/about-us">
                            <h6 >About us</h6>
                        </Link>
                        <div>
                            <div className="footer-links">Address: </div>
                            <div className="footer-links" >Hansaring 61,50670,Cologne, Germany</div>
                        </div>
                    </div> */}
                    <div className="col-md-4 col-6">
                        <div className="call-us-wrapper">
                            <div>
                                <InfoIcon style={{ fontSize: '30px', display: 'inline-block', marginRight: 5 }} />
                            </div>
                            <Link className="footer-headers footer-links" to={"/about-us"}>
                                <h6 >درباره ما</h6>
                            </Link>
                            <Link className="footer-headers footer-links" to={"/contact-us"}>
                                <h6 >تماس با ما</h6>
                            </Link>
                            {/* <div>
                                <div className="call-us-text">
                                    <Link> className="telephone-link" href="tel: +4917634333064">+4917634333064</a>
                                    <br></br>
                                    <a className="telephone-link" href="tel: +492211612393">+492211612393</a>
                                    <br></br>
                                    <div className="call-us-text">
                                        <a className="telephone-link">Fax:+492211612100</a>
                                    </div>
                                </div>
                                <div className="call-us-phone-logo">

                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
