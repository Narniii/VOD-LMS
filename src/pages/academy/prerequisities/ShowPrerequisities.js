import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import Tree from "react-tree-graph";
import "react-tree-graph/dist/style.css";
import "./ShowPrerequisities.css";
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
    coursesInProgressWrapper: {
      height: "75vh",
      marginTop: "60px",
      overflow: "scroll",
      width: "100%",
    },
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
export default function ShowPrerequisities(props) {
  const { globalUser } = useSelector((state) => state.userReducer);
  const [error, setError] = useState(undefined);
  const slug = props.match.params.slug;
  const history = useHistory();
  const apiCall = useRef(undefined);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [prerequiesties, setPrerequiesties] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [course, setCourse] = useState(undefined);
  const [searchedPrerequisites , setSearchedPrerequisites] = useState([])
  useEffect(() => {
    getCourse();
  }, []);
  useEffect(() => {
    if (prerequiesties != undefined) {
      let tmp = [];
      let children = [];
      let tempdata = {
        name: undefined,
        children: [],
      };
      for (var i = 0; i < prerequiesties.length; i++) {
        tempdata.name = prerequiesties[i].main_course[0].title;
        for (
          var j = 0;
          j < prerequiesties[i].prerequisite_courses.length;
          j++
        ) {
          let child = { name: prerequiesties[i].prerequisite_courses[j].slug };
          tempdata.children.push(child);
        }
        tmp.push(tempdata);
        tempdata = {
          name: undefined,
          children: [],
        };
        children = [];
      }
      setData(tmp);
    }
  }, [prerequiesties]);
  useEffect(() => {
    if (data != undefined) setLoading(false);
  }, [data]);
  const getCourse = async () => {
    try {
      const res = await axios.get(`https://api.aqua.ir:8283/course/${slug}`, {
        headers: {
          Authorization: `Bearer ${globalUser.accessToken}`,
        },
      });
      console.log(res.data.data.prerequisite);
      if (res.data.message == "Fetched successfully") {
        setPrerequiesties(res.data.data.prerequisite);
        setCourse(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
        <title>{`${slug.replaceAll("-", " ")}`}</title>
      </Helmet>
      <Navbar
        children={<UserDashboard currentTab={"prerequisities"} firstChildSelected={true} />}
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
                  currentTab={"prerequisities"}
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
                          height: "85vh",
                        }}
                      >
                        <CircularProgress style={{ color: "green" }} />
                      </div>
                    ) : (
                      <>
                        <div className="react-tree-graph-wrapper text-center">
                          {data.map((data) => {
                            return (
                              <Tree data={data} height={200} width={800} />
                            );
                          })}
                        </div>
                        <Link
                          style={{ display: "inline-block", margin: "20px" }}
                          to={{
                            pathname: `/edit-prerequisities/${course.slug}`,
                          }}
                        >
                          <button
                            style={{ width: "100%" }}
                            className={classes.submitButton}
                          >
                            ویرایش پیشنیاز
                          </button>
                        </Link>
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
