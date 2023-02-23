import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {DialogActions, DialogContent, Table, TableBody, TableHead, TableRow, TableCell} from '@mui/material';
import IntlMessages from '../../core/IntlMessages';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';

const DialogFormRevisions = (props) => {

    const {
        revisions,
        handleViewChecklist,
        onClose
    } = props;

    return(
        <div>
            <DialogContent>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> <IntlMessages id="general.active"/></TableCell>
                                    <TableCell> <IntlMessages id="documentation.revision"/> </TableCell>
                                    <TableCell> <IntlMessages id="general.abbreviation"/> </TableCell>
                                    <TableCell> <IntlMessages id="general.actions"/> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {revisions.map(item => {
                                    return (
                                        <TableRow>
                                            <TableCell>{item.active ? <strong><IntlMessages id="general.yes"/></strong> : <IntlMessages id="general.no"/>}</TableCell>
                                            <TableCell>{item.version}</TableCell>
                                            <TableCell>{item.abbreviation}</TableCell>
                                            <TableCell>
                                                <IconButton aria-label="View"
                                                            onClick={() => handleViewChecklist(item)}>
                                                    <Visibility/>
                                                </IconButton>
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    <IntlMessages id="action.close" />
                </Button>
            </DialogActions>
        </div>
    )
}
DialogFormRevisions.propTypes = {
    onClose: PropTypes.func.isRequired,
    revisions: PropTypes.array.isRequired,
}

export default DialogFormRevisions;