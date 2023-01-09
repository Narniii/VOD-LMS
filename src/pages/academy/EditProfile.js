import React, { useEffect, useRef, useState } from "react";
import API from "../../utils/api";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import "./UserPanel.css";
import { Helmet } from "react-helmet";
import UserDashboard from "./common/UserDashboard";
import ReactFileReader from 'react-file-reader';
import Loading from '../ExtraPages/Loading'
import { useSelector, useDispatch } from 'react-redux'
import { getuser } from '../../redux/actions';
import Navbar from "./Navbar/Navbar";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
    whiteBox: {
        backgroundColor: "white",
        borderRadius: "20px",
        height: "85vh",
    },
    khakibox: {
        backgroundColor: '#f2f2f2',
        height: '85vh',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    childsBoxImageWrapper: {
        height: '20vh',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            textAlign: 'center',
        },
    },
    childsBoxImage: {
        width: '150px'
    },
    editProfileinputsWrapper: {
        padding: '0px 10%',
        margin: '20px auto',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    inputsHeader: {
        fontWeight: '600 !important',
        color: '#3f3c3c',
        margin: '5px 0px'
    },
    inputsTooltips: {
        fontSize: '14px',
        color: '#64c5ba !important',
        margin: '10px 0px'
    },
    submitButton: {
        backgroundColor: '#64c5ba !important',
        border: '1px solid #64c5ba !important',
        color: 'white !important',
        padding: '10px 20px !important',
        borderRadius: '5px !important',
        margin: '10px 0px'
    },
    submitButtonWrapper: {
        width: '100%',
        textAlign: 'center',
    },
    editProfileImageLogo: {
        width: '120px',
        height: '120px',
        borderRadius: '60px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        margin: '20px auto'
    },
    userPanelLinks: {
        textDecoration: 'none'
    },
    coursesInProgressWrapper: {
        height: '75vh',
        overflow: 'scroll',
        width: '100%'
    },
}));
export default function EditProfile(props) {
    const { globalUser } = useSelector(state => state.userReducer);
    const dispatch = useDispatch()
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [successMessage, setSuccessMessage] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        setUser(globalUser)
        setLoading(false)
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])

    const handleFiles = async (files) => {
        const formData = new FormData();
        formData.append('user_id', globalUser.user_id);
        formData.append("image", files[0])
        setLoading(true)
        if (files !== undefined && files !== null) {
            fetch('https://api.aqua.ir:8283/user/profile/upload/', { // Your POST endpoint
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${globalUser.accessToken}`
                },
                body: formData, // This is your file object

            }).then(
                response => response.json() // if the response is a JSON object
            ).then(
                success => {
                    var u = { ...user }
                    u.image_url = success.data.image_url
                    setUser(u)
                    setTimeout(() => {
                        setLoading(false)
                    }, 5000);
                } // Handle the success response object
            ).catch(
                error => console.log(error) // Handle the error response object
            );
        }
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
    function emailValidation(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const testMail = re.test(String(email));
        if (testMail)
            return true
        else {
            setError('ایمیل اشتباه است!')
            return false
        }
    }
    const editProfileSubmit = async (e) => {
        e.preventDefault()
        if (user.username == user.phone_number) {
            setError("نام کاربری نمیتواند با شماره تلفن یکسان باشد.")
            return
        }
        if (user.username.length < 3) {
            setError('نام کاربری باید بیشتر از سه حرف باشد!')
            return
        }
        if (user.first_name.length == 0) {
            setError('نام نمیتواند خالی باشد!')
            return
        }
        if (user.last_name.length == 0) {
            setError('نام خانوادگی نمیتواند خالی باشد!')
            return
        }
        if (user.user_ssid.length == 0) {
            setError('کد ملی نمیتواند خالی باشد!')
            return
        }
        let isPhonevalid = validatePhone(user.phone_number)
        if (!isPhonevalid) {
            return;
        }
        if (user.email == '') {
            setError('ایمیل نمیتواند خالی باشد!')
            return;
        }
        else {
            let isMailValid = emailValidation(user.email)
            if (!isMailValid) {
                return false;
            }
        }
        setError(undefined)
        try {
            apiCall.current = API.request('/user/profile/edit/', true, {
                email: user.email,
                phone_number: user.phone_number,
                user_id: globalUser.user_id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                user_ssid: user.user_ssid
            },
                user.accessToken
            );
            const res = await apiCall.current.promise
            // console.log(res)
            if (res.message == 'Updated successfully') {
                setSuccessMessage('اطلاعات شما با موفقیت ثبت شد')
                setTimeout(() => {
                    dispatch(getuser())
                }, 1500);
            }
            else setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
        catch (err) {
            setError('خطایی رخ داده است.لطفا مجددا امتحان کنید!')
            console.log(err)
        }
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }
    const onChange = e => {
        var u = { ...user };
        u[e.target.name] = e.target.value;
        setUser(u);
    }

    return (
        <>
            <Navbar children={<UserDashboard currentTab="profile" firstChildSelected={true} />} />
            <Helmet>
                <meta charSet="utf-8" />
                <title>ویرایش اطلاعات کاربری</title>
                <link rel="canonical" href="http://aqua.ir/user-panel" />
            </Helmet>
            <section
                className={classes.wrapper}
                style={{
                    backgroundImage: BG_URL(PUBLIC_URL("images/bg.png")),
                    backgroundSize: "auto 100%",
                    backgroundPosition: "center",
                    display: "flex",
                    height: "100vh",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="container">
                    <div className={classes.whiteBox}>
                        <div className="row">
                            <div className="col-sm-3 no-mobile">
                                <UserDashboard currentTab="profile" firstChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overFlowHandler">
                                <div className={classes.khakibox}>
                                    {/* ==========image ========== */}
                                    {loading ?
                                        <div style={{
                                            display: 'flex',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: '100%'
                                        }}>
                                            <CircularProgress style={{ color: "green" }} />
                                        </div>
                                        :
                                        <div className={classes.coursesInProgressWrapper}>
                                            <div className={classes.childsBoxImageWrapper}>
                                                <ReactFileReader multipleFiles={false} handleFiles={handleFiles}>
                                                    <div className="text-center">
                                                        {user.image_url == undefined || user.image_url == '' ?
                                                            <div className={classes.editProfileImageLogo} style={{ backgroundImage: BG_URL(PUBLIC_URL('images/academy/edit-image.svg')) }} alt="default pic" /> :
                                                            <div className={classes.editProfileImageLogo} style={{ backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283${user.image_url}`)) }} onError={(e) => { e.target.onerror = null; e.target.src = PUBLIC_URL("images/academy/edit-image.svg") }} alt={`${globalUser.username} profile picture`} />
                                                        }
                                                    </div>
                                                </ReactFileReader>
                                                {/* <div className="image-upload">
                                            <label for="file-input">
                                                <img class={classes.editProfileImageLogo} src={PUBLIC_URL('images/academy/edit-image.svg')} />
                                            </label>

                                            <input id="file-input" type="file" onChange={(e) => {
                                                setSelectedFile(e.target.files[0])
                                            }} />
                                        </div> */}
                                            </div>
                                            <div className={classes.editProfileinputsWrapper}>
                                                <form >
                                                    <div className="editprofile-inputs">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className={classes.inputsHeader}>نام کاربری</div>
                                                                <input className="form-control" value={user.username} name="username" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className={classes.inputsHeader}>نام</div>
                                                                <input className="form-control" value={user.first_name} name="first_name" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className={classes.inputsHeader}>نام خانوادگی</div>
                                                                <input className="form-control" value={user.last_name} name="last_name" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className={classes.inputsHeader}>ایمیل</div>
                                                                <input className="form-control signupFiledsInput76345" value={user.email} name="email" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className={classes.inputsHeader}> شماره تلفن همراه</div>
                                                                <input className="form-control signupFiledsInput76345" value={user.phone_number} name="phone_number" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                                <div className={classes.inputsTooltips}>(09xxxxxxxxx)</div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className={classes.inputsHeader}> شماره ملی</div>
                                                                <input className="form-control signupFiledsInput76345" value={user.user_ssid} name="user_ssid" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                            </div>
                                                        </div>

                                                        <div className={classes.submitButtonWrapper}>
                                                            {successMessage ? <h6 style={{ color: '#64c5ba', textAlign: 'center' }}>{successMessage}</h6> : undefined}
                                                            {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                                                            <button type="submit" className={classes.submitButton} onClick={editProfileSubmit}>ثبت تغییرات</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
}