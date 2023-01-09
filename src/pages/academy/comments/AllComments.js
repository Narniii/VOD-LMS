import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import CourseAndQuizCards from "../../../common/cards/CourseAndQuizCards"
const useStyles = makeStyles((theme) => ({
  whiteBox: {
    backgroundColor: "white",
    borderRadius: "20px",
    height: "85vh",
  },
  khakibox: {
    backgroundColor: '#f2f2f2',
    height: '85vh',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    justifyContent: "center",
    display: "flex",
    [theme.breakpoints.down('xs')]: {
      borderRadius: '20px',
    },
  },
  coursesInProgressWrapper: {
    height: '75vh',
    marginTop: '60px',
    overflow: 'scroll',
    width: '100%'
  },
  singleBox: {
    border: '2px solid green',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    borderBottomLeft: 'none',
    padding: '20px',
    margin: '20px 35px',
    position: "relative"
  },
  videoWrapper: {

  },
  videoThumbnail: {
    width: '100%'
  },
  progressWrapper: {
    position: 'absolute',
    bottom: '-30px',
    left: '-35px'
  },
  progressImage: {
    width: '70px'
  },
  imageAndTxtWrapper: {
    position: 'relative'
  },
  progressPercentage: {
    position: 'absolute',
    top: ' 50%',
    left: ' 50%',
    transform: 'translate(-50%, -50%)'
  }
}));
export default function AllComments() {
  const { globalUser } = useSelector(state => state.userReducer)
  const [error, setError] = useState(undefined)
  const history = useHistory();
  const apiCall = useRef(undefined);
  const classes = useStyles();
  const [comments, setComments] = useState(undefined)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getComments()
  }, [])
  useEffect(() => {
    if (comments != undefined)
      setLoading(false)
  }, [comments])
  const getComments = async () => {
    try {
      apiCall.current = API.request('/comment/all/', false, {}, globalUser.accessToken);
      const response = await apiCall.current.promise
      // console.log(response)
      if (response.message == 'Valid token') {
        setComments(response.data)
        // console.log(response.data)
      }
    }
    catch (err) {
      setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
      console.log(err)
    }
  }
  return (
    <>
      <Helmet>
        <title>همه‌ی کامنت ها</title>
      </Helmet>
      <Navbar children={<UserDashboard currentTab={"comment"} firstChildSelected={true} />} />
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
                <UserDashboard currentTab={"comment"} firstChildSelected={true} />
              </div>

              <div className="col-sm-9  overFlowHandler">
                <div className={classes.khakibox}>
                  <div className={classes.coursesInProgressWrapper}>
                    {loading ? <div style={{
                      display: 'flex',
                      alignItems: "center",
                      justifyContent: "center",
                      height: '100%'
                    }}>
                      <CircularProgress style={{ color: "green" }} />
                    </div>
                      :
                      <>
                        {comments.length == 0 ?
                          <>
                            <div style={{
                              display: 'flex',
                              alignItems: "center",
                              justifyContent: "center",
                              height: '65vh'
                            }}>
                              <h3 style={{ color: '#64c5ba' }}>کامنتی برای نمایش وجود ندارد</h3>
                            </div>

                          </> :
                          <>
                            <h3 className="mobile-only text-center" style={{ color: '#64c5ba' }}>کامنت ها</h3>
                            <div className="row text-dark">

                              {comments.map((comment) => {
                                return <div className="col-md-4" key={comment.id}>
                                  <div style={{ padding: '10px 20px' }}>
                                    <CourseAndQuizCards
                                      link={`/all-comments/${comment.id}`}
                                      user={comment.owner_name}
                                      bgImage={
                                        comment.owner_image.length != 0 ?
                                          comment.owner_image.indexOf("google") != -1 ?
                                            `${comment.owner_image}`
                                            :
                                            `https://api.aqua.ir${comment.owner_image}`
                                          :
                                          PUBLIC_URL("images/academy/profile.svg")}
                                      title={comment.post_title}
                                    />
                                  </div>
                                  {/* <div className={classes.singleBox}>
                                    <div className={classes.videoWrapper}>
                                      <div>پروفایل:</div>
                                      <img style={{ width: '100%' }} src={`https://api.aqua.ir${comment.owner_image}`} />
                                      <div>نام کامنت گذار</div>
                                      <div>{comment.owner_name}</div>
                                      {comment.content.length > 15 ?
                                        <div>{comment.content.substring(0, 15) + "..."}</div> :
                                        <div>{comment.content}</div>
                                      }
                                      <div className="text-center">
                                        <button className="btn btn-md btn-success" onClick={() => history.push(`/all-comments/${comment.id}`)}>مشاهده</button>
                                      </div>
                                    </div>
                                  </div> */}
                                </div>
                              })}
                            </div>
                          </>
                        }


                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </section >
    </>
  );
}