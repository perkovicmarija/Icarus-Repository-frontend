import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableSortLabelProps,
  Tooltip,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { CSSProperties, MouseEvent } from "react";

interface ColumnDefinition {
  id: string;
  label: string;
  numeric?: boolean;
  disablePadding?: boolean;
  sortable?: boolean;
  style?: CSSProperties;
  sticky?: boolean;
}

export interface TableHeaderProps {
  columnData: ColumnDefinition[];
  order?: TableSortLabelProps["direction"];
  orderBy?: string;
  onRequestSort?: (
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    columnId: string
  ) => any;
}

function TableHeader({
  columnData,
  order,
  orderBy,
  onRequestSort,
}: TableHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        {columnData.map((column) => {
          if (!column) {
            return null;
          }

          return (
            <TableCell
              sx={[
                column.sticky
                  ? {
                      position: "sticky",
                      left: 0,
                      backgroundColor: "#FFFFFF",
                    }
                  : false,
              ]}
              key={column.id}
              align={column.numeric ? "right" : "left"}
              padding={column.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === column.id ? order : false}
              style={column.style}
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
                    onClick={(e) => onRequestSort!(e, column.id)}
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

export default TableHeader;
