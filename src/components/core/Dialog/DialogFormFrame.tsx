import { Dialog, DialogTitle, DialogProps } from "@mui/material";
import IntlMessages from "../IntlMessages";
import { ReactElement } from "react";

const DialogFormFrame = ({
  onClose,
  title,
  open,
  children,
  maxWidth,
  formComponent
}: {
  onClose: DialogProps["onClose"];
  title: string;
  open: Record<string, any> | boolean | undefined;
  children: ReactElement;
  formComponent: ReactElement;
  maxWidth?: DialogProps["maxWidth"];
}) => {
  if (!open) {
    return null;
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={maxWidth}
      open={Boolean(open)}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <IntlMessages id={title} />
      </DialogTitle>
      {formComponent}
      {children}
    </Dialog>
  );
};

export default DialogFormFrame;
