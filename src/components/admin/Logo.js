import React from 'react';

import { Link } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import banner from '../../assets/img/icarus-zlatno-banner.png';
import { dashboard } from '../../consts/routePaths';

const useStyles = makeStyles(theme => ({
    root: {
        maxHeight: '48px',
        [theme.breakpoints.up('sm')]: {
            maxHeight: '64px',
        },
    },
    imgFull: {
        maxWidth: '100%',
        maxHeight: '100%',
    }
}));

export default function ({open}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {open
                ?
                <Link to={dashboard}>
                    <img alt="" className={classes.imgFull} src={banner}/>
                </Link>
                :
                <div>
                    <h3>
                        <Link to={dashboard}>
                            <Dashboard color="secondary" />
                        </Link>
                    </h3>
                </div>
            }
        </div>
    );
}
