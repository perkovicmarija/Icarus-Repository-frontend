import toolbarIconsList from "./toolbarIconsList.js";
import { createPortal } from "react-dom";
import FloatingLinkEditorPlugin from "../FloatingLinkEditor/FloatingLinkEditorPlugin.js";
import topBarClickListener from "./topBarClickListener.js";
import {forwardRef} from "react";
import React from "react";
import {Grid} from "@mui/material";
import {Box} from "@mui/system";


export const TopBarPlugin = forwardRef((props,ref) => {
    const { onClick, selectedEventTypes, blockType, isLink, editor, modal } =
        topBarClickListener(ref);

    const isIconSelected = (plugin) =>
        selectedEventTypes.includes(plugin.event) ||
        blockType.includes(plugin.event);

    return (
        <Box>
            <Grid
                container
                // justifyContent="space-evenly"
                spacing={1}
                alignItems="center"
                sx={{ background: "white", py: 1.5, px: 0.5 }}
            >
                {toolbarIconsList.map((plugin) => (
                    <Grid
                        key={plugin.id}
                        sx={{
                            cursor: "pointer",
                        }}
                        item
                    >
                        {
                            <plugin.Icon
                                sx={plugin.iconSx}
                                onClick={() => onClick(plugin.event)}
                                color={isIconSelected(plugin) ? "secondary" : undefined}
                            />
                        }
                    </Grid>
                ))}
                {modal}
                {isLink &&
                    createPortal(
                        <FloatingLinkEditorPlugin editor={editor} />,
                        document.body
                    )}
            </Grid>
        </Box>
    );
});