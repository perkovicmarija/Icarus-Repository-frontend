import { MenuItem, TextField } from "@mui/material";
import TablePaginationAction from "./TablePaginationAction";
import { FormattedMessage } from "react-intl";

export interface TablePagination2Props {
  totalCount: number | undefined;
  rowsPerPage: number;
  page: number;
  onChangePage: (newValue: number) => void;
  onChangeRowsPerPage: (newValue: number) => void;
}

export const TablePagination2 = ({
  totalCount,
  rowsPerPage,
  page,
  onChangePage,
  onChangeRowsPerPage,
}: TablePagination2Props) => {
  if (totalCount === undefined) {
    return null;
  }

  const firstRowOnPage = page * rowsPerPage + 1;
  const lastRowOnPage = Math.min((page + 1) * rowsPerPage, totalCount);

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
              style: { padding: "5px 32px 5px 12px" },
            },
            sx: {
              fontSize: "14px",
              "& svg": {
                marginTop: "-1px",
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
          {totalCount}
        </div>
        <TablePaginationAction
          page={page}
          onChangePage={(_e: any, newValue: number) => onChangePage(newValue)}
          count={totalCount}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};
