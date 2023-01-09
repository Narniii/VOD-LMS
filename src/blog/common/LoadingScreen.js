import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Skeleton } from "@mui/material";
import { Paper } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    loadingScreen: {
        display: 'flex',
        flex: 1,
        height: '80vh',
        alignItems: "center",
        justifyContent: "center",
    },
}));

export default function LoadingScreen(props) {
    const classes = useStyles();

    return (
        <div className={classes.loadingScreen}>
            <Paper style={{ width: '80%', height: '65vh', padding: 20 }} elevation={4}>
                <div>
                    <Skeleton variant="rectangular" width={'60%'} height={150} style={{ borderRadius: '10px', margin: '0 auto' }} />
                    <Skeleton variant="text" height={100} width={'80%'} style={{ borderRadius: '10px', margin: '0 auto' }} />
                    <Skeleton variant="text" height={40} width={'60%'} style={{ borderRadius: '10px', margin: '0 auto' }} />
                    <Skeleton variant="text" height={100} width={'80%'} style={{ borderRadius: '10px', margin: '0 auto' }} />

                </div>
            </Paper >

        </div >


    )
}
