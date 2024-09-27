import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";
import { Entity } from "../../redux/reportHazardIdentification/reportHazardIdentificationApi";

const useStyles = makeStyles(() => ({
  container: {
    borderColor: "#021b43",
    borderStyle: "solid",
    borderWidth: "0.1rem",
    color: "#021b43",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "1rem",
    margin: "1rem",
    gap: "1rem",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "start",
    alignItems: "center",
  },
  nerContainer: {
    gap: "1rem",
    justifyContent: "start",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
    maxHeight: "400px",
    overflowY: "auto",
    marginLeft: "1.5rem",
  },
  entityContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  entityText: {
    flex: 1,
    borderColor: "#021b43",
    borderStyle: "solid",
    borderWidth: "0.1rem",
    borderRadius: "0.5rem",
    color: "#021b43",
    padding: "0.25rem 1rem",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  entityLabel: {
    flex: 1,
    backgroundColor: "#021b43",
    borderRadius: "0.5rem",
    color: "#ffb300",
    padding: "0.25rem 1rem",
    fontWeight: "bold",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.25rem",
    textAlign: "center",
  },
  token: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    padding: "0.25rem 1rem",
  },
}));

interface ReportHazardIdentificationTextProps {
  entities: Entity[];
  xs: number;
}

const ReportHazardIdentificationNER = (props: ReportHazardIdentificationTextProps) => {
  const classes = useStyles();

  return (
    <Grid item container xs={props.xs} className={classes.container}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" className={classes.title}>
          <FormattedMessage id="reportHazardIdentification.ner" />
        </Typography>
      </Grid>
      <Grid item container className={classes.nerContainer}>
        {props.entities.map((entity, id) => (
          <div key={id} className={classes.entityContainer}>
            <div className={classes.entityText}>
              <label>{entity.text}</label>
            </div>
            <div className={classes.entityLabel}>
              <label>{entity.label}</label>
            </div>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default ReportHazardIdentificationNER;
