import React from 'react';
import Button from '@mui/material/Button';
import {DialogActions, DialogContent} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IntlMessages from '../../../components/core/IntlMessages';
import FormFieldTitle from '../Typography/FormFieldTitle';
import Grid from '@mui/material/Grid';

const DialogFormExportData = (props) => {

    const {
        radioValue,
        onClose,
        onSubmit,
        onRadioChange
    } = props;

    return(
        <div>
            <DialogContent>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <FormFieldTitle title="general.exportAs" />
                        <RadioGroup
                            aria-label="Export as"
                            name="gender1"
                            value={radioValue}
                            onChange={onRadioChange}
                        >
                            <FormControlLabel value="pdf" control={<Radio />} label={<IntlMessages id="format.pdf" />} />
                            <FormControlLabel value="excel" control={<Radio />} label={<IntlMessages id="format.excel" />} />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    <IntlMessages id="action.cancel" />
                </Button>
                <Button onClick={onSubmit} className="uppercase">
                    <IntlMessages id="action.download" />
                </Button>
            </DialogActions>
        </div>
    )
}

export default DialogFormExportData;