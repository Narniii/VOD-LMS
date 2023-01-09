import React, { useEffect, useRef, useState, useContext } from "react";
import API from "../../utils/api";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import "../style/UserPanel.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from 'react-redux'
import { Helmet } from "react-helmet";
import NewUserDashboard from "../dashboard/NewDashboard";

const useStyles = makeStyles((theme) => ({
    childsBoxImageWrapper: {
        height: '200px',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
    },
    editProfileinputsWrapper: {
        margin: '20px 30%',
        [theme.breakpoints.down('xs')]: {
            margin: '20px 5%',
        },
    },
    inputsHeader: {
        fontWeight: '600 !important',
        color: 'white',
        margin: '5px 0px'
    },
    inputsTooltips: {
        fontSize: '14px',
        color: '#64c5ba !important',
        margin: '10px 0px'
    },
    submitButton: {
        backgroundColor: '#2f3835 !important',
        border: '1px solid #2f3835 !important',
        color: 'white !important',
        padding: '10px 20px !important',
        borderRadius: '5px !important'
    },
    submitButtonWrapper: {
        width: '100%',
        textAlign: 'center',
        marginTop: '20px'
    },
}));
export default function NewChangePassword() {
    const { globalUser } = useSelector((state) => state.userReducer)
    const [inputType, setInputType] = useState("password")
    const [inputVisibility, setInputVisibility] = useState(false)
    const [error, setError] = useState(undefined)
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [successMessage, setSuccessMessage] = useState(undefined)

    const [user, setUser] = useState(undefined)
    useEffect(() => {
        setUser(globalUser)
        setLoading(false)
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
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
            <NewUserDashboard currentTab="profile" secondChildSelected={true}>
                <Helmet>
                    <title>تغییر رمز عبور</title>
                </Helmet>
                <section>
                    {/* ==========image ========== */}
                    {loading ?
                        <div style={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            height: '100%'
                        }}>
                            <CircularProgress style={{ color: "#64c5ba" }} />
                        </div>
                        :
                        <>
                            <div className={classes.childsBoxImageWrapper}>
                            </div>
                            <div className={classes.editProfileinputsWrapper}>
                                <form >
                                    <div className="new-editprofile-inputs">
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
                </section >
            </NewUserDashboard >
        </>
    );
}