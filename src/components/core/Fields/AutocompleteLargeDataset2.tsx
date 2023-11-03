import { forwardRef } from "react";
import { Autocomplete } from "@mui/material";
import TypographyReportField from "../TypographyReportField";
import {
  ControllerRenderProps,
  FieldValues,
  UseControllerProps,
  UseFormStateReturn,
  useController,
} from "react-hook-form";
import {
  AutocompleteInputField,
  AutocompleteProps,
  ListboxComponent,
  renderGroup,
} from "./autocompleteUtils";

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
      errors,
    }: AutocompleteProps & { required: boolean } & ControllerRenderProps<
        FieldValues,
        string
      > &
      UseFormStateReturn<FieldValues>,
    ref
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
          value={value}
          onChange={(event, newValue) => onChange(newValue, event, name)}
          name={name}
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
                errorMessage={errors?.[name]?.message as string | undefined}
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
  translate = false,
  disabled,
  defaultValue = null,
}: AutocompleteProps & UseControllerProps) => {
  const { field, formState } = useController({
    name,
    control,
    rules,
    disabled,
    defaultValue,
  });

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
      {...field}
      {...formState}
    />
  );
};

export default AutocompleteLargeDataset2;
