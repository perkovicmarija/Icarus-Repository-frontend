import {
  CreateNewFolder,
  Info,
  NoteAdd,
  PlaylistAdd,
} from "@mui/icons-material";
import TableToolbar2 from "../../components/core/Table/TableToolbar2";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import { useEffect, useState } from "react";
import DialogFormStorageInfo from "../../components/documentation/icarusDocs/dialogs/DialogFormStorageInfo";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import * as icarusDocumentationFolderActions from "../../redux/icarusDocs/folder/icarusDocumentationFolderActions";
import { MenuItem, ListItemIcon, ListItemText, Menu } from "@mui/material";
import IntlMessages from "../../components/core/IntlMessages";
import DialogFormDocumentationFilters from "../../components/documentation/icarusDocs/dialogs/DialogFormDocumentationFilters";
import { FiltersType, initFilters } from "../../redux/icarusDocs/icarusDocsSlice";
import { Client } from "../../redux/settings/clientsApi";

export const DocumentationTableToolbar2 = ({
  onNewFileClick,
  onNewFolderClick,
  clients,
  onSearchSubmit,
  filters,
  onFilterSubmit,
}: {
  onNewFileClick: (item: {}) => void;
  onNewFolderClick: (item: {}) => void;
  clients: Client[];
  onSearchSubmit: ({ searchText }: { searchText: string }) => void;
  filters: FiltersType;
  onFilterSubmit: (filters: FiltersType) => void;
}) => {
  const dispatch = useAppDispatch();
  const [dialogStorageInfoOpen, setDialogStorageInfoOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>();

  const [dialogFilters, setDialogFilters] = useState<FiltersType | undefined>();

  const storageInfo = useAppSelector(
    (state) => (state.IcarusDocumentationFolder as any).storageInfo
  );
  useEffect(() => {
    dispatch(icarusDocumentationFolderActions.loadStorageInfo());
  }, []);

  return (
    <>
      <TableToolbar2
        title="support.icarusDocs"
        //
        searchPlaceholder="general.search.files.name"
        searchTextPropKey="searchText"
        onSearchSubmit={onSearchSubmit}
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
        <MenuItem
          onClick={() => {
            setAnchorEl(undefined);
            onNewFileClick({});
          }}
        >
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
          onSubmit={onFilterSubmit}
          clients={clients}
        />
      </DialogFormFrame>
    </>
  );
};
