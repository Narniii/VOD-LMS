import React, { useState } from "react";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import AccardeonRows from "./AccardeonRows";
import { makeStyles } from "@material-ui/core/styles";
import "../UserPanel.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  whiteBox: {
    backgroundColor: "white",
    borderRadius: "20px",
    height: "85vh",
  },
  menuWrapper: {
    height: "85vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    "@media (max-width: 576px)": {
      height: "90vh",
    },
  },
  iconWrapper: {
    marginBottom: "20px",
  },
  aquaLogo: {
    width: "120px",
  },
}));
export default function UserDashboard({
  currentTab,
  firstChildSelected,
  secondChildSelected,
  thirdChildSelected,
  fourthChildSelected,
}) {
  const classes = useStyles();
  const { globalUser } = useSelector((state) => state.userReducer);
  return (
    <div className="overFlowHandler">
      <div className={classes.menuWrapper}>
        <div className={classes.iconWrapper}>
          <Link to="/welcome">
            <img
              className={classes.aquaLogo}
              src={PUBLIC_URL("images/academy/logoaqua.svg")}
            />
          </Link>
        </div>
        {globalUser.user_group == "student" ? (
          <div
            style={{
              color: "white",
              display: "inline-block",
              verticalAlign: "middle",
              fontSize: "14px",
              marginRight: "10px",
              backgroundColor: "#64c5ba",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            <span>امتیاز شما: </span>
            {globalUser.user_points}
          </div>
        ) : undefined}
        {globalUser.user_group == "student" ? (
          <>
            <AccardeonRows
              name="profile"
              defaultExpanded={currentTab === "profile" ? true : false}
              isSelected={currentTab === "profile" ? true : false}
              isFirstChildSelected={
                currentTab === "profile" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "profile" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "profile" && thirdChildSelected ? true : false
              }
              rowTitle="پروفایل"
              FirstchildLink={"/edit-profile"}
              secondChildLink={"/change-password"}
              thirdChildLink={undefined}
              FirstchildImage={"images/academy/edit-profile.svg"}
              secondChildImage={"images/academy/security.svg"}
              thirdChildImage={undefined}
              FirstchildText="ویرایش اطلاعات کاربری"
              secondChildText="امنیت"
              thirdChildText={undefined}
            />
            <AccardeonRows
              name="courses"
              defaultExpanded={currentTab === "courses" ? true : false}
              isSelected={currentTab === "courses" ? true : false}
              isFirstChildSelected={
                currentTab === "courses" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "courses" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "courses" && thirdChildSelected ? true : false
              }
              rowTitle="دوره ها"
              FirstchildLink={"/courses-in-progress"}
              secondChildLink={"/passed-courses"}
              thirdChildLink={"/available-courses"}
              FirstchildImage={"images/academy/dore-haye-darhale-yad-giri.svg"}
              secondChildImage={"images/academy/dore-haye-gozarande-shode.svg"}
              thirdChildImage={"images/academy/dore-haye-mojood.svg"}
              FirstchildText="دوره های در حال یادگیری"
              secondChildText="دوره های گذرانده شده"
              thirdChildText={"دوره های موجود"}
            />
            <AccardeonRows
              name="quiz"
              defaultExpanded={currentTab === "quiz" ? true : false}
              isSelected={currentTab === "quiz" ? true : false}
              isFirstChildSelected={
                currentTab === "quiz" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "quiz" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "quiz" && thirdChildSelected ? true : false
              }
              rowTitle="کوییز ها"
              FirstchildLink={"/available-quizes"}
              secondChildLink={"/bought-quizes"}
              thirdChildLink={"/passed-quizes"}
              FirstchildImage="images/academy/quiz.svg"
              secondChildImage="images/academy/quiz-haye-mojood.svg"
              thirdChildImage="images/academy/quiz-haye-gozarande.svg"
              FirstchildText="همه‌ی کوییز ها"
              secondChildText="کوییز های خریده شده"
              thirdChildText={"کوییز های گذرانده شده"}
            />
            {/* <AccardeonRows
              name="quiz"
              defaultExpanded={currentTab === "quiz" ? true : false}
              isSelected={currentTab === "quiz" ? true : false}
              isFirstChildSelected={
                currentTab === "quiz" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "quiz" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "quiz" && thirdChildSelected ? true : false
              }
              rowTitle="کوییز ها"
              FirstchildLink={"/passed-quizes"}
              secondChildLink={undefined}
              thirdChildLink={undefined}
              FirstchildImage="images/academy/quiz-haye-gozarande.svg"
              secondChildImage={undefined}
              thirdChildImage={undefined}
              FirstchildText="کوییز های گذرانده شده"
              secondChildText={undefined}
              thirdChildText={undefined}
            /> */}

            <AccardeonRows
              name="certificates"
              defaultExpanded={currentTab === "certificates" ? true : false}
              isSelected={currentTab === "certificates" ? true : false}
              isFirstChildSelected={
                currentTab === "certificates" && firstChildSelected
                  ? true
                  : false
              }
              isSecondChildSelected={
                currentTab === "certificates" && secondChildSelected
                  ? true
                  : false
              }
              isThirdChildSelected={
                currentTab === "certificates" && thirdChildSelected
                  ? true
                  : false
              }
              rowTitle="گواهی ها"
              FirstchildLink={"/my-certificates"}
              secondChildLink={undefined}
              thirdChildLink={undefined}
              FirstchildImage={"images/academy/my-certificates.svg"}
              secondChildImage={undefined}
              thirdChildImage={undefined}
              FirstchildText="گواهی های من"
              secondChildText={undefined}
              thirdChildText={undefined}
            />
            <AccardeonRows
              name="recipts"
              defaultExpanded={currentTab === "recipts" ? true : false}
              isSelected={currentTab === "recipts" ? true : false}
              isFirstChildSelected={
                currentTab === "recipts" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "recipts" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "recipts" && thirdChildSelected ? true : false
              }
              rowTitle="فاکتورها"
              FirstchildLink={"/paid-recipts"}
              secondChildLink={"/unpaid-recipts"}
              thirdChildLink={undefined}
              FirstchildImage={"images/academy/paid-recipts.svg"}
              secondChildImage={"images/academy/unpaid-recipts.svg"}
              thirdChildImage={undefined}
              FirstchildText="فاکتور های پرداخت شده"
              secondChildText={"فاکتور های پرداخت نشده"}
              thirdChildText={undefined}
            />

            {/* <AccardeonRows
                            name="reqForTeacher"
                            defaultExpanded={currentTab === "reqForTeacher" ? true : false}
                            isSelected={currentTab === "reqForTeacher" ? true : false}
                            isFirstChildSelected={currentTab === "reqForTeacher" && firstChildSelected ? true : false}
                            isSecondChildSelected={currentTab === "reqForTeacher" && secondChildSelected ? true : false}
                            isThirdChildSelected={currentTab === "reqForTeacher" && thirdChildSelected ? true : false}
                            rowTitle="درخواست حق تدریس"
                            FirstchildLink={"/request-to-teach"}
                            secondChildLink={undefined}
                            thirdChildLink={undefined}
                            FirstchildImage={"images/academy/verification-send-icon.svg"}
                            secondChildImage={undefined}
                            thirdChildImage={undefined}
                            FirstchildText="ارسال مدارک"
                            secondChildText={undefined}
                            thirdChildText={undefined}
                        /> */}
          </>
        ) : undefined}
        {globalUser.user_group == "teacher" ? (
          <>
            <AccardeonRows
              name="profile"
              defaultExpanded={currentTab === "profile" ? true : false}
              isSelected={currentTab === "profile" ? true : false}
              isFirstChildSelected={
                currentTab === "profile" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "profile" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "profile" && thirdChildSelected ? true : false
              }
              rowTitle="پروفایل"
              FirstchildLink={"/edit-profile"}
              secondChildLink={"/change-password"}
              thirdChildLink={undefined}
              FirstchildImage={"images/academy/edit-profile.svg"}
              secondChildImage={"images/academy/security.svg"}
              thirdChildImage={undefined}
              FirstchildText="ویرایش اطلاعات کاربری"
              secondChildText="امنیت"
              thirdChildText={undefined}
            />
            <AccardeonRows
              name="courses"
              defaultExpanded={currentTab === "courses" ? true : false}
              isSelected={currentTab === "courses" ? true : false}
              isFirstChildSelected={
                currentTab === "courses" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "courses" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "courses" && thirdChildSelected ? true : false
              }
              rowTitle="دوره ها"
              FirstchildLink={"/teacher-courses"}
              secondChildLink={undefined}
              thirdChildLink={undefined}
              FirstchildImage={"images/academy/dore-haye-mojood.svg"}
              secondChildImage={undefined}
              thirdChildImage={undefined}
              FirstchildText="دوره های شما"
              secondChildText={undefined}
              thirdChildText={undefined}
            />
            <AccardeonRows
              name="quiz"
              defaultExpanded={currentTab === "quiz" ? true : false}
              isSelected={currentTab === "quiz" ? true : false}
              isFirstChildSelected={
                currentTab === "quiz" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "quiz" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "quiz" && thirdChildSelected ? true : false
              }
              rowTitle="کوییز ها"
              FirstchildLink={"/created-quizes"}
              secondChildLink={"/new-quiz"}
              thirdChildLink={undefined}
              FirstchildImage="images/academy/quiz-haye-mojood.svg"
              secondChildImage="images/academy/quiz-haye-gozarande.svg"
              thirdChildImage={undefined}
              FirstchildText="کوییز های ساخته شده"
              secondChildText="ساخت کوییز"
              thirdChildText={undefined}
            />

            <AccardeonRows
              name="videoUpload"
              defaultExpanded={currentTab === "videoUpload" ? true : false}
              isSelected={currentTab === "videoUpload" ? true : false}
              isFirstChildSelected={
                currentTab === "videoUpload" && firstChildSelected
                  ? true
                  : false
              }
              isSecondChildSelected={
                currentTab === "videoUpload" && secondChildSelected
                  ? true
                  : false
              }
              isThirdChildSelected={
                currentTab === "videoUpload" && thirdChildSelected
                  ? true
                  : false
              }
              rowTitle="آپلود دوره و ویدیو"
              FirstchildLink={"/create-course"}
              secondChildLink={undefined}
              thirdChildLink={undefined}
              // thirdChildLink={"/upload-new-video"}
              FirstchildImage={"images/academy/upload.svg"}
              secondChildImage={undefined}
              thirdChildImage={undefined}
              // thirdChildImage={"images/academy/upload.svg"}
              FirstchildText={"ساخت دوره"}
              secondChildText={undefined}
              thirdChildText={undefined}
            // thirdChildText={"آپلود ویدیو های جدید"}
            />
            <AccardeonRows
              name="prerequisities"
              defaultExpanded={currentTab === "prerequisities" ? true : false}
              isSelected={currentTab === "prerequisities" ? true : false}
              isFirstChildSelected={
                currentTab === "prerequisities" && firstChildSelected
                  ? true
                  : false
              }
              isSecondChildSelected={
                currentTab === "prerequisities" && secondChildSelected
                  ? true
                  : false
              }
              isThirdChildSelected={
                currentTab === "prerequisities" && thirdChildSelected
                  ? true
                  : false
              }
              rowTitle="پیشنیاز ها"
              FirstchildLink={"/create-prerequisities"}
              secondChildLink={"/prerequisities"}
              thirdChildLink={undefined}
              FirstchildImage={"images/tree-icon.png"}
              secondChildImage={"images/tree-icon.png"}
              thirdChildImage={"images/tree-icon.png"}
              FirstchildText={"ساخت پیشنیاز"}
              secondChildText={"پیشنیاز های ساخته شده"}
              thirdChildText={undefined}
            />
          </>
        ) : undefined}

        {globalUser.user_group == "admin" ? (
          <AccardeonRows
            name="cats"
            defaultExpanded={currentTab === "cats" ? true : false}
            isSelected={currentTab === "cats" ? true : false}
            isFirstChildSelected={
              currentTab === "cats" && firstChildSelected ? true : false
            }
            isSecondChildSelected={
              currentTab === "cats" && secondChildSelected ? true : false
            }
            isThirdChildSelected={
              currentTab === "cats" && thirdChildSelected ? true : false
            }
            rowTitle="دسته بندی ها"
            FirstchildLink={"/categories"}
            secondChildLink={"/create-categories"}
            thirdChildLink={undefined}
            FirstchildImage={"images/academy/tags.png"}
            secondChildImage={"images/academy/tags.png"}
            thirdChildImage={undefined}
            FirstchildText="دسته بندی ها"
            secondChildText={"ساخت دسته بندی"}
            thirdChildText={undefined}
          />
        ) : undefined}
        {globalUser.user_group == "superuser" ? (
          <>
            <AccardeonRows
              name="courses"
              defaultExpanded={currentTab === "courses" ? true : false}
              isSelected={currentTab === "courses" ? true : false}
              isFirstChildSelected={
                currentTab === "courses" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "courses" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "courses" && thirdChildSelected ? true : false
              }
              rowTitle="دوره ها"
              FirstchildLink={"/show-courses"}
              secondChildLink={undefined}
              thirdChildLink={undefined}
              FirstchildImage={"images/academy/dore-haye-mojood.svg"}
              secondChildImage={undefined}
              thirdChildImage={undefined}
              FirstchildText="نمایش دوره ها"
              secondChildText={undefined}
              thirdChildText={undefined}
            />
            <AccardeonRows
              name="quiz"
              defaultExpanded={currentTab === "quiz" ? true : false}
              isSelected={currentTab === "quiz" ? true : false}
              isFirstChildSelected={
                currentTab === "quiz" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "quiz" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "quiz" && thirdChildSelected ? true : false
              }
              rowTitle="کوییز ها"
              FirstchildLink={"/all-quizez"}
              thirdChildLink={undefined}
              FirstchildImage="images/academy/quiz-haye-mojood.svg"
              secondChildImage="images/academy/quiz-haye-gozarande.svg"
              thirdChildImage={undefined}
              FirstchildText="کوییز های ساخته شده"
              thirdChildText={undefined}
            />
            <AccardeonRows
              name="videoUpload"
              defaultExpanded={currentTab === "videoUpload" ? true : false}
              isSelected={currentTab === "videoUpload" ? true : false}
              isFirstChildSelected={
                currentTab === "videoUpload" && firstChildSelected
                  ? true
                  : false
              }
              isSecondChildSelected={
                currentTab === "videoUpload" && secondChildSelected
                  ? true
                  : false
              }
              isThirdChildSelected={
                currentTab === "videoUpload" && thirdChildSelected
                  ? true
                  : false
              }
              rowTitle="ویدیو ها"
              FirstchildLink={"/all-videos"}
              // thirdChildLink={undefined}
              // thirdChildLink={"/upload-new-video"}
              FirstchildImage={"images/academy/videoIcon.png"}
              // thirdChildImage={"images/academy/upload.svg"}
              FirstchildText={"نمایش ویدیو ها"}
            // thirdChildText={undefined}
            // thirdChildText={"آپلود ویدیو های جدید"}
            />

            <AccardeonRows
              name="prerequisities"
              defaultExpanded={currentTab === "prerequisities" ? true : false}
              isSelected={currentTab === "prerequisities" ? true : false}
              isFirstChildSelected={
                currentTab === "prerequisities" && firstChildSelected
                  ? true
                  : false
              }
              isSecondChildSelected={
                currentTab === "prerequisities" && secondChildSelected
                  ? true
                  : false
              }
              isThirdChildSelected={
                currentTab === "prerequisities" && thirdChildSelected
                  ? true
                  : false
              }
              rowTitle="پیشنیاز ها"
              FirstchildLink={"/show-prerequisities"}
              thirdChildLink={undefined}
              FirstchildImage={"images/tree-icon.png"}
              secondChildImage={"images/tree-icon.png"}
              thirdChildImage={"images/tree-icon.png"}
              FirstchildText={"پیشنیاز های ساخته شده"}
              thirdChildText={undefined}
            />
            <AccardeonRows
              name="certificates"
              defaultExpanded={currentTab === "certificates" ? true : false}
              isSelected={currentTab === "certificates" ? true : false}
              isFirstChildSelected={
                currentTab === "certificates" && firstChildSelected
                  ? true
                  : false
              }
              isSecondChildSelected={
                currentTab === "certificates" && secondChildSelected
                  ? true
                  : false
              }
              isThirdChildSelected={
                currentTab === "certificates" && thirdChildSelected
                  ? true
                  : false
              }
              rowTitle="گواهی ها"
              FirstchildLink={"/all-certificates"}
              // secondChildLink={undefined}
              // thirdChildLink={undefined}
              FirstchildImage={"images/academy/my-certificates.svg"}
              // secondChildImage={undefined}
              // thirdChildImage={undefined}
              FirstchildText="گواهی های موجود"
            // secondChildText={undefined}
            // thirdChildText={undefined}
            />
            <AccardeonRows
              name="recipts"
              defaultExpanded={currentTab === "recipts" ? true : false}
              isSelected={currentTab === "recipts" ? true : false}
              isFirstChildSelected={
                currentTab === "recipts" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "recipts" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "recipts" && thirdChildSelected ? true : false
              }
              rowTitle="فاکتورها"
              FirstchildLink={"/all-receipts"}
              FirstchildText="تمامی فاکتور ها"
              FirstchildImage={"images/academy/paid-recipts.svg"}
            // FirstchildImage={"images/academy/paid-recipts.svg"}
            // secondChildImage={"images/academy/unpaid-recipts.svg"}
            // thirdChildImage={undefined}
            // FirstchildText="فاکتور های پرداخت شده"
            // secondChildText={"فاکتور های پرداخت نشده"}
            // thirdChildText={undefined}
            />



            <AccardeonRows
              name="products"
              defaultExpanded={currentTab === "products" ? true : false}
              isSelected={currentTab === "products" ? true : false}
              isFirstChildSelected={
                currentTab === "products" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "products" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "products" && thirdChildSelected ? true : false
              }
              isFourthChildSelected={
                currentTab === "products" && fourthChildSelected ? true : false
              }
              rowTitle="محصولات"
              FirstchildLink={"/create-product"}
              secondChildLink={"/show-products"}
              thirdChildLink={"/create-discount"}
              fourthchildLink={"/show-discounts"}
              FirstchildImage={"images/academy/p.png"}
              secondChildImage={"images/academy/p.png"}
              thirdChildImage={"images/academy/tags.png"}
              fourthchildImage={"images/academy/tags.png"}
              FirstchildText="ایجاد محصول"
              secondChildText={"نمایش محصولات"}
              thirdChildText={"ایجاد تخفیف"}
              fourthchildText={"نمایش تخفیف ها"}
            />
          </>
        ) : undefined}
        {globalUser.user_group == "admin" ? (
          <>
            <AccardeonRows
              name="post"
              defaultExpanded={currentTab === "post" ? true : false}
              isSelected={currentTab === "post" ? true : false}
              isFirstChildSelected={
                currentTab === "post" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "post" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "post" && thirdChildSelected ? true : false
              }
              isFourthChildSelected={
                currentTab === "post" && fourthChildSelected ? true : false
              }
              rowTitle="خبر ها"
              FirstchildLink={"/create-post"}
              secondChildLink={"/all-posts"}
              FirstchildImage={"images/academy/post.png"}
              secondChildImage={"images/academy/post.png"}
              FirstchildText="ایجاد خبر"
              secondChildText={"خبر های ساخته شده"}
              thirdChildLink={"/upload-post-video"}
              thirdChildText={"آپلود ویدیو"}
              thirdChildImage={"images/academy/post.png"}
            />
            <AccardeonRows
              name="comment"
              defaultExpanded={currentTab === "comment" ? true : false}
              isSelected={currentTab === "comment" ? true : false}
              isFirstChildSelected={
                currentTab === "comment" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "comment" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "comment" && thirdChildSelected ? true : false
              }
              isFourthChildSelected={
                currentTab === "comment" && fourthChildSelected ? true : false
              }
              rowTitle="کامنت ها"
              FirstchildLink={"/all-comments"}
              FirstchildImage={"images/academy/comment.png"}
              FirstchildText="همه‌ی کامنت ها"
            />
            {/* <AccardeonRows
              name="proposal"
              defaultExpanded={currentTab === "proposal" ? true : false}
              isSelected={currentTab === "proposal" ? true : false}
              isFirstChildSelected={
                currentTab === "proposal" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "proposal" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "proposal" && thirdChildSelected ? true : false
              }
              rowTitle="پروپوزال ها"
              FirstchildLink={"/new-proposal"}
              secondChildLink={"/proposals"}
              thirdChildLink={"/proposal/published"}
              FirstchildImage={"images/academy/proposal.png"}
              secondChildImage={"images/academy/proposal.png"}
              thirdChildImage={"images/academy/proposal.png"}
              FirstchildText="ساخت پروپوزال"
              secondChildText="همه‌ی پروپوزال ها"
              thirdChildText="پروپوزال های انتشار شده"
            /> */}
            <AccardeonRows
              name="bit-quiz"
              defaultExpanded={currentTab === "bit-quiz" ? true : false}
              isSelected={currentTab === "bit-quiz" ? true : false}
              isFirstChildSelected={
                currentTab === "bit-quiz" && firstChildSelected ? true : false
              }
              isSecondChildSelected={
                currentTab === "bit-quiz" && secondChildSelected ? true : false
              }
              isThirdChildSelected={
                currentTab === "bit-quiz" && thirdChildSelected ? true : false
              }
              rowTitle="بیت کوییز"
              FirstchildLink={"/new-bit-quiz"}
              FirstchildImage={"images/academy/proposal.png"}
              FirstchildText="ویرایش بیت کوییز"
              secondChildLink={"/bit-quiz-results"}
              secondChildImage={"images/academy/proposal.png"}
              secondChildText="نتایج بیت کوییز "
            // thirdChildLink={"/bit-result-texts"}
            // thirdChildImage={"images/academy/proposal.png"}
            // thirdChildText="ایجاد جملات نتیجه"
            />
          </>
        ) : undefined}
        {globalUser.user_group == "superuser" ? (
          <AccardeonRows
            name="edituser"
            defaultExpanded={currentTab === "edituser" ? true : false}
            isSelected={currentTab === "edituser" ? true : false}
            isFirstChildSelected={
              currentTab === "edituser" && firstChildSelected ? true : false
            }
            isSecondChildSelected={
              currentTab === "edituser" && secondChildSelected ? true : false
            }
            isThirdChildSelected={
              currentTab === "edituser" && thirdChildSelected ? true : false
            }
            isFourthChildSelected={
              currentTab === "edituser" && fourthChildSelected ? true : false
            }
            rowTitle="تغییر سطح دسترسی"
            FirstchildLink={"/edit-user-group"}
            FirstchildImage={"images/academy/edit-profile.svg"}
            FirstchildText="تغییر سطح دسترسی"
            secondChildLink={"/edit-user-status"}
            secondChildImage={"images/academy/edit-profile.svg"}
            secondChildText="تغییر وضعیت کاربر"
          />
        ) : undefined}
        <div style={{ margin: "20px 0px" }}>
          <Link style={{ textDecoration: "none", color: "red" }} to="/logout">
            <LogoutIcon />
            <span>خروج</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
{
  /* <AccardeonRows
                    name="ticket"
                    defaultExpanded={currentTab === "ticket" ? true : false}
                    isSelected={currentTab === "ticket" ? true : false}
                    isFirstChildSelected={currentTab === "ticket" && firstChildSelected ? true : false}
                    isSecondChildSelected={currentTab === "ticket" && secondChildSelected ? true : false}
                    isThirdChildSelected={currentTab === "ticket" && thirdChildSelected ? true : false}
                    rowTitle="تیکت ها"
                    FirstchildLink={"/new-ticket"}
                    secondChildLink={"/tickets"}
                    thirdChildLink={undefined}
                    FirstchildImage={"images/academy/ticket.png"}
                    secondChildImage={"images/academy/ticket.png"}
                    thirdChildImage={undefined}
                    FirstchildText="ارسال تیکت"
                    secondChildText={"نمایش تیکت ها"}
                    thirdChildText={undefined}
                /> */
}
