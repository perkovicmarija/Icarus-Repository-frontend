import {
  Code,
  FormatAlignJustifyOutlined, FormatAlignLeftOutlined, FormatAlignRightOutlined,
  FormatBoldOutlined,
  FormatItalicOutlined, FormatListBulleted, FormatListNumbered, ImageOutlined,
  RedoOutlined, TableChartOutlined,
  UndoOutlined
} from "@mui/icons-material";


export const eventTypes = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  ul: "ul",
  ol: "ol",
  quote: "quote",
  formatCode: "formatCode",
  formatUndo: "formatUndo",
  formatRedo: "formatRedo",
  formatBold: "formatBold",
  formatItalic: "formatItalic",
  formatUnderline: "formatUnderline",
  formatStrike: "formatStrike",
  formatInsertLink: "formatInsertLink",
  formatAlignLeft: "formatAlignLeft",
  formatAlignCenter: "formatAlignCenter",
  formatAlignRight: "formatAlignRight",
  insertImage: "insertImage",
  insertTable: "insertTable",
};

const pluginsList = [
  // {
  //   id: 1,
  //   Icon: FormatColorText,
  //   event: eventTypes.paragraph,
  // },
  // {
  //   id: 2,
  //   Icon: TitleRounded,
  //   event: eventTypes.h1,
  // },
  // {
  //   id: 3,
  //   Icon: TitleRounded,
  //   event: eventTypes.h2,
  // },
  {
    id: 4,
    Icon: FormatListBulleted,
    event: eventTypes.ul,
  },

  {
    id: 5,
    Icon: FormatListNumbered,
    event: eventTypes.ol,
  },
  // {
  //   id: 6,
  //   Icon: FormatQuoteOutlined,
  //   event: eventTypes.quote,
  // },

  {
    id: 7,
    Icon: Code,
    event: eventTypes.formatCode,
  },
  {
    id: 8,
    Icon: UndoOutlined,
    event: eventTypes.formatUndo,
  },
  {
    id: 9,
    Icon: RedoOutlined,
    event: eventTypes.formatRedo,
  },
  {
    id: 10,
    Icon: FormatBoldOutlined,
    event: eventTypes.formatBold,
  },
  {
    id: 11,
    Icon: FormatItalicOutlined,
    event: eventTypes.formatItalic,
  },
  // {
  //   id: 12,
  //   Icon: FormatUnderlinedOutlined,
  //   event: eventTypes.formatUnderline,
  // },
  // { // reactive it if you need it
  //   id: 13,
  //   Icon: StrikethroughSOutlinedIcon,
  //   event: eventTypes.formatStrike,
  // },
  {
    id: 13,
    Icon: ImageOutlined,
    event: eventTypes.insertImage,
  },
  // {
  //   id: 14,
  //   Icon: LinkIcon,
  //   event: eventTypes.formatInsertLink,
  // },
  {
    id: 15,
    Icon: FormatAlignLeftOutlined,
    event: eventTypes.formatAlignLeft,
  },

  {
    id: 16,
    Icon: FormatAlignJustifyOutlined,
    event: eventTypes.formatAlignCenter,
  },
  {
    id: 17,
    Icon: FormatAlignRightOutlined,
    event: eventTypes.formatAlignRight,
  },
  {
    id: 18,
    Icon: TableChartOutlined,
    event: eventTypes.insertTable,
  },
];

export default pluginsList;
