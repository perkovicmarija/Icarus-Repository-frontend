import {LexicalComposer} from "@lexical/react/LexicalComposer";
import TopBarPlugin from "../TopBar/TopBarPlugin.js";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import TreeViewPlugin from "../TreeViewPlugin.js";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "../ImagePlugin.js";
import FloatingTextFormatToolbarPlugin from "../FloatingTextEditor/FloatingTextEditorPlugin.js";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect, useLayoutEffect, useState} from "react";
import {lexicalEditorConfig} from "../../config/lexicalEditorConfig.js";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {$getRoot, $getSelection} from "lexical";
import {$generateHtmlFromNodes} from "@lexical/html";
import {TableHoverActionsPlugin} from "../TableHoverActionsPlugin.js";
import TableCellResizerPlugin from "../TableCellResizer/TableCellResizerPlugin.js";
import {TablePlugin} from "@lexical/react/LexicalTablePlugin";
import {TableContext} from "../TablePlugin.js";
import TableActionMenuPlugin from "../Table/TableActionMenuPlugin.js";
import {Box, Divider} from "@mui/material";
import {styled} from "@mui/styles";

export const MuiContentEditable = styled(ContentEditable)({
  minHeight: 200,
  width: "100%",
  padding: "0 8px",
  borderRadius: 5,
  paddingTop: 2,
  paddingLeft: 10,
  position: "relative",
  outline: "none",
});

export const placeHolderSx = {
  position: "absolute",
  top: 15,
  left: 10,
  userSelect: "none",
  display: "inline-block",
  pointerEvents: "none",
};

const StyledContentEditable = styled(ContentEditable)((props) => ({
  padding: props.disabled ? "0" : "0rem 0.25rem",
  minHeight: props.disabled ? "initial" : "100px",
  border: props.disabled ? "none" : "1px solid black",
  overflowX: "auto",
  borderRadius: "5px",
  marginTop: "0.25rem",
  ">p:first-of-type": {
    marginTop: props.disabled ? "0.25rem" : "0.5rem",
  },
  ">p:last-of-type": {
    marginBottom: "0.5rem",
  },
}));


function LexicalEditorWrapper({setEditor}) {

  const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);

  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={lexicalEditorConfig}>
      <TableContext>
        <Dummy setEditor={setEditor} />
        <TopBarPlugin />
        <Divider />
        <Box sx={{ position: "relative", background: "white" }}>
          <RichTextPlugin
            contentEditable={<StyledContentEditable spellCheck="false" />}
            // placeholder={<Box sx={placeHolderSx}>Enter some text...</Box>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          {/*<TreeViewPlugin />*/}
          <ListPlugin />
          <LinkPlugin />
          <ImagesPlugin captionsEnabled={false} />
          <FloatingTextFormatToolbarPlugin />
          <TablePlugin />
          <TableHoverActionsPlugin />
          <TableCellResizerPlugin />

        </Box>
        {/*{floatingAnchorElem && (*/}
        {/*  <>*/}
        {/*    <TableActionMenuPlugin anchorElem={floatingAnchorElem} />*/}
        {/*  </>*/}
        {/*)}*/}
      </TableContext>
    </LexicalComposer>
  );
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState, editor) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    // console.log($generateHtmlFromNodes(editor));
    // console.log(root, selection);
  });
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

const Dummy = ({ setEditor }) => {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    setEditor(editor);
  }, [editor]);
  return null;
};

export default LexicalEditorWrapper;