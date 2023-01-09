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
import Search from "../../../../common/Search/Search";
import ReactToPrint from 'react-to-print';
import moment from 'jalali-moment'

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

const AllReceipts = () => {
  const [receipts, setReceipts] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { globalUser } = useSelector((state) => state.userReducer);
  const [error, setError] = useState(undefined);
  const classes = useStyles();
  const apiCall = useRef(undefined);
  const [searchedResults, setSearchedResults] = useState([])
  const componentRef = useRef();

  useEffect(() => {
    GetAllReceipts();
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);

  useEffect(() => {
    console.log(receipts);
    if (receipts !== undefined) {
      setLoading(false);
    }
  }, [receipts]);

  const GetAllReceipts = async () => {
    //   var tempReceipts = []
    try {
      apiCall.current = API.request(
        "/portal/payment/all/",
        true,
        {},
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      console.log(response);
      if (response.message == "Valid token") {
        // tempReceipts.fill(response.data);
        setReceipts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //   console.log(tempReceipts)
  console.log(receipts);

  const setResults = (r) => {
    if (r.length != 0) {
      setSearchedResults(r)
    } else {
      setSearchedResults([])
    }
  }


  return (
    <>
      <Helmet>
        <title>همه‌ی رسید ها</title>
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
                  currentTab={"receipts"}
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
                      <ReactToPrint
                        trigger={() => <button className='btn btn-md btn-success'>دانلود PDF</button>}
                        content={() => componentRef.current}
                      />
                      <div ref={componentRef}>
                        <div style={{ padding: "10px 20px" }}>
                          {receipts.length == 0 ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "65vh",
                              }}
                            >
                              <h3 style={{ color: "#64c5ba" }}>
                                رسیدی برای نمایش وجود ندارد
                              </h3>
                            </div>
                          ) : (
                            <>
                              <div style={{ width: '100%', display: "block", direction: "ltr", marginBottom: "5px" }}>
                                <Search data={receipts} setResults={setResults} />
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
                                      <th scope="col">آیدی رسید</th>
                                      <th scope="col">شماره پیگیری</th>
                                      <th scope="col">مشخصات خریدار</th>
                                      <th scope="col">شماره تلفن خریدار</th>
                                      <th scope="col">مبلغ</th>
                                      <th scope="col">تاریخ درخواست</th>
                                      <th scope="col">تاریخ پرداخت</th>
                                      <th scope="col">دوره</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {searchedResults.length != 0 ?
                                      <>
                                        {searchedResults.map((receipt) => {
                                          return (
                                            <tr>
                                              <th scope="row">{receipt.id}</th>{" "}
                                              <td>{receipt.ref_id}</td>
                                              <td>{receipt.first_name}  {receipt.last_name}</td>
                                              <td>{receipt.user_phone_number}</td>
                                              <td>{receipt.fee}</td>
                                              <td>{moment(receipt.requested_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</td>
                                              <td>
                                                {receipt.paid_at == null ?
                                                  <div></div>
                                                  :
                                                  moment(receipt.paid_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
                                                }
                                              </td>
                                              <td>{receipt.product_info.course_info.title}</td>
                                            </tr>
                                          );
                                        })}
                                      </>
                                      :
                                      <>
                                        {receipts.map((receipt) => {
                                          return (
                                            <tr>
                                              <th scope="row">{receipt.id}</th>{" "}
                                              <td>{receipt.ref_id}</td>
                                              <td>{receipt.first_name}  {receipt.last_name}</td>
                                              <td>{receipt.user_phone_number}</td>
                                              <td>{receipt.fee}</td>
                                              <td>{moment(receipt.requested_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</td>
                                              <td>
                                                {receipt.paid_at == null ?
                                                  <div></div>
                                                  :
                                                  moment(receipt.paid_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
                                                }
                                              </td>
                                              <td>{receipt.product_info.course_info.title}</td>
                                            </tr>
                                          );
                                        })}
                                      </>}
                                  </tbody>
                                </table>
                              </div>
                            </>
                          )}
                        </div>
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

export default AllReceipts;
