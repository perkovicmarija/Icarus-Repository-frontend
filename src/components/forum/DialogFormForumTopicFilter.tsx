import React from 'react'
import {useForm} from "react-hook-form";
import DateTimePickerCustom2 from "../core/Fields/DateTimePickerCustom2";
import {DialogActions2} from "../core/Dialog/DialogActions2";
import {DialogContent, Grid} from "@mui/material";
import {FiltersType, initFilters} from "../../redux/forum/forumTopics/forumTopicsSlice";
import TextField2 from "../core/Fields/TextField2";

const DialogFormForumTopicFilter = ({
                                      initialData,
                                      onClose,
                                      onSubmit,
                                    }: {
  initialData: FiltersType;
  onClose: () => void;
  onSubmit: (payload: FiltersType) => void;
}) => {
  const {handleSubmit, control, reset} = useForm({
    defaultValues: initialData,
  });
  
  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          onSubmit(data);
          onClose();
        })(e);
      }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <DateTimePickerCustom2
              control={control}
              label="general.startDate"
              name="dateFrom"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <DateTimePickerCustom2
              control={control}
              label="general.endDate"
              name="dateTo"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="general.title"
              name="title"
              placeholder="general.title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="forum.content"
              name="content"
              placeholder="forum.content"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)}/>
    </form>
  );
};
export default DialogFormForumTopicFilter
