import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { PUBLIC_URL } from '../../utils/utils';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    menuButtonImage: {
        [theme.breakpoints.down('xs')]: {
            width: '25%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '20%',

        },
        "@media (min-width: 1000px)": {
            width: '20%',
        },
        "@media (min-width: 1280px)": {
            width: '10%',
        },
    },
    drawerLinks: {
        textDecoration: 'none',
        color: 'black',
        textAlign: 'center !important',
        margin: '0 auto'

    }
}));

export default function MobileDrawer() {
    const [state, setState] = React.useState({
        bottom: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button divider >
                    <Link className={classes.drawerLinks} to='/'>خانه</Link>
                </ListItem>
                <ListItem button divider >
                    <Link className={classes.drawerLinks} to='/about-us'>درباره ما</Link>
                </ListItem>
                <ListItem button divider>
                    <Link className={classes.drawerLinks} to='/academy'>آکادمی</Link>
                </ListItem>
                <ListItem button divider>
                    <Link className={classes.drawerLinks} to='/login'>ورود</Link>
                </ListItem>
                <ListItem button divider>
                    <Link className={classes.drawerLinks} to='/signup'>عضویت</Link>
                </ListItem>
                <ListItem button divider>
                    <Link className={classes.drawerLinks} to='/welcome'>داشبورد</Link>
                </ListItem>
                <ListItem button>
                    <Link className={classes.drawerLinks} to='/blog'>وبلاگ</Link>
                </ListItem>
            </List>
            <Divider />

        </Box>
    );
    const classes = useStyles();

    return (
        <div style={{ color: 'black' }}>
            {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <img className={classes.menuButtonImage} src={PUBLIC_URL('images/abc.svg')} onClick={toggleDrawer(anchor, true)} />
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}