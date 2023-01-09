import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden, Paper } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import "./CoursePreview.css";
import PreviewCourseTable from "./PreviewCourseTable";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  whiteBox: {
    backgroundColor: "white",
    borderRadius: "20px",
    height: "85vh",
  },
  khakibox: {
    backgroundColor: "#f2f2f2",
    height: "85vh",
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
    justifyContent: "center",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },
  coursesInProgressWrapper: {
    height: "75vh",
    marginTop: "60px",
    overflow: "scroll",
    width: "100%",
  },
  singleBox: {
    border: "2px solid green",
    borderRadius: "20px",
    padding: "20px",
    margin: "20px 35px",
    position: "relative",
  },
  videoWrapper: {
    textAlign: "center",
  },
  videoThumbnail: {
    width: "140px",
  },
  progressWrapper: {
    position: "absolute",
    bottom: "-30px",
    left: "-35px",
  },
  progressImage: {
    width: "70px",
  },
  imageAndTxtWrapper: {
    position: "relative",
  },
  progressPercentage: {
    position: "absolute",
    top: " 50%",
    left: " 50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "Spartan !important",
    fontSize: "12px",
    color: "#1d5643",
    fontWeight: 400,
  },
  greenBtn: {
    border: "none",
    padding: "10px 20px",
    backgroundColor: "#64c5ba",
    borderRadius: "5px",
    display: "inline-block",
    color: "white",
    textAlign: "center",
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "100%",
    },
  },
  offbtn: {
    border: "none",
    padding: "10px 10px",
    backgroundColor: "#64c5ba",
    borderRadius: "5px",
    width: "50%",
    display: "inline-block",
    color: "white",
    textAlign: "center",
    margin: "10px 5px",
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "50%",
    },
  },
  paper: {
    width: "80%",
    margin: "0 auto",
    padding: "10px 20px",
    minHeight: "65vh",
  },
  courseTitles: {
    color: "#64c5ba",
    fontWeight: "600",
    display: "inline-block",
    margin: "5px 0px",
    width: "18%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  courseTexts: {
    color: "black",
    width: "82%",
    display: "inline-block",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  loginDoneModal: {
    position: "absolute",
    width: "300px",
    height: "150px",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "none !important",
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "20px",
    outline: "none",
  },
}));
export default function CoursePreview(props) {
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
  const [modal, setModal] = useState(false);
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
    console.log(allPrerequisitiesPurchased)
    console.log(course)
    console.log(isPurchased)
    if (allPrerequisitiesPurchased != undefined && course != undefined && isPurchased != undefined) {
      setLoading(false);
    }

  }, [course, allPrerequisitiesPurchased, isPurchased]);
  const getCourse = async () => {
    setLoading(true);
    try {
      apiCall.current = API.request(`/course/${slug}`, false, {});
      const response = await apiCall.current.promise;
      console.log(response)
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
      console.log(response)
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
      <Navbar
        children={
          <UserDashboard currentTab={"courses"} thirdChildSelected={true} />
        }
      />
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
                <UserDashboard currentTab={"courses"} thirdChildSelected={true} />
              </div>
              <div className="col-sm-9 overFlowHandler">
                <div className={classes.khakibox}>
                  {loading ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", }}>
                      <CircularProgress style={{ color: "green" }} />
                    </div>
                  ) : (
                    <div className={classes.coursesInProgressWrapper}>
                      <Paper className={classes.paper}>
                        <div style={{ width: "100%", height: "30vh", backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283${course.image}`)), backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", }} />
                        <div className="product-single-info-wrapper">
                          <div style={{ borderBottom: "5px solid #64c5ba", margin: "10px 0px", }}>
                            <div className="product-single-info-title">اطلاعات دوره</div>
                          </div>
                          <div className={classes.courseTitles}>عنوان دوره:&nbsp;</div>
                          <div className={classes.courseTexts}>{course.title}</div>
                          <div className={classes.courseTitles}>درباره دوره:&nbsp;</div>
                          <div className={classes.courseTexts}>{course.content}</div>
                          <div className={classes.courseTitles}>چکیده دوره:&nbsp;</div>
                          <div className={classes.courseTexts}>{course.short_description}</div>
                          <div className={classes.courseTitles}>سطح دوره:&nbsp;</div>
                          <div className={classes.courseTexts}>{course.level}</div>
                          <div className={classes.courseTitles}>نام مدرس:&nbsp;</div>
                          <div className={classes.courseTexts}>{course.teacher_first_name}&nbsp;{course.teacher_last_name}</div>
                          <div className={classes.courseTitles}>
                            تگ‌های دوره:&nbsp;
                          </div>
                          <div className={classes.courseTexts}>
                            <div>
                              {course.tags.map((tag) => {
                                return (
                                  <div style={{ width: "fit-content", display: "inline-block", alignItems: "center", margin: "5px", padding: " 5px 15px", borderRadius: "5px", backgroundColor: "#64c5ba", }}>
                                    {tag}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <>
                            {course.video_count != 0 ?
                              <>
                                <div className={classes.courseTitles}>مدت دوره:&nbsp;</div>
                                <div className={classes.courseTexts}>
                                  {new Date(course.course_duration * 1000).toISOString().substr(11, 8)}</div>
                                <div className={classes.courseTitles}>تعداد ویدیو:&nbsp;</div>
                                <div className={classes.courseTexts}>{course.video_count}</div>
                              </>
                              :
                              undefined
                            }
                          </>
                          <>
                            {isPurchased ?
                              undefined
                              :
                              <>
                                <div className={classes.courseTitles}>
                                  قیمت:&nbsp;
                                </div>
                                <div className={classes.courseTexts}>
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
                              </>
                            }
                          </>
                          {course.prerequisite.length != 0 ? (
                            <>
                              {course.prerequisite[0].prerequisite_courses.length == 0 ?
                                undefined
                                :
                                <>
                                  <div className={classes.courseTitles}>
                                    پیش نیاز های دوره:&nbsp;
                                  </div>
                                  <div className={classes.courseTexts}>
                                    {course.prerequisite[0].prerequisite_courses.map(
                                      (prereq) => {
                                        return (
                                          <div
                                            style={{
                                              width: "fit-content",
                                              display: "inline-block",
                                              alignItems: "center",
                                              margin: "5px",
                                              padding: " 5px 15px",
                                              borderRadius: "5px",
                                              backgroundColor: "#64c5ba",
                                            }}
                                          >
                                            <a
                                              style={{
                                                textDecoration: "none",
                                                color: "white",
                                              }}
                                              href={`/course-preview/${prereq.slug}`}
                                            >
                                              {prereq.title}
                                            </a>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </>
                              }

                            </>
                          ) : undefined}
                          {/* <div>کامنت:{course.comments}</div> */}
                        </div>
                        {globalUser.user_group == "student" ? (
                          <>
                            {isPurchased == true ? (
                              <div className="text-center" style={{ display: "flex", justifyContent: "center" }}>
                                {course.video_count != 0 ?
                                  <Link
                                    to={{
                                      pathname: `/view-video/${course.slug}/1`,
                                    }}
                                  >
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
                                    else {
                                      console.log(course)
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
                                <div className="row">
                                  <div className="col-md-3"> </div>
                                  <div className="col-md-6">

                                    {discountMessage == "تخفیف اعمال شد" ?
                                      <>
                                        <div className="text-center">تخفیف اعمال شد</div>
                                      </>
                                      :
                                      <>
                                        <input className="signupFiledsInput76345 form-control" onChange={onChangeDiscount} value={discountCode} maxLength={7} style={{ width: '45%', display: 'inline-block' }} />
                                        {discountLoading ? <button disabled className="btn btn-md btn-success" style={{ display: 'inline-block', marginRight: 10 }}><CircularProgress style={{ width: '20px', height: '20px' }} /></button> : <button className="btn btn-md btn-success" style={{ display: 'inline-block', marginRight: 10 }} onClick={checkForDiscount}>اعمال کد تخفیف</button>}
                                      </>
                                    }
                                  </div>
                                  {discountMessage ? discountMessage == "تخفیف اعمال شد" ? <div style={{ textAlign: 'center', color: 'green' }}>{discountMessage}</div> : <div style={{ textAlign: 'center', color: 'red' }}>{discountMessage}</div> : undefined}

                                  <div className="col-md-3"> </div>
                                </div>

                                <div className="text-center" style={{ display: "flex", justifyContent: "center" }}>
                                  {course.video_count == 0 ?
                                    <button
                                      className={classes.greenBtn}
                                      onClick={createPayment}
                                    >
                                      خریدن کوییز
                                    </button>
                                    :
                                    <>
                                      {allPrerequisitiesPurchased != undefined ?
                                        <>
                                          {allPrerequisitiesPurchased ? (
                                            <div className="text-center" style={{ display: "flex", justifyContent: "center" }}>
                                              <button
                                                className={classes.greenBtn}
                                                onClick={createPayment}
                                              >
                                                خریدن دوره
                                              </button>
                                            </div>
                                          ) : (
                                            <div className="text-center" >
                                              <div className="btn btn-md btn-warning">
                                                برای خریدن این دوره ابتدا باید پیشنیاز
                                                های دوره را بگذرانید
                                              </div>
                                            </div>
                                          )}
                                        </>
                                        :
                                        <button
                                          className={classes.greenBtn}
                                          onClick={createPayment}
                                        >
                                          خریدن دوره
                                        </button>
                                      }
                                    </>
                                  }
                                </div>
                              </>
                            )}
                          </>
                        ) : globalUser.user_group == 'teacher' || globalUser.user_group == 'superuser' ? (
                          <div style={{ width: "100%" }}>
                            <Link
                              style={{
                                display: "inline-block",
                                margin: "20px",
                              }}
                              to={{
                                pathname: `/upload-new-video/${course.slug}`,
                              }}
                            >
                              <button
                                style={{ width: "100%" }}
                                className="btn btn btn-outline-success"
                              >
                                افزودن ویدیو
                              </button>
                            </Link>
                            <Link
                              style={{
                                display: "inline-block",
                                margin: "20px",
                              }}
                              to={{ pathname: `/edit-course/${course.slug}` }}
                            >
                              <button
                                style={{ width: "100%" }}
                                className="btn btn-success"
                              >
                                ویرایش دوره
                              </button>
                            </Link>
                            {course.video_count != 0 ?
                              <Link
                                style={{
                                  display: "inline-block",
                                  margin: "20px",
                                }}
                                to={{ pathname: `/course-videos/${course.slug}` }}
                              >
                                <button
                                  style={{ width: "100%" }}
                                  className="btn btn-outline-success"
                                >
                                  ویرایش ویدیو
                                </button>
                              </Link>
                              :
                              undefined
                            }
                            {/* {globalUser.user_group == "superuser" ? (
                              <button
                                style={{ width: "100%" }}
                                className="btn btn-md btn-success"
                                onClick={publishCourse}
                              >
                                انتشار دوره
                              </button>
                            ) : undefined} */}
                          </div>
                        ) : undefined}
                      </Paper>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal open={modal} onClose={() => setModal(false)}>
        <div className={classes.loginDoneModal}>
          <div
            style={{
              display: "flex",
              alignItems: " center",
              width: "100%",
              height: "100%",
            }}
          >
            <CheckCircleOutlineIcon
              style={{ color: "green", fontSize: "40px" }}
            />
            <span className="text-dark" style={{ marginRight: "10px" }}>
              دوره انتشار شد
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
}
