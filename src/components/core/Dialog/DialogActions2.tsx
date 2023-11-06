import {
  Button,
  ButtonProps,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

export const DialogActions2 = ({
  onClose,
  onClear,
  loading,
  submitDisabled,
  submitText,
}: {
  onClose: ButtonProps["onClick"];
  onClear?: ButtonProps["onClick"];
  loading?: boolean;
  submitDisabled?: boolean;
  submitText?: string;
}) => {
  return (
    <DialogActions>
      {loading && (
        <CircularProgress
          style={{ width: "24px", height: "24px", marginRight: "0.75rem" }}
        />
      )}

      {onClear && (
        <Button onClick={onClear}>
          <FormattedMessage id="action.clearAll" />
        </Button>
      )}
      <Button onClick={onClose} disabled={loading}>
        <FormattedMessage id="action.cancel" />
      </Button>
      <Button type="submit" disabled={loading || submitDisabled}>
        <FormattedMessage id={submitText ?? "action.submit"} />
      </Button>
    </DialogActions>
  );
};
