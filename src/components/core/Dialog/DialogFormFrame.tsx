import { Dialog, DialogTitle, DialogProps } from "@mui/material";
import IntlMessages from "../IntlMessages";
import { ReactElement } from "react";

const DialogFormFrame = ({
  onClose,
  title,
  open,
  children,
}: {
  onClose: DialogProps["onClose"];
  title: string;
  open: Record<string, any> | boolean | undefined;
  children: ReactElement;
}) => {
  return (
    <Dialog
      fullWidth={true}
      open={Boolean(open)}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <IntlMessages id={title} />
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default DialogFormFrame;
