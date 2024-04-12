import { DialogContent, Grid } from "@mui/material";
import { DialogActions2 } from "../core/Dialog/DialogActions2";
import { useForm } from "react-hook-form";
import TextField2 from "../core/Fields/TextField2";
import AutocompleteMultiLargeDataset2 from "../core/Fields/AutocompleteMultiLargeDataset2";
import SwitchCustom2 from "../core/Fields/SwitchCustom2";
import { useState } from "react";
//
import { Button, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { protectedAuth } from "../../protectedAuth";
import { User } from "../../redux/user/usersSlice";
//

const UserForm = ({
  initialData,
  onClose,
  onSubmit,
  //
  userRoles,
}: {
  initialData: User | {};
  onClose: () => void;
  onSubmit: (
    payload: User & { newPassword: boolean; generatePassword: boolean }
  ) => Promise<any>;
  userRoles: any[];
}) => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      ...initialData,
      newPassword: false,
      generatePassword: false,
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const newPassword = watch("newPassword");
  const generatePassword = watch("generatePassword");

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit((data) => {
          setLoading(true);
          onSubmit(
            data as User & { newPassword: boolean; generatePassword: boolean }
          )
            .then(onClose)
            .catch(() => setLoading(false));
        })(e);
      }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          {"deactivated" in initialData && initialData.deactivated && (
            <>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: red[500],
                    width: "100%",
                    textAlign: "center",
                  }}
                  variant="h6"
                >
                  THIS USER IS DEACTIVATED
                </Typography>
              </Grid>

              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  sx={{
                    color: (theme) => theme.palette.getContrastText(red[500]),
                    backgroundColor: red[500],
                    "&:hover": {
                      backgroundColor: red[700],
                    },
                  }}
                  variant="contained"
                  color="secondary"
                  // onClick={onReactivateUserClick}
                >
                  Reactivate user
                </Button>
              </Grid>
            </>
          )}

          <Grid item sm={6} xs={12}>
            <TextField2
              control={control}
              label="form.name"
              name="name"
              rules={{ required: "general.required" }}
              placeholder="form.name"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField2
              control={control}
              label="form.surname"
              name="surname"
              rules={{ required: "general.required" }}
              placeholder="form.surname"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField2
              control={control}
              label="form.username"
              name="username"
              rules={{ required: "general.required" }}
              placeholder="form.username"
              textFieldProps={
                {
                  /* autoComplete: "username", */
                  /* autoComplete: "new-password", */
                }
              }
            />
          </Grid>

          {"userId" in initialData ? (
            <Grid
              item
              sm={6}
              xs={12}
              style={{ display: "flex", alignItems: "flex-end" }}
            >
              <SwitchCustom2
                control={control}
                name="newPassword"
                inlineLabel="form.newPassword"
              />
            </Grid>
          ) : (
            <Grid item sm={6} xs={0} />
          )}

          {(("userId" in initialData && newPassword) ||
            !("userId" in initialData)) && (
            <>
              <Grid
                item
                sm={6}
                xs={12}
                style={{ display: "flex", alignItems: "flex-end" }}
              >
                <SwitchCustom2
                  control={control}
                  name="generatePassword"
                  inlineLabel="form.generatePassword"
                />
              </Grid>

              {!generatePassword && (
                <Grid item sm={6} xs={12}>
                  <TextField2
                    control={control}
                    label="form.password"
                    name="password"
                    rules={{ required: "general.required" }}
                    textFieldProps={{
                      type: "password",
                      autoComplete: "new-password",
                    }}
                  />
                </Grid>
              )}
            </>
          )}

          <Grid item xs={12}>
            <TextField2
              control={control}
              label="form.email"
              name="email"
              rules={{ required: "general.required" }}
              placeholder="form.email"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField2
              control={control}
              label="form.phone1"
              name="phone1"
              rules={{ required: "general.required" }}
              placeholder="form.phone1"
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField2 control={control} label="form.phone2" name="phone2" />
          </Grid>

          {protectedAuth(["PERM_USER_CRUD"]) && (
            <Grid item xs={12}>
              <AutocompleteMultiLargeDataset2
                control={control}
                label="form.roles"
                name="userRoles"
                options={userRoles}
                keyProp="userRoleId"
                labelProp="name"
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions2 onClose={onClose} loading={loading} />
    </form>
  );
};

export default UserForm;
