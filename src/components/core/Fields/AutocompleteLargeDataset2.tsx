import { forwardRef } from "react";
import { Autocomplete, TextFieldProps } from "@mui/material";
import TypographyReportField from "../TypographyReportField";
import {
  ControllerRenderProps,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import {
  AutocompleteInputField,
  AutocompleteProps,
  ListboxComponent,
  renderGroup,
} from "./autocompleteUtils";

const AutocompleteLargeDataset = forwardRef(
  <K extends string, L extends string>(
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
      readOnly,
      error,
    }: AutocompleteProps<K, L> & {
      required: boolean;
      error: string | undefined;
    } & ControllerRenderProps<FieldValues, string>,
    ref: TextFieldProps["inputRef"]
  ) => {
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
          disabled={Boolean(disabled)}
          readOnly={readOnly}
          value={value}
          onChange={(event, newValue) => onChange(newValue, event, name)}
          ListboxComponent={ListboxComponent}
          renderGroup={renderGroup}
          options={options}
          getOptionLabel={(option: any) => {
            return option[labelProp];
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
            const filteredOptions = options.filter((item: any) => {
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
          // renderOption={(props, option, state) => ([ props, option, state ])}
        />
      </>
    );
  }
);

const AutocompleteLargeDataset2 = <K extends string, L extends string>({
  name,
  control,
  rules,
  options,
  keyProp,
  labelProp,
  label,
  placeholder,
  hidePlaceholder,
  translate = false,
  disabled,
  readOnly,
  defaultValue = null,
}: AutocompleteProps<K, L> & UseControllerProps<any>) => {
  const { field, formState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const error = formState.errors[name];

  return (
    <AutocompleteLargeDataset
      options={options}
      keyProp={keyProp}
      labelProp={labelProp}
      label={label}
      placeholder={placeholder}
      hidePlaceholder={hidePlaceholder}
      required={Boolean(rules?.required)}
      translate={translate}
      readOnly={readOnly}
      disabled={disabled}
      {...field}
      error={error?.message as string | undefined}
    />
  );
};

export default AutocompleteLargeDataset2;
