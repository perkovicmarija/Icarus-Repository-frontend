import { Table, TableBody, TableContainer } from "@mui/material";
import TableHeader, { TableHeaderProps } from "./TableHeader";
import { TablePagination2, TablePagination2Props } from "./TablePagination2";
import { ReactNode } from "react";

export const TableContainer2 = ({
  children,
  headerProps,
  paginationProps,
}: {
  children: ReactNode;
  headerProps: TableHeaderProps;
  paginationProps?: TablePagination2Props;
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
          <TableHeader {...headerProps} />
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>

      {paginationProps && <TablePagination2 {...paginationProps} />}
    </>
  );
};
