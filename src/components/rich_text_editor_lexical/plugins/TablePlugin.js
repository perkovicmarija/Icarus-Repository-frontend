import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createNodeSelection,
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as React from "react";

import {$createTableNodeWithDimensions, TableNode} from "../nodes/TableNode";
import RichTextEditorTextInput from "../components/TextInput/RichTextEditorTextInput.js";
import {RichTextEditorDialogActions} from "../components/Dialog/RichTextEditorDialog.js";
import RichTextEditorButton from "../components/Button/RichTextEditorButton.js";
import {INSERT_TABLE_COMMAND} from "@lexical/table";

export default function invariant(cond, message, ...args) {
  if (cond) {
    return;
  }

  throw new Error(
    "Internal Lexical error: invariant() is meant to be replaced at compile " +
      "time. There is no runtime version."
  );
}
// @ts-ignore: not sure why TS doesn't like using null as the value?
export const CellContext = createContext({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  },
});

export function TableContext({ children }) {
  const [contextValue, setContextValue] = useState({cellEditorConfig: null,cellEditorPlugins: null})
  return (
    <CellContext.Provider
      value={useMemo(
        () => ({
          cellEditorConfig: contextValue.cellEditorConfig,
          cellEditorPlugins: contextValue.cellEditorPlugins,
          set: (cellEditorConfig, cellEditorPlugins) => {
            setContextValue({ cellEditorConfig, cellEditorPlugins });
          },
        }),
        [contextValue.cellEditorConfig, contextValue.cellEditorPlugins]
      )}
    >
      {children}
    </CellContext.Provider>
  );
}

export function InsertTableDialog({
                                    activeEditor,
                                    onClose,
                                  }) {
  const [rows, setRows] = useState('5');
  const [columns, setColumns] = useState('5');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const row = Number(rows);
    const column = Number(columns);
    if (row && row > 0 && row <= 500 && column && column > 0 && column <= 50) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [rows, columns]);

  const onClick = () => {
    const payload = {columns: columns, rows: rows}
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, payload);

    onClose();
  };

  return (
    <>
      <RichTextEditorTextInput
        placeholder={'# of rows (1-500)'}
        label="Rows"
        onChange={setRows}
        value={rows}
        data-test-id="table-modal-rows"
        type="number"
      />
      <RichTextEditorTextInput
        placeholder={'# of columns (1-50)'}
        label="Columns"
        onChange={setColumns}
        value={columns}
        data-test-id="table-modal-columns"
        type="number"
      />
      <RichTextEditorDialogActions data-test-id="table-model-confirm-insert">
        <RichTextEditorButton disabled={isDisabled} onClick={onClick}>
          Confirm
        </RichTextEditorButton>
      </RichTextEditorDialogActions>
    </>
  );
}

export function TablePlugin({ cellEditorConfig, children }) {
  const [editor] = useLexicalComposerContext();
  const cellContext = useContext(CellContext);

  useEffect(() => {
    if (!editor.hasNodes([TableNode])) {
      invariant(false, "TablePlugin: TableNode is not registered on editor");
    }

    cellContext.set(cellEditorConfig, children);

    return (
      editor.registerCommand
      (INSERT_TABLE_COMMAND,
      ({ columns, rows, includeHeaders }) => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          return true;
        }

        const focus = selection.focus;
        const focusNode = focus.getNode();

        if (focusNode !== null) {
          const tableNode = $createTableNodeWithDimensions(
            Number(rows),
            Number(columns),
            includeHeaders
          );

          if ($isRootOrShadowRoot(focusNode)) {
            const target = focusNode.getChildAtIndex(focus.offset);

            if (target !== null) {
              target.insertBefore(tableNode);
            } else {
              focusNode.append(tableNode);
            }

            tableNode.insertBefore($createParagraphNode());
          } else {
            const topLevelNode = focusNode.getTopLevelElementOrThrow();
            topLevelNode.insertAfter(tableNode);
          }

          tableNode.insertAfter($createParagraphNode());
          const nodeSelection = $createNodeSelection();
          nodeSelection.add(tableNode.getKey());
          $setSelection(nodeSelection);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR)
    );
  }, [cellContext, cellEditorConfig, children, editor]);

  return null;
}
