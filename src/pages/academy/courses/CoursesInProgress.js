import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import "./Courses.css";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Skeleton from '@mui/material/Skeleton';
import CardWithPercent from "../../../common/cards/CardWithPercent";

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
    border: '2px solid green',
    borderRadius: '20px',
    position: "relative",
    width: '100%',
    margin: '20px',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  courseThumbnail: {
    width: '100%',
    height: '200px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderTopRightRadius: '18px',
    borderTopLeftRadius: '18px'
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
  loadingSingleBox: {
    borderRadius: '40px',
    width: '100%',
    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px'
    },
  },
  container: {
    paddingLeft: '40px',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '10px',
    },
  }
}));
export default function CoursesInProgress(props) {
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const apiCall = useRef(undefined);
  const classes = useStyles();
  const { globalUser } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(undefined);
  const [userCourses, setUserCourses] = useState(undefined);
  let slug = props.match.params.slug;
  useEffect(() => {
    getCourses(slug);
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);
  useEffect(() => {
    if (userCourses != undefined)
      setLoading(false);
  }, [userCourses]);

  const getCourses = async (slug) => {
    const coursesArray = [];
    try {
      apiCall.current = API.request("/course/user/", true, { user_id: globalUser.user_id }, globalUser.accessToken);
      const response = await apiCall.current.promise;
      if (response.message == "Valid token") {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].course_info.video_count != 0) {
            if (Math.ceil(response.data[i].passed_percentage) != 100 && response.data[i].user_id == globalUser.user_id) {
              coursesArray.push(response.data[i]);
            }
          }
        }
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>", coursesArray)
        setUserCourses(coursesArray);
      }
      else {
        setUserCourses(coursesArray);
      }
    } catch (err) {
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
  return (
    <>
      <Navbar
        children={
          <UserDashboard currentTab={"courses"} firstChildSelected={true} />
        }
      />
      <Helmet>
        <title>دوره های در حال یادگیری</title>
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
        }}
      >
        <div className="container">
          <div className={classes.whiteBox}>
            <div className="row">
              <div className="col-sm-3 no-mobile">
                <UserDashboard
                  currentTab={"courses"}
                  firstChildSelected={true}
                />
              </div>

              <div className="col-sm-9 overFlowHandler">
                <div className={classes.khakibox}>
                  <div className={classes.coursesInProgressWrapper}>
                    {loading ? (
                      <div className="row" style={{ margin: '20px 1%' }}>
                        <LoadingRow />
                      </div>
                    ) : (
                      <>
                        <h3
                          className="mobile-only text-center"
                          style={{ color: "#64c5ba" }}
                        >
                          دوره های در حال یادگیری
                        </h3>

                        {/* again if we didn't need the second api , change the userCourses to courses */}

                        {userCourses.length == 0 ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                            }}
                          >
                            <h3 style={{ color: "#64c5ba" }}>
                              دوره‌ای وجود ندارد
                            </h3>
                          </div>
                        ) : (
                          <div className={classes.container}>
                            <div className="row">
                              {userCourses.map((uc) => {
                                return (
                                  <div className="col-md-6 col-lg-4" key={uc.course_info.id}>
                                    <div style={{ padding: '10px 20px' }}>
                                      <CardWithPercent
                                        link={`/course-preview/${uc.course_info.slug}`}
                                        bgImage={`https://api.aqua.ir:8283${uc.course_info.image}`}
                                        title={uc.course_info.title}
                                        percentage={Math.ceil(uc.passed_percentage)}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
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
