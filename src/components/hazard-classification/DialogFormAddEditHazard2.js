import React, { useState } from "react";
import MultilevelHazardClassification from "./MultilevelHazardClassification";
import IntlMessages from "../core/IntlMessages";
import { Button, Grid, DialogActions, DialogContent } from "@mui/material";

function DialogFormAddEditHazard2({
  initialData,
  onClose,
  onSubmit,
  disabled,

  hazadClassifications,
}) {
  const [data, setData] = useState({
    hazardClassification: undefined,
    ...initialData,
  });

  const [loading, setLoading] = useState(false);

  const onHazardChange = (e, value) => {
    setData({
      ...data,
      hazardClassification: value,
    });
  };

  return (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MultilevelHazardClassification
              values={hazadClassifications}
              onSelect={onHazardChange}
              selectedValue={data.hazardClassification}
              showSearchOption={true}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          <IntlMessages id="action.cancel" />
        </Button>
        <Button
          disabled={
            disabled || loading || data.hazardClassification === undefined
          }
          onClick={() => {
            setLoading(true);
            onSubmit(data)
              .then(() => {
                onClose();
              })
              .catch(() => setLoading(false));
          }}
        >
          <IntlMessages id="action.submit" />
        </Button>
      </DialogActions>
    </>
  );
}

export default DialogFormAddEditHazard2;
