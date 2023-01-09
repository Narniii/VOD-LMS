import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import API from "../../../../utils/api";
import UserDashboard from "../../common/UserDashboard";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Navbar from "../../Navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Search from "../../../../common/Search/Search";
import axios from "axios";
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
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  coursesInProgressWrapper: {
    height: "75vh",
    marginTop: "60px",
    overflow: "scroll !important",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    justifySelf: "center",
    padding : '70px'
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

const AllCourses = () => {
  const [courses, setCourses] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { globalUser } = useSelector((state) => state.userReducer);
  const [error, setError] = useState(undefined);
  const classes = useStyles();
  const apiCall = useRef(undefined);
  const [status, setStatus] = useState("");
  const [SearchedCourses, setSearchedCourses] = useState([])
  //   const columns = [
  //     { field: "id", headerName: "ID", width: 70 },
  //     { field: "courseName", headerName: "courseName", width: 130 },
  //     { field: "courseImage", headerName: "courseImage", width: 130 },
  //   ];
  //   const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log();
    GetAllCourses();
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);

  useEffect(() => {
    console.log(courses);
    console.log(status);
    if (courses !== undefined && SearchedCourses != undefined) {
      //   ChangeCourseStatus(status, courses);
      setLoading(false);
    }
  }, [courses, status, SearchedCourses]);

  const handleConfirm = async (courseSlug) => {
    console.log(courses);
    //   for(var r = 0 ; r < courses.length ; r++) {
    try {
      const res = await axios.patch(
        `https://api.aqua.ir:8283/course/status/${courseSlug}`,
        {
          status: "published",
        },
        {
          headers: {
            Authorization: `Bearer ${globalUser.accessToken}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      setError("خطایی رخ داده است ، لطفا مجددا امتحان کنید");
    }
    //   }
    GetAllCourses();
  };

  const handleNotConfirm = async (courseSlug) => {
    // for(var h = 0 ; h < courses.length ; h++) {
    try {
      const res = await axios.patch(
        `https://api.aqua.ir:8283/course/status/${courseSlug}`,
        {
          status: "draft",
        },
        {
          headers: {
            Authorization: `Bearer ${globalUser.accessToken}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      setError("خطایی رخ داده است ، لطفا مجددا امتحان کنید");
    }
    //   }
    GetAllCourses();
  };
  const GetAllCourses = async () => {
    var tempCourses = [];
    var tempRows = [];

    try {
      apiCall.current = API.request(
        "/course/all/",
        false,
        {},
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      console.log(response);
      if (response.message == "Valid token") {
        for (var i = 0; i < response.data.length; i++) {
          tempCourses.push(response.data[i]);
          tempRows.push({
            id: response.data[i].id,
            courseName: response.data[i].title,
          });
        }
        setCourses(tempCourses);
        // setRows(tempRows);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(courses);


  const setResults = (r) => {
    if (r.length != 0) {
      setSearchedCourses(r)
    } else {
      setSearchedCourses([])
    }
  }


  return (
    <>
      <Helmet>
        <title>همه‌ی دوره‌ها</title>
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
                  currentTab={"courses"}
                  firstChildSelected={true}
                />
              </div>

              <div className="col-sm-9 overFlowHandler">
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
                        <h3
                          className="mobile-only text-center"
                          style={{ color: "#64c5ba" }}
                        >
                          دوره های موجود
                        </h3>
                        {courses.length == 0 ? (
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

                          <>
                            <div style={{ width: '100%', display: "block", direction: "ltr", marginBottom: "5px" }}>
                              <Search data={courses} setResults={setResults} />
                            </div>


                            {SearchedCourses.length != 0 ? <>                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "auto",
                              }}
                            >

                              <table class="table table-bordered">
                                <thead>
                                  <tr>
                                    <th scope="col">آیدی دوره</th>
                                    <th scope="col">نام دوره</th>
                                    <th scope="col">تعداد ویدیو های دوره</th>
                                    <th scope="col">تایید دوره</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {SearchedCourses.map((course) => {
                                    return (
                                      <tr>
                                        <th scope="row">{course.id}</th>
                                        <Link
                                          to={{
                                            pathname: `/course-preview/${course.slug}`,
                                          }}
                                          style={{
                                            textDecoration: "none",
                                            color: "black",
                                            '&:hover': {
                                              color: "#34b889"
                                            },
                                          }}
                                        >
                                          <td>{course.title}</td>
                                        </Link>
                                        <td>{course.video_count}</td>
                                        <td>
                                          {course.status == "published" ? (
                                            <button
                                              onClick={() =>
                                                handleNotConfirm(course.slug)
                                              }
                                              type="button"
                                              class="btn btn-danger"
                                            >
                                              عدم تایید
                                              <i class="fas fa-edit"></i>
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() =>
                                                handleConfirm(course.slug)
                                              }
                                              type="button"
                                              class="btn btn-success"
                                            >
                                              تایید
                                            </button>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            </> : <>                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "auto",
                              }}
                            >

                              <table class="table table-bordered">
                                <thead>
                                  <tr>
                                    <th scope="col">آیدی دوره</th>
                                    <th scope="col">نام دوره</th>
                                    <th scope="col">تعداد ویدیو های دوره</th>
                                    <th scope="col">تایید دوره</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {courses.map((course) => {
                                    return (
                                      <tr>
                                        <th scope="row">{course.id}</th>
                                        <Link
                                          to={{
                                            pathname: `/course-preview/${course.slug}`,
                                          }}
                                          style={{
                                            textDecoration: "none",
                                            color: "black",
                                            '&:hover': {
                                              color: "#34b889"
                                            },
                                          }}
                                        >
                                          <td>{course.title}</td>
                                        </Link>
                                        <td>{course.video_count}</td>
                                        <td>
                                          {course.status == "published" ? (
                                            <button
                                              onClick={() =>
                                                handleNotConfirm(course.slug)
                                              }
                                              type="button"
                                              class="btn btn-danger"
                                            >
                                              عدم تایید
                                              <i class="fas fa-edit"></i>
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() =>
                                                handleConfirm(course.slug)
                                              }
                                              type="button"
                                              class="btn btn-success"
                                            >
                                              تایید
                                            </button>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            </>}
                          </>
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
};

export default AllCourses;
