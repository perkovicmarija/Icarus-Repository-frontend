import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import IntlMessages from '../IntlMessages';
import { injectIntl, defineMessages  } from 'react-intl';

const styles = theme => ({
    rootWithoutLabel: {
        marginTop: '14px'
    },
    rootWithLabel: {
        marginTop: '0px'
    },
    textField: {
        height: 'unset'
    }
})

class TextFieldReport extends Component {

    /*    shouldComponentUpdate(nextProps, nextState) {
            if(this.props.value !== nextProps.value || this.props.disabled !== nextProps.disabled) {
                return true;
            }
            return false;
        }*/

    render() {
        const { classes, intl, disabled, id, label, name, value, onInputChange, placeholder, type, required } = this.props;

        const messages = defineMessages({
            placeholder: {
                id: placeholder,
            },
        });

        return (
            <TextField
                classes={label === "" ? {
                    root: classes.rootWithoutLabel, // class name, e.g. `classes-nesting-root-x`
                } : {
                    root: classes.rootWithLabel
                }}
                disabled={disabled}
                required={required}
                error={!value && required}
                id={id}
                label={label || label !== "" ? <IntlMessages id={label} /> : ""}
                value={value || ''}
                onChange={onInputChange(name)}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    classes: {
                        input: classes.textField,
                    },
                }}
                placeholder={placeholder && placeholder !== "" ? intl.formatMessage(messages.placeholder) : undefined}
                fullWidth
                margin="dense"
                helperText={!value && required ? "This is required!" : undefined}
                type={type}
            />
        )
    }
}

TextFieldReport.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.node,
    onInputChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}
export default withStyles(styles)(injectIntl(TextFieldReport));