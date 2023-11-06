import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

function DialogDelete2<T>({
  onClose,
  onSubmit,
  data,
  text,
  disabled,
}: {
  data: T;
  onClose: () => void;
  onSubmit: (data: T) => void;
  text?: string;
  disabled?: boolean;
}) {
  return (
    <Dialog
      fullWidth={true}
      open={Boolean(data)}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage id="general.delete" />
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2" gutterBottom>
          <FormattedMessage id={text ?? "general.deleteWarning"} />
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onSubmit(data);
            onClose();
          }}
          disabled={disabled}
        >
          <FormattedMessage id="action.delete" />
        </Button>
        <Button onClick={onClose} disabled={disabled}>
          <FormattedMessage id="action.cancel" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { DialogDelete2 };
