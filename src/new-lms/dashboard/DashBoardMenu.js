import React from 'react'
import NewAccardeonRows from "./NewAccardeonRows";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../utils/utils';
const useStyles = makeStyles((theme) => ({
    menuWrapper: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down('xs')]: {
            height: "90vh",
            display: 'block',
            height: '100vh',
            background: "#2f3835",
            width: '80vw'
        },
        [theme.breakpoints.between("sm", "md")]: {
            height: "90vh",
            display: 'block',
            height: '100vh',
            background: "#2f3835",
            width: '50vw'
        },
        [theme.breakpoints.up('md')]: {
            width: 'inherit',
            height: 'inherit'
        },
    },
    iconWrapper: {
        marginBottom: "20px",
    },
    aquaLogo: {
        width: "120px",
    },
}));
export default function DashBoardMenu({
    globalUser,
    currentTab,
    firstChildSelected,
    secondChildSelected,
    thirdChildSelected,
    fourthChildSelected,
}) {
    const classes = useStyles();
    return (
        <div className={classes.menuWrapper}>
            <Link className='mobile-and-tablet' to='/' style={{paddingTop:'5px'}}>
                <div style={{ textAlign: 'center', fontSize: '26px', letterSpacing: '1px' }}>
                    <span style={{ color: '#64c5ba', marginLeft: '5px' }}>BIT</span>DAD
                    <img src={PUBLIC_URL('svg/header_logo.svg')} style={{ width: '60px', height: '60px', marginLeft: '5px' }} />
                </div>
            </Link>
            <Link className='mobile-and-tablet' to="/welcome" style={{ color: 'white', fontWeight: 'bold', margin: '25px 15px' }}>داشبورد</Link>
            {globalUser.user_group == "student" ? (
                <>
                    <NewAccardeonRows
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
                    <NewAccardeonRows
                        name="courses"
                        defaultExpanded={currentTab === "courses" ? true : false}
                        isSelected={currentTab === "courses" ? true : false}
                        isFirstChildSelected={
                            currentTab === "courses" && firstChildSelected ? true : false
                        }
                        rowTitle="دوره ها"
                        FirstchildLink={"/available-courses"}
                        FirstchildText="دوره های موجود"
                    />
                    <NewAccardeonRows
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
                    <NewAccardeonRows
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
                    <NewAccardeonRows
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
                    <div
                        style={{
                            color: "#61c4b9",
                            display: "inline-block",
                            width: '100%',
                            fontSize: "14px",
                            padding: "30px 10px 10px 25px",
                            textAlign: 'end',
                            background: '#2f3835'
                        }}
                    >
                        <span>امتیاز شما: </span>
                        {globalUser.user_points}
                    </div>
                    <Link className='mobile-and-tablet' to='/logout'>
                        <div className={'logOutButton'} style={{ margin: '30px auto' }}>
                            <p>خروج</p>
                        </div>
                    </Link>
                </>
            ) : undefined}
        </div>
    )
}
