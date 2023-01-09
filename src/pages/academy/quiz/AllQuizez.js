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
  singleBox: {
    border: "2px solid green",
    borderRadius: "20px",
    margin: "20px 35px",
    position: "relative",
    height: "200px",
    overflow: "hidden",
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
  coursesInProgressWrapper: {
    height: "75vh",
    marginTop: "60px",
    overflow: "scroll !important",
    width: "100%",
    padding: "50px"
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

const AllQuizez = () => {
  const [quizez, setQuizez] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { globalUser } = useSelector((state) => state.userReducer);
  const [error, setError] = useState(undefined);
  const classes = useStyles();
  const apiCall = useRef(undefined);
  const [searchedQuizez, setSearchedQuizez] = useState([])

  useEffect(() => {
    GetAllQuizez();
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (quizez !== undefined) {
      setLoading(false);
    }
  }, [quizez]);

  const GetAllQuizez = async () => {
    try {
      apiCall.current = API.request(
        "/quiz/all/",
        false,
        {},
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      console.log(response);
      if (response.message == "Fetched successfully") {
        setQuizez(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(quizez);

  const setResults = (r) => {
    if (r.length != 0) {
      setSearchedQuizez(r)
    } else {
      setSearchedQuizez([])
    }
  }


  return (
    <>
      <Helmet>
        <title>همه‌ی کوییز ها</title>
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
                  currentTab={"quizez"}
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
                    <div className={classes.coursesInProgressWrapper}>
                      <div style={{ padding: "10px 20px" }}>
                        {quizez.length == 0 ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "65vh",
                            }}
                          >
                            <h3 style={{ color: "#64c5ba" }}>
                              کوییزی وجود ندارد
                            </h3>
                          </div>
                        ) : (
                          <>
                            <div style={{ width: '100%', display: "block", direction: "ltr", marginBottom: "5px" }}>

                              <Search setResults={setResults} data={quizez} />
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
                                    <th scope="col">آیدی کوییز</th>
                                    <th scope="col">نام کوییز</th>
                                    <th scope="col">درس مربوطه</th>
                                    <th scope="col">مدت زمان کوییز</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {searchedQuizez.length == 0 ?
                                    <>
                                      {quizez.map((quiz) => {
                                        return (
                                          <tr>
                                            <th scope="row">{quiz.id}</th>
                                            <Link
                                              to={{
                                                pathname: `quiz-preview/${quiz.id}`,
                                              }}
                                              style={{
                                                textDecoration: "none",
                                                color: "black",
                                                "&:hover": { color: "#34b889" },
                                              }}
                                            >
                                              <td>{quiz.title}</td>
                                            </Link>
                                            <td><Link style={{ textDecoration: 'none', color: 'black' }} to={`course-preview/${quiz.course_slug}`}>
                                              {quiz.course_slug.replaceAll("-", " ")}
                                            </Link></td>
                                            <td>{quiz.expiration_time} دقیقه </td>
                                          </tr>
                                        );
                                      })}
                                    </> :
                                    <>
                                      {searchedQuizez.map((quiz) => {
                                        return (
                                          <tr>
                                            <th scope="row">{quiz.id}</th>
                                            <Link
                                              to={{
                                                pathname: `quiz-preview/${quiz.id}`,
                                              }}
                                              style={{
                                                textDecoration: "none",
                                                color: "black",
                                                "&:hover": { color: "#34b889" },
                                              }}
                                            >
                                              <td>{quiz.title}</td>
                                            </Link>
                                            <td><Link style={{ textDecoration: 'none', color: 'black' }} to={`course-preview/${quiz.course_slug}`}>
                                              {quiz.course_slug.replaceAll("-", " ")}
                                            </Link></td>
                                            <td>{quiz.expiration_time} دقیقه </td>
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

export default AllQuizez;
