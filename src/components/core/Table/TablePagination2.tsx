import { MenuItem, TextField } from "@mui/material";
import TablePaginationAction from "./TablePaginationAction";
import { FormattedMessage } from "react-intl";

export interface TablePagination2Props {
  totalCount: number;
  rowsPerPage: number;
  page: number;
  onChangePage: (newValue: number) => void;
  onChangeRowsPerPage: (newValue: number) => void;
}

export const TablePagination2 = ({
  totalCount: count,
  rowsPerPage,
  page,
  onChangePage,
  onChangeRowsPerPage,
}: TablePagination2Props) => {
  const firstRowOnPage = page * rowsPerPage + 1;
  const lastRowOnPage = Math.min((page + 1) * rowsPerPage, count);

  return (
    <div style={{ overflow: "auto", whiteSpace: "nowrap" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          fontSize: "0.875rem",
          fontWeight: "normal",
          color: "rgba(0, 0, 0, 0.87)",
          padding: "0.5rem 0.5rem",
          minWidth: "fit-content",
        }}
      >
        <FormattedMessage id="general.rowsPerPage" />
        <div>:</div>
        <TextField
          select
          value={rowsPerPage}
          onChange={(e) => onChangeRowsPerPage(Number(e.target.value))}
          SelectProps={{
            SelectDisplayProps: {
              style: { padding: "4px 32px 6px 12px" },
            },
            sx: {
              fontSize: "14px",
              "& svg": {
                marginTop: "-2px",
              },
              "& fieldset": {
                border: "none",
              },
            },
          }}
        >
          {[5, 10, 25, 50, 100].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ marginLeft: "1.5rem" }}>
          {firstRowOnPage}-{lastRowOnPage} <FormattedMessage id="general.of" />{" "}
          {count}
        </div>
        <TablePaginationAction
          page={page}
          onChangePage={(_e: any, newValue: number) => onChangePage(newValue)}
          count={count}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};
