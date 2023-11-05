import { Table, TableBody, TableContainer } from "@mui/material";
import TableHeader, { TableHeaderProps } from "./TableHeader";
import { TablePagination2, TablePagination2Props } from "./TablePagination2";
import { ReactNode } from "react";
import { TableNoItems } from "./TableNoItems";

export interface TableContainer2Props {
  children: ReactNode[];
  headerProps: TableHeaderProps;
  paginationProps?: TablePagination2Props;
}

export const TableContainer2 = ({
  children,
  headerProps,
  paginationProps,
}: TableContainer2Props) => {
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

      {children.length === 0 && <TableNoItems />}

      {paginationProps && children.length > 0 && (
        <TablePagination2 {...paginationProps} />
      )}
    </>
  );
};
