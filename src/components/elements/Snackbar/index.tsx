import { Alert, AlertProps, Snackbar as SnackbarMui } from '@mui/material';
import React from 'react';

interface ISnackbarProps {
  message?: string;
  open?: boolean;
  onClose?(): void;
  type?: AlertProps['severity'];
}

const MAX_WIDTH = '217px';

const Snackbar: React.FC<ISnackbarProps> = (props) => {
  const { message, open, onClose, type } = props;
  return (
    <SnackbarMui
      autoHideDuration={5000}
      onClose={onClose}
      open={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </SnackbarMui>
  );
};

export default Snackbar;
