import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { Delete, Done, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import IntlMessages from "../../../components/utility/intlMessages";
import { DialogDelete2 } from "../core/Dialog/DialogDelete2";
import DialogFormFrame from "../core/Dialog/DialogFormFrame";
import EnhancedTableToolbarSimpleOption from "../core/Table/EnhancedTableToolbarSimpleOption";
import { TableNoItems } from "../core/Table/TableNoItems";
import DialogGenericWarning from "../core/Dialog/DialogGenericWarning";
import HazardClassificationApi from "../../../api/HazardClassificationApi";
import DialogFormAddEditHazard2 from "./DialogFormAddEditHazard2";
import { TableContainer2 } from "../core/Table/TableContainer2";

function HazardClassificationTable2({
  data,
  addEditApi,
  deleteApi,
  //
  disabled,
}) {
  const [hazadClassifications, setHazardClassifications] = useState();
  useEffect(() => {
    HazardClassificationApi.getAll().then((response) =>
      setHazardClassifications(response.data)
    );
  }, []);

  const [addEditForm, setAddEditForm] = useState(undefined);
  const [deleteForm, setDeleteForm] = useState(undefined);
  const [warningUsedDialog, setWarningUsedDialog] = useState(false);
  const [warningExistingDialog, setWarningExistingDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const onDeleteSubmit = (payload) => {
    setLoading(true);
    deleteApi({
      irmRiskAssessmentHazardJoinedId: payload.irmRiskAssessmentHazardJoinedId,
      hazard: payload.hazard,
      index: payload.index,
    })
      .then(() => {
        setDeleteForm(undefined);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <EnhancedTableToolbarSimpleOption
        onNewClick={() => setAddEditForm({})}
        buttonLabel="general.addNew"
        editDisabled={disabled}
        title="general.hazardClassification"
      />
      <TableContainer2
        headerProps={{
          columnData: getColumnData(),
        }}
      >
        {data
          .sort((a, b) =>
            a.hazardClassification.name > b.hazardClassification.name ? 1 : -1
          )
          .map((hazard, index) => {
            return (
              <TableRow hover key={index}>
                <TableCell padding="none">
                  <div>
                    <div>{hazard.hazardClassification.name}</div>
                    <div
                      style={{
                        fontStyle: "italic",
                        marginTop: "0.25rem",
                        fontSize: "13px",
                      }}
                    >
                      {
                        hazard.hazardClassification
                          .path /* constructAncestorsPath(
                        hazard.hazardClassification,
                        hazadClassifications
                      ) */
                      }
                    </div>
                  </div>
                </TableCell>
                <TableCell>{hazard.hazardClassification.explanation}</TableCell>
                <TableCell
                  className="nostretch"
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    textAlign: "center",
                  }}
                >
                  <Tooltip title={<IntlMessages id="general.delete" />}>
                    <span>
                      <IconButton
                        disabled={disabled}
                        aria-label="Delete"
                        onClick={() => setDeleteForm({ ...hazard, index })}
                      >
                        <Delete />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
      </TableContainer2>
      {data.length === 0 && (
        <TableNoItems message="riskManagement.irm.noHazardSelected" />
      )}

      <DialogFormFrame
        onClose={() => setAddEditForm(undefined)}
        title={"riskManagement.irm.selectHazard"}
        open={Boolean(addEditForm)}
        maxWidth="lg"
        formComponent={
          <DialogFormAddEditHazard2
            initialData={addEditForm}
            onClose={() => setAddEditForm(undefined)}
            onSubmit={(payload) => {
              if (
                data.some(
                  (s) =>
                    s.hazardClassification.hazardClassificationId ===
                    payload.hazardClassification.hazardClassificationId
                )
              ) {
                setWarningExistingDialog(true);
                return Promise.reject();
              } else {
                return addEditApi(payload);
              }
            }}
            hazadClassifications={hazadClassifications}
          />
        }
      />

      <DialogDelete2
        data={deleteForm}
        text="general.deleteWarning"
        onSubmit={onDeleteSubmit}
        onClose={() => setDeleteForm(undefined)}
        disabled={loading}
      />
      <DialogGenericWarning
        onClose={() => setWarningUsedDialog(false)}
        open={warningUsedDialog}
        text={
          "riskManagement.irm.riskAssessment.hazardClassification.deleteWarning"
        }
      />
      <DialogGenericWarning
        onClose={() => setWarningExistingDialog(false)}
        open={warningExistingDialog}
        text={"report.evaluation.hazardClassification.duplicates.warning"}
      />
    </>
  );
}

const getColumnData = () => {
  return [
    {
      id: "hazard",
      numeric: false,
      disablePadding: true,
      label: "general.name",
    },
    {
      id: "explanation",
      numeric: false,
      label: "general.explanation",
    },
    {
      id: "actions",
      label: "general.actions",
      style: { textAlign: "center" },
    },
  ].filter((item) => item);
};

export default HazardClassificationTable2;
