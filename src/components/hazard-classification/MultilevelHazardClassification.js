import React, { useState } from "react";
import { Box, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { Add, Remove, SaveAlt } from "@mui/icons-material";
import { ProgressCustom } from "../core/ProgressCustom";
import LevelValue from "./LevelValue";
import { DialogDelete2 } from "../core/Dialog/DialogDelete2";
import DialogFormFrame from "../core/Dialog/DialogFormFrame";
import DialogAddEditHazard from "./DialogAddEditHazard";
import { FormattedMessage } from "react-intl";
import { TableNoItems } from "../core/Table/TableNoItems";
import ToolbarSearch from "../core/ToolbarSearch";
import { useGetHazardClassificationsFilteredQuery } from "../../redux/hazardClassification/hazardClassificationApi";

function MultilevelHazardClassification({
  values,
  onSelect,
  selectedValue,

  showSearchOption,
  onAddEdit,
  onDelete,
  onExport,
  loading,
}) {
  const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const [dialogAddEdit, setDialogAddEdit] = useState();
  const [dialogDelete, setDialogDelete] = useState();

  const [valuesFiltered, setValuesFiltered] = useState();

  const handleInputSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const onSearchSubmit = () => {
    if (searchText && searchText !== "") {
      setSearchActive(true);
      onSelect(undefined, undefined);
      setValuesFiltered();
      const { data } = useGetHazardClassificationsFilteredQuery({ searchText })
      setValuesFiltered(data.data)
    } else {
      setSearchActive(false);
      setValuesFiltered();
    }
  };

  const getValueFullPath = (value) => {
    let valueParent = values.find((s) => s.taxonomyId === value.parentId);
    if (valueParent) {
      let path = getValueFullPath(valueParent);
      if (path) {
        return path + " ---> " + valueParent.name;
      } else {
        return valueParent.name;
      }
    } else {
      return undefined;
    }
  };

  if (!values) {
    return <ProgressCustom />;
  }

  return (
    <Grid container style={{ rowGap: "0.5rem", opacity: loading ? 0.35 : 1 }}>
      {showSearchOption && (
        <Grid
          item
          xs={12}
          style={{ display: "flex", alignItems: "center", columnGap: "1rem" }}
        >
          <ToolbarSearch
            value={searchText}
            onInputSearchChange={handleInputSearchChange}
            onSearchSubmit={onSearchSubmit}
            placeholder="general.search.name"
            inDialog
            style={{ width: "initial", flexGrow: 1 }}
          />
          {onExport && (
            <Tooltip title={<FormattedMessage id="general.export" />}>
              <IconButton
                onClick={onExport}
                style={{ padding: "0.25rem", height: "fit-content" }}
              >
                <SaveAlt />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      )}

      {!searchActive && (
        <Grid item xs={12}>
          {onAddEdit && (
            <IconButton
              style={{ padding: 0, marginLeft: "0.5rem" }}
              color="primary"
              onClick={() =>
                setDialogAddEdit({
                  parentId: null,
                })
              }
            >
              <Add />
            </IconButton>
          )}
          <LevelValue
            value={{ taxonomyId: null, isDefaultOpen: true }}
            values={values}
            onSelected={onSelect}
            selectedValue={selectedValue}
            onAdd={onAddEdit && setDialogAddEdit}
            onEdit={onAddEdit && setDialogAddEdit}
            onDelete={onDelete && setDialogDelete}
          />

          {values?.length === 0 && <TableNoItems />}
        </Grid>
      )}

      {searchActive && (
        <Box
          style={{
            width: "100%",
            marginTop: "0.5rem",
          }}
        >
          {(valuesFiltered || []).map((value) => {
            return (
              <div
                className="tree-node"
                style={{
                  alignItems: "flex-start",
                  width: "100%",
                  backgroundColor:
                    selectedValue &&
                    selectedValue.taxonomyId === value.taxonomyId
                      ? "#E2C675"
                      : "",
                }}
              >
                <IconButton style={{ padding: 0 }} disabled>
                  <Remove />
                </IconButton>

                <Box style={{ flexGrow: 1 }}>
                  <Box
                    style={{ cursor: "pointer" }}
                    onClick={(event) => onSelect(event, value)}
                  >
                    {value.name}
                  </Box>
                  <Box
                    fontSize={11}
                    fontStyle="italic"
                    fontWeight="fontWeightBold"
                  >
                    {value.level > 1 && getValueFullPath(value)}
                  </Box>
                </Box>
              </div>
            );
          })}
          {(!valuesFiltered || valuesFiltered.length === 0) && <TableNoItems />}
        </Box>
      )}

      {dialogAddEdit && (
        <DialogFormFrame
          onClose={() => setDialogAddEdit()}
          title="riskManagement.hazard"
          open={dialogAddEdit}
        >
          <DialogAddEditHazard
            onClose={() => setDialogAddEdit()}
            onSubmit={onAddEdit}
            initialData={dialogAddEdit}
          />
        </DialogFormFrame>
      )}

      <DialogDelete2
        data={dialogDelete}
        onClose={() => setDialogDelete(undefined)}
        onSubmit={(payload) => {
          onDelete(payload);
          setDialogDelete(undefined);
        }}
      />
    </Grid>
  );
}

export default MultilevelHazardClassification;
