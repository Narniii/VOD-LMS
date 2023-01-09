import '../../style/home.css'
import moment from 'jalali-moment'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const DynamicCourseCard = ({ product, top, left, right, position }) => {
    const day = moment(product.course_info.publish_time, 'YYYY/MM/DD').locale('fa').format('dddd ')
    const month = moment(product.course_info.publish_time, 'YYYY/MM/DD').locale('fa').format('MMM')
    const year = moment(product.course_info.publish_time, 'YYYY/MM/DD').locale('fa').format('yyyy ')
    const preqs = product.course_info.prerequisites
    const [level, setLevel] = useState(undefined)
    useEffect(() => {
        if (product != undefined) {
            if (product.course_info.level == 'Deep') { setLevel('عمیق') }
            else if (product.course_info.level == 'Practical') { setLevel('عملی') }
            else if (product.course_info.level == 'Conceptual') { setLevel('مفهومی') }
            else { setLevel(undefined) }
        }

    }, [product])
    // console.log(product)
    if (product != undefined) {
        return (
            <Box className={'outerAbsoluteCard'} sx={{ position: position, weidth: { xs: "100%", md: "250px" }, top: top, left: { xs: undefined, md: left }, right: { xs: undefined, md: right } }}>
                <div className={'courseCard'}>
                    <div className={'visible'}>
                        <div className={'courseImageHolder'}>
                            <img src={`https://api.aqua.ir:8283/${product.course_info.image}`} style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                    <div className={'courseContentHolder'}>
                        {/* <img src="/svg/ex.svg" style={{ visibility: "hidden" }} /> */}
                        <div className={'courseContent'}>
                            <h6 className='text-light font-weight-bold'>"{product.course_info.title}"</h6>
                            <p className={'shortDescription'}>{product.course_info.short_description}</p>
                            {level != undefined ? <p style={{ textShadow: "0 0 2px #144047, 0 0 2px #144047" }} className='font-weight-light'>سطح دوره : {level}</p> : undefined}
                            <p className={'publishTime'}> انتشار یافته در{month}&nbsp;{year} توسط بیتداد</p>
                            <h6 className='font-weight-bold'>قیمت :{product.price} تومان</h6>
                        </div>
                    </div>
                    <div className={'getCourseBut'}>
                        <Link to={`/courses/${product.id}`}>
                            <p>نمایش دوره</p>
                        </Link>
                    </div>
                </div>
            </Box>

        );
    }
}

export default DynamicCourseCard;