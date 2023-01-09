import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Rating from "@mui/material/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden, Paper } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import "./Courses.css";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Skeleton } from "@mui/material";

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
    overflowY: "scroll",
    overflowX: "hidden",
    width: "100%",
  },
  singleBox: {
    borderRadius: '10px',
    position: "relative",
    minHeight: '28vh',
    width: '100%',
    margin: '20px',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  courseThumbnail: {
    display: 'block',
    width: '100%',
    height: '15vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px'
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
  },
  loadingSingleBox: {
    borderRadius: '40px',
    width: '100%',
    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px'
    },
  },
  loginDoneModal: {
    position: 'absolute',
    width: '300px',
    height: '150px',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: 'none !important',
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '20px',
    outline: 'none'
  },
}));
export default function PassedCourse(props) {
  const [openRating, setOpenRating] = useState(false);
  const handleOpen = () => setOpenRating(true);
  const handleClose = () => setOpenRating(false);
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const { globalUser } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const apiCall = useRef(undefined);
  const classes = useStyles();
  const [courses, setCourses] = useState(undefined);
  const [meanScore, setMeanScore] = useState()
  // const id = props.match.params.id
  const [modal, setModal] = useState(false)
  let slug = props.match.params.slug;
  useEffect(() => {
    getCourses();
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);
  useEffect(() => {
    if (courses != undefined) {
      setLoading(false);
    }
  }, [courses]);

  const getCourses = async () => {
    var passedCoursesArray = [];
    try {
      apiCall.current = API.request("/product/all/", false, {});
      const response = await apiCall.current.promise;
      // console.log(response)
      if (response.message == "Fetched successfully") {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].course_info.video_count != 0) {
            for (var j = 0; j < response.data[i].course_info.user_course.length; j++) {
              let passedPercentage = Math.ceil(response.data[i].course_info.user_course[j].passed_percentage)
              let buyerUserId = response.data[i].course_info.user_course[j].user_id
              if (passedPercentage == 100 && buyerUserId == globalUser.user_id) {
                passedCoursesArray.push(response.data[i])
              }
            }
          }
        }
        setCourses(passedCoursesArray);
      }
      else {
        setCourses(passedCoursesArray);
      }
    } catch (err) {
      console.log(err)
      setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
    }
  };
  const LoadingRow = () => {
    var views = []
    if (window.innerWidth > 576)
      for (var i = 0; i < 9; i++) {
        views.push(
          <div className="col-md-4">
            <div className={classes.loadingSingleBox} >
              <Skeleton variant="rectangular" width={'100%'} height={150} style={{ borderRadius: '10px' }} />
              <Skeleton variant="text" height={40} style={{ borderRadius: '10px' }} />
            </div>
          </div>
        )
      }

    else for (var i = 0; i < 2; i++) {
      views.push(
        <div className="col-md-4">
          <div className={classes.loadingSingleBox} >
            <Skeleton variant="rectangular" width={'100%'} height={150} style={{ borderRadius: '10px' }} />
            <Skeleton variant="text" height={40} style={{ borderRadius: '10px' }} />
          </div>
        </div>
      )
    }
    return views
  }
  const submitScore = async (newvalue, course) => {
    if (course.product != 0) {
      try {
        const res = await axios.patch(
          `https://api.aqua.ir:8283/product/${course.id}`,
          {
            mean_score: newvalue * 10,
          },
          {
            headers: {
              Authorization: `Bearer ${globalUser.accessToken}`,
            },
          }
        );
        if (res.data.message == "Valid token") {
          setModal(true)
        }
      } catch (err) {
        setError("error!");
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>دوره های گذرانده شده</title>
      </Helmet>
      <Navbar
        children={
          <UserDashboard currentTab={"courses"} secondChildSelected={true} />
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
                <UserDashboard
                  currentTab={"courses"}
                  secondChildSelected={true}
                />
              </div>

              <div className="col-sm-9  overFlowHandler">
                <div className={classes.khakibox}>
                  {loading ? (
                    <div style={{ width: '100%' }}>
                      <div className="row" style={{ margin: '100px 1%' }}>
                        <LoadingRow />
                      </div>
                    </div>
                  ) : (
                    <div className={classes.coursesInProgressWrapper}>
                      <h3 className="mobile-only text-center" style={{ color: "#64c5ba" }}>دوره های گذرانده شده</h3>
                      <div className="row" style={{ height: "100%" }}>
                        {courses.length != 0 ? (
                          <>
                            {courses.map((course) => {
                              return (
                                <div className="col-md-6 col-lg-4">
                                  <div style={{ paddingLeft: '30px' }}>
                                    <Paper className={classes.singleBox}>
                                      <Link to={`/course-preview/${course.course_info.slug}`} style={{ backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283${course.course_info.image}`)) }} className={classes.courseThumbnail} />
                                      <Link to={`/course-preview/${course.course_info.slug}`} className="text-dark" style={{ textDecoration: 'none' }}>
                                        <div style={{ padding: "10px" }}>
                                          {course.course_info.title.length > 25 ? (
                                            <h5 style={{ color: 'black' }}>{course.course_info.title.substring(0, 25) + "..."}</h5>
                                          ) : (
                                            <h5 style={{ color: 'black' }}>{course.course_info.title}</h5>
                                          )}
                                          {course.course_info.content.length > 80 ? (
                                            <div>{course.course_info.content.substring(0, 80) + "..."}</div>
                                          ) : (
                                            <div>{course.course_info.content}</div>
                                          )}
                                        </div>
                                      </Link>
                                      <div className="text-center" style={{ paddingTop: '-20px' }}>
                                        <Rating
                                          style={{ direction: "ltr" }}
                                          name="size-large"
                                          precision={0.5}
                                          value={course.mean_score / 10}
                                          onChange={(event, newValue) => {
                                            submitScore(newValue, course)
                                          }}
                                        />
                                      </div>
                                    </Paper>
                                  </div>
                                </div>
                              );
                            })}

                          </  >
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                            }}
                          >
                            <h4 style={{ color: "#64c5ba" }}>
                              شما هنوز دوره ای را کامل نگذرانده اید
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
        >
          <div className={classes.loginDoneModal}>
            <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%' }}>
              <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "40px" }} />
              <span className="text-dark" style={{ marginRight: '10px' }}>امتیاز شما ثبت شد.</span>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
}
