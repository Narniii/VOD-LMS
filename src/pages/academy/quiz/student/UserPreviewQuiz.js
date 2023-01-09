import React, { useEffect, useRef, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Divider, Paper } from "@material-ui/core";
import UserDashboard from "../../common/UserDashboard";
import "../Quizes.css";
import { useSelector } from "react-redux";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import API from "../../../../utils/api";
import moment from "jalali-moment";
import { Helmet } from "react-helmet";
// import Navbar from '../../Navbar/Navbar'

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
    marginTop: "10vh",
    overflow: "scroll",
    width: "100%",
  },
  previewButtons: {
    border: "none",
    padding: "10px 20px",
    backgroundColor: "#64c5ba",
    borderRadius: "5px",
    width: "100%",
    display: "inline-block",
    color: "white",
    textAlign: "center",
    margin: "20px 5px !important",
    [theme.breakpoints.down("xs")]: {
      width: "45%",
      margin: "0px 5px !important",
      fontSize: "14px",
    },
  },
  paperWrapper: {
    width: "60%",
    margin: "0 auto",
    height: "60vh",
    padding: "10px 20px",
  },
  aquaLogo: {
    width: "30%",
    margin: "0 auto",
  },
  quizTitles: {
    color: "#64c5ba",
    fontWeight: "600",
    display: "inline-block",
    margin: "5px 0px",
  },
  quizTexts: {
    color: "black",
    width: "85%",
    display: "inline-block",
  },
}));
export default function UserPreviewQuiz(props) {
  const id = props.match.params.id;
  const apiCall = useRef(undefined);
  const classes = useStyles();
  const [err, setErr] = useState(false);
  const { globalUser } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [quizes, setQuizes] = useState(undefined);
  const [quiz, setQuiz] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [course, setCourse] = useState(undefined);
  const [day, setDay] = useState(undefined);
  const [month, setMonth] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [isPurchased, setIsPurchased] = useState(undefined);
  useEffect(() => {
    getQuizes();
  }, []);
  useEffect(() => {
    if (quiz != undefined)
      getCourse();
  }, [quiz]);
  useEffect(() => {
    if (course != undefined)
      purchaseDetector();
  }, [course]);
  useEffect(() => {
    if (isPurchased != undefined) setLoading(false);
  }, [isPurchased]);
  const getQuizes = async () => {
    try {
      apiCall.current = API.request(
        "/quiz/all/",
        false,
        {},
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      if (response.message == "Fetched successfully") {
        setQuizes(response.data);
        const len = response.data.length;
        for (var i = 0; i < len; i++)
          if (response.data[i].id == id) {
            setDay(
              moment(response.data[i].created_at, "YYYY/MM/DD")
                .locale("fa")
                .format("dddd ")
            );
            setMonth(
              moment(response.data[i].created_at, "YYYY/MM/DD")
                .locale("fa")
                .format("MMM")
            );
            setYear(
              moment(response.data[i].created_at, "YYYY/MM/DD")
                .locale("fa")
                .format("yyyy ")
            );
            setQuiz(response.data[i]);
          }
      }
      if (response.detail == "Not found.") {
        history.push("/404");
      }
    } catch (err) {
      setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
    }
  };
  const getCourse = async () => {
    try {
      apiCall.current = API.request(`/course/${quiz.course_slug}`, false, {});
      const response = await apiCall.current.promise;
      if (response.message == "Fetched successfully") {
        setCourse(response.data);
        return response.data;
      }
    } catch (err) {
      setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
    }
  };
  const purchaseDetector = () => {
    let i = 0;
    let users = course.user_course.length;
    if (users != 0)
      for (i; i < users; i++) {
        if (globalUser.user_id == course.user_course[i].user_id)
          setIsPurchased(true);
        else setIsPurchased(false);
      }
    else setIsPurchased(false);
  };
  const createPayment = async (e) => {
    e.preventDefault()
    console.log(course)
    try {
      apiCall.current = API.request('/portal/purchase/', true, {
        product_id: course.product,
        price: 10000
      }, globalUser.accessToken
      );
      const response = await apiCall.current.promise
      if (response.message == 'Do redirect') {
        window.location = response.data
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Navbar
        children={
          <UserDashboard currentTab={"quiz"} firstChildSelected={true} />
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
              <div className="col-md-3 no-mobile">
                <UserDashboard currentTab={"quiz"} firstChildSelected={true} />
              </div>

              <div className="col-md-9 overFlowHandler new-quiz-inputs">
                <div className={classes.khakibox}>
                  <div className={classes.coursesInProgressWrapper}>
                    {loading ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        <CircularProgress style={{ color: "green" }} />
                      </div>
                    ) : (
                      <>
                        <Helmet>
                          <title>{`${quiz.course_slug.replaceAll("-", " ")}`}</title>
                        </Helmet>
                        <Paper className={classes.paperWrapper}>
                          <div className="text-center">
                            <img
                              className={classes.aquaLogo}
                              src={PUBLIC_URL("images/academy/logoaqua.svg")}
                            />
                          </div>
                          <div className={classes.quizTitles}>
                            عنوان کوییز:&nbsp;
                          </div>
                          <div className={classes.quizTexts}>{quiz.title}</div>
                          <div>
                            <div className={classes.quizTitles}>درس:&nbsp;</div>
                            <div className={classes.quizTexts}>{course.title}</div>
                            <div className={classes.quizTitles}>تاریخ:&nbsp;</div>
                            <span className={classes.postDate} className="text-black">
                              {day}،{month}&nbsp;{year}
                            </span>
                          </div>
                          <div className={classes.buttonsWrapper}>
                            {isPurchased ? undefined :
                              <>
                                {course.video_count == 0 ?
                                  undefined
                                  :
                                  <button
                                    className={classes.previewButtons}
                                    onClick={() =>
                                      history.push(`/course-preview/${course.slug}`)
                                    }
                                  >
                                    خریدن دوره
                                  </button>
                                }
                              </>
                            }
                            {isPurchased ?
                              <button
                                className={classes.previewButtons}
                                onClick={() => history.push(`/test/${quiz.id}`)}
                              >
                                انجام کوییز
                              </button>
                              :
                              <button className={classes.previewButtons} onClick={createPayment}>
                                خریدن کوییز
                              </button>
                            }
                          </div>
                        </Paper>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
