/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {$wrapNodeInElement, CAN_USE_DOM, mergeRegister} from "@lexical/utils";
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
} from "lexical";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import {forwardRef} from "react";

import {
  $createImageNode,
  $isImageNode,
  ImageNode,
} from "../nodes/ImageNode/ImageNode.js";
import {RichTextEditorDialogActions} from "../components/Dialog/RichTextEditorDialog.js";
import {Box, Button, Grid, Paper, TextField} from "@mui/material";
import {LayoutWrapper} from "../../core/LayoutWrapper.jsx";
import IntlMessages from "../../core/IntlMessages.jsx";
import {AddCircle} from "@mui/icons-material";

const getDOMSelection = (targetWindow) =>
    CAN_USE_DOM ? (targetWindow || window).getSelection() : null;

export const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");

export function InsertImageUriDialogBody({ onClick }) {
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisabled = src === "";

  return (
      <>
        <TextField
            label="Image URL"
            placeholder="i.e. https://source.unsplash.com/random"
            onChange={(e) => setSrc(e.target.value)}
            value={src}
            sx={{ mb: 7, height: 10 }}
            fullWidth
        />
        <TextField
            label="Alt Text"
            placeholder="Random unsplash image"
            onChange={(e) => setAltText(e.target.value)}
            sx={{ mb: 7, height: 10 }}
            fullWidth
            value={altText}
            data-test-id="image-modal-alt-text-input"
        />
        <Grid container justifyContent="flex-end">
          <Button
              data-test-id="image-modal-confirm-btn"
              disabled={isDisabled}
              onClick={() => onClick({ altText, src })}
              variant="outlined"
          >
            Confirm
          </Button>
        </Grid>
      </>
  );
}

export function InsertImageUploadedDialogBody({ onClick }) {
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisabled = src === "";

  const loadImage = (files) => {
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === "string") {
        setSrc(reader.result);
        // onClick({altText: altText, src: reader.result});
      }
      return "";
    };
    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  };

  return (
      <>
        <Paper style={{ marginTop: "1rem" }}>
          <LayoutWrapper>
            <Button sx={{ mb: 1 , }} variant="contained" component="label">
              <AddCircle />
              <input
                  onChange={(e) => loadImage(e.target.files)}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
              />
            </Button>

            {/*<TextField*/}
            {/*  label="Alt Text"*/}
            {/*  placeholder="Descriptive alternative text"*/}
            {/*  onChange={(e) => setAltText(e.target.value)}*/}
            {/*  value={altText}*/}
            {/*  sx={{ mb: 7, height: 10 }}*/}
            {/*  fullWidth*/}
            {/*  variant="standard"*/}
            {/*  data-test-id="image-modal-alt-text-input"*/}
            {/*/>*/}
            <RichTextEditorDialogActions data-test-id="image-modal-confirm-btn">
              <Button onClick={() => onClick({ altText, src })} disabled={isDisabled}>
                <IntlMessages id="action.add" />
              </Button>
            </RichTextEditorDialogActions>
          </LayoutWrapper>
        </Paper>
      </>
  );
}

export const InsertImageDialog = forwardRef(function InsertImageDialog(
    { activeEditor, onClose },
    ref
) {
  const [mode, setMode] = useState(null);
  const hasModifier = useRef(false);
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisabled = src === "";

  const loadImage = (files) => {
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === "string") {
        setSrc(reader.result);
      }
      return "";
    };
    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  };
  useEffect(() => {
    if (src != null && src !== "") {
      onClick({ altText, src });
    }
  }, [src]);
  // useEffect(() => {
  //   hasModifier.current = false;
  //   const handler = (e) => {
  //     hasModifier.current = e.altKey;
  //   };
  //   document.addEventListener("keydown", handler);
  //   return () => {
  //     document.removeEventListener("keydown", handler);
  //   };
  // }, [activeEditor]);

  const onClick = (payload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    setSrc("");
    onClose();
  };

  return (
      <div ref={ref}>
        <Paper style={{ marginTop: "1rem", display: 'flex', justifyContent: 'center'}}>
          <Box  sx={{
            padding: ["1rem 0.75rem"],
            width: "100%",
            height: "100%",
            overflow: "auto",
            justifyContent: "center",
            display: "flex"
          }}>
            <Button sx={{ mb: 1 , borderRadius: '50px'}} variant="contained" component="label">
              <AddCircle />
              <input
                  ref={ref}
                  onChange={(e) => loadImage(e.target.files)}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
              />
            </Button>
          </Box>
        </Paper>
      </div>
  );
})

export default function ImagesPlugin({ captionsEnabled }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
        editor.registerCommand(
            INSERT_IMAGE_COMMAND,
            (payload) => {
              const imageNode = $createImageNode(payload);
              $insertNodes([imageNode]);
              if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
              }

              return true;
            },
            COMMAND_PRIORITY_EDITOR
        ),
        editor.registerCommand(
            DRAGSTART_COMMAND,
            (event) => {
              return onDragStart(event);
            },
            COMMAND_PRIORITY_HIGH
        ),
        editor.registerCommand(
            DRAGOVER_COMMAND,
            (event) => {
              return onDragover(event);
            },
            COMMAND_PRIORITY_LOW
        ),
        editor.registerCommand(
            DROP_COMMAND,
            (event) => {
              return onDrop(event, editor);
            },
            COMMAND_PRIORITY_HIGH
        )
    );
  }, [captionsEnabled, editor]);

  return null;
}

const TRANSPARENT_IMAGE =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const img = document.createElement("img");
img.src = TRANSPARENT_IMAGE;

function onDragStart(event) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) {
    return false;
  }
  dataTransfer.setData("text/plain", "_");
  dataTransfer.setDragImage(img, 0, 0);
  dataTransfer.setData(
      "application/x-lexical-drag",
      JSON.stringify({
        data: {
          altText: node.__altText,
          caption: node.__caption,
          height: node.__height,
          key: node.getKey(),
          maxWidth: node.__maxWidth,
          showCaption: node.__showCaption,
          src: node.__src,
          width: node.__width,
        },
        type: "image",
      })
  );

  return true;
}

function onDragover(event) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  if (!canDropImage(event)) {
    event.preventDefault();
  }
  return true;
}

function onDrop(event, editor) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const data = getDragImageData(event);
  if (!data) {
    return false;
  }
  event.preventDefault();
  if (canDropImage(event)) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
  }
  return true;
}

function getImageNodeInSelection() {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}

function getDragImageData(event) {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag");
  if (!dragData) {
    return null;
  }
  const { type, data } = JSON.parse(dragData);
  if (type !== "image") {
    return null;
  }

  return data;
}

function canDropImage(event) {
  const target = event.target;
  return !!(
      target &&
      target instanceof HTMLElement &&
      !target.closest("code, span.editor-image") &&
      target.parentElement &&
      target.parentElement.closest("div.ContentEditable__root")
  );
}

function getDragSelection(event) {
  let range;
  const target = event.target;
  const targetWindow =
      target == null
          ? null
          : target.nodeType === 9
              ? target.defaultView
              : target.ownerDocument.defaultView;
  const domSelection = getDOMSelection(targetWindow);
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }

  return range;
}
