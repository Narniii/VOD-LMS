import { BrowserRouter as Router, Route, Switch, Link, useHistory, Redirect } from "react-router-dom";
import React from 'react';
import Appbar from '../landing/Appbar';
import AboutUs from '../aboutus/AboutUs';
import Academy from '../academy/Academy';
import NoMatch from '../ExtraPages/NoMatch';
import SignUp from '../authentication/Signup';
import Login from '../authentication/Login';
import EditProfile from '../academy/EditProfile';
import ChangePassword from '../academy/ChangePassword';
import CoursesInProgress from '../academy/courses/CoursesInProgress'
import PassedCourses from '../academy/courses/PassedCourses'
import AvailableCourses from '../academy/courses/AvailableCourses'
import AvailableQuizes from '../academy/quiz/AvailableQuizes'
import DoneQuizes from '../academy/quiz/DoneQuizes'
import BoughtQuizes from '../academy/quiz/BoughtQuizes'
import MyCertificates from '../academy/certificates/MyCertificates'
import NewVideo from '../academy/videoUpload/NewVideo'
import PaidRecipts from '../academy/recipts/PaidRecipts'
import UnPaidRecipts from '../academy/recipts/UnPaidRecipts'
import BecomeTeacher from '../academy/becomeTeacher/BecomeTeacher'
import LogOut from '../authentication/LogOut';
// import TermsOfService from '../ExtraPages/TermsOfService';
import ContactUs from '../ExtraPages/ContactUs';
import CreateCourse from '../academy/videoUpload/CreateCourse';
// import PrivacyPolicy from '../ExtraPages/PrivacyPolicy';
import { useSelector, useDispatch } from 'react-redux'
import UploadedCourses from '../academy/videoUpload/UploadedCourses';
import CoursePreview from '../academy/videoUpload/CoursePreview';
import CreatedQuizes from '../academy/quiz/teacher/CreatedQuizes';
import CourseVideos from '../academy/courses/CourseVideos';
import VideoSingle from '../academy/courses/VIdeoSIngle';
import TeacherCourses from '../academy/courses/teacher/TeacherCourses';
import EditCourse from '../academy/courses/teacher/EditCourse';
import QuizPreview from '../academy/quiz/teacher/QuizPreview';
import EditVideo from '../academy/videoUpload/teacher/EditVideo';
import CreatePrerequisities from '../academy/prerequisities/CreatePrerequisities';
import GetPrerequisities from '../academy/prerequisities/GetPrerequisities';
import EditPrequisity from '../academy/prerequisities/EditPrequisity';
import ShowPrerequisities from '../academy/prerequisities/ShowPrerequisities';
import EditQuiz from '../academy/quiz/teacher/EditQuiz';
import CreateQuiz from '../academy/quiz/teacher/CreateQuiz';
import NewProduct from '../academy/products/NewProduct';
import Products from '../academy/products/Products';
import NewDiscount from '../academy/discounts/NewDiscount';
import Discounts from '../academy/discounts/Discounts';
import EditProducts from '../academy/products/EditProduct';
import EditDiscount from '../academy/discounts/EditDiscount';
import Payment from '../academy/payment/Payment';
import ReciptPreviewSuccess from '../academy/recipts/ReciptPreviewSuccess';
import ReciptPreviewFail from '../academy/recipts/ReciptPreviewFail';
import NewTicket from '../academy/tickets/NewTicket';
import Tickets from '../academy/tickets/Tickets';
import NewPost from '../academy/post/NewPost';
import Posts from '../academy/post/Posts';
import PostPreview from '../academy/post/PostPreview';
import EditPost from '../academy/post/EditPost';
import EditPostStatus from '../academy/post/EditPostStatus';
import Test from '../academy/quiz/student/Test';
import UserPreviewQuiz from '../academy/quiz/student/UserPreviewQuiz';
import CertificateSingle from '../academy/certificates/CertificateSingle';
import Home from '../../blog/posts/Home'
import PostSingle from '../../blog/posts/PostSingle';
import AllComments from '../academy/comments/AllComments';
import CommentSingle from '../academy/comments/CommentSingle';
import EditUserGroup from '../academy/editUserGroup/EditUserGroup';
import EditUserStatus from '../academy/editUserGroup/EditUserStatus';
import AllPrerequisities from '../academy/prerequisities/AllPrerequisities';
import AllCourses from '../academy/courses/superuser/AllCourses';
import AllQuizez from '../academy/quiz/AllQuizez';
import AllVideos from '../academy/videoUpload/AllVideos';
import AllReceipts from '../academy/courses/superuser/AllReceipts';
import AllCertificates from '../academy/courses/superuser/AllCertificates';
import NewProposal from '../academy/proposal/NewProposal';
import AllProposals from '../academy/proposal/AllProposals';
import ProposalPreview from '../academy/proposal/ProposalPreview';
import EditProposal from '../academy/proposal/EditProposal';
import AllPublishedProposals from '../academy/proposal/AllPublishedProposals';
import CreateFunQuiz from '../academy/quiz/FunQuiz/CreateFunQuiz';
import FunQuiz from '../landing/FunQuiz';
import FunQuizResult from '../landing/FunQuizResult';
import FunResultTexts from '../academy/quiz/FunQuiz/FunResultTexts';
import UploadVideo from '../academy/post/UploadVideo';
import Categories from '../academy/categories/Categories';
import CreateCategories from '../academy/categories/CreateCategories';
import FunQuizResults from '../academy/quiz/FunQuiz/FunQuizResults';
import PostByTags from '../../blog/posts/PostByTags';



import Landing from "../../new-lms//pages/Landing";
import NewWelcome from "../../new-lms/pages/NewWelcome";
import OldWelcome from "../academy/welcome/OldWelcome";
import NewEditProfile from "../../new-lms/pages/NewEditprofile";
import NewChangePassword from "../../new-lms/pages/NewChangePassword";
import NewAvailableCourses from "../../new-lms/pages/NewAvailableCourses";
import NewAvailableQuizes from "../../new-lms/pages/NewAvailableQuizes";
import NewBoughtQuizes from "../../new-lms/pages/NewBoughtQuizes";
import NewDoneQuizes from "../../new-lms/pages/NewDoneQuizes";
import NewMyCertificates from "../../new-lms/pages/NewMyCertificates";
import NewPaidRecipts from "../../new-lms/pages/NewPaidRecipts";
import NewUnPaidRecipts from "../../new-lms/pages/NewUnpaidRecipts";
import NewCertificateSingle from "../../new-lms/pages/NewCertificateSingle";
import NewCoursePreview from "../../new-lms/pages/NewCoursePreview";
import LoginSignup from "../../new-lms/pages/auth";
import NewVideoSingle from "../../new-lms/pages/NewVideoSingle";
import NewPayment from "../../new-lms/pages/NewPayment";
import NewTest from "../../new-lms/pages/NewTest";
import NewReciptPreviewSuccess from "../../new-lms/pages/NewReciptPreviewSuccess";
import NewReciptPreviewFail from "../../new-lms/pages/NewReciptPreviewFail";
import ProductPreview from "../../new-lms/pages/ProductPreview";
import Blog from "../../new-lms/pages/NewBlog";
import SearchPage from "../../new-lms/pages/SearchPage";
import PrivacyPolicy from "../../new-lms/pages/NewPrivacyPolicy";
import TermsOfService from "../../new-lms/pages/newTerms";

const ScreenRouter = (props) => {
    const history = useHistory();
    const { globalUser } = useSelector(state => state.userReducer);
    const RouteWithNavbar = ({ exact, path, component: Component, ...rest }) => {
        return <Route exact={exact} path={path} {...rest} render={(routeProps) => {
            return <>
                <Appbar  {...routeProps} />
                <Component {...routeProps} />
            </>
        }}
        />
    }

    function ProtectedRoute({ component: Component, ...restOfProps }) {
        if (globalUser != undefined)
            return (
                <Route
                    {...restOfProps}
                    render={(props) =>

                        globalUser.isLoggedIn === true ?
                            <>
                                <Appbar  {...props} />
                                <Component {...props} />
                            </>
                            :
                            <Redirect to="/login" />
                    }
                />
            );
        else
            return <Redirect to="/login" />
    }
    function NewProtectedRoute({ component: Component, ...restOfProps }) {
        if (globalUser != undefined)
            return (
                <Route
                    {...restOfProps}
                    render={(props) =>
                        globalUser.isLoggedIn === true ?
                            <>
                                <Component {...props} />
                            </>
                            :
                            <Redirect to="/login" />
                    }
                />
            );
        else
            return <Redirect to="/login" />
    }
    return (
        <>
            <Router>
                <Switch>
                    {/* general pages */}
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/terms-of-service" component={TermsOfService} />
                    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                    <Route exact path="/courses/:id" component={ProductPreview} />
                    <RouteWithNavbar exact path="/signup" component={SignUp} />
                    <RouteWithNavbar exact path="/login" component={Login} />
                    <RouteWithNavbar exact path="/about-us" component={AboutUs} />
                    <Route exact path="/academy" component={Academy} />
                    {/* <RouteWithNavbar exact path="/terms-of-service" component={TermsOfService} />
                    <RouteWithNavbar exact path="/privacy-policy" component={PrivacyPolicy} /> */}
                    <RouteWithNavbar exact path="/contact-us" component={ContactUs} />

                    {/* share between user and teacher */}
                    <ProtectedRoute exact path="/course-videos/:id" component={CourseVideos} />
                    {/* user */}

                    {/* teacher */}
                    <ProtectedRoute exact path="/teacher-courses" component={TeacherCourses} />
                    <ProtectedRoute exact path="/create-course" component={CreateCourse} />
                    <ProtectedRoute exact path="/upload-new-video/:id" component={NewVideo} />
                    <ProtectedRoute exact path="/uploaded-courses" component={UploadedCourses} />
                    <ProtectedRoute exact path="/edit-course/:slug" component={EditCourse} />
                    <ProtectedRoute exact path="/edit-video/:id" component={EditVideo} />
                    {/*  fun quiz*/}
                    <ProtectedRoute exact path="/new-bit-quiz" component={CreateFunQuiz} />
                    <ProtectedRoute exact path="/bit-quiz-results" component={FunQuizResults} />
                    <ProtectedRoute exact path="/bit-result-texts" component={FunResultTexts} />


                    {/*  prerequiesties*/}
                    <ProtectedRoute exact path="/create-prerequisities" component={CreatePrerequisities} />
                    <ProtectedRoute exact path="/prerequisities" component={GetPrerequisities} />
                    <ProtectedRoute exact path="/edit-prerequisities/:slug" component={EditPrequisity} />
                    <ProtectedRoute exact path="/prerequisities/:slug" component={ShowPrerequisities} />

                    {/* categories */}
                    <ProtectedRoute exact path="/categories" component={Categories} />
                    <ProtectedRoute exact path="/create-categories" component={CreateCategories} />
                    {/*quizes */}
                    {/* teacher */}
                    <ProtectedRoute exact path="/new-quiz" component={CreateQuiz} />
                    <ProtectedRoute exact path="/created-quizes" component={CreatedQuizes} />
                    <ProtectedRoute exact path="/quiz-preview/:id" component={QuizPreview} />
                    <ProtectedRoute exact path="/edit-quiz/:id" component={EditQuiz} />

                    {/* superuser */}
                    <ProtectedRoute exact path="/show-prerequisities/" component={AllPrerequisities} />
                    <ProtectedRoute exact path="/show-courses/" component={AllCourses} />
                    <ProtectedRoute exact path="/all-quizez/" component={AllQuizez} />
                    <ProtectedRoute exact path="/all-videos/" component={AllVideos} />
                    <ProtectedRoute exact path="/all-certificates/" component={AllCertificates} />
                    <ProtectedRoute exact path="/all-receipts/" component={AllReceipts} />



                    {/* student */}

                    {/* certificates */}

                    {/* req 4tacher */}
                    <ProtectedRoute exact path="/request-to-teach" component={BecomeTeacher} />
                    {/* recipts */}


                    {/* products and discounts */}
                    <ProtectedRoute exact path="/create-product" component={NewProduct} />
                    <ProtectedRoute exact path="/show-products" component={Products} />
                    <ProtectedRoute exact path="/edit-product/:slug" component={EditProducts} />

                    <ProtectedRoute exact path="/create-discount" component={NewDiscount} />
                    <ProtectedRoute exact path="/show-discounts" component={Discounts} />
                    <ProtectedRoute exact path="/edit-discount/:id" component={EditDiscount} />
                    {/* payment */}
                    {/* tickets */}

                    {/* <ProtectedRoute exact path="/tickets" component={Tickets} /> */}
                    {/* edit user group */}
                    <ProtectedRoute exact path="/edit-user-group" component={EditUserGroup} />
                    <ProtectedRoute exact path="/edit-user-status" component={EditUserStatus} />
                    {/* proposals for admin */}
                    <ProtectedRoute exact path="/new-proposal" component={NewProposal} />
                    <ProtectedRoute exact path="/proposals" component={AllProposals} />
                    <ProtectedRoute exact path="/proposals/:slug" component={ProposalPreview} />
                    <ProtectedRoute exact path="/proposal/:slug/edit" component={EditProposal} />
                    <ProtectedRoute exact path="/proposal/published" component={AllPublishedProposals} />


                    {/* fun quiz */}
                    <Route exact path="/bit-quiz" component={FunQuiz} />
                    <Route exact path="/bit-quiz/result/:id" component={FunQuizResult} />


                    {/*===============================posts===============================================================  */}
                    <ProtectedRoute exact path="/create-post" component={NewPost} />
                    <ProtectedRoute exact path="/all-posts" component={Posts} />
                    <ProtectedRoute exact path="/post-preview/:id" component={PostPreview} />
                    <ProtectedRoute exact path="/edit-post/:slug" component={EditPost} />
                    <ProtectedRoute exact path="/edit-post-status/:slug" component={EditPostStatus} />
                    <ProtectedRoute exact path="/upload-post-video" component={UploadVideo} />

                    <ProtectedRoute exact path="/all-comments" component={AllComments} />
                    <ProtectedRoute exact path="/all-comments/:id" component={CommentSingle} />

                    <Route exact path="/logout" component={LogOut} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/:slug" component={PostSingle} />
                    <Route exact path="/blog/tag/:tag" component={PostByTags} />
                    <Route exact path="/auth" component={LoginSignup} />
                    <Route exact path="/search/:phrase" component={SearchPage} />





                    {/* <ProtectedRoute exact path="/preview-quiz/:id" component={UserPrevisewQuiz} /> */}
                    {/* <ProtectedRoute exact path="/new-ticket" component={NewTicket} /> */}
                    {/* <ProtectedRoute exact path="/courses-in-progress" component={CoursesInProgress} /> */}
                    {/* <ProtectedRoute exact path="/passed-courses" component={PassedCourses} /> */}

                    {/* user dashboard */}
                    {globalUser && globalUser.user_group == "student" ?
                        <>
                            <NewProtectedRoute path="/welcome" component={NewWelcome} />
                            <NewProtectedRoute exact path="/edit-profile" component={NewEditProfile} />
                            <NewProtectedRoute exact path="/change-password" component={NewChangePassword} />
                            <NewProtectedRoute exact path="/available-courses" component={NewAvailableCourses} />
                            <NewProtectedRoute exact path="/available-quizes" component={NewAvailableQuizes} />
                            <NewProtectedRoute exact path="/bought-quizes" component={NewBoughtQuizes} />
                            <NewProtectedRoute exact path="/passed-quizes" component={NewDoneQuizes} />
                            <NewProtectedRoute exact path="/my-certificates" component={NewMyCertificates} />
                            <NewProtectedRoute exact path="/my-certificates/:id" component={NewCertificateSingle} />
                            <NewProtectedRoute exact path="/paid-recipts" component={NewPaidRecipts} />
                            <NewProtectedRoute exact path="/unpaid-recipts" component={NewUnPaidRecipts} />
                            <NewProtectedRoute exact path="/course-preview/:id" component={NewCoursePreview} />
                            <NewProtectedRoute exact path="/view-video/:courseSlug/:part" component={NewVideoSingle} />
                            <NewProtectedRoute exact path="/portal/verify-payment/" component={NewPayment} />
                            <NewProtectedRoute exact path="/test/:id" component={NewTest} />
                            <NewProtectedRoute exact path="/recipts-success/:id" component={NewReciptPreviewSuccess} />
                            <NewProtectedRoute exact path="/recipts-fail/:id" component={NewReciptPreviewFail} />
                        </>
                        :
                        <>
                            <ProtectedRoute path="/welcome" component={OldWelcome} />
                            <ProtectedRoute exact path="/edit-profile" component={EditProfile} />
                            <ProtectedRoute exact path="/change-password" component={ChangePassword} />
                            <ProtectedRoute exact path="/available-courses" component={AvailableCourses} />
                            <ProtectedRoute exact path="/available-quizes" component={AvailableQuizes} />
                            <ProtectedRoute exact path="/bought-quizes" component={BoughtQuizes} />
                            <ProtectedRoute exact path="/passed-quizes" component={DoneQuizes} />
                            <ProtectedRoute exact path="/my-certificates" component={MyCertificates} />
                            <ProtectedRoute exact path="/paid-recipts" component={PaidRecipts} />
                            <ProtectedRoute exact path="/unpaid-recipts" component={UnPaidRecipts} />
                            <ProtectedRoute exact path="/my-certificates/:id" component={CertificateSingle} />
                            <ProtectedRoute exact path="/course-preview/:id" component={CoursePreview} />
                            <ProtectedRoute exact path="/view-video/:courseSlug/:part" component={VideoSingle} />
                            <ProtectedRoute exact path="/portal/verify-payment/" component={Payment} />
                            <ProtectedRoute exact path="/test/:id" component={Test} />
                            <ProtectedRoute exact path="/recipts-success/:id" component={ReciptPreviewSuccess} />
                            <ProtectedRoute exact path="/recipts-fail/:id" component={ReciptPreviewFail} />
                        </>
                    }
                    <Route component={NoMatch} />
                </Switch>
            </Router>


        </>
    );
}

export default ScreenRouter