import { Table, TableBody, TableContainer } from "@mui/material";
import TableHeader, { TableHeaderProps } from "./TableHeader";
import { TablePagination2, TablePagination2Props } from "./TablePagination2";
import { ReactNode } from "react";

export const TableContainer2 = ({
  children,
  headerProps: { columnData, order, orderBy, onRequestSort },
  paginationProps: {
    totalCount,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage,
  },
}: {
  children: ReactNode;
  headerProps: TableHeaderProps;
  paginationProps: TablePagination2Props;
}) => {
  return (
    <>
      <TableContainer
        sx={{
          "& tbody": {
            "& tr": {
              cursor: "pointer",
            },
          },
        }}
      >
        <Table style={{ minWidth: "700px" }}>
          <TableHeader
            columnData={columnData}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
          />
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>

      {onChangePage && (
        <TablePagination2
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      )}
    </>
  );
};
