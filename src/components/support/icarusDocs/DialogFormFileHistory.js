import React from 'react';
import PropTypes from 'prop-types';
import IntlMessages from "../../core/IntlMessages";
import {DialogActions, DialogContent, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DialogTitleWithExport from "../../core/Dialog/DialogTitleWithExport";


export default function DialogFormNewFolder ({documentationFileHistory, onClose, title, onExportClick}) {

    return(
        <React.Fragment>
            <DialogTitleWithExport
                onExportClick={onExportClick}
            >
                <IntlMessages id={title} />
            </DialogTitleWithExport>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><IntlMessages id="documentation.download.user" /></TableCell>
                                    <TableCell><IntlMessages id="general.date" /></TableCell>
                                    <TableCell><IntlMessages id="documentation.revision" /></TableCell>
                                    <TableCell><IntlMessages id="documentation.revision.date" /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {documentationFileHistory.map(fileHistory => {
                                    return (
                                        <TableRow>
                                            <TableCell>{fileHistory.user.fullName}</TableCell>
                                            <TableCell>{fileHistory.dateDownloadedFormatted}</TableCell>
                                            <TableCell>{fileHistory.documentationFileRevision ? fileHistory.documentationFileRevision.revision : "-"}</TableCell>
                                            <TableCell>{fileHistory.documentationFileRevision ? fileHistory.documentationFileRevision.dateRevisionFormatted : "-"}</TableCell>
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
        </React.Fragment>
    )
}
DialogFormNewFolder.propTypes = {
    onClose: PropTypes.func.isRequired,
    documentationFileHistory: PropTypes.array.isRequired,
}