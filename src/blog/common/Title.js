    import React from 'react'
    import { makeStyles } from '@material-ui/core/styles';

    const useStyles = makeStyles((theme) => ({
        title: {
            textAlign: 'center',
            borderTop: '1px solid #64c5ba',
            borderBottom: '1px solid #64c5ba',
            padding:'10px 0px',
            color:'black'
        },

    }));

    export default function Title(props) {
        const classes = useStyles();

        return (
            <h4 className={classes.title}>{props.text}</h4>

        )
    }
