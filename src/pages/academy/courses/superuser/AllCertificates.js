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
import axios from "axios";
import OverLayComponent from "../../common/OverLayComponent";
import { Helmet } from "react-helmet";
import ReactFileReader from 'react-file-reader';
import FormData from "form-data";
import Search from '../../../../common/Search/Search'

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
    // padding: "20px 2%",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },
  coursesInProgressWrapper: {
    height: "75vh",
    marginTop: "60px",
    overflow: "scroll !important",
    width: "100%",
    padding: "70px",
    [theme.breakpoints.down("xs")]: {
      padding: "100px",
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

const AllCertificates = () => {
  const [certificates, setCertificates] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { globalUser } = useSelector((state) => state.userReducer);
  const [error, setError] = useState(undefined);
  const classes = useStyles();
  const apiCall = useRef(undefined);
  // const [selectedFile, setSelectedFile] = useState(null)
  const [progress, setProgress] = useState()
  const [content, setContent] = useState(undefined)
  const [searchedCertificates, setSearchedCertificates] = useState([])
  const uploadCertificate = async (certificate) => {
    // e.preventDefault()
    console.log(certificate)
    console.log(content)
    const file = new FormData()
    file.append("content", content);
    console.log(file)
    try {
      const res = await axios.patch(`https://api.aqua.ir:8283/certificate/${certificate.id}`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${globalUser.accessToken}`
        },
        onUploadProgress: data => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total))
        },
      })
      console.log(res.data)
      if (res.data.message == "Valid token") {
        alert('فایل شما با موفقیت آپلود شد')
      } else {
        alert("خطایی رخ داد . مجددا امتحان کنید ")
      }

      // const response = await axios({
      //   method: "patch",
      //   url: `https://api.aqua.ir:8283/certificate/${certificate.id}`,
      //   body: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     "Authorization": `Bearer ${globalUser.accessToken}`
      //   },
      // });
      // console.log(response)
    } catch (error) {
      console.log(error)
    }

  }

  const handleFileSelect = (files) => {
    // const c = { ...content }
    const c = files[0]
    setContent(c)
  }


  useEffect(() => {
    GetAllCertificates();
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);

  useEffect(() => {
    console.log(certificates);
    if (certificates !== undefined) {
      setLoading(false);
    }
  }, [certificates]);

  const GetAllCertificates = async () => {
    //   var tempcertificates = []
    try {
      apiCall.current = API.request(
        "/certificate/all/",
        true,
        {},
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      console.log(response);
      if (response.message == "Valid token") {
        // tempcertificates.fill(response.data);
        setCertificates(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //   console.log(tempcertificates)
  console.log(certificates);

  const setResults = (r) => {
    if (r.length != 0) {
      setSearchedCertificates(r)
    } else {
      console.log(">>>>>>>>>>>>>>>", certificates)
      setSearchedCertificates([])
    }
  }

  return (
    <>
      <Helmet>
        <title>همه‌ی گواهی ها</title>
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
                  currentTab={"certificates"}
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
                      {/* <> */}
                        {certificates.length == 0 ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "65vh",
                            }}
                          >
                            <h3 style={{ color: "#64c5ba" }}>
                              گواهی برای نمایش وجود ندارد
                            </h3>
                          </div>
                        ) : (
                          <>
                            <div style={{ width: '100%', display: "block", direction: "ltr", marginBottom: "5px" }}>
                              <Search data={certificates} setResults={setResults} />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                // height: "100%",
                              }}
                            >
                              <table class="table table-bordered">
                                <thead>
                                  <tr>
                                    <th scope="col">آیدی گواهی</th>
                                    <th scope="col">نام دوره</th>
                                    <th scope="col">نام کاربر</th>
                                    <th scope="col">نام خانوادگی کاربر</th>
                                    <th scope="col">شماره ملی</th>
                                    <th scope="col">شماره تلفن همراه</th>
                                    <th scope="col">شماره گواهی</th>
                                    <th scope="col">صدور گواهی</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {searchedCertificates.length != 0 ?
                                    <>
                                      {searchedCertificates.map((certificate) => {
                                        return (
                                          <tr>
                                            <th scope="row">{certificate.id}</th>
                                            <Link to={`/course-preview/${certificate.course_info.slug}`} style={{ textDecoration: "none", color: "black" }}><td>{certificate.course_info.slug.replaceAll("-", ' ')}</td></Link>
                                            <td>{certificate.user_first_name}</td>
                                            <td>{certificate.user_last_name}</td>
                                            <td>{certificate.user_ssid}</td>
                                            <td>{certificate.user_phone_number}</td>
                                            <td>{certificate.c_number}</td>
                                            <td>
                                              <div style={{ display: 'flex', justifyContent: "space-around" }} >
                                                <ReactFileReader fileTypes={[".pdf"]} multipleFiles={false} handleFiles={handleFileSelect}>
                                                  {/* <form onSubmit={()=> {uploadCertificate(certificate)}}> */}
                                                  <button className="btn btn-sm btn-outline-success" >آپلود فایل</button>
                                                  {/* <div>
                                        <input type="file" accept=".pdf" className="btn btn-sm btn-outline-success" onChange={e =>
                                          handleFileSelect(e.target.files[0])}>آپلود فایل</input>
                                        </div> */}
                                                </ReactFileReader>
                                                <button type="submit" className="btn btn-sm btn-success" onClick={() => uploadCertificate(certificate)}>ثبت</button>
                                                {/* </form> */}
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </> :
                                    <>
                                      {certificates.map((certificate) => {
                                        return (
                                          <tr>
                                            <th scope="row">{certificate.id}</th>
                                            <Link to={`/course-preview/${certificate.course_info.slug}`} style={{ textDecoration: "none", color: "black" }}><td>{certificate.course_info.slug.replaceAll("-", ' ')}</td></Link>
                                            <td>{certificate.user_first_name}</td>
                                            <td>{certificate.user_last_name}</td>
                                            <td>{certificate.user_ssid}</td>
                                            <td>{certificate.user_phone_number}</td>
                                            <td>{certificate.c_number}</td>
                                            <td>
                                              <div style={{ display: 'flex', justifyContent: "space-around" }} >
                                                <ReactFileReader fileTypes={[".pdf"]} multipleFiles={false} handleFiles={handleFileSelect}>
                                                  <button className="btn btn-sm btn-outline-success" >آپلود فایل</button>
                                                </ReactFileReader>
                                                <button type="submit" className="btn btn-sm btn-success" onClick={() => uploadCertificate(certificate)}>ثبت</button>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </>}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                      {/* </> */}
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

export default AllCertificates;
