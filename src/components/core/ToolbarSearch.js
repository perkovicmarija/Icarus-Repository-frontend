import React from 'react';

import { Search } from '@mui/icons-material';
import { InputBase, InputAdornment, IconButton, FormControl } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import { injectIntl, defineMessages  } from 'react-intl';

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
        '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.35),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100% !important',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    form: {
        width: '100% !important'
    },
    inputInput: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '100%',
        /*        [theme.breakpoints.up('md')]: {
                    width: 200,
                },*/
    },
}));

function ToolbarSearch(props) {
    const classes = useStyles();

    const {value, onInputSearchChange, onSearchSubmit, placeholder, intl} = props;

    const messages = defineMessages({
        placeholder: {
            id: placeholder,
        },
    });

    return (
        <div className={classes.search}>
            <FormControl classes={{
                root: classes.form,
            }}>
                <InputBase
                    placeholder={placeholder && placeholder !== "" ? intl.formatMessage(messages.placeholder) : undefined}
                    value={value || ''}
                    onChange={onInputSearchChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            onSearchSubmit(e)
                        }}}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility"
                                onClick={onSearchSubmit}
                            >
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    )
}

ToolbarSearch.propTypes = {
};

export default injectIntl(ToolbarSearch);