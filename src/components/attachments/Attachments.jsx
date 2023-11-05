import React, { Component } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from "@mui/material";
import { VerticalAlignBottom, Delete } from "@mui/icons-material";
import { withStyles } from "@mui/styles";

import DialogFormAttachFile from "./DialogFormAttachFile";
import DialogFormFrame from "../core/Dialog/DialogFormFrame";
import DialogGenericWarning from "../core/Dialog/DialogGenericWarning";
import IntlMessages from "../core/IntlMessages";
import TableToolbar2 from "../core/Table/TableToolbar2";

const styles = (theme) => ({
  thActions: {
    width: "1px",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
});

class Attachments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogAttachNewOpen: false,
      dialogWarningOpen: false,
    };
  }

  onNewClick = () => {
    this.setState({ dialogAttachNewOpen: true });
  };

  handleAttacheNewClose = () => {
    this.setState({ dialogAttachNewOpen: false });
  };

  handleAttacheNewSubmit = (file, attachment) => {
    this.setState({ dialogAttachNewOpen: false });
    for (let i = 0, l = this.props.attachments.length; i < l; i++) {
      if (this.props.attachments[i].filename === attachment.filename) {
        this.setState({ dialogWarningOpen: true });
        return;
      }
    }
    this.props.onNewAttachSubmit(file, attachment);
  };

  handleDialogWarningClose = () => {
    this.setState({ dialogWarningOpen: false });
  };

  render() {
    const {
      classes,
      attachments,
      editDisabled,
      onAttachDownload,
      onAttachDelete,
    } = this.props;
    const { dialogAttachNewOpen, dialogWarningOpen } = this.state;
    return (
      <div>
        <TableToolbar2 title="attachments.label" onAddClick={this.onNewClick} />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="none">
                <IntlMessages id="general.filename" />
              </TableCell>
              <TableCell>
                <IntlMessages id="general.description" />
              </TableCell>
              <TableCell
                classes={{ root: classes.thActions }}
                key="Actions"
                padding="default"
              >
                <IntlMessages id="general.actions" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attachments.map((attachment) => {
              return (
                <TableRow key={attachment.filename}>
                  <TableCell padding="none">{attachment.filename}</TableCell>
                  <TableCell>{attachment.description}</TableCell>
                  <TableCell className="nostretch">
                    <Tooltip title={<IntlMessages id="general.download" />}>
                      <>
                        <div className="d-inline">
                          <IconButton
                            disabled={!editDisabled}
                            aria-label="Edit"
                            onClick={(event) =>
                              onAttachDownload(event, attachment)
                            }
                          >
                            <VerticalAlignBottom />
                          </IconButton>
                        </div>
                      </>
                    </Tooltip>
                    <Tooltip title={<IntlMessages id="general.delete" />}>
                      <>
                        <div className="d-inline">
                          <IconButton
                            disabled={editDisabled}
                            aria-label="Delete"
                            onClick={(event) =>
                              onAttachDelete(event, attachment)
                            }
                          >
                            <Delete />
                          </IconButton>
                        </div>
                      </>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <DialogFormFrame
          onClose={this.handleAttacheNewClose}
          title="attachments.label"
          open={dialogAttachNewOpen}
        >
          <DialogFormAttachFile
            onClose={this.handleAttacheNewClose}
            onSubmit={this.handleAttacheNewSubmit}
          />
        </DialogFormFrame>
        <DialogGenericWarning
          open={dialogWarningOpen}
          onClose={this.handleDialogWarningClose}
          text="attachments.duplicates.warning"
        />
      </div>
    );
  }
}

export default withStyles(styles)(Attachments);
