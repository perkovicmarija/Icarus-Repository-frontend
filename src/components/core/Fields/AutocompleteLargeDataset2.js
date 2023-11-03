import React, { forwardRef, useMemo } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import { makeStyles, useTheme } from "@mui/material/styles";
import { VariableSizeList } from "react-window";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { injectIntl } from "react-intl";
import TypographyReportField from "../TypographyReportField";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const useStyles = makeStyles({
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

const InputField = ({
  value,
  error,
  placeholder,
  hidePlaceholder,
  inputRef,
  intl,
  ...props
}) => {
  return (
    <TextField
      {...props}
      value={value ? value : ""}
      error={Boolean(error)}
      helperText={error?.message && intl.formatMessage({ id: error.message })}
      placeholder={
        hidePlaceholder
          ? null
          : intl.formatMessage({
              id: placeholder ?? "general.select",
            })
      }
      inputRef={inputRef}
    />
  );
};

const InputFieldWithIntl = injectIntl(InputField);

const AutocompleteLargeDataset = forwardRef(
  (
    {
      options,
      keyProp,
      labelProp,
      label,
      value,
      name,
      onChange,
      disabled,
      required,
      placeholder,
      hidePlaceholder,
      formState,
      ...props
    },
    ref
  ) => {
    const classes = useStyles();

    /* const optionsCachedForCompare = useMemo(
    () =>
      options.map((item) => ({
        ...item,
        propForCompare: item[labelProp].toLocaleLowerCase(),
      })),
    [options]
  ); */

    return (
      <>
        {label && <TypographyReportField title={label} required={required} />}
        <Autocomplete
          fullWidth
          id="virtualize-demo"
          disabled={Boolean(disabled)}
          value={value ? value : null}
          onChange={(event, newValue) => onChange(newValue, event, name)}
          disableListWrap
          name={name}
          classes={classes}
          ListboxComponent={ListboxComponent}
          renderGroup={renderGroup}
          options={options}
          getOptionLabel={(option) => {
            return option[labelProp];
          }}
          getOptionSelected={(option, value) =>
            option[keyProp] === value[keyProp]
          }
          filterOptions={(options, { inputValue }) => {
            // We want to match multiple input tokens to multiword options
            // all input tokens must be included in the option for it to be valid.
            //
            // This solution has a problem that the same word from the option can be a valid match
            // for multiple input tokens.
            // Ex: "Vedran Xy" option matches input "Vedran Ra", because "Vedran" matches both "Vedran" and "Ra"
            const inputListOfTokens = inputValue
              .toLocaleLowerCase()
              .split(/\s/);
            // console.log('rafa input list of tokens', inputListOfTokens);
            const filteredOptions = options.filter((item) => {
              for (const token of inputListOfTokens) {
                if (!item[labelProp].toLocaleLowerCase().includes(token)) {
                  // console.log('rafa match false');
                  return false;
                }
              }
              return true;
            });
            // console.log('filteredOptions', filteredOptions);
            return filteredOptions;
          }}
          renderInput={(params) => {
            return (
              <InputFieldWithIntl
                {...params}
                value={value ? value : ""}
                error={formState.errors[name]}
                placeholder={placeholder}
                hidePlaceholder={hidePlaceholder}
                inputRef={ref}
              />
            );
          }}
          renderOption={(option) => (
            <Typography noWrap>{option[labelProp]}</Typography>
          )}
          {...props}
        />
      </>
    );
  }
);

const AutocompleteLargeDataset2 = ({
  name,
  control,
  rules,
  options,
  keyProp,
  labelProp,
  label,
  placeholder,
  hidePlaceholder,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, formState }) => (
        <AutocompleteLargeDataset
          {...field}
          formState={formState}
          options={options}
          keyProp={keyProp}
          labelProp={labelProp}
          label={label}
          placeholder={placeholder}
          hidePlaceholder={hidePlaceholder}
          required={Boolean(rules?.required)}
          {...props}
        />
      )}
    />
  );
};

export default AutocompleteLargeDataset2;
