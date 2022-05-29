import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import PopupConfirm from '../PopupConfirm';

interface IButtonForm {
  primaryTextButton: string;
  secondaryTextButton: string;
  onPrimaryButton: () => void;
  onSecondaryButton: () => void;
}
const ButtonForm: React.FC<IButtonForm> = ({
  primaryTextButton,
  secondaryTextButton,
  onPrimaryButton,
  onSecondaryButton,
}) => {
  return (
    <>
      <Grid
        container
        justifyContent='flex-end'
        spacing={2}
        sx={{ my: 2, textTransform: 'unset' }}
      >
        <Grid item>
          <Button
            color='primary'
            variant='outlined'
            onClick={onSecondaryButton}
            sx={{ textTransform: 'unset' }}
          >
            {secondaryTextButton}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            sx={{ textTransform: 'unset' }}
            onClick={onPrimaryButton}
          >
            {primaryTextButton}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ButtonForm;
