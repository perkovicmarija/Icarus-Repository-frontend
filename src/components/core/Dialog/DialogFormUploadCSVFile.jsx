import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import {DialogActions, DialogContent} from '@mui/material';
import IntlMessages from '../../../components/core/IntlMessages';
import Grid from '@mui/material/Grid';
import DropzoneCustom from "../Dropzone/DropzoneCustom";
import TextFiledReport from "../TextField/TextFiledReport";
import TypographyFieldTitle from "../TypographyFieldTitle";

const styles = theme => ({
    container: {
        marginTop: theme.spacing(2)
    },
    explanation: {
        fontWeight: 'bold'
    }
});

class DialogFormUploadCSVFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attachment: {
                description: undefined,
                filename: undefined
            },
            file: {}
        };
    }
    onFileDrop = (file) => {
        if(file && file.length > 0) {
            let selectedFile = file[0];
            let attachment = Object.assign({}, this.state.attachment);
            attachment.filename = selectedFile.name;
            this.setState({file: selectedFile, attachment})
        }
    }
    onInputChange = name => event => {
        let attachment = Object.assign({}, this.state.attachment);
        attachment[name] = event.target.value;
        return this.setState({attachment})
    };
    onSubmit = () => {
        this.props.onSubmit(this.state.file, this.state.attachment);
    }
    render() {
        const {onClose, classes} = this.props;
        const {attachment} = this.state;
        return (
            <div>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <p className={classes.explanation}><IntlMessages id="training.exam.questionBank.importQuestion.typeOfFileQuestion" />?</p>
                                <p><IntlMessages id="training.exam.questionBank.importQuestion.typeOfFile" /></p>
                            </Grid>
                            <Grid item xs={12}>
                                <p className={classes.explanation}><IntlMessages id="training.exam.questionBank.importQuestion.fileContent" />?</p>
                                <p><IntlMessages id="qms.audits.checklist.import.fileContentExplanation" /></p>
                            </Grid>
                            <Grid item xs={12}>
                                <p className={classes.explanation}><IntlMessages id="training.exam.questionBank.importQuestion.example" />:</p>
                                <p><IntlMessages id="training.exam.questionBank.importQuestion.exampleExplanation" /></p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.container}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <DropzoneCustom
                                onFileDrop={this.onFileDrop}
                                disabled={false}
                                title="attachments.dropzone"
                                maxSize={10485760}
                                maxSizeMb="10MB"
                                files={[]}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.container}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <TypographyFieldTitle title="attachments.filename"/>
                            <TextFiledReport
                                disabled={true}
                                id="filename"
                                label=""
                                name="filename"
                                value={attachment.filename}
                                onInputChange={this.onInputChange}
                                placeholder=""
                                type="text"/>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        <IntlMessages id="action.close" />
                    </Button>
                    <Button onClick={this.onSubmit} className="uppercase">
                        <IntlMessages id="action.add" />
                    </Button>
                </DialogActions>
            </div>
        )
    }
}

DialogFormUploadCSVFile.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles)(DialogFormUploadCSVFile);