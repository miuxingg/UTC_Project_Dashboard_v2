import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps,
} from '@mui/material';
import React from 'react';
import TextField from '../TextField';

export interface IInputMultiple {
  label: string;
  // name: string;
  options: any;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: any[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any>
  ) => void;
  onTextChange?: (value: string) => void;
  error?: string;
  defaultValue?: [];
}

const InputMultiple: React.FC<IInputMultiple> = ({
  // name,
  label,
  options,
  onChange,
  onTextChange,
  error,
  defaultValue,
}) => {
  return (
    <Autocomplete
      multiple
      limitTags={4}
      id='multiple-limit-tags'
      options={options}
      getOptionLabel={(option) => option?.name ?? ''}
      defaultValue={defaultValue}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(e) => {
            onTextChange?.(e.target.value);
          }}
          label={label}
          placeholder={label}
          helperText={error}
          error={!!error}
        />
      )}
      fullWidth
    />
  );
};

export default InputMultiple;
