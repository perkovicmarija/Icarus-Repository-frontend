import { Grid, Typography, Tooltip, Button, emphasize } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";
import { SpellCheckSuggestion, Token } from "../../redux/reportHazardIdentification/reportHazardIdentificationApi";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#ffb300",
    color: "#021b43",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "1rem",
    margin: "1rem",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.25rem",
    textAlign: "center",
  },
  token: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    textAlign: "center",
    alignContent: "center"
  },
  tokenLabel: {
    padding: "0.25rem 1rem",
    textAlign: "center",
    alignContent: "center",
    width: "inherit",
    height: "inherit",
  },
  tokenButton: {
    padding: "0.25rem 1rem",
    textAlign: "center",
    alignContent: "center",
    width: "inherit",
    height: "inherit",
    color: "#ffffff",
    backgroundColor: "#021b43",
    textTransform: "unset",
    "&:hover, &:focus": {
      backgroundColor: "#ffffff",
      color: "#ffb300",
    },
  },
}));

interface ReportHazardIdentificationTokenizationProps {
  tokens: Token[];
  spellCheckSuggestions: SpellCheckSuggestion[];
  onTokenEdit: (tokenId: string, spellCheckSuggestionId: string) => Promise<any>;
}

const ReportHazardIdentificationTokenization = (props: ReportHazardIdentificationTokenizationProps) => {
  const classes = useStyles();

  const handleClick = (token: Token, suggestion: SpellCheckSuggestion) => {
    alert(`Are you sure you want to change token: ${token.text} with suggestion: ${suggestion.suggestion}`)
    props.onTokenEdit(token.id, suggestion.id)
  };

  return (
    <Grid item container gap={2} className={classes.container}>
      <Grid item xs={12} textAlign="center">
        <Typography variant="subtitle1" className={classes.title}>
          <FormattedMessage id="reportHazardIdentification.tokenization" />
        </Typography>
      </Grid>
      {props.tokens.map((token, id) => {
        const suggestion = props.spellCheckSuggestions?.find(
          (suggestion) => suggestion.error === token.text
        );
        
        return (
          <Grid item key={id} className={classes.token}>
            {suggestion ? (
              <Tooltip title={`Suggested change: ${suggestion.suggestion}`}>
                <Button onClick={() => handleClick(token, suggestion)} className={classes.tokenButton}>
                  {token.text}
                </Button>
              </Tooltip>
            ) : (
              <label className={classes.tokenLabel}>{token.text}</label>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ReportHazardIdentificationTokenization;
