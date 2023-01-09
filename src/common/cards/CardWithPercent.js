import { makeStyles, Paper } from '@material-ui/core';
import { Rating } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { BG_URL, PUBLIC_URL } from '../../utils/utils';
const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        minHeight: '28vh',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        position: 'relative',
        margin: '10px 20px',
        [theme.breakpoints.down('xs')]: {
            width: '95%',
            minHeight: '40vh',
            margin: '20px 0px',
        },
        [theme.breakpoints.between('xs', 'md')]: {
            minHeight: '40vh',
            margin: '20px 0px',

        },
    },
    courseThumbnail: {
        width: '99%',
        height: '200px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px'
    },
    progressWrapper: {
        position: "absolute",
        bottom: "-30px",
        left: "-35px",
    },
    progressImage: {
        width: "70px",
    },
    imageAndTxtWrapper: {
        position: "relative",
    },
    progressPercentage: {
        position: "absolute",
        top: " 50%",
        left: " 50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "Spartan !important",
        fontSize: "12px",
        color: "#1d5643",
        fontWeight: 400,
    },
}))
export default function CardWithPercent({ link, user, bgImage, title, percentage }) {
    const classes = useStyles();
    return <Paper className={classes.card} elevation={2}>
        <Link to={link} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundImage: BG_URL(PUBLIC_URL(bgImage)) }} className={classes.courseThumbnail} />
            <div style={{ padding: '10px' }} className="text-dark" >
                {title.length > 30 ?
                    <div>{title.substring(0, 30) + "..."}</div> :
                    <div>{title}</div>
                }
                <div className={classes.progressWrapper}>
                    <div className={classes.imageAndTxtWrapper}>
                        <img className={classes.progressImage} src={PUBLIC_URL("images/academy/darsad-placeholder.svg")} />
                        <div className={classes.progressPercentage} >
                            {percentage}
                            %
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </Paper >;
}
