import React from 'react';

import { Switch, FormGroup,FormControlLabel  } from '@mui/material';

function SwitchCustom(props) {
    const {disabled, value, onSwitchChange, name} = props;
    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch
                        disabled={disabled}
                        checked={value ? value : false}
                        onChange={onSwitchChange(name)}
                        value={name}
                    />
                }
                label=""
            />
        </FormGroup>

    )
}

SwitchCustom.propTypes = {
    //myProp: PropTypes.string.isRequired
}

export default SwitchCustom;