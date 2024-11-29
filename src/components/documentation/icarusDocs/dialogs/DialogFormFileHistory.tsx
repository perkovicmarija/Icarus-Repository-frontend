import { useEffect, useState } from "react";
import IntlMessages from "../../../core/IntlMessages";
import {
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DialogTitleWithExport from "../../../core/Dialog/DialogTitleWithExport";
import IcarusDocumentationFileApi from "../../../../api/IcarusDocumentationFileApi";
import { DialogActions2 } from "../../../core/Dialog/DialogActions2";

export default function DialogFormFileHistory({
  file,
  onClose,
  onExportClick,
}: any) {
  const [fileHistory, setFileHistory] = useState<any[]>();

  useEffect(() => {
    IcarusDocumentationFileApi.getHistory({
      icarusDocumentationFileDownloadId: file.icarusDocumentationFileId,
    }).then((response) => setFileHistory(response.data));
  }, []);

  return (
    <>
      <DialogTitleWithExport onExportClick={onExportClick} />
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <IntlMessages id="documentation.download.user" />
              </TableCell>
              <TableCell>
                <IntlMessages id="general.date" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileHistory &&
              fileHistory.map((item) => {
                return (
                  <TableRow key={item.icarusDocumentationFileDownloadId}>
                    <TableCell>{item.user.fullName}</TableCell>
                    <TableCell>{item.dateDownloadedFormatted}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions2 onClose={onClose} hideSubmit />
    </>
  );
}
