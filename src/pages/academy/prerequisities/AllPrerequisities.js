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

const AllPrerequisities = () => {
  const [prerequiesties, setPrerequisities] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { globalUser } = useSelector((state) => state.userReducer);
  const [error, setError] = useState(undefined);
  const classes = useStyles();
  const apiCall = useRef(undefined);
  const [searchedPrerequisites, setSearchedPrerequisites] = useState([])

  useEffect(() => {
    GetAllPrerequisities();
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (prerequiesties !== undefined) {
      setLoading(false);
    }
  }, [prerequiesties]);

  const GetAllPrerequisities = async () => {
    try {
      apiCall.current = API.request(
        "/course/prerequisites/all/",
        false,
        {},
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      console.log(response);
      if (response.message == "Fetched successfully") {
        setPrerequisities(response.data);
      }
    } catch (err) {
      console.log(err);
      setError("error!");
    }
  };
  console.log(prerequiesties);

  const setResults = (r) => {
    if (r.length != 0) {
      setSearchedPrerequisites(r)
    } else {
      setSearchedPrerequisites([])
    }
  }

  return (
    <>
      <Helmet>
        <title>همه‌ی پیش نیاز ها</title>
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
                  currentTab={"prerequisities"}
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
                      {/* <div style={{ padding: "10px 20px" }}> */}
                      {prerequiesties.length == 0 ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "65vh",
                          }}
                        >
                          <h3 style={{ color: "#64c5ba" }}>
                            پیشنیازی برای نمایش وجود ندارد
                          </h3>
                        </div>
                      ) : (
                        <>
                          <div style={{ width: '100%', display: "block", direction: "ltr", marginBottom: "5px" }}>
                            <Search setResults={setResults} data={prerequiesties} />
                          </div>
                          {searchedPrerequisites.length != 0 ?
                            <>
                              {searchedPrerequisites.map((prereq) => {
                                return (
                                  <div
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
                                          <th scope="col"> ردیف درس </th>
                                          <th scope="col">نام دوره ی اصلی </th>
                                          <th scope="col">دوره های پیشنیاز </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {prereq.main_course.map((preqCourse) => {
                                          return (
                                            <tr>
                                              <th scope="row">{preqCourse.id}</th>
                                              <Link
                                                to={{
                                                  pathname: `/course-preview/${preqCourse.slug}`,
                                                }}
                                                style={{
                                                  textDecoration: "none",
                                                  color: "black",
                                                }}
                                              >
                                                <td>{preqCourse.title}</td>
                                              </Link>
                                              {prereq.prerequisite_courses.map(
                                                (prq) => {
                                                  return (
                                                    <td>
                                                      <Link
                                                        to={{
                                                          pathname: `/prerequisities/${prq.slug}`,
                                                        }}
                                                        style={{
                                                          textDecoration: "none",
                                                          color: "black",
                                                        }}
                                                      >
                                                        {prq.title}
                                                      </Link>
                                                    </td>
                                                  );
                                                }
                                              )}
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                );
                              })}
                            </>
                            :
                            <>
                              {prerequiesties.map((prereq) => {
                                return (
                                  <div
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
                                          <th scope="col"> ردیف درس </th>
                                          <th scope="col">نام دوره ی اصلی </th>
                                          <th scope="col">دوره های پیشنیاز </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {prereq.main_course.map((preqCourse) => {
                                          return (
                                            <tr>
                                              <th scope="row">{preqCourse.id}</th>
                                              <Link
                                                to={{
                                                  pathname: `/course-preview/${preqCourse.slug}`,
                                                }}
                                                style={{
                                                  textDecoration: "none",
                                                  color: "black",
                                                }}
                                              >
                                                <td>{preqCourse.title}</td>
                                              </Link>
                                              {prereq.prerequisite_courses.map(
                                                (prq) => {
                                                  return (
                                                    <td>
                                                      <Link
                                                        to={{
                                                          pathname: `/prerequisities/${prq.slug}`,
                                                        }}
                                                        style={{
                                                          textDecoration: "none",
                                                          color: "black",
                                                        }}
                                                      >
                                                        {prq.title}
                                                      </Link>
                                                    </td>
                                                  );
                                                }
                                              )}
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                );
                              })}
                            </>
                          }
                        </>
                      )}
                      {/* </div> */}
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

export default AllPrerequisities;
