import Grid from "@mui/material/Grid";
import { DialogContent, IconButton, Typography } from "@mui/material";
import IntlMessages from "../../../components/core/IntlMessages";
import { ChevronRight, ExpandMore, Remove } from "@mui/icons-material";
import TreeNode from "../../../components/support/icarusDocs/TreeNode";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import { useEffect, useState } from "react";
import IcarusDocumentationFolderApi from "../../../api/IcarusDocumentationFolderApi";

const DialogFormMove = ({ initialData, onClose, onSubmit }: any) => {
  const isOpen = true;
  const onExpandClick = (event) => {
    //this.setState({ isOpen: !this.state.isOpen });
  };

  const [destination, setDestination] = useState<{ folderName: string }>();

  const [icarusDocumentationFolderTree, setIcarusDocumentationFolderTree] =
    useState([]);
  useEffect(() => {
    IcarusDocumentationFolderApi.getFolderTree().then((response) =>
      setIcarusDocumentationFolderTree(response.data)
    );
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onSubmit();
      }}
    >
      <DialogContent>
        <Grid container className="p-b-10">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Typography variant="button">
              <IntlMessages id="documentation.folder.selected" />:{" "}
              {destination ? destination.folderName : "ROOT"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <div className="tree-node">
              {icarusDocumentationFolderTree.children.length > 0 ? (
                <IconButton aria-label="Delete" onClick={onExpandClick}>
                  {isOpen ? <ExpandMore /> : <ChevronRight />}
                </IconButton>
              ) : (
                <IconButton disabled>
                  <Remove />
                </IconButton>
              )}

              <span
                className={
                  destination ? "pointer" : "tree-node-selected pointer"
                }
                onClick={(event) => onFolderSelected(event, undefined)}
              >
                ROOT
              </span>
            </div>
            {icarusDocumentationFolderTree.children.map((childNode) => (
              <TreeNode
                key={childNode.level}
                onFolderSelected={(...props) => console.log(props)}
                icarusDocumentationFolderTree={childNode}
                icarusDocumentationFolderDestinationMove={destination}
              />
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} />
    </form>
  );
};

export default DialogFormMove;
