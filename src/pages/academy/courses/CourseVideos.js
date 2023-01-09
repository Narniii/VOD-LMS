import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden, Paper } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import "./Courses.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Carousel } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Helmet } from "react-helmet";
SwiperCore.use([Navigation, Pagination]);

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
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    borderBottomLeft: "none",
    padding: "20px",
    margin: "20px 35px",
    position: "relative",
  },
  videoWrapper: {},
  videoThumbnail: {
    width: "100%",
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
  greenBtn: {
    border: "none",
    padding: "10px 20px",
    backgroundColor: "#64c5ba",
    borderRadius: "5px",
    width: "80%",
    display: "inline-block",
    color: "white",
    textAlign: "center",
    margin: "10px auto",
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "50%",
    },
  },
  paperContentWrapper: {
    margin: '20px',
    backgroundColor: '#d8d8d8',
    padding: '1px 1px',
    borderRadius: '20px'
  },
  videoTitle: {
    backgroundColor: 'white',
    textAlign: 'center',
    color: 'black',
    margin: '10px',
    padding: '20px',
    borderRadius: '20px'
  },
  paperVideoContainer: {
    backgroundColor: 'white',
    textAlign: 'center',
    color: 'black',
    margin: '10px',
    padding: '20px',
    borderRadius: '20px'
  },
  paperBackGroundImage: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "80%",
    backgroundRepeat: "no-repeat",
    display: "flex",
    height: "40vh",
    alignItems: "center",
    justifyContent: "center",
    margin: '0 auto',
    [theme.breakpoints.down("xs")]: {
      height: "30vh",
    },
  }
}));
export default function CourseVideos(props) {
  const { globalUser } = useSelector((state) => state.userReducer);
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const apiCall = useRef(undefined);
  const classes = useStyles();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [course, setCourse] = useState(undefined);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    getCourse();
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);
  useEffect(() => {
    if (course != undefined) getVideos();
  }, [course]);
  useEffect(() => {
    if (course != undefined) {
      setLoading(false);
    }
  }, [course]);

  const getVideos = async () => {
    try {
      apiCall.current = API.request(
        "/course/videos/",
        true,
        {
          course_id: course.id,
        },
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      if (response.message == "Valid token") {
        setVideos(response.data);
        return;
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
      apiCall.current = API.request(
        `/course/${props.match.params.id}`,
        false,
        {},
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      if (response.message == "Fetched successfully") {
        setCourse(response.data);
        return;
      }
      if (response.detail == "Not found.") {
        history.push("/404");
      }
    } catch (err) {
      setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
    }
  };
  return (
    <>
      <Navbar
        children={
          <UserDashboard currentTab={"courses"} firstChildSelected={true} />
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
                  firstChildSelected={true}
                />
              </div>
              <div className="col-sm-9  overFlowHandler">
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
                        {videos.length != 0 ?
                          <Helmet>
                            <title>ویدئو های دوره‌ی {videos[0].course_info.slug.replaceAll("-", " ")}</title>
                            <meta name="keywords" content="صرافی غیر متمرکز, توکن, ارز دیجیتالی, ارز دیجیتال, کریپتو کارنسی, کریپتو, بایننس اسمارت چین, بلاکچین, اسمارت چین, بلاک چین, بیت کوین, داج کوین, دوج کوین, شیبا کوین, شیبا توکن, سولانا, اتریوم, تتر, صرافی, صرافی متمرکز, erc-20, erc-721, ERC-20, ERC-721,nft, توکن مثلی, توکن غیر مثلی, none-fungible-token, دیسنترالند, مدیریت دارایی, اقتصاد, سبدگردانی" />
                          </Helmet>
                          : undefined}
                        <h3
                          className="mobile-only text-center"
                          style={{ color: "#64c5ba" }}
                        >
                          ویدیو های دوره
                        </h3>
                        <div className="DNXq1n23" style={{ direction: "ltr !important" }}>
                          <Swiper
                            style={{ width: "90%" }}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation={true}
                            pagination={{ clickable: true }}
                          >
                            {videos.map((video) => {
                              return (
                                <SwiperSlide key={video.id}>
                                  <Paper className={classes.paperContentWrapper}>
                                    <h4 className={classes.videoTitle}>
                                      {video.video_name}
                                    </h4>
                                    <div className={classes.paperVideoContainer}>
                                      <div className={classes.paperBackGroundImage}
                                        style={{ backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283${video.image}`)) }}
                                        alt={video.slug}
                                      />
                                      <div style={{ margin: '10px 0px' }} className="text-center">
                                        <Link to={{ pathname: `/view-video/${video.course_info.slug}/${video.part}` }}>
                                          <button className="btn btn-md btn-success">
                                            نمایش ویدیو
                                          </button>
                                        </Link>
                                        {globalUser.user_group == "superuser" || (globalUser.user_group == "teacher" && course.teacher_id == globalUser.user_id) ? (
                                          <Link
                                            to={{
                                              pathname: `/edit-video/${video.id}`,
                                            }}
                                          >
                                            <span style={{ margin: '0px 10px ' }}></span>
                                            <button className="btn btn-md btn-success">
                                              ویرایش ویدیو
                                            </button>
                                          </Link>
                                        ) : undefined}
                                      </div>
                                    </div>
                                  </Paper>
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        </div>
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
