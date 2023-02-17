import React from 'react';

import { DialogContent, LinearProgress, Grid } from '@mui/material';

export default function DialogProgress ({progress}) {

    return(
        <div>
            <DialogContent>
                <Grid container>
                    <div className="flex-grow">
                        <LinearProgress variant="determinate" value={progress} />
                    </div>
                </Grid>
                <Grid container>
                    {progress}/100%
                </Grid>
            </DialogContent>
        </div>
    )
}
DialogProgress.propTypes = {
}