import { Box, CircularProgress, styled } from '@mui/material';
import React, { useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../configs/firebase.config';

const Camera = styled(Box)(({ avatar }: { avatar: string }) => ({
  width: 50,
  height: 50,
  cursor: 'pointer',
  position: 'absolute',
  top: '40%',
  right: '40%',
  backgroundImage: `url(${avatar || ''})`,
  backgroundSize: 'cover',
}));

const LoadingAvatar = styled(CircularProgress)({
  width: 50,
  height: 50,
  cursor: 'pointer',
  position: 'absolute',
  top: '40%',
  right: '40%',
});

const Avatar = styled(Box)(
  ({
    avatar,
    width,
    height,
    error,
  }: {
    avatar: string;
    width?: number;
    height?: number;
    error?: boolean;
  }) => ({
    width: width || 270,
    height: height || 380,
    backgroundImage: `url('${avatar}')`,
    backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   borderRadius: '50%',
    border: '1px dashed #eee',
    position: 'relative',
    cursor: 'pointer',
    borderColor: error ? 'red' : 'lightgrey',
  })
);

interface IInputImage {
  width: number;
  height: number;
  onChange?: (link: string) => void;
  defaultValue?: string;
  error?: boolean;
}

const InputImage: React.FC<IInputImage> = ({
  width,
  height,
  onChange,
  defaultValue,
  error,
}) => {
  const [isLoading, setIsLoading] = useState<number>(100);
  const [avatar, setAvatar] = useState<string>(defaultValue);
  const cameraRef = useRef<any>();

  const handleImageChange = (e: any) => {
    const images = e.target.files[0];
    if (!images) return null;
    const storageRef = ref(
      storage,
      `/products/${new Date().getTime()}-${images.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, images);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setIsLoading(prog);
      },
      (err) => {
        console.log(err);

        return null;
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setAvatar(url);
        onChange?.(url);
      }
    );
  };
  return (
    <Box width='100%' display='flex'>
      <Avatar
        avatar={avatar}
        onClick={() => cameraRef.current.click()}
        width={width}
        height={height}
        error={error}
      >
        {!avatar ? (
          isLoading >= 100 ? (
            <Camera avatar='https://pixsector.com/cache/d01b7e30/av7801257c459e42a24b5.png' />
          ) : (
            <LoadingAvatar />
          )
        ) : null}

        <input
          type='file'
          accept='image/*'
          ref={cameraRef}
          onChange={handleImageChange}
          hidden
        />
      </Avatar>
    </Box>
  );
};

export default InputImage;
