import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultState, settingsActions } from "../redux/settings/settingsSlice";
import { useRouteMatch } from "react-router-dom";

//
export const paginationGetRowsPerPage = () =>
  JSON.parse(localStorage.getItem("rowsPerPage") || "{}");

//
export const paginationSetRowsPerPage = (moduleKey, value) => {
  const rowsPerPage = paginationGetRowsPerPage();
  rowsPerPage[moduleKey] = value;
  localStorage.setItem("rowsPerPage", JSON.stringify(rowsPerPage));
};

//
export const usePagination = (
  moduleKey: keyof (typeof defaultState)["rowsPerPage"]
) => {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const rowsPerPageSetting = useSelector(
    (s) => s.Settings.rowsPerPage[moduleKey]
  );

  const page = parseInt(match.params.page) || 0;
  const rowsPerPage = parseInt(match.params.rowsPerPage) || rowsPerPageSetting;

  const storeRowsPerPage = useCallback(
    (value) => {
      dispatch(
        settingsActions.setPagination({
          moduleKey,
          value,
        })
      );
    },
    [moduleKey]
  );

  const returnObject = useMemo(
    () => ({ page, rowsPerPage, storeRowsPerPage }),
    [page, rowsPerPage, storeRowsPerPage]
  );

  return returnObject;
};
