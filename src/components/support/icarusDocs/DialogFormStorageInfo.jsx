import React from 'react';
import {Box, DialogActions, DialogContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IntlMessages from "../../core/IntlMessages";
import PropTypes from "prop-types";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

export default function DialogFormStorageInfo ({onClose, storageInfo}) {

    return(
        <React.Fragment>
            <DialogContent>
                <Box p={2} border={2} borderRadius={8} borderColor="secondary.main">
                    <Box>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box fontSize={13} color="primary.main" fontWeight={500}>
                                    Documentation size: {storageInfo.documentSizeReadable ? storageInfo.documentSizeReadable  : "N/A"}
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box fontSize={13} color="primary.main" fontWeight={500}>
                                    Attachments size: {storageInfo.attachmentSizeReadable ? storageInfo.attachmentSizeReadable  : "N/A"}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box pt={2}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box fontSize={15} color="secondary.dark" fontWeight={500}>
                                    Total storage
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box fontSize={15} color="secondary.dark" fontWeight={600}>
                                    {storageInfo.totalStorageTakenReadable ? storageInfo.totalStorageTakenReadable  : "N/A"} of 20 GB
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <LinearProgressWithLabel value={storageInfo.totalStorageTakenPercentage ? storageInfo.totalStorageTakenPercentage  : 0} />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    <IntlMessages id="action.close" />
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}
DialogFormStorageInfo.propTypes = {
    onClose: PropTypes.func.isRequired,
}