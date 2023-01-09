import { PUBLIC_URL, BG_URL } from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import MobileDrawer from "../landing/MobileDrawer";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Helmet } from "react-helmet";
import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden, Paper } from "@material-ui/core";
import API from "./../../utils/api";
import UserDashboard from "./common/UserDashboard";
import "./courses/Courses.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Navbar from "../../blog/ExtraPages/Navbar";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  sections: {
    height: "100vh",
    [theme.breakpoints.down("xs")]: {
      paddingTop: '10px',
    },
    [theme.breakpoints.between("sm", "md")]: {
      paddingTop: '50px',
    },
    "@media (min-width: 1280px)": {
      paddingTop: "50px",
    },
  },
  coursesInProgressWrapper: {
    height: "78vh",
    paddingTop: "30px",
    overflow: "scroll",
    width: "100%",
  },
  placeHolder: {
    position: "relative",
    borderRadius: "50px",
    boxShadow: " 0px 8px 15px 4px rgba(0,0,0,0.2)",
    [theme.breakpoints.down("xs")]: {
      height: "80vh",
      borderRadius: "20px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: "80vh",
    },
    "@media (min-width: 1280px)": {
      height: "80vh",
    },
  },

  innerBox: {
    width: "100px",
    height: "100px",
    alignSelf: "center",
  },
  singlePostWrapper: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: '100%',
    borderRadius: '20px',
    height: '20vh',
    position: 'relative',
    boxShadow: '0px 0px 15px 1px #000000',
    [theme.breakpoints.down("xs")]: {
      height: '25vh',
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: 200,
    },
  },
  coursesTitle: {
    color: '#64c5ba',
    marginBottom: '10px',
    textAlign: 'center'
  },
  linearTransparent: {
    position: 'absolute',
    background: 'rgb(0,0,0)',
    background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
    width: '100%',
    minHeight: '100%',
    padding: '10px',
    borderRadius: '20px'
  },
  priceTitle: {
    color: '#aeae10'
  },
  previewButton: {
    border: '3px solid #33b789',
    padding: '10px',
    width: '30%',
    textAlign: 'center',
    borderRadius: '30px',
    color: '#33b789',
    '&:hover': {
      color: 'white',
      backgroundColor: '#33b789',
      cursor: 'pointer',
    },
    [theme.breakpoints.down("xs")]: {
      width: '50%'
    },
    [theme.breakpoints.between("xs", "md")]: {
      width: '50%'
    }
  },
  loginDoneModal: {
    position: 'absolute',
    width: '40%',
    minHeight: '60vh',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d8d8d8',
    border: 'none !important',
    margin: '10px',
    borderRadius: '20px',
    outline: 'none',
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      minHeight: '80vh',
    },
  },
  modalBackgroundImage: {
    width: '100%',
    height: '25vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderTopRightRadius: '20px',
    borderTopLeftRadius: '20px',
    [theme.breakpoints.down("xs")]: {
      height: '30vh',
    },
  },
  modalPaper: {
    margin: '10px 20px',
    height: '45vh',
    padding: '10px 20px',
    [theme.breakpoints.down("xs")]: {
      height: '50vh',
    },
  },
  modalShortDescription: {
    marginBottom: '20px',
    height: '20vh',
    overflow: 'scroll',
    [theme.breakpoints.down("xs")]: {
      marginBottom: '10px'
    }
  }
}));

export default function Academy() {
  const classes = useStyles();
  const [courses, setCourses] = useState(undefined);
  const dispatch = useDispatch();
  const { globalUser } = useSelector((state) => state.userReducer);
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const apiCall = useRef(undefined);
  const [modal, setModal] = useState(false);
  const [selectedcourse, setSelectedCourse] = useState(undefined)
  const [modalLoading, setModalLoading] = useState(true)
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(3)
  const [endOfPost, setEndOfPost] = useState(false)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)
  useEffect(() => {
    getProducts();
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);
  useEffect(() => {
    if (courses != undefined) {
      setLoading(false)
    }
  }, [courses])

  const getProducts = async () => {
    try {
      apiCall.current = API.request('/product/load-more/', true, {
        from: from,
        to: to
      });
      const response = await apiCall.current.promise
      // console.log(response)
      if (response.message == "Fetched successfully") {
        let tempFrom = from + 4
        let tempTo = to + 4
        setFrom(tempFrom)
        setTo(tempTo)
        if (response.data.length != 0) {
          setCourses(response.data);
        }
        if (response.data.length == 0) {
          setCourses([])
        }
      }
    }
    catch (err) {
      console.log(err)
      setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
    }
  }
  const loadMore = async () => {
    setLoadMoreLoading(true)
    try {
      apiCall.current = API.request('/product/load-more/', true, {
        from: from,
        to: to
      });
      const response = await apiCall.current.promise
      // console.log(response)
      if (response.message == 'Fetched successfully') {
        let tempFrom = from + 4
        let tempTo = to + 4
        setFrom(tempFrom)
        setTo(tempTo)
        var q = 0
        for (q; q < response.data.length; q++) {
          setCourses(prevState => [...prevState, response.data[q]])
        }
        setLoadMoreLoading(false)
      }
      else if (response.message == "Out of index") {
        setEndOfPost(true)
        setLoadMoreLoading(false)
      }
    }
    catch (err) {
      console.log(err)
      setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
      setLoadMoreLoading(false)
    }
  }
  useEffect(() => {
    if (selectedcourse != undefined) {
      // console.log(selectedcourse)
      setModal(true)
      setModalLoading(false)
    }
  }, [selectedcourse])
  const handleModalClose = () => {
    setModal(false)
    setSelectedCourse(undefined)
    setModalLoading(true)
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>آکادمی</title>
        <link rel="canonical" href="http://aqua.ir/academy" />
        <meta name="keywords" content="aqua,آکادمی , بیتداد,آکادمی بیتداد" />

      </Helmet>

      <Navbar />
      <section
        className={classes.sections}
        style={{
          backgroundImage: BG_URL(PUBLIC_URL("images/bg.png")),
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
        }}
      >
        <div className="container overFlowHandler">
          <div className={classes.placeHolder} style={{
            backgroundImage: BG_URL(PUBLIC_URL('images/place-holder.png')),
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} >
            {loading == true ?
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <CircularProgress style={{ color: "green" }} />
              </div>
              :
              <div className={classes.coursesInProgressWrapper}>
                <h3 className={classes.coursesTitle}>لیست دوره ها</h3>
                {courses.length != 0 ?
                  <div className="container">
                    <div className="row" style={{ height: "100%" }}>
                      {courses.map((p) => {
                        const bgimgurl = `https://api.aqua.ir:8283${p.course_info.image}`
                        return <div className="col-md-6" key={p.course_info.id} style={{ padding: '20px' }}>
                          <div className={classes.singlePostWrapper}
                            style={{ backgroundImage: BG_URL(PUBLIC_URL(bgimgurl)) }}>
                            <div className={classes.linearTransparent}>
                              {p.course_info.title.length > 30 ? (
                                <div>عنوان:{p.course_info.title.substring(0, 10) + "..."}</div>
                              ) : (
                                <div>عنوان:{p.course_info.title}</div>
                              )}
                              <div className={classes.priceTitle}>قیمت دوره: {p.price} ریال</div>
                              <div>
                                <span style={{ verticalAlign: 'top' }}> امتیاز دوره:</span>
                                <span >
                                  <Rating
                                    style={{ direction: 'ltr' }}
                                    value={p.mean_score / 10}
                                    precision={0.5}
                                    readOnly
                                  />
                                </span>
                              </div>
                              <div className={classes.previewButton} onClick={() => { setSelectedCourse(p) }}>مشاهده دوره</div>
                            </div>
                          </div>
                        </div>
                      })}
                    </div>
                    {endOfPost ? undefined :
                      <div className='text-center' style={{ margin: '10px 0px' }}>
                        {
                          loadMoreLoading ?
                            <button className='btn btn-outline-warning' style={{ minWidth: 70 }}><CircularProgress size={20} /></button>
                            :
                            <button className='btn btn-outline-warning' style={{ minWidth: 70 }} onClick={() => { loadMore() }}>بیشتر</button>
                        }
                      </div>
                    }
                  </div>
                  :
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", }}>
                    <h4 style={{ color: "#64c5ba" }}>
                      در حال حاضر دوره‌ای وجود ندارد
                    </h4>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>
      <Modal
        open={modal}
        onClose={() => handleModalClose()}
      >
        <div className={classes.loginDoneModal}>
          {modalLoading ?
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: '15vh',
            }}><CircularProgress /></div> :
            <div>
              <div className={classes.modalBackgroundImage} style={{ backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283/${selectedcourse.course_info.image}`)) }} />
              <Paper className={classes.modalPaper}>
                <div className="text-center text-dark overFlowHandler">
                  <h3 style={{ padding: '10px 0px', fontSize: 'bold' }}> {selectedcourse.course_info.title}</h3>
                  <div className={classes.modalShortDescription}>{selectedcourse.course_info.short_description}</div>
                </div>
                <div style={{ marginBottom: '20px', color: '#33b789', textAlign: 'center' }}>قیمت دوره: {selectedcourse.price}</div>
                <div className="text-center">
                  <button className="btn btn-md btn-success" onClick={() => history.push(`/course-preview/${selectedcourse.course_info.slug}`)}>خرید دوره</button>
                </div>
              </Paper>
            </div>
          }
        </div>
      </Modal>
    </>
  );
}