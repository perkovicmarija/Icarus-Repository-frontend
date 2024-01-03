import { forwardRef } from "react";
import { Button, Autocomplete, Box, TextFieldProps } from "@mui/material";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import TypographyReportField from "../TypographyReportField";
import {
  ControllerRenderProps,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { useIntl } from "react-intl";
import IntlMessages from "../IntlMessages";
import {
  AutocompleteInputField,
  AutocompleteProps,
  ListboxComponent,
  renderGroup,
} from "./autocompleteUtils";

interface AutocompleteMultiProps {
  hasSelectAll?: boolean;
}

const AutocompleteMultiLargeDataset = forwardRef(
  <K extends string, L extends string>(
    {
      value,
      name,
      onChange,
      disabled,
      //
      options,
      keyProp,
      labelProp,
      label,
      required,
      placeholder,
      hidePlaceholder,
      hasSelectAll = false,
      error,
      readOnly,
      translate,
    }: AutocompleteProps<K, L> &
      AutocompleteMultiProps & {
        required: boolean;
        error: string | undefined;
      } & ControllerRenderProps<FieldValues, string>,
    ref: TextFieldProps["inputRef"]
  ) => {
    const intl = useIntl();

    return (
      <>
        {label && <TypographyReportField title={label} required={required} />}
        <Autocomplete
          multiple
          disableCloseOnSelect
          fullWidth
          readOnly={readOnly}
          disabled={Boolean(disabled)}
          value={value}
          onChange={(event, newValue) => {
            const selectAllSelected = newValue.find(
              (item) => item[keyProp] === "select-all"
            );
            onChange(selectAllSelected ? options : newValue, event, name);
          }}
          disableListWrap
          ListboxComponent={ListboxComponent}
          renderGroup={renderGroup}
          options={options}
          ChipProps={{
            style: {
              margin: "0 3px 3px 0px",
              height: "28px",
              fontSize: "0.9125rem",
            },
          }}
          getOptionLabel={(option) => {
            return translate
              ? intl.formatMessage({ id: option[labelProp] })
              : option[labelProp];
          }}
          isOptionEqualToValue={(option: any, value: any) =>
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
            return hasSelectAll
              ? [
                  { [keyProp]: "select-all", [labelProp]: "Select All" },
                  ...filteredOptions,
                ]
              : filteredOptions;
          }}
          renderInput={(params) => {
            return (
              <AutocompleteInputField
                {...params}
                value={value}
                errorMessage={error}
                placeholder={placeholder}
                hidePlaceholder={hidePlaceholder}
                inputRef={ref}
              />
            );
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option[keyProp] === "select-all" ? (
                <Button value="SelectAll">
                  <IntlMessages id="general.selectAll" />
                </Button>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    padding: "0 0.5rem",
                    cursor: "pointer",
                    "&:hover": {
                      background: "#EEE",
                    },
                  }}
                >
                  {selected ? (
                    <CheckBox
                      fontSize="small"
                      style={{
                        marginRight: "8px",
                        marginBottom: "2px",
                      }}
                    />
                  ) : (
                    <CheckBoxOutlineBlank
                      fontSize="small"
                      style={{
                        marginRight: "8px",
                        marginBottom: "2px",
                      }}
                    />
                  )}
                  {translate
                    ? intl.formatMessage({ id: option[labelProp] })
                    : option[labelProp]}
                </Box>
              )}
            </li>
          )}
        />
      </>
    );
  }
);

const AutocompleteMultiLargeDataset2 = <K extends string, L extends string>({
  name,
  control,
  rules,
  options,
  keyProp,
  labelProp,
  label,
  placeholder,
  hidePlaceholder,
  hasSelectAll = true,
  translate = false,
  disabled,
  readOnly,
  defaultValue = [],
}: AutocompleteProps<K, L> &
  AutocompleteMultiProps &
  UseControllerProps<any>) => {
  const { field, formState } = useController({
    name,
    control,
    rules,
    disabled,
    defaultValue,
  });

  const error = formState.errors[name];

  return (
    <AutocompleteMultiLargeDataset
      options={options}
      keyProp={keyProp}
      labelProp={labelProp}
      label={label}
      placeholder={placeholder}
      hidePlaceholder={hidePlaceholder}
      required={Boolean(rules?.required)}
      hasSelectAll={hasSelectAll}
      translate={translate}
      readOnly={readOnly}
      {...field}
      error={error?.message as string | undefined}
    />
  );
};

export default AutocompleteMultiLargeDataset2;
