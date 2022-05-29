import { Box, Grid, IconButton, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '../../components/elements/TextField';
import CloseIcon from '@mui/icons-material/CancelRounded';
const Tag = styled(Box)(() => {
  return {
    border: '1px solid #1F91FA',
    borderRadius: '20px',
    position: 'relative',
  };
});

const Close = styled(IconButton)({
  position: 'absolute',
  top: '-18px',
  right: '-6px',
});

interface ICloudtagForm {
  defaultValue?: string[];
  getValues: (values: string[]) => void;
}

const CloudtagForm: React.FC<ICloudtagForm> = ({ defaultValue, getValues }) => {
  const [cloudTagState, setCloudTagState] = useState<string[]>(defaultValue);
  useEffect(() => {
    setCloudTagState(defaultValue);
  }, []);
  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      const newVal = [...cloudTagState, e.target.value];
      setCloudTagState(newVal);
      getValues(newVal);
    }
  };
  const handleRemoveCloudTag = (i: number) => {
    const newVal = cloudTagState.filter((_, index) => i !== index);
    setCloudTagState(newVal);
    getValues(newVal);
  };
  return (
    <Box>
      <TextField
        //   value={values.name}
        //   helperText={errors.name}
        label='Cloud tag'
        placeholder='Nhấn enter để thêm mới'
        onKeyDown={handleEnter}
      />
      <Box ml={25} mt={2}>
        <Grid container>
          {cloudTagState.map((item, i) => {
            return (
              <Grid item key={i}>
                <Tag py={1} px={2} mx={1}>
                  {item}
                  <Close onClick={() => handleRemoveCloudTag(i)}>
                    <CloseIcon style={{ width: '15px' }} />
                  </Close>
                </Tag>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
export default CloudtagForm;
