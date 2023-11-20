import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(() => ({
  labelCustom: {
    marginLeft: "10px",
    fontWeight: "bold",
  },
  labelCustomValue: {
    paddingLeft: "10px",
  },
  labelCustomValuePublished: {
    paddingLeft: "10px",
    fontWeight: "bold",
    color: "green",
  },
  labelCustomValueDraft: {
    paddingLeft: "10px",
    fontWeight: "bold",
  },
}));

export const AuditChecklistInfo = ({ checklistDnd }: any) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item sm={2} xs={12}>
        <label className={classes.labelCustom}>
          <FormattedMessage id="general.id" />:
        </label>
        <label className={classes.labelCustomValue}>
          {checklistDnd.auditChecklist.abbreviation}
        </label>
      </Grid>
      <Grid item sm={2} xs={12}>
        <label className={classes.labelCustom}>
          <FormattedMessage id="qms.checklist.domain" />:
        </label>
        <label className={classes.labelCustomValue}>
          {checklistDnd.auditChecklist.domain !== null
            ? checklistDnd.auditChecklist.domain.name
            : "-"}
        </label>
      </Grid>
      <Grid item sm={2} xs={12}>
        <label className={classes.labelCustom}>
          <FormattedMessage id="qms.checklist.version" />:
        </label>
        <label className={classes.labelCustomValue}>
          {checklistDnd.auditChecklist.version}
        </label>
      </Grid>
      <Grid item sm={2} xs={12}>
        <label className={classes.labelCustom}>
          <FormattedMessage id="qms.checklist.effectiveDate" />:
        </label>
        <label className={classes.labelCustomValue}>
          {checklistDnd.auditChecklist.effectiveDate}
        </label>
      </Grid>
      <Grid item sm={2} xs={12}>
        <label className={classes.labelCustom}>
          <FormattedMessage id="qms.checklist.createdBy" />:
        </label>
        <label className={classes.labelCustomValue}>
          {checklistDnd.auditChecklist.userCreated !== null
            ? checklistDnd.auditChecklist.userCreated.surname +
              " " +
              checklistDnd.auditChecklist.userCreated.name
            : "-"}
        </label>
      </Grid>
      <Grid item sm={2} xs={12}>
        <label className={classes.labelCustom}>
          <FormattedMessage id="general.status" />:
        </label>
        {checklistDnd.auditChecklist.published ? (
          <label className={classes.labelCustomValuePublished}>PUBLISHED</label>
        ) : (
          <label className={classes.labelCustomValueDraft}>DRAFT</label>
        )}
      </Grid>
    </Grid>
  );
};
