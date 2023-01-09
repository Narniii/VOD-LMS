import React, { useEffect, useRef, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import API from "../../utils/api";
import "../style/CoursePreview.css";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import NewUserDashboard from "../dashboard/NewDashboard";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0 auto',
        clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)',
        background: '#2f3835',
        padding: '0px 0px 40px 0px',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '80%',

        },
        "@media (min-width: 1000px)": {
            width: '60%',
        },
        "@media (min-width: 1280px)": {
            width: '50%',

        }
    },
    wrapper: {
        position: 'relative',
    },
    greenBtn: {
        border: "none",
        padding: "10px 20px",
        backgroundColor: "#64c5ba",
        color: "white",
        textAlign: "center",
        position: 'absolute',
        bottom: '-20px',
        left: '50%',
        transform: 'translate(-50%, 0)',
        clipPath: 'polygon(10px 0, 100% 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 100%, 0 10px)',
        width: '150px',
        height: '50px',
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: "100%",
        },
    },
    courseTitles: {
        color: "#64c5ba",
        fontWeight: "600",
        display: "inline-block",
        margin: "5px 0px",
        width: "18%",
        verticalAlign: 'top',
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
    courseTexts: {
        width: "82%",
        display: "inline-block",
        verticalAlign: 'sub',
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
    tags: {
        width: "fit-content",
        display: "inline-block",
        alignItems: "center",
        marginLeft: "10px",
        marginTop: "5px",
        marginBottom: "5px",
        padding: " 5px 15px",
        borderRadius: "5px",
        backgroundColor: "#64c5ba",
    },
    courseTitle: {
        color: 'rgb(100, 197, 186)',
        padding: '20px 0px',
    },
    courseContent: {
        fontSize: '14px'
    },
    detailsTitle: {
        color: 'rgb(100, 197, 186)',
        fontSize: '16px',
        marginTop: '20px',
        marginBottom: '10px'
    },
    detailsNotFoundBox: {
        display: "flex",
        alignItems: "center",
        margin: "5px",
        padding: " 5px 15px",
        justifyContent: 'center',
        fontSize: '12px',
        width: '100%',

        backgroundColor: 'rgb(100, 197, 186)',
        color: '#0f2d3e',
    },
    detailsBox: {
        display: "flex",
        alignItems: "center",
        margin: "5px 0px",
        padding: " 5px 2px",
        justifyContent: 'center',
        fontSize: '12px',
        width: '100%',
        border: '1px solid rgb(100, 197, 186)',
        color: 'rgb(100, 197, 186)',
        backgroundColor: 'transparent'
    },
    detailsSubTitle: {
        fontSize: '11px',
        color: 'rgb(100, 197, 186)',
        display: 'inline-block'
    },
    detailsSubText: {
        display: 'inline-block',
        fontSize: '11px',

    }

}));
export default function NewCoursePreview(props) {
    const { globalUser } = useSelector((state) => state.userReducer);
    const [error, setError] = useState(undefined);
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState(undefined);
    const [isPurchased, setIsPurchased] = useState(undefined);
    const [discountMessage, setDiscountMessage] = useState(undefined);
    const [discountCode, setDiscountCode] = useState(undefined);
    const [discountLoading, setDiscountLoading] = useState(false);
    const [coursePrereq, setCoursePrereq] = useState(undefined);
    const [PrereqDetectorObj, setPrereqDetectorObj] = useState(undefined);
    const [allPrerequisitiesPurchased, setAllPrerequisitiesPurchased] = useState(undefined);
    const [previousPrice, setPreviousPrice] = useState(undefined)
    const [discount_id, setDiscount_id] = useState(0);
    let slug = props.match.params.id;
    let browserTitle = slug.replaceAll("-", " ")
    useEffect(() => {
        getCourse();
        return () => {
            if (apiCall.current !== undefined) apiCall.current.cancel();
        };
    }, [slug]);
    useEffect(() => {
        if (course != undefined) {
            if (globalUser.user_group == "student") {
                purchaseDetector();
            }
            else setLoading(false);
        }
    }, [course]);
    useEffect(() => {
        if (coursePrereq != undefined) getCoursePrereq();
    }, [coursePrereq]);
    useEffect(() => {
        if (PrereqDetectorObj != undefined) prereqPurchaseDetector();
    }, [PrereqDetectorObj]);
    useEffect(() => {
        if (allPrerequisitiesPurchased != undefined && course != undefined && isPurchased != undefined) {
            setLoading(false);
        }

    }, [course, allPrerequisitiesPurchased, isPurchased]);
    const getCourse = async () => {
        setLoading(true);
        try {
            apiCall.current = API.request(`/course/${slug}`, false, {});
            const response = await apiCall.current.promise;
            // console.log(response)
            if (response.detail == 'Not found.') {
                history.push("/404");
            }
            if (response.message == "Fetched successfully") {
                setCourse(response.data);
                if (response.data.prerequisite.length != 0) {
                    if (response.data.prerequisite[0].prerequisite_courses.length != 0) {
                        setCoursePrereq(response.data.prerequisite[0].prerequisite_courses);
                    }
                    else { setCoursePrereq([]) }
                }
                else (setCoursePrereq([]))
                return response.data;
            }
        } catch (err) {
            setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
        }
    };
    const getCoursePrereq = async () => {
        var temp = [];
        for (var i = 0; i < coursePrereq.length; i++) {
            try {
                apiCall.current = API.request(
                    `/course/${coursePrereq[i].slug}`,
                    false,
                    {}
                );
                const response = await apiCall.current.promise;
                if (response.message == "Fetched successfully") {
                    temp.push(response.data);
                }
            } catch (err) {
                setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
            }
        }
        setPrereqDetectorObj(temp);
    };
    const prereqPurchaseDetector = () => {
        let totalPrerequisitieCoursesPurchased = 0;
        for (var i = 0; i < PrereqDetectorObj.length; i++) {
            for (var j = 0; j < PrereqDetectorObj[i].user_course.length; j++) {
                if (globalUser.user_id == PrereqDetectorObj[i].user_course[j].user_id)
                    totalPrerequisitieCoursesPurchased++;
            }
        }
        if (totalPrerequisitieCoursesPurchased == PrereqDetectorObj.length) {
            setAllPrerequisitiesPurchased(true);
        } else setAllPrerequisitiesPurchased(false);
    };

    const purchaseDetector = () => {
        let users = course.user_course.length;
        var detected = false
        if (users != 0) {
            for (var i = 0; i < users; i++) {
                if (globalUser.user_id == course.user_course[i].user_id) {
                    setIsPurchased(true);
                    detected = true
                }
            }
            if (!detected) setIsPurchased(false)
        }
        else setIsPurchased(false);
    };
    const onChangeDiscount = (e) => {
        setDiscountCode(e.target.value.toUpperCase());
    };
    const checkForDiscount = async () => {
        setDiscountLoading(true);
        try {
            apiCall.current = API.request("/product/discount/check/", true, { code: discountCode }, globalUser.accessToken);
            const response = await apiCall.current.promise;
            // console.log(response)
            if (response.message == "Valid token") {
                if (response.error == "No discount code submitted for this user" || response.error == "Wrong discount code") {
                    setDiscountMessage("کد تخفیف برای شما ثبت نشده است");
                    setDiscountLoading(false);
                } if (response.error == "Discount code has been expired") {
                    setDiscountMessage("کد تخفیف منقضی شده است");
                    setDiscountLoading(false)
                }
                if (response.error == "Wrong discount code") {
                    setDiscountMessage("کد تخفیف اشتباه است");
                    setDiscountLoading(false)
                }
                else {
                    setDiscountMessage("تخفیف اعمال شد");
                    setPreviousPrice(course.price)
                    const cc = { ...course };
                    cc.price = course.price - ((course.price * response.data.offpercentage) / 100);
                    setCourse(cc);
                    setDiscount_id(response.data.discount_id)
                    setDiscountLoading(false);
                }
            }
        } catch (err) {
            console.log(err)
            setDiscountMessage("کد تخفیف اشتباه است");
            setDiscountLoading(false);
        }
    };
    const createPayment = async (e) => {
        e.preventDefault();
        try {
            apiCall.current = API.request(
                "/portal/purchase/",
                true,
                {
                    product_id: course.product,
                    price: course.price,
                },
                globalUser.accessToken
            );
            const response = await apiCall.current.promise;
            if (response.message == "Do redirect") {
                localStorage.setItem('discount_id', discount_id);
                window.location = response.data;
            }
        } catch (err) {
            setDiscountMessage("کد تخفیف اشتباه است");
            setDiscountLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>{browserTitle}</title>
            </Helmet>
            <NewUserDashboard currentTab={"courses"} thirdChildSelected={true}>
                {loading ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", }}>
                        <CircularProgress style={{ color: "#64c5ba" }} />
                    </div>
                ) : (
                    <div className={classes.wrapper}>
                        <div className={classes.container}>
                            <div style={{
                                width: "100%",
                                height: "30vh",
                                backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283${course.image}`)),
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }} />
                            <div className="product-single-info-wrapper" style={{ padding: '0px 40px 0px 40px' }}>
                                <h2 className={classes.courseTitle}>{course.title}</h2>
                                <div className={classes.courseContent}>{course.content}</div>
                                <div className={classes.courseContent}>{course.short_description}</div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className={classes.detailsTitle}>پیشنیازها</div>
                                        {course.prerequisite.length != 0 ? (
                                            <>
                                                {course.prerequisite[0].prerequisite_courses.length == 0 ?
                                                    <div className={classes.detailsNotFoundBox}>ناموجود</div>
                                                    :
                                                    <div className={classes.courseTexts}>
                                                        {course.prerequisite[0].prerequisite_courses.map((prereq, index) => {
                                                            return <Link className={classes.detailsBox} to={`/course-preview/${prereq.slug}`} key={index}>{prereq.title}</Link>
                                                        }
                                                        )}
                                                    </div>
                                                }

                                            </>
                                        ) : <div className={classes.detailsNotFoundBox}>ناموجود</div>
                                        }
                                    </div>
                                    <div className="col-md-4">
                                        <div className={classes.detailsTitle}>تگ های دوره</div>
                                        {course.tags.length != 0 ?
                                            course.tags.map((tag) => {
                                                return <div className={classes.detailsBox}>{tag}</div>
                                            })
                                            :
                                            <div className={classes.detailsNotFoundBox}>ناموجود</div>

                                        }
                                    </div>
                                    <div className="col-md-4">
                                        <div className={classes.detailsTitle}>درباره‌ی دوره</div>
                                        <div className={classes.detailsBox}>
                                            <div className={classes.detailsSubTitle}>سطح دوره:&nbsp;</div>
                                            <div className={classes.detailsSubText}>{course.level}</div>
                                        </div>
                                        <div className={classes.detailsBox}>
                                            <div className={classes.detailsSubTitle}>نام مدرس:&nbsp;</div>
                                            <div className={classes.detailsSubText}>{course.teacher_first_name}&nbsp;{course.teacher_last_name}</div>
                                        </div>
                                        {course.video_count != 0 ?
                                            <>
                                                <div className={classes.detailsBox}>
                                                    <div className={classes.detailsSubTitle}>مدت دوره:&nbsp;</div>
                                                    <div className={classes.detailsSubText}>
                                                        {new Date(course.course_duration * 1000).toISOString().substr(11, 8)}</div>
                                                </div>
                                                <div className={classes.detailsBox}>
                                                    <div className={classes.detailsSubTitle}>تعداد ویدیو:&nbsp;</div>
                                                    <div className={classes.detailsSubText}>{course.video_count}</div>
                                                </div>
                                                <>
                                                    {isPurchased ?
                                                        undefined
                                                        :
                                                        <>
                                                            <div className={classes.detailsBox}>
                                                                <div className={classes.detailsSubTitle}>
                                                                    قیمت:&nbsp;
                                                                </div>
                                                                <div className={classes.detailsSubText}>
                                                                    {previousPrice ?
                                                                        <>
                                                                            <span style={{ textDecoration: 'line-through', color: 'darkgrey' }}>{previousPrice}ریال</span>
                                                                            &nbsp;
                                                                            <span>{course.price}ریال</span>
                                                                        </>
                                                                        :
                                                                        <span>{course.price}ریال</span>
                                                                    }

                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            </>
                                            :
                                            undefined
                                        }
                                    </div>
                                </div>
                            </div>
                            <>
                                {isPurchased == true ? (
                                    <div className="text-center" style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>
                                        {course.video_count != 0 ?
                                            <Link to={{ pathname: `/view-video/${course.slug}/1` }}>
                                                <button className='btn btn-outline-success' >
                                                    ویدیو های دوره
                                                </button>
                                            </Link>
                                            :
                                            undefined
                                        }
                                        {course.user_course.map((user) => {
                                            if (user.user_id == globalUser.user_id) {
                                                if (Math.ceil(user.passed_percentage) == 100 && course.quizzes.length != 0) {
                                                    return <span style={{ margin: '0px 5px' }}>
                                                        <button className='btn btn-success'
                                                            onClick={() => {
                                                                if (course.quizzes.length == 1)
                                                                    history.push(`/test/${course.quizzes[0].id}`)
                                                                else {
                                                                    let randomInt = Math.floor(Math.random() * course.quizzes.length)
                                                                    var found = undefined
                                                                    for (var kk = 0; kk < course.quizzes.length; kk++) {
                                                                        let localquiz = localStorage.getItem(`quiz${course.quizzes[kk].id}`)
                                                                        if (localquiz != undefined && localquiz != null) {
                                                                            found = course.quizzes[kk]
                                                                            break;
                                                                        }
                                                                    }
                                                                    if (found)
                                                                        history.push(`/test/${found.id}`)
                                                                    else
                                                                        history.push(`/test/${course.quizzes[randomInt].id}`)
                                                                }
                                                            }}>
                                                            انجام کوییز
                                                        </button>
                                                    </span>
                                                }
                                                else {
                                                    // console.log(course)
                                                    if (course.video_count == 0 && course.quizzes.length != 0) {
                                                        return <span style={{ margin: '0px 5px' }}><button className='btn btn-success'
                                                            onClick={() => {
                                                                if (course.quizzes.length == 1)
                                                                    history.push(`/test/${course.quizzes[0].id}`)
                                                                else {
                                                                    let randomInt = Math.floor(Math.random() * course.quizzes.length)
                                                                    history.push(`/test/${course.quizzes[randomInt].id}`)
                                                                }
                                                            }}>
                                                            انجام کوییز
                                                        </button>
                                                        </span>
                                                    }
                                                }
                                            }

                                        })}
                                    </div>
                                ) : (
                                    <>
                                        <div className="row discountBox" style={{ margin: '20px 0px' }}>
                                            <div className="col-md-3"> </div>
                                            <div className="col-md-6">
                                                {discountMessage == "تخفیف اعمال شد" ?
                                                    <>
                                                        <div className="text-center">تخفیف اعمال شد</div>
                                                    </>
                                                    :
                                                    <>
                                                        <input className="form-control" onChange={onChangeDiscount} value={discountCode} maxLength={7} style={{ width: '45%', display: 'inline-block' }} />
                                                        {discountLoading ? <button disabled className="btn btn-md btn-success" style={{ display: 'inline-block', marginRight: 10 }}><CircularProgress style={{ width: '20px', height: '20px' }} /></button> : <button className="btn btn-md btn-success" style={{ display: 'inline-block', marginRight: 10 }} onClick={checkForDiscount}>اعمال کد تخفیف</button>}
                                                    </>
                                                }
                                            </div>
                                            {discountMessage ? discountMessage == "تخفیف اعمال شد" ? <div style={{ textAlign: 'center', color: '#64c5ba' }}>{discountMessage}</div> : <div style={{ textAlign: 'center', color: 'red' }}>{discountMessage}</div> : undefined}

                                            <div className="col-md-3"> </div>
                                        </div>


                                    </>
                                )}
                            </>
                        </div>
                        {isPurchased != true ?
                            course.video_count == 0 ?
                                <button
                                    className={classes.greenBtn}
                                    onClick={createPayment}
                                >
                                    خریدن کوییز
                                </button>
                                :
                                <>
                                    {allPrerequisitiesPurchased != undefined ?
                                        allPrerequisitiesPurchased ? <button
                                            className={classes.greenBtn}
                                            onClick={createPayment}>
                                            خریدن دوره
                                        </button>
                                            :
                                            <div className="btn btn-md btn-warning">برای خریدن این دوره ابتدا باید پیشنیاز های دوره را بگذرانید</div>
                                        :
                                        <button
                                            className={classes.greenBtn}
                                            onClick={createPayment}>
                                            خریدن دوره
                                        </button>
                                    }
                                </>
                            : undefined
                        }
                    </div>
                )}
            </NewUserDashboard>
        </>
    );
}
