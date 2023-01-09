import { makeStyles, Paper } from '@material-ui/core';
import { Rating } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { BG_URL, PUBLIC_URL } from '../../utils/utils';
const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        minHeight: '28vh',
        margin: '10px 0px',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            minHeight: '40vh',
            marginBottom: '20px',
        },
        [theme.breakpoints.between('xs', 'md')]: {
            width: '100%',
            minHeight: '40vh',
            marginBottom: '20px',
        },
    },
    courseThumbnail: {
        width: '100%',
        height: '150px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
    },
}))
export default function CourseAndQuizCards({ link, user, bgImage, title, meanscore, toNftButton }) {
    const classes = useStyles();
    return <Paper className={classes.card} elevation={2}>
        <Link className="text-dark" to={link} style={{ textDecoration: 'none', height: '100%' }}>
            <div style={{ backgroundImage: BG_URL(PUBLIC_URL(bgImage)) }} className={classes.courseThumbnail} />
            <div style={{ padding: '10px' }}>
                {title.length > 100 ?
                    <div style={{ height: '50px' }}>{title.substring(0, 100) + "..."}</div> :
                    <div style={{ height: '50px' }}>{title}</div>
                }
                <div style={{ color: 'red', fontSize: '12px',opacity:0 }}>
                    <span style={{ color: 'black' }}>قفل شده تا تاریخ: </span>
                    {/* {day}،{month}&nbsp;{year} */}
                </div>
                {toNftButton}
            </div>
        </Link>
    </Paper >;
}
