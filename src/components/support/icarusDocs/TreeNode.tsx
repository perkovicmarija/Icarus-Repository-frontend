import { useState } from "react";
import { IconButton } from "@mui/material";
import { ChevronRight, ExpandMore, Remove } from "@mui/icons-material";

export interface FolderType {
  children: FolderType[];
  level: number;
  icarusDocumentationFolder: {
    folderName: string;
    icarusDocumentationFolderId: string;
    path: string;
  };
}

const TreeNode = ({
  folderTree,
  onFolderSelected,
  destinationFolder,
}: {
  folderTree: FolderType;
  onFolderSelected: (
    icarusDocumentationFolder: FolderType["icarusDocumentationFolder"]
  ) => void;
  destinationFolder: FolderType["icarusDocumentationFolder"] | undefined;
}) => {
  console.log(folderTree);
  const [isOpen, setIsOpen] = useState(false);

  const isSelected =
    destinationFolder?.icarusDocumentationFolderId ===
      folderTree.icarusDocumentationFolder.icarusDocumentationFolderId &&
    destinationFolder?.path === folderTree.icarusDocumentationFolder.path;

  return (
    <div>
      <div
        className="tree-node"
        style={{
          marginLeft: folderTree.level * 20 + "px",
        }}
      >
        {folderTree.children.length > 0 ? (
          <IconButton
            sx={{ padding: 0 }}
            aria-label="Delete"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ExpandMore /> : <ChevronRight />}
          </IconButton>
        ) : (
          <IconButton disabled sx={{ padding: 0 }}>
            <Remove />
          </IconButton>
        )}
        <span
          style={{
            fontWeight: isSelected ? "bold" : "normal",
            cursor: "pointer",
          }}
          onClick={() => onFolderSelected(folderTree.icarusDocumentationFolder)}
        >
          {folderTree.icarusDocumentationFolder.folderName}
        </span>
      </div>

      {isOpen &&
        folderTree.children.map((childNode) => (
          <TreeNode
            key={
              folderTree.icarusDocumentationFolder.icarusDocumentationFolderId
            }
            onFolderSelected={onFolderSelected}
            folderTree={childNode}
            destinationFolder={destinationFolder}
          />
        ))}
    </div>
  );
};

export default TreeNode;
