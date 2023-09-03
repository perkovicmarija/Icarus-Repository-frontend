import React from 'react';
import PropTypes from 'prop-types';
import {DialogActions, DialogContent, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import IntlMessages from "../../core/IntlMessages";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";

export default function DialogFormNewFolder ({documentationFileRevisions, onClose}) {

    return(
        <div>
            <DialogContent>
                <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><IntlMessages id="documentation.revision" /></TableCell>
                                    <TableCell><IntlMessages id="documentation.revision.date" /></TableCell>
                                    <TableCell><IntlMessages id="documentation.approved.date" /></TableCell>
                                    <TableCell><IntlMessages id="promotion.news.notification" /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {documentationFileRevisions.map(revision => {
                                    return (
                                        <TableRow>
                                            <TableCell>{revision.revision}</TableCell>
                                            <TableCell>{revision.dateRevisionFormatted}</TableCell>
                                            <TableCell>{revision.dateApprovedFormatted}</TableCell>
                                            {revision.messageNotifications && revision.messageNotifications.length > 0 ?
                                                <TableCell>
                                                    {revision.messageNotifications.map(messageBoard => {
                                                        return (
                                                            <Link to={"/dashboard/promotion/messageBoardDetails/" + messageBoard.messageBoardId}>{messageBoard.messageBoardIdSign + " - " + messageBoard.title}</Link>
                                                        )
                                                    })}
                                                </TableCell> :
                                                <TableCell>-</TableCell>
                                            }
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
DialogFormNewFolder.propTypes = {
    onClose: PropTypes.func.isRequired,
    documentationFileRevisions: PropTypes.array.isRequired,
}