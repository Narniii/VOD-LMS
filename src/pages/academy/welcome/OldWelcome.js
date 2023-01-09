import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Skeleton from '@mui/material/Skeleton';

import SwiperCore, {
    Navigation,
    Pagination
} from 'swiper';
import { Helmet } from "react-helmet";
import CourseAndQuizCards from "../../../common/cards/CourseAndQuizCards";
SwiperCore.use([Navigation, Pagination]);

const useStyles = makeStyles((theme) => ({
    whiteBox: {
        backgroundColor: "white",
        borderRadius: "20px",
        height: "85vh",
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
    welcomeHeader: {
        color: '#64c5ba',
        textAlign: "center",
        paddingTop: '80px',
        fontWeight: '600 !important'
    },
    yourCourseHeader: {
        color: '#64c5ba',
        textAlign: 'center'
    },
    singleBox: {
        border: '2px solid green',
        borderRadius: '20px',
        position: "relative",
        width: '100%',
        overflow: 'hidden',
        margin: '20px',
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    loadingSingleBox: {
        borderRadius: '40px',
        width: '25%',
        margin: '20px',
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    courseThumbnail: {
        width: '100%',
        height: '150px',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
    coursesInProgressWrapper: {
        height: '85vh',
        overflow: 'scroll',
        width: '100%'
    },
    posts: {
        display: "flex",
        flexWrap: "wrap",
        // gridTemplateColumns :"1fr 1fr 1fr",
        // padding : "10px",
        justifyContent: "space-between"
    }
}));
export default function OldWelcome() {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [userCourses, setUserCourses] = useState(undefined)
    const [allCourses, setAllCourses] = useState(undefined)
    const [teacherCourses, setTeacherCourses] = useState(undefined)
    const [posts, setPosts] = useState(undefined)
    useEffect(() => {
        getAllCourses()
        if (globalUser.user_group == "student") getUserCourses()
        else if (globalUser.user_group == "teacher") getTeacherCourses()
        else if (globalUser.user_group == "admin") getPosts()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (globalUser.user_group == 'teacher') {
            if (allCourses != undefined && teacherCourses != undefined)
                setLoading(false)
        } else if (globalUser.user_group == "student") {
            if (userCourses != undefined && allCourses != undefined)
                setLoading(false)
        } else if (globalUser.user_group == "admin") {
            if (posts != undefined) {
                setLoading(false)
            }
        }
        else {
            if (allCourses != undefined) setLoading(false)
        }
    }, [allCourses, teacherCourses, userCourses])
    const getUserCourses = async () => {
        try {
            apiCall.current = API.request('/course/user/', true, {
                user_id: globalUser.user_id
            }, globalUser.accessToken);
            var productsResponse = await apiCall.current.promise;
            console.log(productsResponse)
            if (productsResponse.message == "Valid token") {
                if (productsResponse.data.length == 0) {
                    setUserCourses([])
                } else {
                    setUserCourses(productsResponse.data)
                }
            }
            else {
                console.log(productsResponse)
                setError("خطایی در گرفتن اطلاعات رخ داد. لطفا مجددا امتحان کنید")
                setUserCourses([])
            }
        }
        catch (err) {
            console.log(err)
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const getTeacherCourses = async () => {
        try {
            apiCall.current = API.request('/course/author/', true, {
                teacher_id: globalUser.user_id
            }, globalUser.accessToken);
            let productsResponse = await apiCall.current.promise;
            if (productsResponse.message == "Valid token") {
                if (productsResponse.data.length == 0) {
                    setTeacherCourses([])
                } else {
                    setTeacherCourses(productsResponse.data)
                }
            }
            else {
                setError("خطا در گرفتن اطلاعات لطفا مجددا امتحان کنید")
                setTeacherCourses([])
            }
        }
        catch (err) {
            // console.log(err);
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const getAllCourses = async () => {
        try {
            apiCall.current = API.request('/product/all/', false, {});
            let productsResponse = await apiCall.current.promise;
            if (productsResponse.message == "Fetched successfully") {
                if (productsResponse.data.length == 0) {
                    setAllCourses([])
                } else {
                    setAllCourses(productsResponse.data)
                }
            }
            else {
                setError("خطا در گرفتن اطلاعات لطفا مجددا امتحان کنید")
                setAllCourses([])
            }
        }
        catch (err) {
            console.log(err);
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }

    const getPosts = async () => {
        var tempTemp = []
        try {
            apiCall.current = API.request('/post/all/', false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == "Valid token") {
                // console.log(response.data)
                for (var n = 0; n < response.data.length; n++) {
                    if (response.data[n].last_publish_time != null) {
                        tempTemp.push(response.data[n])
                    }
                }
                tempTemp.sort((a, b) => a.last_publish_time - b.last_publish_time)
                tempTemp.splice(6)
                // console.log(tempTemp)
                setPosts(tempTemp)
            }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }

    const LoadingRow = () => {
        var views = []
        if (window.innerWidth > 576)
            for (var i = 0; i < 3; i++) {
                views.push(
                    <div className={classes.loadingSingleBox} >
                        <Skeleton variant="rectangular" width={'100%'} height={150} style={{ borderRadius: '10px' }} />
                        <Skeleton variant="text" height={40} style={{ borderRadius: '10px' }} />
                    </div>)
            }
        else for (var i = 0; i < 1; i++) {
            views.push(
                <div className={classes.loadingSingleBox} >
                    <Skeleton variant="rectangular" width={'100%'} height={150} style={{ borderRadius: '10px' }} />
                    <Skeleton variant="text" height={40} style={{ borderRadius: '10px' }} />
                </div>)
        }
        return views
    }
    return (
        <>
            <Navbar children={<UserDashboard />} />
            <Helmet>
                <title>خوش آمدید</title>
                <meta name="keywords" content="aqua,pourdad,Decentralized finance,decentral,decentral land,blockchain,tether,erc20,,erc721,Non-fungible token,nft,UStether,Defi,Crypto,Crypto currency,Crypto currencies,bitcoin,btc,bnb,binance,bsc,binance smart chain,cake,pancake,pancakeSwap,solana,ethereum,doge,doge coin,shiba,shiba inu.shiba token,investment,bep2,bep20,profit,asset management,asset" />
                <meta name="keywords" content="صرافی غیر متمرکز, توکن, ارز دیجیتالی, ارز دیجیتال, کریپتو کارنسی, کریپتو, بایننس اسمارت چین, بلاکچین, اسمارت چین, بلاک چین, بیت کوین, داج کوین, دوج کوین, شیبا کوین, شیبا توکن, سولانا, اتریوم, تتر, صرافی, صرافی متمرکز, erc-20, erc-721, ERC-20, ERC-721,nft, توکن مثلی, توکن غیر مثلی, none-fungible-token, دیسنترالند, مدیریت دارایی, اقتصاد, سبدگردانی" />
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
                }}>
                <div className="container">
                    <div className={classes.whiteBox}>
                        <div className="row">
                            <div className="col-sm-3 no-mobile">
                                <UserDashboard />
                            </div>

                            <div className="col-sm-9 overFlowHandler" >
                                <div className={classes.khakibox}>
                                    <div className={classes.coursesInProgressWrapper}>
                                        <h2 className={classes.welcomeHeader}>خوش آمدید</h2>
                                        {globalUser.user_group == "superuser" ? undefined
                                            : globalUser.user_group == "admin" ?
                                                <h4 className={classes.yourCourseHeader}>جدیدترین اخبار</h4>
                                                : globalUser.user_group == "teacher" ?
                                                    <h4 className={classes.yourCourseHeader}>آخرین دوره های تایید شده‌ی شما</h4> :
                                                    <h4 className={classes.yourCourseHeader}>آخرین دوره های شما</h4>
                                        }
                                        {loading ? <div className={classes.mycoursesRow}>
                                            <LoadingRow />
                                            {/* {globalUser.user_group == "admin" ? 
                                            <h4 className={classes.yourCourseHeader}>جدیدترین اخبار</h4>
                                            : */}
                                            <h4 className={classes.yourCourseHeader}>جدیدترین دوره های بیتداد</h4>
                                            {/* } */}
                                            <LoadingRow />

                                        </div> :
                                            <>
                                                <div className={classes.mycoursesRow}>
                                                    {globalUser.user_group != "superuser" ?
                                                        <>
                                                            {globalUser.user_group == "teacher" ?
                                                                <>
                                                                    {teacherCourses.length != 0 ?
                                                                        <Swiper
                                                                            style={{ width: '90%' }}
                                                                            spaceBetween={20}
                                                                            navigation={true}
                                                                            pagination={{ clickable: true }}
                                                                            breakpoints={{
                                                                                // when window width is >= 640px
                                                                                640: {
                                                                                    slidesPerView: 1,
                                                                                },
                                                                                // when window width is >= 768px
                                                                                768: {
                                                                                    slidesPerView: 2,
                                                                                },
                                                                                1000: {
                                                                                    slidesPerView: 3,
                                                                                },
                                                                            }}>
                                                                            {teacherCourses.map((course) => {
                                                                                if (course.video_count != 0)
                                                                                    return <SwiperSlide key={course.id}>
                                                                                        <CourseAndQuizCards
                                                                                            link={`/course-preview/${course.slug}`}
                                                                                            user={globalUser}
                                                                                            bgImage={`https://api.aqua.ir:8283${course.image}`}
                                                                                            title={course.short_description}
                                                                                        />
                                                                                    </SwiperSlide>
                                                                                else return undefined
                                                                            })}
                                                                        </Swiper>
                                                                        :
                                                                        <p style={{ textAlign: 'center', color: '#2e8365' }}>شمادر حال حاضر در دوره‌ای شرکت نکرده‌اید</p>
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    {globalUser.user_group != 'student' ?
                                                                        <>
                                                                            {globalUser.user_group == "admin" ?
                                                                                <>

                                                                                    {posts.length != 0 ?
                                                                                        <div className={classes.posts}>
                                                                                            {posts.map((post, index) => {
                                                                                                return <div className="col-md-6 col-lg-4" key={index}>
                                                                                                    <CourseAndQuizCards
                                                                                                        link={`/post-preview/${post.slug}`}
                                                                                                        user={globalUser}
                                                                                                        bgImage={`https://api.aqua.ir:8283${post.image}`}
                                                                                                        title={
                                                                                                            post.title.length > 15 ? post.title.substring(0, 15) + "..." : post.title
                                                                                                        }
                                                                                                    />
                                                                                                </div>
                                                                                            })}
                                                                                        </div>
                                                                                        :
                                                                                        <div style={{
                                                                                            display: 'flex',
                                                                                            alignItems: "center",
                                                                                            justifyContent: "center",
                                                                                            height: '100%'
                                                                                        }}>
                                                                                            <h4 style={{ color: '#64c5ba' }}>
                                                                                                در حال حاضر خبری وجود ندارد
                                                                                            </h4>
                                                                                        </div>
                                                                                    }

                                                                                </>
                                                                                : undefined}
                                                                        </>

                                                                        :
                                                                        <>
                                                                            {userCourses.length != 0 ?
                                                                                <Swiper
                                                                                    style={{ width: '90%' }}
                                                                                    spaceBetween={20}
                                                                                    navigation={true}
                                                                                    pagination={{ clickable: true }}
                                                                                    breakpoints={{
                                                                                        // when window width is >= 640px
                                                                                        640: {
                                                                                            slidesPerView: 1,
                                                                                        },
                                                                                        // when window width is >= 768px
                                                                                        768: {
                                                                                            slidesPerView: 2,
                                                                                        },
                                                                                        1000: {
                                                                                            slidesPerView: 3,
                                                                                        },
                                                                                    }}>
                                                                                    {userCourses.map((course) => {
                                                                                        if (course.course_info.video_count != 0)
                                                                                            return <SwiperSlide key={course.id}>
                                                                                                <CourseAndQuizCards
                                                                                                    link={`/course-preview/${course.course_info.slug}`}
                                                                                                    user={globalUser}
                                                                                                    bgImage={`https://api.aqua.ir:8283${course.course_info.image}`}
                                                                                                    title={course.course_info.short_description}
                                                                                                />
                                                                                            </SwiperSlide>
                                                                                        else return undefined
                                                                                    })}
                                                                                </Swiper>
                                                                                :
                                                                                <p style={{ textAlign: 'center', color: '#2e8365' }}>شمادر حال حاضر در دوره‌ای شرکت نکرده‌اید</p>
                                                                            }
                                                                        </>
                                                                    }

                                                                </>
                                                            }
                                                        </>
                                                        :
                                                        undefined
                                                    }
                                                    {globalUser.user_group != "admin" ?
                                                        <>
                                                            <h3 className={classes.yourCourseHeader}>جدیدترین دوره های بیتداد</h3>
                                                            <div className="row">
                                                                {allCourses.length != 0 ?
                                                                    <Swiper
                                                                        style={{ width: '90%' }}
                                                                        spaceBetween={20}
                                                                        navigation={true}
                                                                        pagination={{ clickable: true }}
                                                                        breakpoints={{
                                                                            640: {
                                                                                slidesPerView: 1,
                                                                            },
                                                                            768: {
                                                                                slidesPerView: 2,
                                                                            },
                                                                            1000: {
                                                                                slidesPerView: 3,
                                                                            },
                                                                        }}>
                                                                        {allCourses.map((course) => {
                                                                            return <SwiperSlide key={course.id}>
                                                                                <CourseAndQuizCards
                                                                                    link={`/course-preview/${course.course_info.slug}`}
                                                                                    user={globalUser}
                                                                                    bgImage={`https://api.aqua.ir:8283${course.course_info.image}`}
                                                                                    title={course.course_info.short_description}
                                                                                />
                                                                            </SwiperSlide>
                                                                        })}
                                                                    </Swiper>
                                                                    :
                                                                    <p style={{ color: '#2e8365' }}>در حال حاضر دوره‌ای وجود ندارد</p>
                                                                }
                                                            </div>

                                                        </>
                                                        : undefined}

                                                </div>
                                            </>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
}