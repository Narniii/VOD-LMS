import moment from 'jalali-moment'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState, useRef, useEffect } from 'react';
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import API from "../../utils/api";
import '../style/home.css'
import Navbar from '../navbar/Navbar';
import Footer from '../comps/Footer';
import { Link, useHistory } from "react-router-dom";
import { Box, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";



const ProductPreview = (props) => {
    const { globalUser } = useSelector((state) => state.userReducer);
    const [product, setProduct] = useState(undefined)
    const [error, setError] = useState(undefined)
    const apiCall = useRef(undefined);
    const [date, setDate] = useState(undefined)
    let id = props.match.params.id;
    const [preqs, setPreqs] = useState([])
    const [tags, setTags] = useState([])
    const [value, setValue] = useState(undefined)
    const [loading, setLoading] = useState(true)
    // console.log(props)
    useEffect(() => {
        getProduct()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        var tempDate = []
        if (product != undefined) {
            const day = moment(product.course_info.publish_time, 'YYYY/MM/DD').locale('fa').format('dddd ')
            const month = moment(product.course_info.publish_time, 'YYYY/MM/DD').locale('fa').format('MMM')
            const year = moment(product.course_info.publish_time, 'YYYY/MM/DD').locale('fa').format('yyyy ')
            tempDate.push({ day: day, month: month, year: year })
            // console.log(tempDate)
            setDate(tempDate)
            if (product.course_info.prerequisite.length != 0) {
                setPreqs(product.course_info.prerequisite[0].prerequisite_courses)
            }
            setTags(product.course_info.tags)
            setValue(product.mean_score)
            // console.log(product)
            setLoading(false)
        }
    }, [product])
    // useEffect(() => {
    //     if (meanScore != undefined) {
    //         setValue(meanScore / 10)
    //     }
    // }, [meanScore])

    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const getProduct = async () => {
        try {
            apiCall.current = API.request(
                `/product/${id}`,
                false,
                {}
            );
            const response = await apiCall.current.promise;
            if (response.message == "Fetched successfully") {
                setProduct(response.data);
                // console.log(response)
            }
        } catch (err) {
            setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
        }
    };


    // { console.log(product) }
    return (
        <section className='productPreviewSection'>
            <Navbar />
            <div className={'containeer'}>
                <div className={'main'}>
                    {!loading ?
                        <div className={'holder'}>
                            <div className={'CoursePreview'}>
                                <div
                                    style={{
                                        backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283/${product.course_info.image}`)),
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        width: '100%',
                                        height: '200px',
                                        borderBottom: "2px solid white"
                                    }}
                                >
                                    {/* <img style={{ width: '100%', height: '100%' }} src={`https://api.aqua.ir:8283/${product.course_info.image}`} /> */}
                                </div>
                                <div className={'coursePreviewContent'}>
                                    <div style={{ width: "80%", height: "25%" }}>
                                        <h4 style={{ color: "#64c5ba" }}>
                                            {product.course_info.title}
                                        </h4>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            {date != undefined ? <div style={{ color: "#fff", fontSize: "9px", opacity: "0.7" }}> انتشار یافته در{date[0].month}&nbsp;{date[0].year} توسط بیتداد</div> : undefined}
                                            <Stack spacing={1} sx={{ direction: "ltr" }}>
                                                {value != undefined ? <Rating name="size-small" color='secondary' defaultValue={value / 10} size="small" readOnly /> : <Rating name="size-small" color='secondary' defaultValue={0} size="small" readOnly />}
                                            </Stack>
                                        </div>
                                    </div>
                                    <Box className={'courseShortDecription'}>
                                        <p className='font-weight-light text-light'>{product.course_info.short_description}</p>
                                    </Box>
                                    <Box sx={{ flexDirection: { xs: "column", sm: "column", md: "row" }, height: { xs: "30%", md: "30%" } }} className={'tagsAndPreqs'}>
                                        <Box className='prqstgs' sx={{ overflowY: "scroll", width: { xs: "80%", sm: "100%", md: "47%" }, height: { xs: "47%", sm: "47%", md: "100%" } }} >
                                            {console.log(preqs)}
                                            {preqs != undefined ?
                                                <>
                                                    <p style={{ color: "#64c5ba", fontSize: "14px", marginBottom: "5px" }}>پیشنیاز ها:</p>
                                                    {preqs.length != 0 ?
                                                        <>
                                                            <Stack direction="column" spacing={1} >
                                                                {preqs.map((prq) => {
                                                                    return <>
                                                                        <Chip size="small" className='preqChips' sx={{ borderRadius: "0", border: "1px solid #0f2d3e", color: "#0f2d3e", fontSize: "10px" }} key={prq.id}
                                                                            label={prq.title}
                                                                            color="info" />
                                                                    </>
                                                                })}
                                                            </Stack>
                                                        </>
                                                        :
                                                        <>
                                                            <Stack direction="column" spacing={1} >
                                                                <Chip size="small" className='preqChips' sx={{ borderRadius: "0", border: "1px solid #0f2d3e", color: "#0f2d3e" }} label={"نا موجود"} color="info" />
                                                            </Stack>
                                                        </>
                                                    }
                                                </>
                                                : undefined}
                                        </Box>
                                        <Box className='prqstgs' sx={{ overflowY: "scroll", width: { xs: "80%", sm: "100%", md: "47%" }, height: { xs: "47%", sm: "47%", md: "100%" } }} >
                                            {console.log(tags)}
                                            {tags != undefined ?
                                                <>
                                                    <p style={{ color: "#64c5ba", fontSize: "14px", marginBottom: "5px" }}>تگ های دوره:</p>
                                                    {tags.length != 0 ?
                                                        <>
                                                            <Stack direction="column" spacing={1} >
                                                                {tags.map((tag, index) => { return <Chip className='courseChips' size="small" key={index} sx={{ borderRadius: "0", border: "1px solid #64c5ba", color: "#64c5ba", textAlign: "center", fontSize: "10px", justifyItems: "center" }} label={tag} /> })}
                                                            </Stack>
                                                        </>
                                                        :
                                                        <Stack direction="column" spacing={1} >
                                                            <Chip size="small" className='courseChips' sx={{ borderRadius: "0", border: "1px solid #64c5ba", color: "#64c5ba" }} label={"نا موجود"} />
                                                        </Stack>
                                                    }
                                                </>
                                                : undefined}
                                        </Box>
                                    </Box>
                                    <Box sx={{ height: '10%' }} className={'coursePreviewFooter'}>
                                        <div style={{ display: "flex", width: "50%" }} />
                                        <div style={{ display: "flex", width: "50%", justifyContent: "flex-end", alignItems: "center", textAlign: "justify" }}>
                                            <p className='font-weight-bold text-light' style={{ margin: 0, fontSize: "12px" }}>قیمت :{product.price} تومان</p>
                                        </div>
                                    </Box>
                                </div>
                            </div>
                            <div className='getCourseButt'>
                                {globalUser.isLoggedIn == true ?
                                    <Link style={{ textDecoration: 'none', width: "100%", height: "100%" }} to={`/course-preview/${product.course_info.slug}`}>
                                        <button style={{ fontSize: "14px" }}>خرید دوره</button>
                                    </Link>
                                    :
                                    <Link style={{ textDecoration: 'none', width: "100%", height: "100%" }} to={`/auth`}>
                                        <button style={{ fontSize: "14px" }}>خرید دوره</button>
                                    </Link>
                                }
                            </div>
                        </div>
                        :
                        <><div className='text-light'><CircularProgress style={{ width: '50px', height: '50px', color: "#216966" }} /></div></>}
                </div>
            </div>
            <Footer />
        </section >
    );
}

export default ProductPreview;