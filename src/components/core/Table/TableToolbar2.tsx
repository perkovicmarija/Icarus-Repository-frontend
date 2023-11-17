import { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import NoteAdd from "@mui/icons-material/NoteAdd";
import Help from "@mui/icons-material/Help";
import ExportIcon from "@mui/icons-material/SaveAlt";
import ViewColumn from "@mui/icons-material/ViewColumn";
import FilterIconCustom from "../FilterIconCustom";
import ToolbarSearch from "./ToolbarSearch";
import More from "@mui/icons-material/MoreVert";
import Notifications from "@mui/icons-material/Notifications";
import CloudUpload from "@mui/icons-material/CloudUpload";
import { isEqual } from "lodash";
import {
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Tooltip,
  AppBar,
  IconButton,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme: any) => ({
  appBar: {
    padding: "1rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0.75rem 0.75rem",
    },
  },
  title: {
    flex: "0 0 auto",
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
  },
}));

export interface TableToolbar2Props {
  title: string;
  //
  filters?: any;
  onSearchSubmit?: any;
  searchPlaceholder?: any;
  searchTextPropKey?: any;
  searchToolbarStyle?: any;
  //
  onColumnEditClick?: any;
  tooltipColumnEdit?: any;
  //
  onAddClick?: any;
  tooltipAdd?: any;
  addMenuOptions?: any;
  //
  onExportClick?: any;
  tooltipExport?: any;
  //
  onImportClick?: any;
  //
  onHelpClick?: any;
  tooltipHelp?: any;
  //
  onMoreClick?: any;
  tooltipMore?: any;
  //
  onNotifyAllClick?: any;
  tooltipNotifyAll?: any;
  //
  onFilterClick?: any;
  initFilters?: any;
  //
  customItems?: any[];
  //
  toolbarStyle?: any;
}

function TableToolbar2({
  title,
  //
  filters,
  onSearchSubmit,
  searchPlaceholder,
  searchTextPropKey,
  searchToolbarStyle,
  //
  onColumnEditClick,
  tooltipColumnEdit,
  //
  onAddClick,
  tooltipAdd,
  addMenuOptions,
  //
  onExportClick,
  tooltipExport,
  //
  onImportClick,
  //
  onHelpClick,
  tooltipHelp,
  //
  onMoreClick,
  tooltipMore,
  //
  onNotifyAllClick,
  tooltipNotifyAll,
  //
  onFilterClick,
  initFilters,
  //
  customItems,
  //
  toolbarStyle,
}: TableToolbar2Props) {
  const classes = useStyles();

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (!onSearchSubmit) {
      return;
    }
    setSearchText(filters[searchTextPropKey]);
  }, [filters]);
  const handleSearchSubmit = () => {
    onSearchSubmit({ [searchTextPropKey]: searchText });
  };

  const filtersActive = useMemo(() => {
    if (!filters || !initFilters) {
      return false;
    }
    for (const key of Object.keys(initFilters)) {
      if (!isEqual(initFilters[key], filters[key])) {
        return true;
      }
    }
    return false;
  }, [filters, initFilters]);

  const [anchorEl, setAnchorEl] = useState(null);
  const onAddMenuClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const onAddMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar
        style={{
          columnGap: "1rem",
          rowGap: "0.25rem",
          paddingLeft: "0",
          paddingRight: "0",
          flexWrap: "wrap",
          minHeight: 0,
          ...toolbarStyle,
        }}
      >
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            columnGap: "1.25rem",
            rowGap: "0.25rem",
            minHeight: "40px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {title && (
            <div className={classes.title}>
              <Typography variant="h6">
                <FormattedMessage id={title} />
              </Typography>
            </div>
          )}
          {onSearchSubmit && (
            <ToolbarSearch
              value={searchText}
              onInputSearchChange={(e: any) => setSearchText(e.target.value)}
              onSearchSubmit={handleSearchSubmit}
              placeholder={searchPlaceholder}
              style={{
                maxWidth: "325px",
                height: "36px",
                margin: 0,
                ...searchToolbarStyle,
              }}
            />
          )}
        </div>

        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            columnGap: "0.5rem",
            marginLeft: "-0.25rem",
          }}
        >
          {onImportClick && (
            <Tooltip title={<FormattedMessage id="general.import" />}>
              <IconButton style={{ padding: "0.5rem" }} onClick={onImportClick}>
                <CloudUpload />
              </IconButton>
            </Tooltip>
          )}

          {onHelpClick && (
            <Tooltip
              title={<FormattedMessage id={tooltipHelp ?? "topbar.help"} />}
            >
              <IconButton
                style={{ padding: "0.5rem" }}
                aria-haspopup="true"
                onClick={onHelpClick}
              >
                <Help />
              </IconButton>
            </Tooltip>
          )}

          {onColumnEditClick && (
            <Tooltip
              title={
                <FormattedMessage
                  id={tooltipColumnEdit ?? "general.columnEdit"}
                />
              }
            >
              <IconButton
                style={{ padding: "0.5rem" }}
                aria-haspopup="true"
                onClick={onColumnEditClick}
              >
                <ViewColumn />
              </IconButton>
            </Tooltip>
          )}

          {onExportClick && (
            <Tooltip
              title={
                <FormattedMessage id={tooltipExport ?? "general.export"} />
              }
            >
              <IconButton
                style={{ padding: "0.5rem" }}
                aria-haspopup="true"
                onClick={onExportClick}
              >
                <ExportIcon />
              </IconButton>
            </Tooltip>
          )}

          {onNotifyAllClick && (
            <Tooltip
              title={
                <FormattedMessage
                  id={tooltipNotifyAll ?? "general.notifyAll"}
                />
              }
            >
              <IconButton
                style={{ padding: "0.5rem" }}
                aria-haspopup="true"
                onClick={onNotifyAllClick}
              >
                <Notifications />
              </IconButton>
            </Tooltip>
          )}

          {onAddClick && (
            <Tooltip
              title={<FormattedMessage id={tooltipAdd ?? "general.addNew"} />}
            >
              <IconButton
                style={{ padding: "0.5rem" }}
                aria-haspopup="true"
                aria-owns={anchorEl ? "addNew-menu" : undefined}
                onClick={addMenuOptions ? onAddMenuClick : () => onAddClick({})}
              >
                <NoteAdd />
              </IconButton>
            </Tooltip>
          )}

          {customItems?.map(({ tooltip, component: Component, onClick }) => (
            <Tooltip key={tooltip} title={<FormattedMessage id={tooltip} />}>
              <IconButton
                style={{ padding: "0.5rem" }}
                onClick={onClick}
              >
                <Component />
              </IconButton>
            </Tooltip>
          ))}

          {onFilterClick && (
            <Tooltip title={<FormattedMessage id="action.filter" />}>
              <FilterIconCustom
                style={{ padding: "0.5rem" }}
                onFilterClick={() => onFilterClick(filters)}
                filtersActive={filtersActive}
              />
            </Tooltip>
          )}

          {onMoreClick && (
            <Tooltip
              title={<FormattedMessage id={tooltipMore ?? "action.more"} />}
            >
              <IconButton
                style={{ padding: "0.5rem" }}
                aria-haspopup="true"
                onClick={onMoreClick}
              >
                <More />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>

      {addMenuOptions && (
        <Menu
          id="addNew-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onAddMenuClose}
        >
          {addMenuOptions.map((option: any) => {
            return (
              <MenuItem
                key={option.name}
                onClick={(evt) => onAddClick(evt, option.route)}
              >
                <FormattedMessage id={option.name} />
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </AppBar>
  );
}

export default TableToolbar2;
