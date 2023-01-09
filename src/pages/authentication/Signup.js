import React, { useEffect, useRef, useState, useContext } from 'react';
import API from '../../utils/api';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { BG_URL, PUBLIC_URL } from '../../utils/utils';
import GoogleLogin from 'react-google-login';
import './Signup.css';
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Helmet } from "react-helmet";
import MobileDrawer from '../landing/MobileDrawer';
import { getuser } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down("xs")]: {
            paddingTop: 10,
            paddingBottom: '100px'
        },
        [theme.breakpoints.between("sm", "md")]: {
            paddingTop: 100
        },
    },
    placeHolder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: '50px',
        borderBottomLeftRadius: '50px',
        boxShadow: ' 0px 8px 15px 4px rgba(0,0,0,0.2)',
        // [theme.breakpoints.down('xs')]: {
        //     height: '72vh',
        //     borderRadius: '20px',
        // },
        [theme.breakpoints.between("sm", "md")]: {
            height: '700px'
        },
        "@media (min-width: 1280px)": {
            height: '85vh',
        }
    },
    whiteBox: {
        background: 'white',
        borderTopRightRadius: '50px',
        borderBottomRightRadius: '50px',
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '10px',
            padding: '40px 0px  ',
            padding: '10px',

        },
        [theme.breakpoints.between("sm", "md")]: {
            height: '700px'
        },
        "@media (min-width: 1280px)": {
            height: '85vh',
        }
    },
    inputsWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '10px',
            padding: '10px 0px  ',
        },
        [theme.breakpoints.between("sm", "md")]: {
            height: '420px'
        },
        "@media (min-width: 1280px)": {
            height: '60vh',
        }
    },
    inputsBox: {
        width: '60%',
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '85%'
        },
    },
    signupHeader: {
        textAlign: 'center',
        color: '#64c5ba',
        fontWeight: '600 !important',
        paddingBottom: '10px',
        [theme.breakpoints.down('xs')]: {
            padding: '0px',
        },
        [theme.breakpoints.between("sm", "md")]: {
            paddingTop: '100px',
        },
        "@media (min-width: 1000px)": {
            paddingTop: '10vh',
        },
    },
    button: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        width: '150px',
        color: 'white',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '50%'
        },
    },
    whiteButton: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '49%',
        color: '#64c5ba',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '50%'
        },
    },
    otpGreenButton: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        width: '49%',
        display: 'inline-block',
        color: 'white',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '50%'
        },
    },
    otpWhiteButton: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '50%',
        display: 'inline-block',
        color: '#64c5ba',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '50%'
        },
    },
    divider: {
        margin: '10px 0px',
        borderBottom: '2px solid #64c5ba'
    },
    googlebtn: {
        padding: '10px 20px !important',
        fontSize: '20px !important',
        fontWeight: 'bold !important',
        backgroundColor: 'none !important',
        border: '1px solid #64c5ba !important',
        margin: '0 auto !important',
        width: '100% !important',
        textAlign: 'center !important',
        color: '#64c5ba !important',
        borderRadius: '20px !important'
    },
    cubeLogo: {
        width: '70%'
    },
    fakeButton: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        width: '150px',
        color: 'white',
        display: 'inline-block',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '50%'
        },
    },
    modal: {
        position: 'absolute',
        width: '800px',
        height: '400px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '10px '
    },
    otpModal: {
        position: 'absolute',
        width: '350px',
        height: '350px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '20px',
        [theme.breakpoints.down('xs')]: {
            padding: '30px',
            width: '300px',
        },
        [theme.breakpoints.between("sm", "md")]: {
            padding: '0px 40px',
            margin: '10px',
            width: '400px',
            height: '400px',
        },
        "@media (min-width: 1200px)": {
            // paddingTop: '10px',
        },
    },
    otpHeader: {
        textAlign: 'center',
        color: '#64c5ba',
        fontWeight: '600 !important',
        paddingBottom: '10px',
        [theme.breakpoints.down('xs')]: {
            padding: '0px',
        },
        [theme.breakpoints.between("sm", "md")]: {
            paddingTop: '100px',
        },
        "@media (min-width: 1200px)": {
            paddingTop: '10px',
        },
    },
    loginLink: {
        textAlign: 'center',
        color: '#64c5ba',
        textDecoration: 'none',
        margin: '10px 0px',
        '&:hover': {
            color: '#30a000'
        },
    },
    signupModal: {
        position: 'absolute',
        width: '300px',
        height: '150px',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none !important',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '20px',
        outline: 'none'
    },
    inputsTooltips: {
        fontSize: '14px',
        color: '#64c5ba !important',
        margin: '10px 0px'
    },
    buttonWrapper: {
        position: 'absolute',
        textAlign: 'center',
        width: '90%',
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            bottom: -40,
        },
    }

}))
export default function Signup() {

    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPass: '',
        phone_number: '',
        email: '',
        group: 'student',
        google_image_url: '',
        googleId: '',
        accessToken: '',
        otp: ''
    })
    //modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openOtp, setOpenOtp] = React.useState(false);
    const handleOpenOtp = () => setOpenOtp(true);
    const handleCloseOtp = () => setOpenOtp(false);
    //end of modal
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [otpLoading, setOtpLoading] = useState(false)
    const [checkboxValue, setCheckBoxValue] = useState(false);
    const [googleAuth, setGoogleAuth] = useState(undefined)
    const [googleAuthError, setGoogleAuthError] = useState(undefined)
    const [signupDoneModal, setSignupDoneModal] = useState(false)
    const [inputVisibility, setInputVisibility] = useState(false)
    const [inputType, setInputType] = useState("password")
    const dispatch = useDispatch()
    //otp timer

    const [counter, setCounter] = React.useState(0);
    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    //end of otp timer
    const [otpErr, setOtpErr] = useState(false)
    const responseGoogle = (response) => {
        setGoogleAuth(response)
    }
    const responseGoogleError = (response) => {
        if (response.details !== undefined && response.details.indexOf("Not a valid origin for the client") !== -1)
            setGoogleAuthError("ثبت نام با گوگل موفقیت آمیز نبود،لطفا مجددا امتحان کنید.")
        else
            setGoogleAuthError("ثبت نام با گوگل موفقیت آمیز نبود،لطفا مجددا امتحان کنید.")
    }

    useEffect(() => {
        if (googleAuth !== undefined) {
            var u = { ...user };
            u.accessToken = googleAuth.accessToken;
            u.googleId = googleAuth.googleId;
            u.google_image_url = googleAuth.profileObj.imageUrl;
            u.username = googleAuth.profileObj.name;
            u.email = googleAuth.profileObj.email;
            setUser(u);
            signupWithGoogleRequest(u);
        }
    }, [googleAuth])
    const signupWithGoogleRequest = async (u) => {
        try {
            apiCall.current = API.request('/user/login/google/', true, {
                email: u.email,
                google_id: u.googleId,
                image_url: u.google_image_url,
                username: u.username,
            });
            const res = await apiCall.current.promise
            if (res.access) {
                await storeData(res)
                setSignupDoneModal(true)
                dispatch(getuser())
                setTimeout(() => {
                    setSignupDoneModal(false)
                    history.push('/edit-profile')
                }, 1000);
            }
        }
        catch (err) {
            setError('ثبت نام با گوگل موفقیت آمیز نبود،لطفا مجددا امتحان کنید')
            setLoading(false)
        }
    }
    const onChange = e => {
        var u = { ...user };
        u[e.target.name] = e.target.value;
        setUser(u);
    }

    const handleCheckBox = () => {
        if (checkboxValue === true)
            setCheckBoxValue(false)
        else setCheckBoxValue(true)
    }
    const validatePhone = (phone) => {
        if (phone.indexOf('09') === -1) {
            setError('لطفا شماره موبایل را با 09 وارد کنید.')
            return false
        }
        else {
            const re = /^(\+98|0098|98|0)?9\d{9}$/g;
            const testMobile = re.test(String(phone));
            if (testMobile)
                return true
            else {
                setError('شماره موبایل اشتباه است!')
                return false
            }
        };
    }
    const validatePassword = (pass) => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const testPass = strongRegex.test(pass)
        return testPass
    }

    const phoneSubmit = async (e) => {
        e.preventDefault()
        let isPhonevalid = validatePhone(user.phone_number)
        if (!isPhonevalid) {
            return;
        }
        if (user.password.length === 0) {
            setError('رمز عبور نمیتواند خالی باشد!');
            return;
        }
        if (user.password.length < 8) {
            setError('رمز عبور نمیتواند کمتر از 8 حرف باشد!');
            return;
        }
        if (user.confirmPass.length === 0) {
            setError('تایید رمز عبور نمیتواند خالی باشد!');
            return;
        }
        // 
        if (user.confirmPass.length < 8) {
            setError('تایید رمز عبور نمیتواند کمتر از 8 حرف باشد!');
            return;
        }
        if (user.confirmPass !== user.password) {
            setError('رمز عبور و تایید رمز عبور یکسان نیستند!');
            return;
        }
        if (!checkboxValue) {
            setError('لطفا شرایط و قوانین سایت را مطالعه نموده و قبول کنید.')
            return;
        }
        // let isStrongPass = validatePassword(user.password)
        // if (!isStrongPass) {
        //     setError('رمز عبور ضعیف است')
        //     return;
        // }
        setGoogleAuthError(undefined)
        setLoading(true)
        setError(undefined)
        otpRequest(user)
    }
    const otpRequest = async (user) => {
        try {
            apiCall.current = API.request('/user/otp-req/signup/', true, {
                phone_number: user.phone_number,
            });
            const res = await apiCall.current.promise
            if (res.message === 'User already registered, please login' || res.message === 'User already exists, please login') {
                setError('کاربری با این شماره وجود دارد.لطفا از بخش ورود استفاده کنید')
                setLoading(false)
                return
            }
            if (res.message == 'OTP issue') {
                setError('خطایی رخ داده است، لطفا مجددا امتحان کنید')
                setLoading(false)
                return;
            }
            setLoading(false)
            setError(undefined)
            handleOpenOtp(true)
            setCounter(120)
        }
        catch (err) {
            setError('خطایی رخ داده است، لطفا مجددا امتحان کنید')
            setLoading(false)
        }
    }
    const otpSubmit = async (e) => {
        e.preventDefault()
        setOtpLoading(true)
        try {
            apiCall.current = API.request('/user/signup/otp/', true, {
                code: user.otp,
                phone_number: user.phone_number,
                password: user.password,
                timestamp: parseInt(Date.now() / 1000)
            });
            const res = await apiCall.current.promise
            if (res.message === "Valid OTP code for signup") {
                handleCloseOtp()
                setSignupDoneModal(true)
                setTimeout(() => {
                    setSignupDoneModal(false)
                    history.push('/login')
                }, 1000);

            }
            else if (res.message == "Invalid OTP code for signup") {
                setOtpErr('کد اشتباه است!')
                setOtpLoading(false)
                return false
            }
            else {
                setOtpLoading(false)
                setOtpErr('خطایی رخ داده است، لطفا مجددا امتحان کنید.')
            }
            // ======================================================server error or otp error any thing else===============================================================
        }
        catch (err) {
            setOtpErr('خطایی رخ داده است، لطفا مجددا امتحان کنید.')
            setOtpLoading(false)
            setLoading(false)
        }
    }
    //===========================================store token in local storage=============================================================
    const storeData = async (tokens) => {
        let refresh = tokens.refresh.toString()
        let access = tokens.access.toString()
        localStorage.setItem("accessToken", access)
        localStorage.setItem("isProfileUpdated", false)
        return
    }
    const resendOtp = async (user) => {
        setCounter(120)
        otpRequest(user)
    }
    useEffect(() => {
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, []);
    const checkEnglishInput = () => {
        const re = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/
        const validity = re.test(String(user.password));
        if (validity == true) {
            setError(undefined)
        }
        else
            setError('لطفا از حروف انگلیسی استفاده کنید')
    }
    useEffect(() => {
        if (inputVisibility)
            setInputType("text")
        else {
            setInputType("password")
        }
    }, [inputVisibility])
    const handleVisibility = () => {
        if (inputVisibility) {
            setInputVisibility(false)
        }
        else {
            setInputVisibility(true)

        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ثبت نام</title>
                <link rel="canonical" href="http://aqua.ir/signup" />
            </Helmet>
            <section className={classes.wrapper} style={{
                backgroundImage: BG_URL(PUBLIC_URL('images/bg.png')),
                backgroundSize: 'auto 100%',
                backgroundPosition: 'center',
                display: 'flex'
            }} >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 " style={{ padding: 0 }}>
                            <div className={classes.whiteBox}  >
                                <h1 className={classes.signupHeader}>ثبت نام</h1>
                                <div className={classes.inputsWrapper}  >
                                    <div className={classes.inputsBox}  >
                                        <form>
                                            <div className="row">
                                                <div className="col-md-1"></div>

                                                <div className="col-md-3">
                                                    <div className="text-dark" style={{ fontWeight: '600 !important' }}>
                                                        شماره موبایل
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <input className="signupFiledsInput76345 form-control" value={user.phone_number} name="phone_number" onChange={onChange} type="number" style={{ backgroundColor: '#f2f2f2' }} />
                                                </div>
                                                <div className="col-md-1"></div>
                                                <div className="col-md-3">
                                                    <div className="text-dark" style={{ fontWeight: '600 !important' }}>رمز عبور</div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div style={{ position: 'relative' }}>
                                                        <input className="signupFiledsInput76345 form-control"
                                                            value={user.password}
                                                            onChange={onChange}
                                                            name="password"
                                                            type={inputType}
                                                            onBlur={checkEnglishInput}
                                                        >
                                                        </input>
                                                        <VisibilityIcon onClick={handleVisibility} className="text-dark" style={{ position: 'absolute', top: 5, left: 10, cursor: 'pointer' }} />
                                                    </div>
                                                </div>

                                                <div className="col-md-1"></div>
                                                <div className="col-md-3">
                                                    <div className="text-dark" style={{ fontWeight: '600 !important' }}>تایید رمز عبور</div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div style={{ position: 'relative' }}>
                                                        <input className="signupFiledsInput76345 form-control "
                                                            value={user.confirmPass}
                                                            onChange={onChange}
                                                            name="confirmPass"
                                                            type={inputType}
                                                        />
                                                        <VisibilityIcon onClick={handleVisibility} className="text-dark" style={{ position: 'absolute', top: 5, left: 10, cursor: 'pointer' }} />
                                                    </div>

                                                    {error ? <div style={{ color: 'red', margin: '5px 0px' }}>{error}</div> : undefined}
                                                    <div style={{ margin: '10px 0px' }}>
                                                        <input type="checkbox" style={{ marginLeft: '5px' }} onClick={handleCheckBox} />
                                                        <span className="text-dark">
                                                            <Link to="/terms-of-service" target={"_blank"} style={{ textDecoration: 'underline', cursor: 'pointer', color: '#64c5ba' }}>شرایط و قوانین</Link>
                                                            &nbsp;  استفاده از سرویس های سایت آکادمی بیتداد و  &nbsp;
                                                            <Link to="/privacy-policy" target={"_blank"} style={{ textDecoration: 'underline', cursor: 'pointer', color: '#64c5ba' }}>قوانین حریم خصوصی </Link>
                                                            &nbsp;  را مطالعه نموده و قبول کرده‌ام.
                                                        </span>
                                                    </div>
                                                    {loading ? <div className={classes.fakeButton}><CircularProgress size={20} /> </div> : <button type="submit" onClick={phoneSubmit} className={classes.button}>ثبت نام </button>}
                                                    <button onClick={() => history.push("/")} className={classes.whiteButton}>انصراف</button>
                                                </div>
                                                <div className="col-md-4"></div>
                                                <div className="col-md-8">
                                                    <div className={classes.divider}></div>
                                                    <div className="google544654">
                                                        <GoogleLogin
                                                            clientId="205979477713-npre72tckmd2utr9nr0dk3c7mfc1ag70.apps.googleusercontent.com"
                                                            buttonText="ورود با گوگل"
                                                            onSuccess={responseGoogle}
                                                            onFailure={responseGoogleError}
                                                            cookiePolicy={'single_host_origin'}
                                                            className={classes.googlebtn}
                                                        />
                                                        {googleAuthError ? <div style={{ color: 'red', margin: '5px 0px' }}>{googleAuthError}</div> : undefined}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className={classes.buttonWrapper}>
                                    <MobileDrawer />
                                </div>
                            </div>
                        </div>
                        <div className="no-mobile col-sm-4" style={{ padding: 0 }}>
                            <div className={classes.placeHolder} style={{
                                backgroundImage: BG_URL(PUBLIC_URL('images/place-holder.png')),
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }} >
                                <img className={classes.cubeLogo} src={PUBLIC_URL('images/BLOCKCHAINSIGNUP.svg')} alt='blockchain-logo' />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <div className={classes.modal}>
                            <div className="text-center text-dark">
                                terms of service
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        open={signupDoneModal}
                        onClose={handleClose}
                        disableBackdropClick
                    >
                        <div className={classes.signupModal}>
                            <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%' }}>
                                <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "40px" }} />
                                <span className="text-dark" style={{ marginRight: '10px' }}>ثبت نام موفقیت آمیز بود</span>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        open={openOtp}
                        onClose={handleCloseOtp}
                        disableBackdropClick
                    >
                        <>
                            <div className={classes.otpModal}>
                                <h3 className={classes.otpHeader}>رمز یکبار مصرف</h3>
                                <p className="text-dark" style={{ textAlign: 'center' }}>رمز یکبار مصرف برای {user.phone_number} ارسال شد</p>
                                <form>
                                    <input className="form-control" value={user.otp} name="otp" onChange={onChange} type="number" style={{ backgroundColor: '#f2f2f2', margin: '20px 0px' }} />
                                    {otpLoading ? <div className={classes.fakeButton}><CircularProgress size={20} /></div> : <button type="submit" onClick={otpSubmit} className={classes.otpGreenButton}>ثبت</button>}
                                    <button onClick={() => handleCloseOtp()} className={classes.otpWhiteButton}>انصراف</button>
                                </form>
                                <div>
                                    {counter === 0 ? <div style={{ margin: '10px 0px', textAlign: 'center', color: '#64c5ba', cursor: 'pointer' }} onClick={() => resendOtp(user)}>ارسال دوباره رمز یکبار مصرف</div> : undefined}
                                </div>
                                {counter !== 0 ? <div className="text-dark" style={{ margin: '10px 0px', textAlign: 'center' }}>ارسال دوباره رمز در {counter}</div> : undefined}
                                {otpErr ? <div style={{ color: 'red', fontSize: '12px' }}>{otpErr}</div> : undefined}
                            </div>
                        </>
                    </Modal>
                </div >

            </section >
        </>
    )
}
