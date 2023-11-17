import {
  CreateNewFolder,
  Info,
  NoteAdd,
  PlaylistAdd,
} from "@mui/icons-material";
import TableToolbar2 from "../../components/core/Table/TableToolbar2";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import { useEffect, useState } from "react";
import DialogFormStorageInfo from "../../components/support/icarusDocs/DialogFormStorageInfo";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import * as icarusDocumentationFolderActions from "../../redux/support/icarusDocs/folder/icarusDocumentationFolderActions";
import { MenuItem, ListItemIcon, ListItemText, Menu } from "@mui/material";
import IntlMessages from "../../components/core/IntlMessages";
import DialogFormDocumentationFilters, {
  FiltersType,
  initFilters,
} from "../../components/support/icarusDocs/DialogFormDocumentationFilters";

export const DocumentationTableToolbar2 = ({
  onNewFileClick,
  onNewFolderClick,
  clients,
}: any) => {
  const dispatch = useAppDispatch();
  const [dialogStorageInfoOpen, setDialogStorageInfoOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>();

  const [filters, setFilters] = useState<FiltersType>(initFilters);

  const [dialogFilters, setDialogFilters] = useState<FiltersType | undefined>();

  const storageInfo = useAppSelector(
    (state) => (state.IcarusDocumentationFolder as any).storageInfo
  );
  useEffect(() => {
    dispatch(icarusDocumentationFolderActions.loadStorageInfo());
  }, []);

  const handleSubmitFilters = (newFilters: FiltersType) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <>
      <TableToolbar2
        title="support.icarusDocs"
        //
        searchPlaceholder="general.search.files.name"
        searchTextPropKey="textSearch"
        onSearchSubmit={handleSubmitFilters}
        //
        customItems={[
          {
            tooltip: "documentation.storageInfo",
            component: Info,
            onClick: () => setDialogStorageInfoOpen(true),
          },
          {
            tooltip: "general.addNew",
            component: PlaylistAdd,
            onClick: (e: any) => setAnchorEl(e.currentTarget),
          },
        ]}
        initFilters={initFilters}
        filters={filters}
        onFilterClick={setDialogFilters}
      />

      <DialogFormFrame
        onClose={() => setDialogStorageInfoOpen(false)}
        title="documentation.storageInfo"
        open={dialogStorageInfoOpen}
      >
        <DialogFormStorageInfo
          onClose={() => setDialogStorageInfoOpen(false)}
          storageInfo={storageInfo}
        />
      </DialogFormFrame>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(undefined)}
      >
        <MenuItem onClick={onNewFileClick}>
          <ListItemIcon>
            <NoteAdd />
          </ListItemIcon>
          <ListItemText
            primary={<IntlMessages id="documentation.addNewFile" />}
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(undefined);
            onNewFolderClick({});
          }}
        >
          <ListItemIcon>
            <CreateNewFolder />
          </ListItemIcon>
          <ListItemText
            primary={<IntlMessages id="documentation.addNewFolder" />}
          />
        </MenuItem>
      </Menu>

      <DialogFormFrame
        onClose={() => setDialogFilters(undefined)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormDocumentationFilters
          initialData={dialogFilters!}
          onClose={() => setDialogFilters(undefined)}
          onSubmit={handleSubmitFilters}
          clients={clients}
        />
      </DialogFormFrame>
    </>
  );
};
