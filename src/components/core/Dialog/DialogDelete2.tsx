import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
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
  onSubmit: (data: NonNullable<T>) => any;
  text?: string;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);

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
            setLoading(true);
            onSubmit(data!)
              .then(onClose)
              .catch(() => setLoading(false));
          }}
          disabled={disabled || loading}
        >
          <FormattedMessage id="general.delete" />
        </Button>
        <Button onClick={onClose} disabled={disabled || loading}>
          <FormattedMessage id="action.cancel" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { DialogDelete2 };
