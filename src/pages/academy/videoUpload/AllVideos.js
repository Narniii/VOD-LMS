import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Helmet } from "react-helmet";
import Search from "../../../common/Search/Search";

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
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    overflow: "scroll !important",
    padding: "50px",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },
  videosInProgressWrapper: {
    height: "75vh",
    padding: "70px",
    marginTop: "60px",
    overflow: "scroll !important",
    width: "100%",
  },
  submitButtonWrapper: {
    width: "100%",
    textAlign: "center",
    marginTop: "20px",
  },
  submitButton: {
    backgroundColor: "#64c5ba !important",
    border: "1px solid #64c5ba !important",
    color: "white !important",
    padding: "10px 20px !important",
    borderRadius: "5px !important",
  },
  whiteBtn: {
    backgroundColor: "white !important",
    border: "1px solid #64c5ba !important",
    color: "#64c5ba !important",
    padding: "10px 20px !important",
    borderRadius: "5px !important",
    margin: "0px 10px",
  },
}));

const AllVideos = () => {
  const [videos, setVideos] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { globalUser } = useSelector((state) => state.userReducer);
  const [error, setError] = useState(undefined);
  const classes = useStyles();
  const apiCall = useRef(undefined);
  const [deleted, setDeleted] = useState(false)
  const history = useHistory()
  const [searchedVideos, setSearchedVideos] = useState([])


  const deleteVideo = async (id) => {
    console.log(id)
    try {
      const res = await axios.delete(
        `https://api.aqua.ir:8283/course/videos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${globalUser.accessToken}`,
          },
        }
      );
      console.log(res)
      if (res.status == 200) {
        alert("ویدیو با موفقیت حذف شد")
        history.push('./all-videos')
      }
    } catch (err) {
      setError("error!");
      alert("مشکلی پیش آمده است ، مجددا امتحان کنید")
      console.log(err)
    }
  }
  useEffect(() => {
    GetAllVideos();
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (videos !== undefined && globalUser.user_group == 'superuser') {
      setLoading(false);
    }
  }, [videos]);

  const GetAllVideos = async () => {
    try {
      apiCall.current = API.request(
        "/course/videos/all/",
        false,
        {},
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      if (response.message == "Valid token") {
        setVideos(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setResults = (r) => {
    if (r.length != 0) {
      setSearchedVideos(r)
    } else {
      setSearchedVideos([])
    }
  }

  return (
    <>
      <Helmet>
        <title>همه‌ی ویدئو ها</title>
      </Helmet>
      <Navbar children={<UserDashboard firstChildSelected={true} />} />

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
                  currentTab={"VideoUpload"}
                  firstChildSelected={true}
                />
              </div>

              <div className="col-sm-9 overFlowHandler">
                <div className={classes.khakibox}>
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
                    <div className={classes.videosInProgressWrapper}>
                      <div style={{ padding: "10px 20px" }}>
                        {videos.length == 0 ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "65vh",
                            }}
                          >
                            <h3 style={{ color: "#64c5ba" }}>
                              ویدیویی برای نمایش وجود ندارد
                            </h3>
                          </div>
                        ) : (
                          <>
                            <div style={{ width: '100%', display: "block", direction: "ltr", marginBottom: "5px" }}>
                              <Search setResults={setResults} data={videos} />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                              }}
                            >
                              <table class="table table-bordered">
                                <thead>
                                  <tr>
                                    <th scope="col">آیدی ویدیو</th>
                                    <th scope="col">نام ویدیو</th>
                                    <th scope="col">نام دوره مربوطه</th>
                                    <th scope="col">پارت ویدیو در دوره</th>
                                    <th scope="col">حذف ویدیو</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {searchedVideos.length != 0 ?
                                    <>
                                      {searchedVideos.map((video) => {
                                        return (
                                          <tr>
                                            {console.log(">>>>>>>>>>>>", video)}
                                            <th scope="row">{video.id}</th>
                                            <Link
                                              to={{
                                                pathname: `/view-video/${video.course_info.slug}/${video.part}`,
                                              }}
                                              style={{
                                                textDecoration: "none",
                                                color: "black",
                                              }}
                                            >
                                              <td>{video.video_name}</td>
                                            </Link>
                                            <td>
                                              <Link style={{ textDecoration: 'none', color: 'black' }} to={`course-preview/${video.course_info.slug}`}>
                                                {video.course_info.slug.replaceAll("-", " ")}
                                              </Link></td>
                                            <td>{video.part}</td>
                                            <td><button className="btn btn-danger" onClick={() => { deleteVideo(video.id) }}>x</button></td>
                                          </tr>
                                        );
                                      })}
                                    </> :
                                    <>
                                      {videos.map((video) => {
                                        return (
                                          <tr>
                                            {console.log(">>>>>>>>>>>>", video)}
                                            <th scope="row">{video.id}</th>
                                            <Link
                                              to={{
                                                pathname: `/view-video/${video.course_info.slug}/${video.part}`,
                                              }}
                                              style={{
                                                textDecoration: "none",
                                                color: "black",
                                              }}
                                            >
                                              <td>{video.video_name}</td>
                                            </Link>
                                            <td>
                                              <Link style={{ textDecoration: 'none', color: 'black' }} to={`course-preview/${video.course_info.slug}`}>
                                                {video.course_info.slug.replaceAll("-", " ")}
                                              </Link></td>
                                            <td>{video.part}</td>
                                            <td><button className="btn btn-danger" onClick={() => { deleteVideo(video.id) }}>x</button></td>
                                          </tr>
                                        );
                                      })}
                                    </>
                                  }
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllVideos;
