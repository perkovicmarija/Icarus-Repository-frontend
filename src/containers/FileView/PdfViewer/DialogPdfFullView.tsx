import React from "react";
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  SlideProps,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PdfFrame from "./PdfFrame";

const Transition = React.forwardRef<any, SlideProps>(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogPdfFullView({
  open,
  onClose,
  file,
  filename,
  showDownloadButton,
  onDownloadClick,
}: any) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        style: {},
      }}
    >
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {filename}
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          backgroundColor: "#808080",
        }}
      >
        <PdfFrame
          file={file}
          showDownloadButton={showDownloadButton}
          onDownloadClick={onDownloadClick}
        />
      </div>
    </Dialog>
  );
}

export default DialogPdfFullView;
