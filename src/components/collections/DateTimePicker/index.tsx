import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as DateTimePickerMui } from '@mui/x-date-pickers/DateTimePicker';
import { Grid } from '@mui/material';

interface IDateTimePicker {
  title: string;
  onChange: (value: Date) => void;
  defaultValue?: Date;
}
const DateTimePicker: React.FC<IDateTimePicker> = ({
  title,
  onChange,
  defaultValue,
}) => {
  const [value, setValue] = React.useState<Date | null>(
    defaultValue ?? new Date()
  );

  return (
    <Grid container alignItems='center' justifyContent='space-between'>
      <Grid item xs={2}>
        {title}
      </Grid>
      <Grid item xs={10}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePickerMui
            renderInput={(props) => <TextField {...props} />}
            label={title}
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default DateTimePicker;
