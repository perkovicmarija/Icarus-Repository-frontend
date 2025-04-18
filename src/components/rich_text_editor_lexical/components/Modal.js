import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {ModalDialog} from "@material-ui/pickers/_shared/ModalDialog.js";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
};

export default function ModalWrapper({ open, onClose, children, title }) {
    return (
        <div>
            <ModalDialog
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        sx={{ px: 1 }}
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {title}
                    </Typography>
                    <Divider />
                    <Box sx={{ p: 2 }}>{children}</Box>
                </Box>
            </ModalDialog>
        </div>
    );
}