import { Box, Table, TableBody, TableContainer } from "@mui/material";
import EnhancedTableHeader from "./EnhancedTableHeader";
import { TablePagination2 } from "./TablePagination2";
import { TableNoItems } from "./TableNoItems";
import { ProgressCustom } from "../ProgressCustom";

import { createContext, useContext } from "react";

const TableDataContext = createContext(null);
const TableDataContextProvider = TableDataContext.Provider;
const useTableDataContext = () => useContext(TableDataContext);

const TableBodyPropsContext = createContext(null);
const TableBodyPropsContextProvider = TableBodyPropsContext.Provider;
const useTableBodyPoropsContext = () => useContext(TableBodyPropsContext);

export {
  TableDataContextProvider,
  useTableDataContext,
  TableBodyPropsContextProvider,
  useTableBodyPoropsContext,
};

export const TableContainer3 = ({
  data,
  Body,
  BodyProps,
  headerProps: { columnData, order, orderBy, onRequestSort },
  paginationProps: {
    totalCount,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage,
  } = {},
  loading,
  TableStyle,
}) => {
  return (
    <Box>
      {Array.isArray(data) && (
        <TableContainer style={{ opacity: loading ? 0.25 : 1 }}>
          <Table style={{ minWidth: "700px", ...TableStyle }}>
            <EnhancedTableHeader
              columnData={columnData}
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
            />
            <TableBody>
              <TableDataContextProvider value={data}>
                <TableBodyPropsContextProvider value={BodyProps}>
                  <Body />
                </TableBodyPropsContextProvider>
              </TableDataContextProvider>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {data?.length === 0 && !loading && <TableNoItems />}

      {(data === undefined || data?.length === 0) && loading && (
        <ProgressCustom />
      )}

      {onChangePage && totalCount !== 0 && (
        <TablePagination2
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      )}
    </Box>
  );
};
