import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { defaultState, settingsActions } from "../redux/settings/settingsSlice";
import { useRouteMatch } from "react-router-dom";
import { useAppSelector } from "../redux/store";

//
export const paginationGetRowsPerPage = () =>
  JSON.parse(localStorage.getItem("rowsPerPage") || "{}");

//
export const paginationSetRowsPerPage = (moduleKey: string, value: number) => {
  const rowsPerPage = paginationGetRowsPerPage();
  rowsPerPage[moduleKey] = value;
  localStorage.setItem("rowsPerPage", JSON.stringify(rowsPerPage));
};

//
export const usePagination = (
  moduleKey: keyof (typeof defaultState)["rowsPerPage"]
) => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { params } = useRouteMatch<{
    page: string | undefined;
    rowsPerPage: string | undefined;
  }>({
    path: url + "/:page?" + "/:rowsPerPage?",
  })!;

  const rowsPerPageSetting = useAppSelector(
    (s) => s.Settings!.rowsPerPage[moduleKey]
  );

  const page = params.page != undefined ? parseInt(params.page) : 0;
  const rowsPerPage =
    params.rowsPerPage != undefined
      ? parseInt(params.rowsPerPage)
      : rowsPerPageSetting;

  const storeRowsPerPage = useCallback(
    (value: number) => {
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
