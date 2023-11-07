import { Table, TableBody, TableContainer } from "@mui/material";
import TableHeader, { TableHeaderProps } from "./TableHeader";
import { TablePagination2, TablePagination2Props } from "./TablePagination2";
import { ReactNode } from "react";
import { TableNoItems } from "./TableNoItems";
import { ProgressCustom } from "../ProgressCustom";
import { Box } from "@mui/system";

export interface TableContainer2Props {
  children: ReactNode[] | undefined;
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

      {paginationProps?.totalCount === 0 && <TableNoItems />}

      {children === undefined && <ProgressCustom />}

      {paginationProps && paginationProps.totalCount !== 0 && (
        <TablePagination2 {...paginationProps} />
      )}
    </Box>
  );
};
