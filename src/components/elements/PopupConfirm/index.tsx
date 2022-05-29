import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface IPopupConfirm {
  open: boolean;
  title: string;
  content: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

export const PopupConfirm: React.FC<IPopupConfirm> = ({
  open,
  title,
  content,
  onClose,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Box width={528} height={208} p='32px 24px'>
        <Grid
          container
          justifyContent='space-between'
          flexDirection='column'
          height='100%'
        >
          <Grid item>
            <Typography variant='h6'>{title}</Typography>
          </Grid>
          <Grid item>
            <Typography>{content}</Typography>
          </Grid>
          <Grid item container>
            <Grid
              container
              justifyContent='flex-end'
              spacing={2}
              sx={{ textTransform: 'unset' }}
            >
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  sx={{ textTransform: 'unset' }}
                  onClick={onClose}
                >
                  Huỷ
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{ textTransform: 'unset' }}
                  onClick={onSubmit}
                >
                  Đồng ý
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default PopupConfirm;
