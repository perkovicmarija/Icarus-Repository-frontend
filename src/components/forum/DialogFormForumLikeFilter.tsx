import {DialogContent, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import {DialogActions2} from "../core/Dialog/DialogActions2";
import TextField2 from "../core/Fields/TextField2";
import {FiltersType, initFilters} from "../../redux/forum/forumLikes/forumLikesSlice";
import SelectCustom2 from "../core/Fields/SelectCustom2";
import {Client} from "../../redux/settings/clientsApi";
import {ForumLike} from "../../redux/forum/forumLikes/forumLikesApi";
import DateTimePickerCustom2 from "../core/Fields/DateTimePickerCustom2";
import React from "react";

function DialogFormForumLikeFilter({
  initialData,
  onClose,
  onSubmit,
  clients,
}: {
  initialData: FiltersType;
  onClose: () => void;
  onSubmit: (payload: FiltersType) => void;
  clients: Client[]
}) {
  const { handleSubmit, control, reset } = useForm({
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
          <Grid item xs={12}>
            <TextField2
                control={control}
                label="forum.displayName"
                name="forumUserCreatedDisplayName"
            />
          </Grid>
          <Grid item xs={12}>
            <SelectCustom2
                labelProp="name"
                control={control}
                label="general.company"
                options={clients}
                name="client"
                keyProp="clientId"
            />
          </Grid>
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

        </Grid>
      </DialogContent>
      <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
    </form>
  );
}

export default DialogFormForumLikeFilter;
