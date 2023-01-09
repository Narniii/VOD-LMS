import '../style/home.css'
import { makeStyles } from '@material-ui/core/styles';
// import makeStyles from '@material-ui/core';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
// import dynamic from "next/dynamic"
import { Box, Input } from '@mui/material';
import Map from './Map/index'

// const Map = dynamic(() => import("../Map/index"), { ssr: false })


const useStyles = makeStyles((theme) => ({
    border: {
        width: "3px",
        height: "100%",
        background: "rgb(100, 197, 186)",
        background: "linear-gradient(180deg,rgba(100, 197, 186, 1) 0%,rgba(98, 198, 186, 0.061239461604954526) 100%)",
        [theme.breakpoints.down('sm')]: {
            margin: "10px auto",
            width: '100%',
            height: '4px',
            background: "linear-gradient(90deg,rgba(100, 197, 186, 1) 0%,rgba(98, 198, 186, 0.061239461604954526) 100%)",

        },
    },
}));

const ContactUs = () => {
    const classes = useStyles()

    return (
        <div className={'contactUs'} id='contact-us'>
            <div className={'contactUsTitle'}><h1>تماس با ما</h1></div>
            <Box sx={{ flexDirection: { xs: "column", md: "row" }, width: { xs: "300px", md: "70%" }, height: { xs: "70%", md: "200px" } }} className={'contactsWrapper'}>
                <div className={'contacts'}>
                    <PhoneEnabledOutlinedIcon color='info' />
                    <p style={{ color: "#ffffff" }}>تلفن</p>
                    <p>021-44207988</p>
                </div>
                <div className={classes.border} />
                <div className={'contacts'}>
                    <LocationOnOutlinedIcon color='info' />
                    <p style={{ color: "#ffffff" }}>آدرس</p>
                    <p style={{ fontSize: "12px" }}>شهرک آزمایش، بزرگراه یادگار امام، ایثار، نامدار ششم، پلاک ۲ واحد۳ طبقه۲</p>
                </div>
                <div className={classes.border} />
                <div className={'contacts'}>
                    <MailOutlinedIcon color='info' />
                    <p style={{ color: "#ffffff" }}>ایمیل</p>
                    <p>aquaex@gmail.com</p>
                </div>
            </Box>
            {/* <div className={EmailUs}>
                <Input
                    id="standard-input"
                    name="email"
                    placeholder="ایمیل"
                    color='secondary'
                    sx={{ textAlign: "justify", width:"100%" }}
                />
                <TextField placeholder='پیام' id="standard-textarea" color='primary' variant='filled' type="string" sx={{textAlign:"justify",width:"100%",height:"50%"}} />
            </div> */}
            <Map />
        </div>

    );
}

export default ContactUs;