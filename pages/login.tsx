import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { loginLocal } from '../src/redux/auth/action';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { setError, setSuccess } from '../src/redux/app';
import { useRouter } from 'next/router';
import { ROUTERS } from '../src/configs/navigators';

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await dispatch(
      loginLocal({
        email: String(data.get('email')),
        password: String(data.get('password')),
      })
    );
    const loginResult = unwrapResult(response as any);
    if (loginResult.statusCode === 200) {
      dispatch(setSuccess({ message: 'Đăng nhập thành công' }));
      router.push(ROUTERS.dashboard.path);
    } else {
      dispatch(setError({ message: 'Đăng nhập thất bại' }));
      const errorMessage = loginResult.message;
      if (errorMessage === 'incorrect.email') {
        setErrorMessage((pre) => {
          return {
            ...pre,
            email: 'Tên đăng nhập không chính xác',
            password: '',
          };
        });
      } else if (errorMessage === 'incorrect.password') {
        setErrorMessage((pre) => {
          return { ...pre, password: 'Mật khẩu không chính xác', email: '' };
        });
      } else {
        setErrorMessage((pre) => {
          return {
            ...pre,
            email: 'Tên đăng nhập không chính xác',
            password: '',
          };
        });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              error={!!errorMessage?.email}
              helperText={errorMessage?.email}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              error={!!errorMessage?.password}
              helperText={errorMessage?.password}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
