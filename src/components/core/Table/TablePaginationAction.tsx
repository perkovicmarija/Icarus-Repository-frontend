import { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { IconButton, TextField, Input } from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(() => ({
  button: {
    padding: "4px",
    paddingBottom: "5px",
  },
}));

function TablePaginationAction({
  page,
  onChangePage,
  count,
  rowsPerPage,
}: any) {
  const classes = useStyles();
  const theme = useTheme() as any;

  const [pageManual, setPageManual] = useState(1);

  useEffect(() => {
    setPageManual(parseInt(page) + 1);
  }, [page]);

  const handleFirstPageButtonClick = (e: any) => {
    onChangePage(e, 0);
  };

  const handleBackButtonClick = (e: any) => {
    onChangePage(e, parseInt(page) - 1);
  };

  const handleNextButtonClick = (e: any) => {
    onChangePage(e, parseInt(page) + 1);
  };

  const handleLastPageButtonClick = (e: any) => {
    onChangePage(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const handlePageChange = (e: any) => {
    setPageManual(e.target.value);
  };

  const handleManualPageButtonClick = (e: any) => {
    onChangePage(e, pageManual - 1);
  };

  const submitDisabled =
    pageManual > Math.ceil(count / rowsPerPage) || pageManual < 1;

  return (
    <div
      style={{
        flexShrink: 0,
        marginLeft: "1.75rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton
        className={classes.button}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        className={classes.button}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        className={classes.button}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        className={classes.button}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
      <div style={{ fontSize: "14px", marginLeft: "1.75rem" }}>
        <FormattedMessage id="general.page" />:
      </div>
      <TextField
        style={{
          width: "30px",
          verticalAlign: "unset",
        }}
        inputProps={{
          style: {
            textAlign: "center",
            padding: "2px",
            paddingTop: "2px",
            fontSize: "15px",
          },
        }}
        value={pageManual}
        onChange={handlePageChange}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !submitDisabled) {
            e.preventDefault();
            handleManualPageButtonClick(e);
          }
        }}
      />
      <div style={{ fontSize: "14px", marginRight: "3px" }}>/</div>
      <div style={{ fontSize: "14px", paddingBottom: "1px" }}>
        {Math.ceil(count / rowsPerPage)}
      </div>
      <IconButton
        className={classes.button}
        onClick={handleManualPageButtonClick}
        disabled={submitDisabled}
        aria-label="Go to Page"
        style={{ marginLeft: "0.5rem" }}
      >
        <Input style={{ width: "0.9em" }} />
      </IconButton>
    </div>
  );
}

export default TablePaginationAction;
