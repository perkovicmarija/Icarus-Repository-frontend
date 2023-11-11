import { DialogContent, Grid } from "@mui/material";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../../../components/core/Fields/TextField2";
import { useState } from "react";
import AutocompleteLargeDataset2 from "../../../components/core/Fields/AutocompleteLargeDataset2";
import DateTimePickerCustom2 from "../../../components/core/Fields/DateTimePickerCustom2";
import {
  AuditChecklist,
  AuditChecklistDomain,
} from "../../../redux/auditChecklistsSlice";
import TypographyFieldTitle from "../../../components/core/TypographyFieldTitle";
//

const DialogFormNewChecklistVersion = ({
  initialData,
  onClose,
  onSubmit,
  //
  domains,
}: {
  initialData: AuditChecklist;
  onClose: () => void;
  onSubmit: (payload: AuditChecklist) => Promise<any>;
  domains: AuditChecklistDomain[];
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      ...initialData,
      version: "",
      abbreviation: "",
      effective: null,
      domain: null,
      objectives: "",
    },
  });
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          setLoading(true);
          onSubmit(data)
            .then(onClose)
            .catch(() => setLoading(false));
        })(e);
      }}
    >
      <DialogContent>
        <div style={{ background: "azure", paddingBottom: "1rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <strong>
                <label>CURRENT VERSION</label>
              </strong>
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypographyFieldTitle title="general.title" />
              <br />
              <label>{initialData.title}</label>
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypographyFieldTitle title="qms.checklist.version" />
              <br />
              <label>{initialData.version}</label>
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypographyFieldTitle title="general.abbreviation" />
              <br />
              <label>{initialData.abbreviation}</label>
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={2} style={{ marginTop: "2rem" }}>
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
              rows="5"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
};
export default DialogFormNewChecklistVersion;
