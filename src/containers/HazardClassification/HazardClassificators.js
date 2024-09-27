import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetHazardClassificationsQuery, useCreateUpdateHazardClassificationMutation, useDeleteHazardClassificationMutation } from "../../redux/hazardClassification/hazardClassificationApi";
import { LayoutWrapper } from "../../components/core/LayoutWrapper";
import MultilevelHazardClassification from "../../components/hazard-classification/MultilevelHazardClassification";

function HazardClassificators() {
  const dispatch = useDispatch();

  const [dialogExportOpen, setDialogExportOpen] = useState(false);

  

  const [triggerAddEdit] = useCreateUpdateHazardClassificationMutation();

  const [triggerDelete] = useDeleteHazardClassificationMutation();

  const [loading, setLoading] = useState(false);

  return (
    <LayoutWrapper>
      <MultilevelHazardClassification
        values={data?.data}
        onSelect={() => {}}
        selectedValue={undefined}
        showSearchOption={true}
        onAddEdit={(payload) => {
          setLoading(true);
          return triggerAddEdit(payload)
            .unwrap()
            .then(() => setLoading(false));
        }}
        onDelete={(payload) => {
          setLoading(true);
          return triggerDelete(payload.hazardClassificationId)
            .unwrap()
            .then(() => setLoading(false));
        }}
        loading={loading}
      />

      {/* <DialogFormFrame
        onClose={() => setDialogExportOpen(false)}
        title="riskManagement.hazard.export"
        open={dialogExportOpen}
        formComponent={
          <DialogFormExport
            onClose={() => setDialogExportOpen(false)}
            onSubmit={({ exportType }) => {
              if (exportType === "pdf") {
                dispatch(hazardActions.exportPdf());
              } else {
                dispatch(hazardActions.exportExcel());
              }
            }}
          />
        }
      /> */}
    </LayoutWrapper>
  );
}

export default HazardClassificators;
