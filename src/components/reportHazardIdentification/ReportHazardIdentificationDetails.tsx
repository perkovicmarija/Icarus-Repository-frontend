import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";
import { User } from "../../redux/user/usersApi";

const useStyles = makeStyles(() => ({
  labelCustom: {
    fontWeight: "bold",
    marginRight: "0.25rem",
  },
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
  title: {
    fontWeight: "bold",
    fontSize: "1.25rem",
    textAlign: "center",
  },
}));

interface ReportHazardIdentificationTextProps {
  title: string;
  userCreated: User;
  date: string;
  xs: number;
}

const ReportHazardIdentificationDetails = (props: ReportHazardIdentificationTextProps) => {
  const classes = useStyles();

  return (
    <Grid item container xs={props.xs} alignContent={"center"} textAlign={"center"}>
      <Grid item xs={12} padding={2} marginX={2} className={classes.container}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="subtitle1" className={classes.title}>
            <FormattedMessage id="reportHazardIdentification.details" />
          </Typography>
        </Grid>
        <Grid item container xs={12} textAlign="center">
          <Grid item xs={4}>
            <label className={classes.labelCustom}>
              <FormattedMessage id="general.title" />:
            </label>
            <label>{props.title}</label>
          </Grid>
          <Grid item xs={4}>
            <label className={classes.labelCustom}>
              <FormattedMessage id="qms.checklist.createdBy" />:
            </label>
            <label>
              {props.userCreated ? `${props.userCreated.surname} ${props.userCreated.name}` : "-"}
            </label>
          </Grid>
          <Grid item xs={4}>
            <label className={classes.labelCustom}>
              <FormattedMessage id="general.created" />:
            </label>
            <label>{props.date}</label>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReportHazardIdentificationDetails;
