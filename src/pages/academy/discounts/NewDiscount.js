import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import axios from 'axios'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./Discounts.css"
import { Helmet } from "react-helmet";
import GenerateRandomCode from 'react-random-code-generator';

const useStyles = makeStyles((theme) => ({
    whiteBox: {
        backgroundColor: "white",
        borderRadius: "20px",
        height: "85vh",
    },
    khakibox: {
        backgroundColor: '#f2f2f2',
        height: '85vh',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    coursesInProgressWrapper: {
        overflow: 'scroll !important',
        width: '100%',
    },
    submitButtonWrapper: {
        width: '100%',
        textAlign: 'center',
        marginTop: '20px'
    },
    submitButton: {
        backgroundColor: '#64c5ba !important',
        border: '1px solid #64c5ba !important',
        color: 'white !important',
        padding: '10px 20px !important',
        borderRadius: '5px !important',
        margin: '20px 0px'
    },
    inputsHeader: {
        color: '#64c5ba',
        fontSize: '20px',
        margin: '10px 0px'
    },
    modal: {
        position: 'absolute',
        width: '300px',
        height: '150px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '20px',
        [theme.breakpoints.down('xs')]: {
            padding: '30px',
            width: '300px',
        },
        [theme.breakpoints.between("sm", "md")]: {
            padding: '0px 40px',
            margin: '10px',
            width: '400px',
            height: '400px',
        },
        "@media (min-width: 1200px)": {
            // paddingTop: '10px',
        },
    },
    container: {
        width: '100%',
        paddingRight: "5rem",
        paddingLeft: "5rem",
        marginRight: 'auto',
        marginLeft: 'auto',
    }
}));
export default function NewDiscount(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [doneModal, setDoneModal] = useState(false)
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState(undefined)
    const [selectedCourse, setSelectedCourse] = useState(undefined)
    const [description, setDescription] = useState(undefined)
    const [isGeneral, setIsGeneral] = useState(true)
    const [isSelected, setIsSelected] = useState(undefined)
    const [generatedCode, setGeneratedCode] = useState(undefined)

    const onPriceChange = (e) => {
        setPrice(e.target.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const generateCode = (e) => {
        e.preventDefault()
        let code = GenerateRandomCode.TextNumCode(3, 4)
        code = code.toUpperCase()
        setGeneratedCode(code)
    }
    useEffect(() => {
        getProducts()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (products.length != 0) {
            setLoading(false)
        }
    }, [products])
    const getProducts = async () => {
        try {
            apiCall.current = API.request('/product/all/', false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            console.log(response)
            if (response.data.length != 0) {
                setProducts(response.data)
            }
        }
        catch (err) {
            console.log(err)
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const dropDownHandler = (e) => {
        setSelectedCourse(e.nativeEvent.target.value)
    }
    const typeDropDownHandler = (e) => {
        console.log(e.nativeEvent.target.value)
        if (e.nativeEvent.target.value == "Unique") {
            setIsGeneral(false)
        }
    }
    const submitGeneralDiscount = async (e) => {
        e.preventDefault()
        if (selectedCourse == undefined || selectedCourse == -1) {
            setError('لطفا محصول را انتخاب کنید')
            return
        }
        if (price == undefined || price == '') {
            setError('لطفا درصد را وارد کنید')
            return
        }
        if (description == '' || description == undefined) {
            setError('متن تخفیف را وارد کنید')
            return
        }
        if (generatedCode == '' || generatedCode == undefined) {
            setError('کد تخفیف را ایجاد کنید')
            return
        }
        setLoading(true)
        setError(undefined)
        try {
            const res = await axios.post(`https://api.aqua.ir:8283/product/discount/create/`,
                {
                    product_id: selectedCourse,
                    offpercentage: price,
                    short_description: description,
                    code: `${generatedCode}`,
                    status: "general"
                },
                {
                    headers: {
                        'Authorization': `Bearer ${globalUser.accessToken}`
                    }
                });
            console.log(res)
            if (res.data.message == "Valid token") {
                setDoneModal(true)
                setTimeout(() => {
                    history.push('/show-discounts')
                }, 2000);
            }
            setLoading(false)
        } catch (err) {
            console.log(err.message)
            if (err.message == "Request failed with status code 302")
                setError('این درس قبلا به عنوان محصول اضافه شده است.')
            else
                setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
            setLoading(false)
        }
    }
    const submitUniqueDiscount = async (e) => {
        e.preventDefault()
        if (price == undefined || price == '') {
            setError('لطفا درصد را وارد کنید')
            return
        }
        if (description == '' || description == undefined) {
            setError('متن تخفیف را وارد کنید')
            return
        }
        if (generatedCode == '' || generatedCode == undefined) {
            setError('کد تخفیف را ایجاد کنید')
            return
        }
        setLoading(true)
        setError(undefined)
        try {
            const res = await axios.post(`https://api.aqua.ir:8283/product/discount/create/`,
                {
                    offpercentage: price,
                    short_description: description,
                    code: `${generatedCode}`,
                    status: "unique"
                },
                {
                    headers: {
                        'Authorization': `Bearer ${globalUser.accessToken}`
                    }
                });
            console.log(res)
            if (res.data.message == "Valid token") {
                setDoneModal(true)
                setTimeout(() => {
                    history.push('/show-discounts')
                }, 2000);
            }
            setLoading(false)
        } catch (err) {
            console.log(err.message)
            if (err.message == "Request failed with status code 302")
                setError('این درس قبلا به عنوان محصول اضافه شده است.')
            else
                setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
            setLoading(false)
        }
    }
    return (
        <>
            <Helmet>
                <title>ایجاد تخفیف</title>
            </Helmet>
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
                                <UserDashboard currentTab={"products"} thirdChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overFlowHandler" >
                                <div className={classes.khakibox}>
                                    <div className={classes.coursesInProgressWrapper}>
                                        {loading ? <div style={{
                                            display: 'flex',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: '85vh',
                                        }}>
                                            <CircularProgress style={{ color: "green" }} />
                                        </div> :
                                            <div>
                                                <div className="text-center newproducts-inputs">
                                                    <div className={classes.inputsHeader}>ایجاد تخفیف</div>
                                                    {!isSelected ? <div className="row">
                                                        <div className="col-md-3">
                                                            <div className={classes.inputsHeader}>انتخاب نوع تخفیف</div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Form.Select onChange={typeDropDownHandler}>
                                                                <option value={"General"}>کد تخفیف دوره</option>
                                                                <option value={"Unique"}>مختص به یوزر</option>
                                                            </Form.Select>
                                                        </div>
                                                        <div className="text-center">
                                                            <button className="btn btn-md btn-success" onClick={() => setIsSelected(true)}>ثبت</button>
                                                        </div>
                                                    </div> :
                                                        <>
                                                            {isGeneral ?
                                                                <form>
                                                                    <div className="newproducts-inputs">
                                                                        <div className={classes.container}>
                                                                            <div className="row">
                                                                                <div className="col-md-3">
                                                                                    <div className={classes.inputsHeader}>انتخاب محصول</div>
                                                                                </div>
                                                                                <div className="col-md-9">
                                                                                    <Form.Select onChange={dropDownHandler}>
                                                                                        <option value={-1}>محصول</option>
                                                                                        {products.length != 0 ?
                                                                                            <>
                                                                                                {products.map((product) => {
                                                                                                    return <option key={product.id} value={product.id}>{product.course_info.slug}</option>
                                                                                                })}
                                                                                            </>
                                                                                            : undefined}
                                                                                    </Form.Select>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className={classes.inputsHeader}>درصد تخفیف</div>
                                                                                </div>
                                                                                <div className="col-md-9">
                                                                                    <input className="form-control" value={price} name="price" onChange={onPriceChange} type="number" style={{ backgroundColor: '#f2f2f2 !important' }} />
                                                                                </div>
                                                                                <div style={{ margin: '20px 0px' }}></div>
                                                                                <div className="col-md-3">
                                                                                    <div className={classes.inputsHeader}>متن توضیح تخفیف</div>
                                                                                </div>
                                                                                <div className="col-md-9">
                                                                                    <input className="form-control" value={description} name="description" onChange={onDescriptionChange} type="text" style={{ backgroundColor: '#f2f2f2 !important' }} />
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className={classes.inputsHeader}>ایجاد کد تخفیف</div>
                                                                                </div>
                                                                                <div className="col-md-9">
                                                                                    <input
                                                                                        disabled
                                                                                        value={generatedCode ? generatedCode : ''} />

                                                                                    <button className={classes.submitButton} onClick={generateCode}>ایجاد کد تخفیف</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                        <button type="submit" className={classes.submitButton} onClick={submitGeneralDiscount}>ثبت تخفیف</button>
                                                                        {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                                                                    </div>
                                                                </form>
                                                                :
                                                                <form>
                                                                    <div className="newproducts-inputs">
                                                                        <div className={classes.container}>
                                                                            <div className="row">
                                                                                <div className="col-md-3">
                                                                                    <div className={classes.inputsHeader}>درصد تخفیف</div>
                                                                                </div>
                                                                                <div className="col-md-9">
                                                                                    <input className="form-control" value={price} name="price" onChange={onPriceChange} type="number" style={{ backgroundColor: '#f2f2f2 !important' }} />
                                                                                </div>
                                                                                <div style={{ margin: '20px 0px' }}></div>
                                                                                <div className="col-md-3">
                                                                                    <div className={classes.inputsHeader}>متن توضیح تخفیف</div>
                                                                                </div>
                                                                                <div className="col-md-9">
                                                                                    <input className="form-control" value={description} name="description" onChange={onDescriptionChange} type="text" style={{ backgroundColor: '#f2f2f2 !important' }} />
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className={classes.inputsHeader}>ایجاد کد تخفیف</div>
                                                                                </div>
                                                                                <div className="col-md-9">
                                                                                    <input
                                                                                        disabled
                                                                                        value={generatedCode ? generatedCode : ''} />

                                                                                    <button className={classes.submitButton} onClick={generateCode}>ایجاد کد تخفیف</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                        <button type="submit" className={classes.submitButton} onClick={submitUniqueDiscount}>ثبت تخفیف</button>
                                                                        {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                                                                    </div>
                                                                </form>
                                                            }
                                                        </>
                                                    }

                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <Modal
                    open={doneModal}
                    onClose={() => setDoneModal(false)}
                    disableBackdropClick
                >
                    <div className={classes.modal}>
                        <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%' }}>
                            <CheckCircleOutlineIcon style={{ color: '#64c5ba', fontSize: "40px" }} />
                            <span className="text-dark" style={{ marginRight: '10px' }}>ثبت  تخفیف موفقیت آمیز بود</span>
                        </div>
                    </div>
                </Modal>
            </section >
        </>

    );
}