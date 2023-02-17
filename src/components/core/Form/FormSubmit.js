import React from 'react';

import { Grid, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';

import IntlMessages from '../IntlMessages';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    container: {
        marginTop: theme.spacing(2)
    },
}));

function FormSubmit(props) {
    const classes = useStyles();

    const {handleCancel} = props;
    return (
        <Grid container className={classes.container} justify="center">
            <Grid item>
                <Button type="submit" variant="contained" size="large" color="secondary" className={classes.button}>
                    <IntlMessages id="action.submit" />
                </Button>
                <Button variant="contained" size="large" color="primary" className={classes.button}
                        onClick={handleCancel}>
                    <IntlMessages id="action.cancel" />
                </Button>
            </Grid>
        </Grid>
    )
}
export default FormSubmit;