import {ForumTag} from "../../redux/forum/forumTags/forumTagsApi";
import {useForm} from "react-hook-form";
import {useState} from "react";
import TextField2 from "../core/Fields/TextField2";
import SwitchCustom2 from "../core/Fields/SwitchCustom2";
import {DialogActions2} from "../core/Dialog/DialogActions2";
import {DialogContent, Grid} from "@mui/material";


const DialogFormForumTag = ({
                              initialData,
                              onClose,
                              onSubmit,
                            }: {
  initialData: ForumTag | {};
  onClose: () => void;
  onSubmit: (payload: ForumTag) => Promise<any>;
}) => {
  const {handleSubmit, control} = useForm({
    defaultValues: initialData,
  });
  const [loading, setLoading] = useState(false);
  
  
  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          setLoading(true);
          onSubmit(data as ForumTag)
            .then(onClose)
            .catch(() => setLoading(false));
        })(e);
      }}
    >
      <DialogContent>
        <Grid container style={{rowGap: "1.5rem"}}>
          <Grid item xs={12}>
            <TextField2
              control={control}
              label="form.name"
              name="name"
              defaultValue=""
              rules={{required: "general.required"}}
            />
          </Grid>
          
          <Grid item xs={12}>
            <SwitchCustom2
              control={control}
              label="client.deactivated"
              name="deactivated"
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions2 onClose={onClose} loading={loading}/>
    </form>
  )
}
export default DialogFormForumTag
