import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from 'react-router-dom';
import { BG_URL, PUBLIC_URL } from '../../../utils/utils';

export default function OverLayComponent({ image, title, link }) {
    const useStyles = makeStyles((theme) => ({
        wrapper: {
            minHeight: "25vh",
            padding: '10px',
            margin: '30px 15px',
            overflow: 'hidden',
            textAlign: 'center',
            clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)',
            background: '#2f3835',
            overflow: 'hidden',
            height: '300px'
        },
        bgImage: {
            height: '10vh',
            width: '100%',
            backgroundSize: "auto 100%",
            backgroundPosition: "center",
            backgroundRepeat: 'no-repeat',
        },
    }));
    const history = useHistory();
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.bgImage} style={{ backgroundImage: BG_URL(PUBLIC_URL(image)) }}></div>
            <div style={{ margin: '10px 0px' }}>{title}</div>
            <Link to={link}>
                <div className='text-center'>
                    <button className='btn btn-md btn-success' style={{
                        clipPath: 'polygon(10px 0, 100% 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 100%, 0 10px)',
                        borderRadius:0,
                        padding: '10px 20px'
                    }} >مشاهده</button>
                </div>
            </Link>
        </div >
    )
}
