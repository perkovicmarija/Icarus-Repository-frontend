import React from "react";
import PropTypes from "prop-types";
import { TextValidator } from "react-material-ui-form-validator";
import { VariableSizeList } from "react-window";
import ListSubheader from "@mui/material/ListSubheader";
import { Autocomplete, Checkbox, useMediaQuery } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { makeStyles, useTheme } from "@mui/styles";
import IntlMessages from "../IntlMessages";

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

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

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

export default function AutocompleteMultiLargeDataset(props) {
  const classes = useStyles();

  const {
    options,
    labelProp,
    label,
    value,
    name,
    onAutocompleteMultiChange,
    nestedPropName,
    disabled,
    validators,
    errorMessages,
    keyProp,
    required,
  } = props;
  return (
    <Autocomplete
      multiple
      fullWidth
      id="virtualize-demo"
      disabled={disabled}
      value={nestedPropName ? value.map((x) => x[nestedPropName]) : value}
      onChange={(event, newValue) =>
        onAutocompleteMultiChange(event, newValue, name, nestedPropName)
      }
      disableListWrap
      name={name}
      classes={classes}
      ListboxComponent={ListboxComponent}
      renderGroup={renderGroup}
      options={options}
      getOptionLabel={(option) => {
        return option[labelProp];
      }}
      getOptionSelected={(option, value) => {
        return option[keyProp] === value[keyProp];
      }}
      renderInput={(params) => {
        return (
          <TextValidator
            {...params}
            value={nestedPropName ? value.map((x) => x[nestedPropName]) : value}
            label={<IntlMessages id={label} />}
            validators={validators}
            errorMessages={errorMessages}
            required={required}
          />
        );
      }}
      //renderInput={(params) => <TextField {...params} variant="outlined" label="10,000 options" />}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option[labelProp]}
        </React.Fragment>
      )}
      //renderOption={(option) => <Typography noWrap>{option}</Typography>}
    />
  );
}
