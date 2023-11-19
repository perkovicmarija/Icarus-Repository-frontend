import {
  CircularProgress,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import TableHeader, { TableHeaderProps } from "./TableHeader";
import { TablePagination2, TablePagination2Props } from "./TablePagination2";
import { ReactElement } from "react";
import { TableNoItems } from "./TableNoItems";
import { Box } from "@mui/system";

export interface TableContainer2Props {
  children: ReactElement | ReactElement[] | boolean | undefined;
  headerProps: TableHeaderProps;
  paginationProps?: TablePagination2Props;
  loading?: boolean;
}

export const TableContainer2 = ({
  children,
  headerProps,
  paginationProps,
  loading,
}: TableContainer2Props) => {
  return (
    <Box sx={{ opacity: loading ? 0.25 : 1 }}>
      <TableContainer
        sx={{
          "& tbody": {
            "& tr": {
              // cursor: "pointer",
            },
          },
        }}
      >
        <Table style={{ minWidth: "700px" }}>
          <TableHeader {...headerProps} />
          <TableBody
            sx={{
              "& td": {
                padding: "8px 16px",
              },
              "& tr": {
                height: "57px",
              },
            }}
          >
            {children}
          </TableBody>
        </Table>
      </TableContainer>

      {paginationProps?.totalCount === 0 && <TableNoItems />}

      {(children === undefined || children === false) && (
        <div
          style={{
            height: "6rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            background:
              loading === false
                ? "repeating-linear-gradient( 45deg, red 0px, red 2px, transparent 2px, transparent 30px)"
                : "transparent",
          }}
        >
          {loading === false ? "Error" : <CircularProgress />}
        </div>
      )}

      {paginationProps && paginationProps.totalCount !== 0 && (
        <TablePagination2 {...paginationProps} />
      )}
    </Box>
  );
};
