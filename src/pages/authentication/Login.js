import React, { useEffect, useRef, useState } from 'react';
import API from '../../utils/api';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { BG_URL, PUBLIC_URL } from '../../utils/utils';
import GoogleLogin from 'react-google-login';
import './Signup.css';
import { Link, useHistory, Redirect } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux'
import { getuser } from '../../redux/actions';
import MobileDrawer from '../landing/MobileDrawer';

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
            margin: '10px',

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
            padding: '0px 0px  ',
            margin: '10px'
        },
        [theme.breakpoints.between("sm", "md")]: {
            height: '400px'
        },
        "@media (min-width: 1280px)": {
            height: '400px',
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
        width: '148px',
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
        width: '148px',
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
        width: '50%',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
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
        margin: '20px 0px',
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
        [theme.breakpoints.between("sm", "md")]: {
            paddingTop: '80px',
        },
        "@media (min-width: 1000px)": {
            paddingTop: '0px',
            height: '350px',
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
            paddingTop: '0px',
        },
        "@media (min-width: 1200px)": {
            paddingTop: '10px',
        },
    },
    loginLink: {
        textAlign: 'center',
        color: '#64c5ba',
        margin: '10px 0px',
        textDecoration: 'none',
        '&:hover': {
            color: '#30a000'
        },
    },
    loginDoneModal: {
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
    buttonWrapper: {
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            bottom: -40,
        },
    }
}))
export default function Signup() {
    const { globalUser } = useSelector(state => state.userReducer);
    const dispatch = useDispatch()
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [user, setUser] = useState({
        username: '',
        password: '',
        phone: '',
        otp: ''
    })
    //modal
    const [openOtp, setOpenOtp] = useState(false);
    //end of modal
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [googleAuth, setGoogleAuth] = useState(undefined)
    const [googleAuthError, setGoogleAuthError] = useState(undefined)
    //otp timer
    const [counter, setCounter] = useState(0);
    const [switchView, setSwitchView] = useState(false)
    const [otpErr, setOtpError] = useState(undefined)
    const [sendOtpLoading, setSendOtpLoading] = useState(undefined)
    const [otpSubmitLoading, setOtpSubmitLoading] = useState(undefined)
    const [loginDoneModal, setLoginDoneModal] = useState(false)
    const [inputVisibility, setInputVisibility] = useState(false)
    const [inputType, setInputType] = useState("password")
    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    //end of otp timer

    const responseGoogle = (response) => {
        setGoogleAuth(response)
    }
    const responseGoogleError = (response) => {
        console.log(response)
        setGoogleAuthError("Google login failed")
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
            console.log(res)
            if (res.access) {
                await storeData(res)
                setOpenOtp(false)
                setLoginDoneModal(true)
                setTimeout(() => {
                    setLoginDoneModal(false)
                }, 1000);
                try {
                    apiCall.current = API.request('/user/check-token/', true, {
                        token: res.access
                    });
                    const response = await apiCall.current.promise
                    if (response.message == "Valid token") {
                        dispatch(getuser())
                        // alert('todo redux google')
                        // dispatch()
                        // checkTokenFiller(response.data, res.access, res.refresh)
                        history.push('/welcome')
                    }
                }
                catch (err) {
                    setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
                    setLoading(false)
                }

            }
        }
        catch (err) {
            setError(err.toString())
            setLoading(false)
        }
    }
    const onChange = e => {
        var u = { ...user };
        u[e.target.name] = e.target.value;
        setUser(u);
    }

    const resendOtp = async () => {
        setCounter(120)
        otpRequest(user)
    }
    useEffect(() => {
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, []);
    function emailValidation(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function validatePhone(phone) {
        if (phone.indexOf('09') === -1) {
            return false
        }
        else {
            const re = /^(\+98|0098|98|0)?9\d{9}$/g;
            const testMobile = re.test(String(phone));
            if (testMobile)
                return true
            else {
                return false
            }
        };
    }
    const userPassLogin = async (e) => {
        e.preventDefault()
        let isPhonevalid = validatePhone(user.username)
        let isMailValid = emailValidation(user.username)
        if (!isPhonevalid && !isMailValid) {
            setError('شماره موبایل یا ایمیل نامعتبر است!');
            return false;
        }
        if (user.password.length === 0) {
            setError('رمز عبور نمیتواند خالی باشد!');
            return;
        }
        // if (user.password.length < 8) {
        //     setError('رمز عبور نمیتواند کمتر از 8 حرف باشد!');
        //     return;
        // }
        setError(undefined)
        setLoading(true)
        //=======================================================login with user name and password
        try {
            apiCall.current = API.request('/user/login/', true, {
                email_or_phone_number: user.username,
                password: user.password,
            });
            const res = await apiCall.current.promise
            console.log(res)
            if (res.detail === 'No active account found with the given credentials' || res.message == 'can not authenticate with the given credentials' || res.message == "wrong credentials") {
                setError('کاربری با این مشخصات یافت نشد.')
                setLoading(false)
                return
            }
            if (res.access) {
                await storeData(res)
                setLoginDoneModal(true)
                dispatch(getuser())
            }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
            setLoading(false)
            console.log(err)
        }
    }
    const storeData = async (tokens, id) => {
        let access = tokens.access.toString()
        localStorage.setItem("accessToken", access)
    }
    const otpSubmit = async (e) => {
        e.preventDefault()
        setOtpSubmitLoading(true)
        try {
            apiCall.current = API.request('/user/login/otp/', true, {
                phone_number: user.phone,
                code: user.otp,
                timestamp: parseInt(Date.now() / 1000)
            });
            const res = await apiCall.current.promise
            console.log(res)
            if (res.message == "Invalid OTP code for forgot password") {
                setOtpError('کد اشتباه است!')
                setOtpSubmitLoading(false)
            }
            if (res.message == "OTP code has been expire") {
                setOtpError('کد منقضی شده است!')
                setOtpSubmitLoading(false)
            }
            if (res.access) {
                setLoading(false)
                setLoginDoneModal(true)
                setOpenOtp(false)
                await storeData(res)
                setLoginDoneModal(true)
                setTimeout(() => {
                    setLoginDoneModal(false)
                }, 1000);
                try {
                    apiCall.current = API.request('/user/check-token/', true, {
                        token: res.access
                    });
                    const response = await apiCall.current.promise
                    if (response.message == "Valid token") {
                        dispatch(getuser());
                    }
                }
                catch (err) {
                    setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
                    setLoading(false)
                }
                setTimeout(() => {
                    setLoginDoneModal(false)
                }, 1000);
            }
        }
        catch (err) {
            setOtpError('خطایی رخ داده است!')
            setOtpSubmitLoading(false)
        }
    }
    const checkPhone = () => {
        let isPhoneValid = validatePhone(user.phone);
        if (isPhoneValid) {
            otpRequest(user)
            return
        }
        else {
            setOtpError('شماره موبایل نامعتبر است!');
            return
        }
    }
    const otpRequest = async (user) => {
        setSendOtpLoading(true)
        try {
            apiCall.current = API.request('/user/otp-req/forgot-password/', true, {
                phone_number: user.phone,
            });
            const res = await apiCall.current.promise
            if (res.message == 'User not registered, please register') {
                setOtpError('کاربری با این شماره موبایل یافت نشد');
                setSendOtpLoading(false)
                return
            }
            else {
                setSendOtpLoading(false)
                setOtpError(undefined)
                setSwitchView(true);
                setCounter(120);
                return
            }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
            setLoading(false)
        }
    }
    useEffect(() => {
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, []);
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
    if (globalUser.isLoggedIn)
        return <Redirect to="/welcome" />
    else
        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>ورود</title>
                    <link rel="canonical" href="http://aqua.ir/login" />
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
                                    <h1 className={classes.signupHeader}>ورود</h1>
                                    <div className={classes.inputsWrapper}>
                                        <div className={classes.inputsBox}>
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="text-dark" style={{ fontWeight: '600 !important', fontSize: '14px', marginTop: '5px' }}>
                                                            ایمیل یا شماره موبایل
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <input className="signupFiledsInput76345 form-control" value={user.username} name="username" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="text-dark" style={{ fontWeight: '600 !important', fontSize: '14px', marginTop: '5px' }}>رمز عبور</div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div style={{ position: 'relative' }}>
                                                            <input className="signupFiledsInput76345 form-control "
                                                                value={user.password}
                                                                onChange={onChange}
                                                                name="password"
                                                                type={inputType}
                                                            />
                                                            <VisibilityIcon onClick={handleVisibility} className="text-dark" style={{ position: 'absolute', top: 5, left: 10, cursor: 'pointer' }} />
                                                        </div>

                                                        <div>
                                                            <div style={{ margin: '10px 0px', color: '#64c5ba', cursor: 'pointer' }} onClick={() => setOpenOtp(true)}>ورود با رمز یکبار مصرف</div>
                                                        </div>
                                                        {error ? <div style={{ color: 'red', margin: '5px 0px' }}>{error}</div> : undefined}
                                                        <div style={{ margin: '10px 0px' }}></div>
                                                        {!loading ? <button type="submit" onClick={userPassLogin} className={classes.button}>ورود </button> : <div className={classes.otpGreenButton}><CircularProgress size={20} /></div>}
                                                        <button onClick={() => history.push("/")} className={classes.whiteButton}>انصراف</button>
                                                    </div>
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-8">
                                                        <div className={classes.divider}></div>
                                                        <div className="google544654">
                                                            <GoogleLogin
                                                                clientId="607447337040-9733v7rdbinir9qlahnu1ib5baansf83.apps.googleusercontent.com"
                                                                buttonText="ورود با گوگل"
                                                                onSuccess={responseGoogle}
                                                                onFailure={responseGoogleError}
                                                                cookiePolicy={'single_host_origin'}
                                                                className={classes.googlebtn}
                                                            />
                                                            {googleAuthError ? <div style={{ color: 'red', margin: '5px 0px' }}>{googleAuthError}</div> : undefined}
                                                        </div>
                                                        {googleAuthError ? <div style={{ color: 'red', margin: '5px 0px' }}>{googleAuthError}</div> : undefined}
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
                            open={openOtp}
                            disableBackdropClick
                        >
                            <>
                                <div className={classes.otpModal}>
                                    <h3 className={classes.otpHeader}>رمز یکبار مصرف</h3>
                                    {!switchView ?
                                        <>
                                            <p className="text-dark" style={{ textAlign: 'center' }}>شماره موبایل خود را وارد کنید</p>
                                            <input className="signupFiledsInput76345 form-control" value={user.phone} name="phone" onChange={onChange} type="number" style={{ backgroundColor: '#f2f2f2', margin: '20px 0px' }} />
                                            {!sendOtpLoading ? <button onClick={() => checkPhone()} className={classes.otpGreenButton}>ثبت</button> : <div className={classes.otpGreenButton}><CircularProgress size={20} /></div>}

                                            <button onClick={() => setOpenOtp(false)} className={classes.otpWhiteButton}>انصراف</button>
                                            {otpErr ? <div style={{ color: 'red', margin: '10px 0px' }}>{otpErr}</div> : undefined}
                                        </>
                                        :
                                        <>
                                            <p className="text-dark" style={{ textAlign: 'center' }}>رمز یکبار مصرف برای {user.phone} ارسال شد</p>
                                            <form>
                                                <input className="signupFiledsInput76345 form-control" value={user.otp} name="otp" onChange={onChange} type="number" style={{ backgroundColor: '#f2f2f2', margin: '20px 0px' }} />
                                                {!otpSubmitLoading ? <button type="submit" onClick={otpSubmit} className={classes.otpGreenButton}>ثبت</button> : <div className={classes.otpGreenButton} ><CircularProgress size={20} /></div>}
                                                <button onClick={() => setSwitchView(false)} className={classes.otpWhiteButton}>ویرایش موبایل</button>
                                                {otpErr ? <div style={{ margin: '10px 0px', textAlign: 'center', color: 'red' }}>{otpErr}</div> : undefined}
                                            </form>
                                            <div>
                                                {counter === 0 ? <div style={{ margin: '10px 0px', textAlign: 'center', color: '#64c5ba', cursor: 'pointer' }} onClick={() => resendOtp()}>ارسال دوباره رمز یکبار مصرف</div> : undefined}
                                            </div>
                                            {counter !== 0 ? <div className="text-dark" style={{ margin: '10px 0px', textAlign: 'center' }}>ارسال دوباره رمز در {counter}</div> : undefined}
                                        </>
                                    }

                                </div>
                            </>
                        </Modal>
                        <Modal
                            open={loginDoneModal}
                            onClose={() => setLoginDoneModal(false)}
                        >
                            <div className={classes.loginDoneModal}>
                                <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%' }}>
                                    <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "40px" }} />
                                    <span className="text-dark" style={{ marginRight: '10px' }}>ورود موفقیت آمیز بود</span>
                                </div>
                            </div>
                        </Modal>
                    </div>

                </section>
            </>
        )
}
