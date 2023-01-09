/*
    every time a usr comes to this page , 
    we'll show him course videos sorted by their part
    {coming to page by their part in the url}
    we need api calls to 
    -get the course that has the videos
    -et the videos of the course
    -get the current video that we're in it's page and it's part and id 
    then we'll need an interval to update and get the data to/from database constantly
    because every second of the video that the user watches , updates the watched percentage of the video 
    and therefore passed percentage of the whole course
    and we should get the passed percentages that we updated , update them again , and send them again ..
    and if the passed percentage of the course bcome = 100 
    (meaning that the user watched all video parts of the course):
    it will mean thhat the course is passed and user can go take the quiz and get a certificate
 */

import React, { useEffect, useRef, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import API from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import "react-html5video/dist/styles.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline';
import PlayCircle from '@mui/icons-material/PlayCircle';
import NewUserDashboard from "../dashboard/NewDashboard";
import '../style/VideoSingle.css'
import { Skeleton } from "@mui/material";
import ReactHlsPlayer from 'react-hls-player';
import VideoPlayer from 'react-video-js-player';

const useStyles = makeStyles((theme) => ({
    contentWrapper: {
        width: '70%',
        margin: '20px auto',
        [theme.breakpoints.down("xs")]: {
            width: '100%',
            margin: "0px auto",
        },
    },
    courseDescription: {
        width: "100%",
        borderBottom: "solid 1px #64c5ba",
        margin: '10px 0px',
        [theme.breakpoints.down("md")]: {
        },
    },
    playListWrapper: {
        margin: '30px 0px',
        padding: '10px',
        background: '#2f3835',
        flexDirection: "column",
        [theme.breakpoints.down("xs")]: {
            marginBottom: '5px',
            padding: '5px',
            margin: '40px 0px',
        },
    },
    listItem: {
        width: "100%",
        textDecoration: "none",
        padding: '10px',
        color: 'white',
        margin: '2px',
        display: 'block',
        "&:hover": {
            color: '#64c5ba',
        },
    },
    VideoSingle: {
        background: "transparent",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
        objectPosition: 0,
        width: "100%",
        height: "55vh",
        [theme.breakpoints.down("md")]: {
            height: '40vh',
        },
        [theme.breakpoints.down("xs")]: {
            height: '40vh',
        },

    },

    selectedListItem: {
        textDecoration: "none",
        padding: '10px',
        color: 'white',
        display: 'block',
        color: '#64c5ba',
        "&:hover": {
            color: '#64c5ba',
        },
    },
    loadingSingleBox: {
        width: '70%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    videoDescription: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '12px',
            padding: '0px 5px'
        },
    },
    descriptionTitleWrapper: {
        display: 'block',
        backgroundColor: "#64c5ba",
        // border: "1px solid #64c5ba",
        width: "150px",
        height: "40px",
        textAlign: "center",
        padding: "5px",
        [theme.breakpoints.down('xs')]: {
            width: "150px",
        },
    },
    courseTitle: {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#64c5ba',
        [theme.breakpoints.down('xs')]: {
            marginBottom: 0
        },
    }
}));
export default function NewVideoSingle(props) {
    const part = props.match.params.part;
    const courseSlug = props.match.params.courseSlug;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [course, setCourse] = useState(undefined);
    const [videos, setVideos] = useState([]);
    const { globalUser } = useSelector((state) => state.userReducer);
    const apiCall = useRef(undefined);
    const [video, setVideo] = useState();
    const videoElementRef = useRef();
    const history = useHistory()
    const videoIntervalRef = useRef();
    const coursePassedProcessRef = useRef();
    const [CurrentUserCoursePassedProcess, setCurrentUserCoursePassedProcess] = useState();
    const [isPassed, setIsPassed] = useState(false);
    const [thisUserVideo, setThisUserVideo] = useState(undefined)
    const [thisUserVideos, setThisUserVideos] = useState(undefined)
    const [passed_percentage, setPassed_percentage] = useState(undefined)
    const [currentUserCourse, setCurrentUserCourse] = useState(undefined)
    const [vids, setVids] = useState()
    const [userId, setUserId] = useState(undefined)
    const [nextPart, setNextPart] = useState(undefined)

    useEffect(() => {
        //we'll get all the videos of this course from backend
        getCourseVideos();
        if (videoIntervalRef.current !== undefined)
            clearInterval(videoIntervalRef.current);
        // if (coursePassedProcessRef.current !== undefined)
        // clearInterval(coursePassedProcessRef.current);
        return () => {
            if (apiCall.current !== undefined) apiCall.current.cancel();
        };
    }, [part, courseSlug]);

    const getCourseVideos = async (slug) => {
        //get course first using course slug  
        //then get videos of the course using course id
        //then get the current video that we have to watch using video id and part

        if (apiCall.current !== undefined) {
            apiCall.current.cancel();
        }
        setLoading(true);
        setError(undefined);
        const videosArray = [];
        try {
            apiCall.current = API.request(`/course/${courseSlug}`, false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise;
            setCourse(response.data)
            if (response.message == "Fetched successfully") {
                for (var k = 0; k < response.data.user_course.length; k++) {
                    if (response.data.user_course[k].user_id == globalUser.user_id) {
                        setUserId(response.data.user_course[k].user_id);
                    }
                }
                if (response.data.video_count != 0) {
                    try {
                        apiCall.current = API.request("/course/videos/", true, { course_id: response.data.id }, globalUser.accessToken);
                        const result = await apiCall.current.promise;
                        // console.log(result)
                        if (result.message == "Valid token") {
                            for (var i = 0; i < result.data.length; i++) {
                                videosArray.push(result.data[i]);
                                try {
                                    apiCall.current = API.request(`/course/videos/${result.data[i].id}`, false, {}, globalUser.accessToken);
                                    const res = await apiCall.current.promise;
                                    if (res.data.part == part) {
                                        // console.log(res.data)
                                        setVideo(res.data);
                                    } else if (res.data.part > part) {
                                        setNextPart(res.data)
                                    }
                                } catch (err) {
                                    setError("error!");
                                }
                            }
                            setVideos(videosArray);
                        }
                    } catch (err) {
                        setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
                    }
                }
            }
            if (response.detail == "Not found.") { history.push("/404") }
            // }
        } catch (err) {
            setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
        }
    };


    //sortinng the videos of the course by thei parts

    useEffect(() => {

        if (videos != undefined) {
            sortVideos()
        }

    }, [videos])
    const sortVideos = () => {
        videos.sort((a, b) => a.part - b.part)
        setVids(videos)
    }



    useEffect(() => {
        if (video != undefined && course != undefined && videoElementRef !== undefined) {
            setLoading(false);

            videoIntervalRef.current = setInterval(() => {
                getCurrentUserVideo(video.id) //getting the current video
                getCurrentUserVideos(course.id) // getting user course videos
                getCoursePassedProcessPercentage(userId) //getting the last passed percentage from backend



                //then we count the new passed percentage of the course by counting the new passed percentage from the current video

                if (CurrentUserCoursePassedProcess != undefined &&
                    Math.ceil(CurrentUserCoursePassedProcess) != 100 &&
                    currentUserCourse != undefined &&
                    thisUserVideo != undefined &&
                    thisUserVideos != undefined) {
                    let passedtime = videoElementRef.current.currentTime / 60 // mins
                    let currentVideoDurationInMinutes = videoElementRef.current.duration / 60 // mins
                    let current_process_percentage = (passedtime * 100) / currentVideoDurationInMinutes;

                    // if(current_process_percentage == 100){
                    //   setTimeout(() => {
                    //     setIsPassed(true)
                    //   }, 1000);
                    // }

                    postVideoPercentage(video.id, current_process_percentage, thisUserVideo)
                    const sum_of_all_videos_percentage = thisUserVideos.map(item => item.current_process_percentage).reduce((prev, curr) => prev + curr, 0);
                    if (sum_of_all_videos_percentage != null) {
                        let totalCoursePassedPercentage = sum_of_all_videos_percentage / vids.length;
                        postCoursePercentage(currentUserCourse, totalCoursePassedPercentage)
                    } else {
                        //-- means we didn't play the video yet
                        //-- means the total pass percentage was calculated before
                        // ...
                    }
                }
                if (Math.ceil(CurrentUserCoursePassedProcess) == 100) {
                    setIsPassed(true) //-- we're done with watching all parts and we have to do a redirect 
                }
            }, 3000)
        }
        // ================= go to next part on video end
        // if (isPassed == true) {
        //     if (nextPart != undefined) {
        //         setTimeout(() => {
        //             history.push(`/view-video/${video.course_info.slug}/${nextPart.part}`)
        //         }, 6000)
        //     } else {
        //         setTimeout(() => {
        //             history.push('/passed-courses')
        //         }, 6000);
        //     }
        // }
        return () => {
            if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
            if (coursePassedProcessRef.current) clearInterval(coursePassedProcessRef.current);
        };
    }, [video, course, videos, thisUserVideo, currentUserCourse]);

    const getCurrentUserVideo = async (videoId) => {
        //giving the id of the video and getting token from localstorage , we'll have the current video that we have to watch
        try {
            apiCall.current = API.request(`/course/user/video/${videoId}`, false, {}, globalUser.accessToken);
            const ret = await apiCall.current.promise;
            if (ret.message == "Valid token") {
                setThisUserVideo(ret.data[0])
            }
        } catch (err) {
            setError("error")
        }
    }


    const getCurrentUserVideos = async (course_id) => {
        //giving the id of the course and getting token from localstorage , we'll have videos of this course that we have to watch
        try {
            apiCall.current = API.request(`/course/user/videos/`, true, { course_id: course_id }, globalUser.accessToken);
            const ret = await apiCall.current.promise;
            if (ret.message == "Valid token") {
                setThisUserVideos(ret.data)
            }
        } catch (err) {
            setError("error")
        }
    }


    const getCoursePassedProcessPercentage = async (userId) => {
        //getting the last passed percentage of the course that we sent to back end
        try {
            apiCall.current = API.request('/course/user/', true, { user_id: userId }, globalUser.accessToken);
            const response = await apiCall.current.promise;
            if (response.message == "Valid token") {
                for (var idx = 0; idx <= response.data.length; idx++) {
                    if (response.data[idx].user_id == globalUser.user_id && response.data[idx].course_id == course.id) {
                        setCurrentUserCourse(response.data[idx])
                        setCurrentUserCoursePassedProcess(response.data[idx].passed_percentage) //////// something is wrong with this shit!!!!!! 
                    }
                }
            }
        } catch (err) {
            setError("error for loading all user courses")
        }
    }

    const postVideoPercentage = async (
        videoId,
        current_process_percentage,
        thisUserVideo
    ) => {
        //send current percentage passed form the current watching video to backend
        if (thisUserVideo.current_process_percentage !== 100) {
            try {
                apiCall.current = API.request(
                    `/course/user/video/${videoId}`,
                    true,
                    { current_process_percentage: current_process_percentage },
                    globalUser.accessToken
                );
                const rey = await apiCall.current.promise;
            } catch (err) {
                setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
                setLoading(false);
            }
        }
    };
    const postCoursePercentage = async (currentUserCourse, passed_percentage) => {
        //sending the updated passed percentage of the course to backend
        if (passed_percentage != 100) {
            try {
                const resp = await axios.patch(
                    `https://api.aqua.ir:8283/course/user/${currentUserCourse.id}`,
                    {
                        passed_percentage: passed_percentage,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${globalUser.accessToken}`,
                        },
                    }
                );
            } catch (err) {
                setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
                setLoading(false);
            }
        }
    };
    const LoadingRow = () => {
        if (window.innerWidth > 576)
            return <div className={classes.loadingSingleBox} >
                <Skeleton variant="rectangular" height={600} style={{ background: '##2f3835' }} />
                <Skeleton variant="text" height={100} style={{ background: '##2f3835' }} />
            </div>
        else return <div className={classes.loadingSingleBox} >
            <Skeleton variant="rectangular" height={100} style={{ background: '##2f3835' }} />
            <Skeleton variant="rectangular" height={250} style={{ background: '##2f3835', margin: '10px 0px' }} />
            <Skeleton variant="text" height={100} style={{ background: '##2f3835' }} />
        </div>
    }
    function VideoController({ videos }) {
        return <>
            {videos.length != 0 ?
                <div className={classes.playListWrapper}>
                    <h5 className="text-center">{videos.length} ویدئو </h5>
                    {
                        videos.map((vid) => {
                            if (part == vid.part)
                                return <Link className={classes.selectedListItem} to={`/view-video/${video.course_info.slug}/${vid.part}`} key={vid.part} >
                                    <PlayCircle />
                                    <span style={{ marginRight: '5px', fontSize: '12px' }}>{vid.part}.&nbsp;{vid.video_name}</span>
                                </Link>
                            else return (
                                <Link className={classes.listItem} to={`/view-video/${video.course_info.slug}/${vid.part}`}>
                                    <PlayCircleOutline />
                                    <span style={{ marginRight: '5px', fontSize: '12px' }}>{vid.part}.&nbsp;{vid.video_name}</span>
                                </Link>
                            );
                        })}
                </div>
                : undefined}
        </>
    }
    return (
        <>
            <NewUserDashboard
                videoController={loading ? undefined : <VideoController videos={vids} />}
            >
                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                        }}
                    >
                        <LoadingRow />
                    </div>
                ) : (
                    <>
                        <Helmet>
                            <title>{`${video.video_name}`}</title>
                            <meta name="keywords" content="aqua,pourdad,Decentralized finance,decentral,decentral land,blockchain,tether,erc20,,erc721,Non-fungible token,nft,UStether,Defi,Crypto,Crypto currency,Crypto currencies,bitcoin,btc,bnb,binance,bsc,binance smart chain,cake,pancake,pancakeSwap,solana,ethereum,doge,doge coin,shiba,shiba inu.shiba token,investment,bep2,bep20,profit,asset management,asset" />
                            <meta name="keywords" content="صرافی غیر متمرکز, توکن, ارز دیجیتالی, ارز دیجیتال, کریپتو کارنسی, کریپتو, بایننس اسمارت چین, بلاکچین, اسمارت چین, بلاک چین, بیت کوین, داج کوین, دوج کوین, شیبا کوین, شیبا توکن, سولانا, اتریوم, تتر, صرافی, صرافی متمرکز, erc-20, erc-721, ERC-20, ERC-721,nft, توکن مثلی, توکن غیر مثلی, none-fungible-token, دیسنترالند, مدیریت دارایی, اقتصاد, سبدگردانی" />
                        </Helmet>
                        <div className={classes.contentWrapper}>
                            <Link to={`/course-preview/${course.slug}`}>
                                <h5 className={classes.courseTitle}>
                                    {course.title}
                                </h5>
                            </Link>
                            <div className="mobile-only">
                                <VideoController videos={vids} />
                            </div>
                            <VideoPlayer
                                src={video.video_playlist_url} type="application/x-mpegURL"
                                poster={`https://api.aqua.ir:8283/${video.image}`}
                                className={classes.VideoSingle}
                                ref={videoElementRef}
                                id="video"
                                autoPlay={false}
                                controls={true}

                            />
                            <div className={classes.courseDescription}>
                                <div className={classes.descriptionTitleWrapper} >
                                    توضیحات ویدیو
                                </div>
                            </div>
                            <div className={classes.videoDescription}>{video.short_description}</div>
                        </div>
                    </>
                )}
            </NewUserDashboard >
        </>
    );
}
