import { Box, DialogContent } from "@mui/material";
import IntlMessages from "../../../components/core/IntlMessages";
import TreeNode, {
  FolderType,
} from "../../../components/support/icarusDocs/TreeNode";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import { useEffect, useState } from "react";
import IcarusDocumentationFolderApi from "../../../api/IcarusDocumentationFolderApi";
import { ProgressCustom } from "../../../components/core/ProgressCustom";

const DialogFormMove = ({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData: any;
  onClose: () => void;
  onSubmit: (payload: any) => Promise<void>;
}) => {
  const [destination, setDestination] = useState<
    FolderType["icarusDocumentationFolder"] | undefined
  >();

  const [loading, setLoading] = useState(false);

  const [folderTree, setFolderTree] = useState<FolderType | undefined>();
  useEffect(() => {
    IcarusDocumentationFolderApi.getFolderTree().then((response) =>
      setFolderTree({
        ...response.data,
        icarusDocumentationFolder: {
          folderName: "ROOT",
          icarusDocumentationFolderId: "",
          path: "",
        },
      })
    );
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setLoading(true);
        onSubmit({
          icarusDocumentationFile: initialData,
          icarusDocumentationFolder:
            destination!.path === "" ? undefined : destination,
        })
          .then(onClose)
          .catch(() => setLoading(false));
      }}
    >
      <DialogContent>
        {folderTree ? (
          <>
            <Box>
              <IntlMessages id="documentation.folder.selected" />:{" "}
              <span style={{ fontWeight: "bold" }}>
                {destination ? destination.path + destination.folderName : "-"}
              </span>
            </Box>
            <Box
              sx={{
                marginTop: "1rem",
                "& svg": {
                  marginBottom: "3px",
                  marginRight: "2px",
                },
              }}
            >
              <TreeNode
                key={"ROOT"}
                onFolderSelected={setDestination}
                folderTree={folderTree}
                destinationFolder={destination}
              />
            </Box>
          </>
        ) : (
          <ProgressCustom />
        )}
      </DialogContent>
      <DialogActions2
        onClose={onClose}
        submitDisabled={!destination}
        loading={loading}
      />
    </form>
  );
};

export default DialogFormMove;
