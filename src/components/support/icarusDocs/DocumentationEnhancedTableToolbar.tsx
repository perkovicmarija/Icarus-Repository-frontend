import { makeStyles } from "@mui/styles";
import IntlMessages from "../../core/IntlMessages";
import {
  Toolbar,
  Typography,
} from "@mui/material";
import ToolbarSearch from "../../core/ToolbarSearch";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(1),
  },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    flex: "0 0 auto",
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
}));

function DocumentationEnhancedTableToolbar(props) {
  const classes = useStyles();

  const {
    searchValue,
    onInputSearchChange,
    onSearchSubmit,
    searchPlaceholder,
    titleLabel,
  } = props;

  return (
    <Toolbar className={classNames(classes.root)}>
      <div className={classes.title}>
        <Typography variant="h6">
          <IntlMessages id={titleLabel} />
        </Typography>
      </div>

      <ToolbarSearch
        value={searchValue}
        onInputSearchChange={onInputSearchChange}
        onSearchSubmit={onSearchSubmit}
        placeholder={searchPlaceholder}
      />
    </Toolbar>
  );
}

DocumentationEnhancedTableToolbar.propTypes = {};
export default DocumentationEnhancedTableToolbar;
