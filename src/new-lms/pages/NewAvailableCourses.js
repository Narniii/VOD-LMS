import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/api";
import '../style/Courses.css'
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Skeleton } from "@mui/material";
import NewUserDashboard from "../dashboard/NewDashboard";
import WelcomeCourseCards from "../welcome/WelcomeCourseCards";
const useStyles = makeStyles((theme) => ({
    loadingSingleBox: {
        width: '91%',
        margin: '20px',
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    header: {
        color: '#64c5ba',
        marginTop: '30px',
        margin: '0px 30px',
        fontWeight: 'bold',
        "@media (max-width: 576px)": {
            textAlign: 'center'
        }
    },
}));
export default function NewAvailableCourses() {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    useEffect(() => {
        getCourses().then(() => {
            setLoading(false)
        })
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    const getCourses = async () => {
        let tmp = []
        try {
            apiCall.current = API.request('/product/all/', false, {});
            const response = await apiCall.current.promise
            // console.log(response)
            if (response.message == "Fetched successfully")
                if (response.data.length != 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].course_info.video_count != 0)
                            tmp.push(response.data[i])
                    }
                    setCourses(tmp)
                }
                else setCourses(tmp)
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
                <title>دوره های موجود</title>
            </Helmet>
            <NewUserDashboard currentTab={"courses"} firstChildSelected={true}>
                <h4 className={classes.header}>دوره های بیتداد</h4>
                {loading ? <LoadingRow />
                    :
                    <>
                        {courses.length != 0 ?
                            <>
                                {courses.map((course) => {
                                    return <WelcomeCourseCards key={course.id}
                                        link={`/course-preview/${course.course_info.slug}`}
                                        user={globalUser}
                                        bgImage={`https://api.aqua.ir:8283${course.course_info.image}`}
                                        title={course.course_info.title}
                                        description={course.course_info.short_description}
                                    />
                                })}
                            </>
                            :
                            <div style={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center",
                                height: '100%'
                            }}>
                                <h4 style={{ color: '#64c5ba' }}>
                                    در حال حاضر دوره‌ای وجود ندارد
                                </h4>
                            </div>
                        }
                    </>
                }

            </NewUserDashboard>
        </>
    );
}