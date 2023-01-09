import React, { useEffect, useRef, useState, useContext, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import API from "../../utils/api";
import { useSelector } from "react-redux";
import Skeleton from '@mui/material/Skeleton';
import { Helmet } from "react-helmet";
import NewUserDashboard from "../dashboard/NewDashboard";
import WelcomeCourseCards from "../welcome/WelcomeCourseCards";
import "../style/NewWelcome.css"
const useStyles = makeStyles((theme) => ({
    welcomeHeader: {
        color: '#64c5ba',
        fontWeight: '600 !important',
        margin: '0px 30px',
        "@media (max-width: 576px)": {
            textAlign: 'center'
        }
    },
    yourCourseHeader: {
        color: '#64c5ba',
        marginTop: '30px',
        margin: '0px 30px',
        "@media (max-width: 576px)": {
            textAlign: 'center'
        }
    },
    loadingSingleBox: {
        width: '91%',
        margin: '20px',
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
}));
export default function NewWelcome() {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [userCourses, setUserCourses] = useState(undefined)
    useEffect(() => {
        getUserCourses()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (userCourses != undefined)
            setLoading(false)
    }, [userCourses])
    const getUserCourses = async () => {
        try {
            apiCall.current = API.request('/course/user/', true, {
                user_id: globalUser.user_id
            }, globalUser.accessToken);
            var productsResponse = await apiCall.current.promise;
            // console.log(productsResponse)
            if (productsResponse.message == "Valid token") {
                if (productsResponse.data.length == 0) {
                    setUserCourses([])
                } else {
                    setUserCourses(productsResponse.data)
                }
            }
            else {
                // console.log(productsResponse)
                setError("خطایی در گرفتن اطلاعات رخ داد. لطفا مجددا امتحان کنید")
                setUserCourses([])
            }
        }
        catch (err) {
            console.log(err)
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const renderView = useCallback((userCourses) => {
        if (userCourses) {
            let renderview = []
            for (var i = 0; i < userCourses.length; i++) {
                if (userCourses[i].course_info.video_count != 0)
                    renderview.push(<WelcomeCourseCards key={userCourses[i].id}
                        link={`/course-preview/${userCourses[i].course_info.slug}`}
                        user={globalUser}
                        bgImage={`https://api.aqua.ir:8283${userCourses[i].course_info.image}`}
                        title={userCourses[i].course_info.title}
                        description={userCourses[i].course_info.short_description}
                        passPercentage={userCourses[i].passed_percentage}
                        teacherFirstName={userCourses[i].course_info.teacher_first_name}
                        teacherLastName={userCourses[i].course_info.teacher_last_name}
                    />)
            }
            return renderview
        }
    }, [userCourses])
    const LoadingRow = () => {
        var views = []
        if (window.innerWidth > 576)
            for (var i = 0; i < 3; i++) {
                views.push(
                    <div className={classes.loadingSingleBox} >
                        <Skeleton variant="rectangular" height={200} style={{ borderRadius: '10px', clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)', background: '#484d4a', overflow: 'none' }} />
                    </div>)
            }
        else for (var i = 0; i < 1; i++) {
            views.push(
                <div className={classes.loadingSingleBox} >
                    <Skeleton variant="rectangular" height={200} style={{ borderRadius: '10px', clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)', background: '#484d4a', overflow: 'none' }} />
                </div>)
        }
        return views
    }
    return (
        <>
            <Helmet>
                <title>خوش آمدید</title>
                <meta name="keywords" content="aqua,pourdad,Decentralized finance,decentral,decentral land,blockchain,tether,erc20,,erc721,Non-fungible token,nft,UStether,Defi,Crypto,Crypto currency,Crypto currencies,bitcoin,btc,bnb,binance,bsc,binance smart chain,cake,pancake,pancakeSwap,solana,ethereum,doge,doge coin,shiba,shiba inu.shiba token,investment,bep2,bep20,profit,asset management,asset" />
                <meta name="keywords" content="صرافی غیر متمرکز, توکن, ارز دیجیتالی, ارز دیجیتال, کریپتو کارنسی, کریپتو, بایننس اسمارت چین, بلاکچین, اسمارت چین, بلاک چین, بیت کوین, داج کوین, دوج کوین, شیبا کوین, شیبا توکن, سولانا, اتریوم, تتر, صرافی, صرافی متمرکز, erc-20, erc-721, ERC-20, ERC-721,nft, توکن مثلی, توکن غیر مثلی, none-fungible-token, دیسنترالند, مدیریت دارایی, اقتصاد, سبدگردانی" />
            </Helmet>
            <NewUserDashboard>
                <h2 className={classes.welcomeHeader}>خوش آمدید</h2>
                <h4 className={classes.yourCourseHeader}>آخرین دوره های شما</h4>
                {loading ? <LoadingRow />
                    :
                    <>
                        {userCourses.length != 0 ?
                            renderView(userCourses)
                            :
                            <div style={{ textAlign: 'center', color: '#2e8365' }}>شما در حال حاضر در دوره‌ای شرکت نکرده‌اید</div>
                        }
                    </>
                }
            </NewUserDashboard>
        </>
    );
}