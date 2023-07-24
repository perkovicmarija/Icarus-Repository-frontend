import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
    },
    wrap: {
        whiteSpace: 'pre-line'
    }
}));

function SupportLogTrails(props) {
    const classes = useStyles();

    const {logTrails} = props;
    return (
        <div className={classes.root}>
            {logTrails.map(item => {
                return (
                    <Card key={item.supportSoftwareLogId}
                          sx={{ minWidth: 275, mb: '10px' }}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {item.dateFormatted}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography variant="body2">
                            {item.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Show more</Button>
                      </CardActions>
                    </Card>
                )
            })}
        </div>
    )
}

export default SupportLogTrails;