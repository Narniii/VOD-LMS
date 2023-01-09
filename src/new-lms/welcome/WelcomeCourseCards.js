import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { BG_URL, PUBLIC_URL } from '../../utils/utils'
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    courseTitle: {
        width: '100%',
        height: '50px',
        marginTop: '20px',
        fontSize: '18px',
        color: '#64c5ba',
        fontWeight:'bold',
        "@media (max-width: 576px)": {
            marginTop: '5px',
            fontSize: '18px',
            fontWeight: 'bold'
        }
    },
    courseDescription: {
        height: '64px',
        position: 'relative',
        overflow: "hidden",
        lineHeight: '21px',
        textAlign: 'justify',
        margin: '10px 0px',
        "@media (max-width: 576px)": {
            marginTop: '5px',
            fontSize: '14px',
        }
    },
    coursePassPercentage: {
        width: '100%',
        border: '2px solid #61c5ba',
        position: 'absolute',
        bottom: '20px',
        overflow: 'hidden',
        height: '15px',
        "@media (max-width: 576px)": {
            width: '90%',
            margin: '0 auto'
        }
    },
    coursePassPercentageCompletion: {
        height: '15px',
        background: '#61c5ba'
    }
}))

export default function WelcomeCourseCards({ link, bgImage, teacherFirstName, teacherlastName, title, description, passPercentage }) {
    const classes = useStyles();
    if (window.innerWidth > 576) {
        return (
            <Link to={link} className="welcome-cards" style={{ margin: '30px 30px', width: '90%', height: '200px', display: 'flex', flexDirection: 'row', clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)', background: '#2f3835', overflow: 'hidden' }}>
                <Box className="welcome-cards-images" sx={{ flex: 1, backgroundImage: BG_URL(PUBLIC_URL(bgImage)), backgroundSize: 'cover', backgroundPosition: 'center' }} />
                {teacherFirstName ?
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box>
                            <Typography style={{ fontSize: '16px' }}>مدرس دوره</Typography>
                            <Typography style={{ fontSize: '12px', color: '#817e7b' }}>{teacherFirstName}&nbsp;{teacherlastName}</Typography>
                        </Box>
                    </Box >
                    :
                    undefined
                }
                <Box sx={{ flex: 2, height: '200px', position: 'relative', padding: '10px 20px' }}>
                    <div className={classes.courseTitle}>{title}</div>
                    <div className={classes.courseDescription}>
                        {description.length > 100 ? description.substring(0, 200) + "..." : description}
                    </div>
                    {passPercentage ?
                        <div className={classes.coursePassPercentage}>
                            <div className={classes.coursePassPercentageCompletion} style={{ width: `${passPercentage}%` }} />
                        </div>
                        : undefined}
                </Box >
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                </Box >
            </Link>
        )
    }
    else {
        return <Link to={link} className="welcome-cards" style={{ margin: '50px auto', width: '90%', height: '400px', display: 'flex', flexDirection: 'column', clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)', background: '#2f3835', overflow: 'hidden' }}>
            <Box sx={{ flex: 2, backgroundImage: BG_URL(PUBLIC_URL(bgImage)), backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }} />
            <Box sx={{ flex: 2, height: '200px', position: 'relative', padding: '10px 10px' }}>
                <div className={classes.courseTitle}>{title}</div>
                <div className={classes.courseDescription}>
                    {description.length > 100 ? description.substring(0, 200) + "..." : description}
                </div>
                {teacherFirstName ?
                    <Box>
                        <Typography style={{ fontSize: '14px' }}>مدرس دوره:&nbsp;
                            <Typography style={{ fontSize: '12px', color: '#817e7b', display: 'inline-block' }}>{teacherFirstName}&nbsp;{teacherlastName}</Typography>
                        </Typography>
                    </Box>
                    :
                    undefined
                }
                {passPercentage ?
                    <div className={classes.coursePassPercentage}>
                        <div className={classes.coursePassPercentageCompletion} style={{ width: `${passPercentage}%` }} />
                    </div>
                    : undefined}
            </Box >
            {/* <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            </Box > */}
        </Link>
    }
}
