import React, { forwardRef } from "react";
import {
  Input,
  Checkbox,
  ListItemText,
  TextField,
  Box,
  Chip,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import IntlMessages from "../../../../components/utility/intlMessages";
import { injectIntl } from "react-intl";
import TypographyReportField from "../TypographyReportField";
import { useController } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// for Select All/Deselect All
const randomUUID = "aebe0c71-c3c5-497a-be56-debdd369fd87";
const selectAllUUID = randomUUID + "-selectAll";
const deselectAllUUID = randomUUID + "-deselectAll";

const RenderValueComponent = ({
  selected,
  options,
  keyProp,
  labelProp,
  translate,
  intl,
}) => {
  return (
    <Box style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
      {selected.map((item) => {
        const label = options.find((option) => option[keyProp] === item)[
          labelProp
        ];

        return (
          <Chip
            key={item}
            label={translate ? intl.formatMessage({ id: label }) : label}
          />
        );
      })}
    </Box>
  );
};

const SelectMultipleCustom = forwardRef(
  (
    {
      intl,
      //
      value,
      name,
      onChange,
      formState,
      required,

      disabled,
      label,
      keyProp,
      labelProp,
      options,
      translate,
      hasSelectAll,
    },
    ref
  ) => {
    const error = formState.errors[name];

    return (
      <>
        {label && <TypographyReportField title={label} required={required} />}

        <TextField
          select
          disabled={disabled}
          fullWidth
          error={Boolean(error)}
          helperText={
            error?.message && intl.formatMessage({ id: error.message })
          }
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            // handle Select All/Deselect All //
            let parsedValue = value;
            if (value[value.length - 1] === selectAllUUID) {
              parsedValue = options.map((option) => option[keyProp]);
            } else if (value[value.length - 1] === deselectAllUUID) {
              parsedValue = [];
            }
            ////////////////////////////////////
            onChange(parsedValue);
          }}
          input={<Input ref={ref} />}
          SelectProps={{
            multiple: true,
            MenuProps,
            renderValue: (selected) => (
              <RenderValueComponent
                selected={selected}
                options={options}
                keyProp={keyProp}
                labelProp={labelProp}
                translate={translate}
                intl={intl}
              />
            ),
          }}
        >
          {hasSelectAll && (
            <Button
              value={selectAllUUID}
              style={{ marginLeft: "20px", marginRight: "12px" }}
            >
              <IntlMessages id="general.selectAll" />
            </Button>
          )}

          {hasSelectAll && (
            <Button value={deselectAllUUID}>
              <IntlMessages id="general.deselectAll" />
            </Button>
          )}

          {options.map((item) => (
            <MenuItem key={item[keyProp]} value={item[keyProp]}>
              <Checkbox checked={value.indexOf(item[keyProp]) > -1} />
              {translate ? (
                <ListItemText primary={<IntlMessages id={item[labelProp]} />} />
              ) : (
                <ListItemText primary={item[labelProp]} />
              )}
            </MenuItem>
          ))}
        </TextField>
      </>
    );
  }
);

const SelectMultipleCustom2 = ({
  intl,
  //
  control,
  name,
  label,
  rules,
  defaultValue,
  placeholder,
  disabled,
  options,
  keyProp,
  labelProp,
  translate,
  hasSelectAll = true,
  ...props
}) => {
  const { field, formState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <SelectMultipleCustom
      intl={intl}
      //
      {...field}
      formState={formState}
      required={Boolean(rules?.required)}
      //
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      options={options}
      keyProp={keyProp}
      labelProp={labelProp}
      translate={translate}
      hasSelectAll={hasSelectAll}
      {...props}
    />
  );
};

export default injectIntl(SelectMultipleCustom2);
