import React, { useEffect, useRef, useState, useContext } from "react";
import API from "../../utils/api";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./UserPanel.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccardeonRows from "./common/AccardeonRows";
import UserDashboard from "./common/UserDashboard";
import { useSelector, useDispatch } from 'react-redux'
import Navbar from "./Navbar/Navbar";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
    whiteBox: {
        backgroundColor: "white",
        borderRadius: "20px",
        height: "85vh",
    },
    menuWrapper: {
        height: "85vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
    },
    iconWrapper: {
        marginBottom: "50px",
    },
    aquaLogo: {
        width: "120px",
    },
    AcardeonRowBox: {
        display: "flex",
        width: "90%",
        paddingRight: "5px",
    },
    AcardeonRowBoxImageWrapper: {
        flex: 1,
        paddingTop: '7px'
    },
    AcardeonRowBoxImage: {
        width: "40px",
    },
    AcardeonRowDetailsBox: {
        flex: 5,
    },
    typo: {
        fontWeight: '600 !important',
        fontSize: '22px !important',
        color: '#7a7574 !important'
    },
    selectedItemText: {
        color: '#64c5ba !important',
        fontWeight: '600 !important',

    },
    SelectedItemaccardeonDetailsText: {
        color: 'white !important',
        fontWeight: '600 !important',
        paddingRight: '10px'
    },
    selectedItemRow: {
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        fontWeight: '600 !important'
    },
    keshoi: {
        width: "10px",
    },
    accardeonDetailsImage: {
        width: "22px",
        fill: 'black '
    },
    accardeonDetailsText: {
        paddingRight: '5px',
        fontWeight: 600,
        color: '#7a7574 !important'

    },
    accardeonDetailsImageSelected: {
        width: "22px",
        fill: 'white'
    },
    khakibox: {
        backgroundColor: '#f2f2f2',
        minHeight: '85vh',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    childsBoxImageWrapper: {
        height: '200px',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
    },
    childsBoxImage: {
        width: '150px'
    },
    editProfileinputsWrapper: {
        margin: '20px 30%',
        [theme.breakpoints.down('xs')]: {
            margin: '20px 5%',
        },
    },
    inputsHeader: {
        fontWeight: '600 !important',
        color: 'black',
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
        borderRadius: '5px !important'
    },
    submitButtonWrapper: {
        width: '100%',
        textAlign: 'center',
        marginTop: '20px'
    },
    editProfileImageLogo: {
        width: '120px',
        color: '#64c5ba !importnant'
    },
    userPanelLinks: {
        textDecoration: 'none'
    }
}));
export default function ChangePassword() {
    const { globalUser } = useSelector((state) => state.userReducer)
    const [inputType, setInputType] = useState("password")
    const [inputVisibility, setInputVisibility] = useState(false)
    const [error, setError] = useState(undefined)
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(undefined)

    const [user, setUser] = useState({
        password: '',
        confirmPass: '',
        image_url: undefined
    })
    const editProfileSubmit = async (e) => {
        e.preventDefault()
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
        try {
            apiCall.current = API.request('/user/profile/edit/password/', true, {
                password: user.password,
                user_id: globalUser.user_id
            },
                globalUser.accessToken
            );
            const res = await apiCall.current.promise
            if (res.message == 'Updated successfully')
                setSuccessMessage('اطلاعات شما با موفقیت ثبت شد')
            else setError('رمز عبور و تایید رمز عبور یکسان نیستند!');
        }
        catch (err) {
            console.log(err)
        }
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }
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
    const onChange = e => {
        var u = { ...user };
        u[e.target.name] = e.target.value;
        setUser(u);
    }
    return (
        <>
            <Navbar children={<UserDashboard currentTab="profile" secondChildSelected={true} />} />
            <Helmet>
                <title>تغییر رمز عبور</title>
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
                                <UserDashboard currentTab="profile" secondChildSelected={true} />
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
                                        <>
                                            <div className={classes.childsBoxImageWrapper}>
                                                {globalUser.image_url == undefined || globalUser.image_url == '' ?
                                                    <img class={classes.editProfileImageLogo} src={PUBLIC_URL('images/academy/profile.svg')} alt="default pic" /> :
                                                    <img class={classes.editProfileImageLogo} src={`https://api.aqua.ir:8283${user.image_url}`} onError={(e) => { e.target.onerror = null; e.target.src = PUBLIC_URL("images/academy/profile.svg") }} alt={`${globalUser.username} profile picture`} />

                                                }
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
                                                        <div className={classes.inputsHeader}>رمز عبور</div>
                                                        <div style={{ position: 'relative' }}>
                                                            <input className="signupFiledsInput76345 form-control"
                                                                value={user.password}
                                                                onChange={onChange}
                                                                name="password"
                                                                type={inputType}
                                                                onBlur={checkEnglishInput}
                                                            >
                                                            </input>
                                                            <VisibilityIcon onClick={handleVisibility} className="text-dark" style={{ position: 'absolute', top: 15, left: 10, cursor: 'pointer' }} />
                                                        </div>
                                                        <div className={classes.inputsTooltips}>رمز عبور باید بیشتر از هشت حرف باشد</div>
                                                        <div className={classes.inputsHeader}>تایید رمز عبور</div>
                                                        <div style={{ position: 'relative' }}>
                                                            <input className="signupFiledsInput76345 form-control"
                                                                value={user.confirmPass}
                                                                onChange={onChange}
                                                                name="confirmPass"
                                                                type={inputType}
                                                                onBlur={checkEnglishInput}
                                                            >
                                                            </input>
                                                            <VisibilityIcon onClick={handleVisibility} className="text-dark" style={{ position: 'absolute', top: 15, left: 10, cursor: 'pointer' }} />
                                                        </div>
                                                        {error ? <div style={{ color: 'red', margin: '5px 0px' }}>{error}</div> : undefined}
                                                        <div className={classes.submitButtonWrapper}>
                                                            <button className={classes.submitButton} onClick={editProfileSubmit}>ثبت تغییرات</button>
                                                        </div>
                                                        <div className="text-center">{successMessage ? <div className={classes.inputsTooltips}>{successMessage}</div> : undefined}</div>
                                                    </div>
                                                </form>
                                            </div>
                                        </>
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