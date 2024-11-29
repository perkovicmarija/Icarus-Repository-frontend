import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

const stickyStyle = {
  position: "sticky",
  left: 0,
  backgroundColor: "#FFFFFF",
  zIndex: 5,
};

function EnhancedTableHeader({ columnData, order, orderBy, onRequestSort }) {
  return (
    <TableHead>
      <TableRow>
        {columnData
          .filter((i) => i)
          .map((column) => {
            return (
              <TableCell
                key={column.id}
                align={column.numeric ? "right" : "left"}
                padding={column.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === column.id ? order : false}
                style={{
                  ...(column.sticky ? stickyStyle : {}),
                  ...column.style,
                  backgroundClip: "padding-box",
                }}
              >
                {column.sortable ? (
                  <Tooltip
                    title={<FormattedMessage id="general.sort" />}
                    placement={column.numeric ? "bottom-end" : "bottom-start"}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={order}
                      onClick={(e) => onRequestSort(e, column.id)}
                    >
                      <FormattedMessage id={column.label} />
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  <FormattedMessage id={column.label} />
                )}
              </TableCell>
            );
          })}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHeader;
