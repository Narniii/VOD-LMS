import React, { useEffect, useRef, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/api";
import '../style/NewQuiz.css'
import { useSelector } from 'react-redux'
import { Skeleton } from "@mui/material";
import NewUserDashboard from "../dashboard/NewDashboard";
import NewQuizCards from "../comps/QuizCards/NewQuizCards";

const useStyles = makeStyles((theme) => ({
    loadingSingleBox: {
        width: '100%',
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginTop: '10px'
        },
    },
    header: {
        color: '#64c5ba',
        marginTop: '30px',
        margin: '0px 20px',
        fontWeight: 'bold',
        "@media (max-width: 576px)": {
            textAlign: 'center'
        }
    },
}));
export default function NewBoughtQuizes() {
    const [error, setError] = useState(undefined)
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const { globalUser } = useSelector((state) => state.userReducer)
    const [loading, setLoading] = useState(true)
    const [done, setDone] = useState(undefined)
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        if (done != undefined)
            setLoading(false)
    }, [done])
    const fetchData = async () => {
        var allQuizzes = [];
        try {
            apiCall.current = API.request('/product/all/', false, {});
            let response = await apiCall.current.promise;
            if (response.length == 0) {
                setDone([]);
                return;
            }
            if (response.message == "Fetched successfully") {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].course_info.video_count == 0) {
                        for (var j = 0; j < response.data[i].course_info.user_course.length; j++) {
                            let buyerUserId = response.data[i].course_info.user_course[j].user_id
                            if (buyerUserId == globalUser.user_id) {
                                var course_info = {}
                                course_info.course_short_description = response.data[i].course_info.short_description
                                course_info.course_image = response.data[i].course_info.image
                                course_info.course_slug = response.data[i].course_info.slug
                                let course_and_quiz_merged = {
                                    ...course_info,
                                    ...response.data[i].course_info.quizes
                                };
                                allQuizzes.push(course_and_quiz_merged)
                            }
                        }
                    }
                }
            }
            if (response.message !== "Fetched successfully") {
                throw new Error('failed to load courses');
            }
            setDone(allQuizzes);
        }
        catch (err) {
            console.log(err);
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const LoadingRow = () => {
        var views = []
        if (window.innerWidth > 576)
            for (var i = 0; i < 9; i++) {
                views.push(
                    <div className="col-md-4">
                        <div className={classes.loadingSingleBox} >
                            <Skeleton variant="rectangular" width={'90%'} height={300} style={{ margin: '20px auto', clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)', background: '#2f3835', overflow: 'hidden' }} />
                        </div>
                    </div>
                )
            }

        else for (var i = 0; i < 3; i++) {
            views.push(
                <div className="col-md-4">
                    <div className={classes.loadingSingleBox} >
                        <Skeleton variant="rectangular" width={'90%'} height={300} style={{ margin: '20px auto', clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)', background: '#2f3835', overflow: 'hidden' }} />
                    </div>
                </div>
            )
        }
        return <div className="row" style={{ width: '80%', margin: '0 auto' }}>
            {views}
        </div>
    }
    return (
        <>
            <NewUserDashboard currentTab={"quiz"} secondChildSelected={true} >
                {loading ? <LoadingRow />
                    :
                    <>
                        {
                            done.length == 0 ?
                                <div style={{
                                    display: 'flex',
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: '65vh'
                                }}>
                                    <h3 style={{ color: '#64c5ba' }}>کوییزی وجود ندارد</h3>
                                </div>
                                :
                                <div style={{ width: '80%', margin: '0 auto' }}>
                                    <h4 className={classes.header}>کوییز های شما</h4>

                                    <div className="row">
                                        {done.map((quiz) => {
                                            return <div className="col-md-4" key={quiz.id}>
                                                <NewQuizCards
                                                    link={`/course-preview/${quiz.course_slug}`}
                                                    title={quiz.course_slug.replaceAll("-", " ")}
                                                    description={quiz.course_short_description}
                                                    bgImage={`https://api.aqua.ir:8283${quiz.course_image}`} />
                                            </div>
                                        })}
                                    </div>
                                </div>
                        }
                    </>
                }
            </NewUserDashboard >
        </>
    );
}