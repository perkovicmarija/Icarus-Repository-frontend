import { VariableSizeList } from "react-window";
import React, { createContext, forwardRef, useEffect, useRef } from "react";
import {
  useMediaQuery,
  ListSubheader,
  useTheme,
  TextField,
  TextFieldProps,
  Box,
} from "@mui/material";
import { useIntl } from "react-intl";

const LISTBOX_PADDING = 8; // px

function renderRow({ data, index, style }: any) {
  /* const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  return <li style={{ whiteSpace: "nowrap", ...inlineStyle }}>
    {dataSet[1]}
  </li>; */

  return React.cloneElement(data[index], {
    key: index,
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(itemCount: number) {
  const ref = useRef<any>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [itemCount]);
  return ref;
}

// Adapter for react-window
export const ListboxComponent = (
  ({ children, ...other }: any) => {
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
    const itemCount = children.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: any) => {
      if (React.isValidElement(child) && child.type === ListSubheader) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return (children.map(getChildSize) as number[]).reduce(
        (a, b) => a + b,
        0
      );
    };

    const gridRef = useResetCache(itemCount);

    return (
      <Box
        sx={{
          "& ul": {
            margin: 0,
            marginBottom: "16px",
            padding: 0,
          },
        }}
      >
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={children}
            height={getHeight() + 2 * LISTBOX_PADDING}
            style={{ padding: 0, margin: 0 }}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(children[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </Box>
    );
  }
);

export const renderGroup = (params: any) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

export const AutocompleteInputField = ({
  value,
  errorMessage,
  placeholder,
  hidePlaceholder,
  inputRef,
  ...props
}: {
  hidePlaceholder?: boolean;
  errorMessage: string | undefined;
} & TextFieldProps) => {
  const intl = useIntl();

  return (
    <TextField
      value={value}
      error={Boolean(errorMessage)}
      helperText={errorMessage && intl.formatMessage({ id: errorMessage })}
      placeholder={
        hidePlaceholder
          ? undefined
          : intl.formatMessage({
              id: placeholder ?? "general.select",
            })
      }
      inputRef={inputRef}
      {...props}
    />
  );
};

export interface AutocompleteProps<K extends string, L extends string>{
  translate?: boolean;
  hidePlaceholder?: boolean;
  placeholder?: string;
  label?: string;
  keyProp: K;
  labelProp: L;
  options: Array<Record<K, string> & Record<L, string>>;
}
