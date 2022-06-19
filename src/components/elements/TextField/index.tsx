import { Grid, TextField as TextFieldMui, TextFieldProps } from '@mui/material';
import React from 'react';

const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <Grid container alignItems='center' justifyContent='space-between'>
      <Grid item xs={2}>
        {props.label}
      </Grid>
      <Grid item xs={10}>
        <TextFieldMui
          {...props}
          error={!!props?.helperText}
          FormHelperTextProps={{
            classes: {
              root: `{ color: 'red' }`,
            },
          }}
          id='outlined-helperText'
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default TextField;
