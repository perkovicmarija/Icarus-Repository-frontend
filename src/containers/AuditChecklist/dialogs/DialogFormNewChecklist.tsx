import { DialogContent, Grid } from "@mui/material";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../../../components/core/Fields/TextField2";
import { useState } from "react";
import AutocompleteLargeDataset2 from "../../../components/core/Fields/AutocompleteLargeDataset2";
import DateTimePickerCustom2 from "../../../components/core/Fields/DateTimePickerCustom2";
//
import {
  AuditChecklist,
  AuditChecklistDomain,
  AuditChecklistType,
} from "../../../redux/auditChecklistsSlice";

const DialogFormNewChecklist = ({
  initialData,
  onClose,
  onSubmit,
  //
  domains,
  types,
}: {
  initialData: AuditChecklist | {};
  onClose: () => void;
  onSubmit: (payload: AuditChecklist) => Promise<any>;
  domains: AuditChecklistDomain[];
  types: AuditChecklistType[];
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: initialData,
  });
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          setLoading(true);
          onSubmit(data as AuditChecklist)
            .then(onClose)
            .catch(() => setLoading(false));
        })(e);
      }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="general.title"
              name="title"
              rules={{ required: "general.required" }}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField2
              control={control}
              label="qms.checklist.version"
              name="version"
              rules={{ required: "general.required" }}
              placeholder="qms.checklist.version"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField2
              control={control}
              label="general.abbreviation"
              name="abbreviation"
              rules={{ required: "general.required" }}
              placeholder="general.abbreviation"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <DateTimePickerCustom2
              control={control}
              label="qms.checklist.effectiveDate"
              name="effective"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <AutocompleteLargeDataset2
              control={control}
              label="qms.checklist.domain"
              name="domain"
              options={domains}
              keyProp="domainId"
              labelProp="name"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField2
              control={control}
              label="qms.checklist.objectives"
              name="objectives"
              placeholder="qms.checklist.objectives"
              multiline
              rows={5}
            />
          </Grid>

          <Grid item xs={12}>
            <AutocompleteLargeDataset2
              control={control}
              label="general.type"
              name="auditChecklistType"
              options={types}
              keyProp="auditChecklistTypeId"
              labelProp="name"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
};

export default DialogFormNewChecklist;
