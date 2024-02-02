import {FiltersType, initFilters} from "../../redux/logger/loggerSlice";
import {useForm} from "react-hook-form";
import {DialogActions2} from "../core/Dialog/DialogActions2";
import DateTimePickerCustom2 from "../core/Fields/DateTimePickerCustom2";
import Grid from "@mui/material/Grid";
import {DialogContent} from "@mui/material";

function DialogFormLoggerFilters({
                                            initialData,
                                            onClose,
                                            onSubmit,
                                        }: {
    initialData: FiltersType;
    onClose: () => void;
    onSubmit: (payload: any) => void;
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
                        <DateTimePickerCustom2
                            control={control}
                            label="general.startDate"
                            name="startDate"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DateTimePickerCustom2
                            control={control}
                            label="general.endDate"
                            name="endDate"
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions2 onClose={onClose} onClear={() => reset(initFilters)} />
        </form>
    );
}

export default DialogFormLoggerFilters;
