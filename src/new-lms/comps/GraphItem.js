import { Box } from '@mui/material';
import '../style/home.css'
import DynamicCourseCard from './cards/DynamicCourseCard';

const GraphItem = ({ product, top, right, left, animationDelay, cardLeft, cardRight }) => {
    return (
        <>
            <Box className={'square'} sx={{ top: top, display: { xs: "none", md: "flex" } }}>
                <Box className={'liCircle'} sx={{ display: { xs: "none", md: "block" } }} />
            </Box>
            <Box className={'horizontalLine'} sx={{ display: { xs: "none", md: "block" }, right: right, left: left, top: top, animationDelay: `${animationDelay}s` }} />
            <DynamicCourseCard product={product} top={top} right={cardRight} left={cardLeft} position={'absolute'} />
        </>
    );
}

export default GraphItem;