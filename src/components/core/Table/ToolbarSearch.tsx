import { makeStyles, useTheme } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { defineMessages, useIntl } from "react-intl";
import {
  Box,
  BoxProps,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  TextFieldProps,
  alpha,
} from "@mui/material";
import { KeyboardEvent, MouseEvent } from "react";

const useStyles = makeStyles((theme: any) => ({
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  form: {
    width: "100% !important",
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "20px",
  },
}));

export interface ToolbarSearchProps extends BoxProps {
  value: string;
  onInputSearchChange: TextFieldProps["onChange"];
  onSearchSubmit: (
    e: KeyboardEvent | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  placeholder?: string;
  disabled?: boolean;
  inDialog?: boolean;
}

function ToolbarSearch({
  value,
  onInputSearchChange,
  onSearchSubmit,
  placeholder,
  disabled,
  inDialog,
  ...props
}: ToolbarSearchProps) {
  const classes = useStyles({ inDialog });
  const intl = useIntl();

  const messages = defineMessages({
    placeholder: {
      id: placeholder,
    },
  });

  const theme = useTheme() as any;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.secondary.main, 0.25),
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.35),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100% !important",
        [theme.breakpoints.up("sm")]: {
          marginLeft: (props: any) => (props.inDialog ? 0 : theme.spacing(3)),
          width: "auto",
        },
      }}
      {...props}
    >
      <FormControl
        disabled={disabled}
        classes={{
          root: classes.form,
        }}
      >
        <InputBase
          placeholder={
            placeholder ? intl.formatMessage(messages.placeholder) : undefined
          }
          value={value || ""}
          onChange={onInputSearchChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSearchSubmit(e);
              // to prevent accidental form submissions
              e.preventDefault();
            }
          }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          endAdornment={
            <InputAdornment position="end" style={{ margin: 0 }}>
              <IconButton onClick={onSearchSubmit} style={{ padding: "6px" }}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}

export default ToolbarSearch;
