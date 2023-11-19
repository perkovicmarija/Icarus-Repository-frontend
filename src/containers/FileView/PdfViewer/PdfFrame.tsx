import React, { useState } from "react";
import BookmarkItem from "./BookmarkItem";
import {
  Document,
  DocumentProps,
  Outline,
  Page,
  Thumbnail,
  pdfjs,
} from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Box, Button, SxProps } from "@mui/material";
import { useTheme } from "@emotion/react";
import { display } from "@mui/system";
import { downloadFile } from "../../../api/methods/utils";

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

const sx: Record<string, SxProps> = {
  pages: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    margin: "1rem auto",
    height: "fit-content",
  },
  thumbnails: (visible) => ({
    display: visible ? "flex" : "none",
    background: "white",
    marginRight: "1rem",
    padding: "0.5rem 0.5rem",
    flexDirection: "column",
    rowGap: "0.5rem",
    overflowY: "auto",
    overflowX: "hidden",
    minWidth: "fit-content",
    minHeight: "fit-content",
    height: "100%",
    "& .react-pdf__Thumbnail__page": {
      border: "1px solid black",
    },
  }),
};

const PdfFrame = ({
  file,
  showDownloadButton,
}: {
  file: any;
  showDownloadButton?: boolean;
}) => {
  const [numPages, setNumPages] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const pages = [];

  for (let i = 0; i < numPages; i++) {
    pages.push(
      <Box
        key={i + 1}
        sx={
          {
            /* border: "1px solid gray" */
          }
        }
      >
        <Page pageNumber={i + 1} scale={1.5} />
      </Box>
    );
  }

  const [showThumbnails, setShowThumbnails] = useState(true);

  const onDownloadClick = (data: ArrayBuffer) => {
    downloadFile({ data, name: "test" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        overflow: "hidden",
        width: "100%",
        position: "relative",
        "& .react-pdf__Document": {
          display: "flex",
          width: "100%",
          flexGrow: 1,
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          background: "white",
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="text"
          onClick={() => setShowThumbnails(!showThumbnails)}
        >
          Thumbnails
        </Button>
        {showDownloadButton && (
          <Button variant="text" onClick={() => onDownloadClick(file.data)}>
            Download
          </Button>
        )}
      </Box>
      <Document
        file={file.data}
        onLoadSuccess={onDocumentLoadSuccess}
        //className={classes.document}
      >
        <Box sx={sx.thumbnails(showThumbnails)}>
          {Array.from(new Array(numPages), (_el, index) => (
            <Box
              sx={{ textAlign: "center", fontSize: "0.85rem" }}
              key={index + 1}
            >
              <Thumbnail pageNumber={index + 1} width={100} />
              {index + 1}
            </Box>
          ))}
        </Box>
        <Box sx={{ overflow: "auto", flexGrow: 1, display: "flex" }}>
          <Box sx={sx.pages}>{pages}</Box>
        </Box>
      </Document>
    </Box>
  );
};

export default PdfFrame;
