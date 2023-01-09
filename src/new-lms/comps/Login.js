import React, { useEffect, useRef, useState } from 'react';
import '../style/loginSignup.css'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import { Link, useHistory, Redirect } from "react-router-dom";
import API from '../../utils/api';
import { CircularProgress } from '@material-ui/core';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector, useDispatch } from 'react-redux'
import { getuser } from '../../redux/actions';
import Input from '@mui/material/Input';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // [theme.breakpoints.down("xs")]: {
        //     paddingTop: 10,
        //     paddingBottom: '100px'
        // },
        // [theme.breakpoints.between("sm", "md")]: {
        //     paddingTop: 100
        // },
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
        // [theme.breakpoints.between("sm", "md")]: {
        //     height: '700px'
        // },
        "@media (min-width: 1280px)": {
            height: '85vh',
        }
    },
    whiteBox: {
        background: 'white',
        borderTopRightRadius: '50px',
        borderBottomRightRadius: '50px',
        position: 'relative',
        // [theme.breakpoints.down('xs')]: {
        //     borderRadius: '10px',
        //     padding: '40px 0px  ',
        //     margin: '10px',

        // },
        // [theme.breakpoints.between("sm", "md")]: {
        //     height: '700px'
        // },
        "@media (min-width: 1280px)": {
            height: '85vh',
        }
    },
    inputsWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // [theme.breakpoints.down('xs')]: {
        //     borderRadius: '10px',
        //     padding: '0px 0px  ',
        //     margin: '10px'
        // },
        // [theme.breakpoints.between("sm", "md")]: {
        //     height: '400px'
        // },
        "@media (min-width: 1280px)": {
            height: '400px',
        }
    },
    inputsBox: {
        width: '60%',
        // [theme.breakpoints.down('xs')]: {
        //     width: '80%',
        // },
        // [theme.breakpoints.between("sm", "md")]: {
        //     width: '85%'
        // },
    },
    signupHeader: {
        textAlign: 'center',
        color: '#143f46',
        fontWeight: '600 !important',
        paddingBottom: '10px',
        // [theme.breakpoints.down('xs')]: {
        //     padding: '0px',
        // },
        // [theme.breakpoints.between("sm", "md")]: {
        //     paddingTop: '100px',
        // },
        "@media (min-width: 1000px)": {
            paddingTop: '10vh',
        },
    },
    button: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#143f46',
        borderRadius: '5px',
        width: '148px',
        color: 'white',
        // [theme.breakpoints.down('xs')]: {
        //     width: '50%',
        // },
        // [theme.breakpoints.between("sm", "md")]: {
        //     width: '50%'
        // },
    },
    whiteButton: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '148px',
        color: '#143f46',
        // [theme.breakpoints.down('xs')]: {
        //     width: '50%',
        // },
        // [theme.breakpoints.between("sm", "md")]: {
        //     width: '50%'
        // },
    },
    otpGreenButton: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#143f46',
        borderRadius: '5px',
        width: '50%',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        // [theme.breakpoints.down('xs')]: {
        //     width: '50%',
        // },
        // [theme.breakpoints.between("sm", "md")]: {
        //     width: '50%'
        // },
    },
    otpWhiteButton: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '50%',
        display: 'inline-block',
        color: '#143f46',
        // [theme.breakpoints.down('xs')]: {
        //     width: '50%',
        // },
        // [theme.breakpoints.between("sm", "md")]: {
        //     width: '50%'
        // },
    },
    divider: {
        margin: '20px 0px',
        borderBottom: '2px solid #143f46'
    },
    googlebtn: {
        padding: '10px 20px !important',
        fontSize: '20px !important',
        fontWeight: 'bold !important',
        backgroundColor: 'none !important',
        border: '1px solid #143f46 !important',
        margin: '0 auto !important',
        width: '100% !important',
        textAlign: 'center !important',
        color: '#143f46 !important',
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
        height: '450px',
        top: '50%',
        direction: "rtl",
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none',
        padding: '20px',
        margin: '10px',
        borderRadius: '20px',
        // [theme.breakpoints.between("sm", "md")]: {
        //     paddingTop: '80px',
        // },
    },
    otpHeader: {
        textAlign: 'center',
        color: '#143f46',
        fontWeight: '600 !important',
        paddingBottom: '10px',
        // [theme.breakpoints.down('xs')]: {
        //     padding: '0px',
        // },
        // [theme.breakpoints.between("sm", "md")]: {
        //     paddingTop: '0px',
        // },
        "@media (min-width: 1200px)": {
            paddingTop: '10px',
        },
    },
    loginLink: {
        textAlign: 'center',
        color: '#143f46',
        margin: '10px 0px',
        textDecoration: 'none',
        '&:hover': {
            color: '#1176A4'
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
        // [theme.breakpoints.down('xs')]: {
        //     display: 'block',
        //     bottom: -40,
        // },
    },
}))

const Login = ({ handleChange }) => {
    const classes = useStyles();
    const { globalUser } = useSelector(state => state.userReducer);
    const dispatch = useDispatch()
    const history = useHistory();
    const apiCall = useRef(undefined);
    const [user, setUser] = useState({
        username: '',
        password: '',
        phone: '',
        otp: '',
        showPassword: false,

    })

    // const handleChange = (prop) => (event) => {
    //     setUser({ ...user, [prop]: event.target.value });
    // };

    const handleClickShowPassword = () => {
        setUser({
            ...user,
            showPassword: !user.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        var input = document.getElementById("standard-adornment-password");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("myBtn").click();
            }
        });
    }, [])



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
    
    if (globalUser.isLoggedIn) {
        history.push('/welcome')
        return null
    }
    else
        return (
            <>
                <div className={'Login'}>
                {/* <h4 style={{ color: "#216966" , textAlign:"center" }}>ورود</h4> */}
                    <FormControl>
                        <div style={{ position: "relative" }}>
                            <Input
                                id="standard-textarea"
                                label="ایمیل یا شماره موبایل"
                                placeholder="ایمیل یا شماره موبایل"
                                multiline
                                color='secondary'
                                variant="standard"
                                value={user.username}
                                name="username"
                                onChange={onChange}
                                sx={{ marginTop: "10px", textAlign: "right", width: "100%" }}
                                />
                            <AlternateEmailOutlinedIcon sx={{ color: "#216966", position: 'absolute', top: "25%", left: "0", }} />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Input
                                id="standard-adornment-password"
                                value={user.password}
                                onChange={onChange}
                                name="password"
                                type={inputType}
                                // onBlur={checkEnglishInput}
                                placeholder="رمز عبور"
                                color='secondary'
                                sx={{ marginTop: "10px", textAlign: "right", width: "100%" }}
                                />
                            <VisibilityIcon onClick={handleVisibility} sx={{ position: 'absolute', top: "25%", left: "0", cursor: 'pointer', color: '#216966' }} />
                        </div>
                        {error ? <div style={{ color: 'red', margin: '5px 0px' }}>{error}</div> : undefined}
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "25px", padding: "7px",alignItems: "center" }}>
                            {!loading ? <button id='myBtn' type="submit" onClick={userPassLogin} className={'sub'}>ورود </button> : <div className={'sub'}><CircularProgress style={{margin:"15px 20px" ,color: "#216966"}} color='primary' size={20} /></div>}
                            {/* <button onClick={() => history.push("/")} className={'noSub'}>انصراف</button> */}
                        </div>
                        <div className={'divided'} />
                        <div className="google544654">
                            <GoogleLogin
                                clientId="607447337040-9733v7rdbinir9qlahnu1ib5baansf83.apps.googleusercontent.com"
                                buttonText="ورود با گوگل"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogleError}
                                cookiePolicy={'single_host_origin'}
                                className={'googlebtn'}
                            />
                            {googleAuthError ? <div style={{ color: 'red', margin: '5px 0px' }}>{googleAuthError}</div> : undefined}
                        </div>
                        {googleAuthError ? <div style={{ color: 'red', margin: '5px 0px' }}>{googleAuthError}</div> : undefined}
                        <div style={{ margin: '10px 0px', color: '#143f46', cursor: 'pointer', fontSize: "10px", alignSelf: "center" }} onClick={() => setOpenOtp(true)}>ورود با رمز یکبار مصرف</div>
                    </FormControl>
                </div>






                {/* modals */}
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
                                        <p style={{ textAlign: 'center', color: "#144046" }}>شماره موبایل خود را وارد کنید</p>
                                        <TextField id="standard-textarea" color='secondary' variant='standard' value={user.phone} name="phone" onChange={onChange} type="number" sx={{ margin: '20px 0px' }} />
                                        {!sendOtpLoading ? <button onClick={() => checkPhone()} className={classes.otpGreenButton}>ثبت</button> : <div className={classes.otpGreenButton}><CircularProgress color='primary' size={20} /></div>}

                                        <button onClick={() => setOpenOtp(false)} className={classes.otpWhiteButton}>انصراف</button>
                                        {otpErr ? <div style={{ color: 'red', margin: '10px 0px' }}>{otpErr}</div> : undefined}
                                    </>
                                    :
                                    <>
                                        <p style={{ color: "#144046", textAlign: 'center' }}>رمز یکبار مصرف برای {user.phone} ارسال شد</p>
                                        <form>
                                            <TextField id="standard-textarea" color='secondary' variant='standard' value={user.otp} name="otp" onChange={onChange} type="number" style={{ margin: '20px 0px' }} />
                                            {!otpSubmitLoading ? <button type="submit" onClick={otpSubmit} className={classes.otpGreenButton}>ثبت</button> : <div className={classes.otpGreenButton} ><CircularProgress color='primary' size={20} /></div>}
                                            <button onClick={() => setSwitchView(false)} className={classes.otpWhiteButton}>ویرایش موبایل</button>
                                            {otpErr ? <div style={{ margin: '10px 0px', textAlign: 'center', color: 'red' }}>{otpErr}</div> : undefined}
                                        </form>
                                        <div>
                                            {counter === 0 ? <div style={{ margin: '10px 0px', textAlign: 'center', color: '#143f46', cursor: 'pointer' }} onClick={() => resendOtp()}>ارسال دوباره رمز یکبار مصرف</div> : undefined}
                                        </div>
                                        {counter !== 0 ? <div style={{ color: "#144046", margin: '10px 0px', textAlign: 'center' }}>ارسال دوباره رمز در {counter}</div> : undefined}
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
                                <CheckCircleOutlineIcon style={{ color: "#216966", fontSize: "40px" }} />
                                <span className="text-dark" style={{ marginRight: '10px' }}>ورود موفقیت آمیز بود</span>
                            </div>
                        </div>
                    </Modal>
                </div>
            </>
        );
}

export default Login;