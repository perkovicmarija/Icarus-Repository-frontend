import { useState } from "react";
import BookmarkItem from "./BookmarkItem";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { makeStyles } from "@mui/styles";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const SEARCH_FOR = "Mozilla"; // try 'Mozilla';
const DEFAULT_SCALE_DELTA = 1.1;
const MATCHES_COUNT_LIMIT = 1000;

const MIN_SCALE = 0.1;
const MAX_SCALE = 10.0;

const FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3,
};

const useStyles = makeStyles({
  page: { border: "1px solid gray" },
  document: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
  },
});

const PdfFrame = ({ file }: { file: any }) => {
  const classes = useStyles();

  const [numPages, setNumPages] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const pages = [];

  for (let i = 1; i <= numPages; i++) {
    pages.push(
      <Page key={i} pageNumber={i} scale={1.5} className={classes.page} />
    );
  }

  return (
    <Document
      file={file.data}
      onLoadSuccess={onDocumentLoadSuccess}
      className={classes.document}
    >
      {pages}
    </Document>
  );
};

export default PdfFrame;
