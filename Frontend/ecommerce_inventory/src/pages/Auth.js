import React, { useState, useMemo, useEffect } from 'react';
import {
  Card, CardContent, Typography, TextField, Button, Box,
  CssBaseline, ThemeProvider, createTheme, LinearProgress
} from '@mui/material';
import { ThemeProvider as Emotion10ThemeProvider } from '@emotion/react';
import { orangeDarkTheme, orangeLightTheme, basicTheme, darkTheme, lightTheme, customTheme, blueLightTheme, blueDarkTheme, greenLightTheme, greenDarkTheme, redLightTheme, redDarkTheme } from '../layout/themes';
import { GlobalStyles } from '../layout/GlobalStyle';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/APIHandler';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducer/IsLoggedInReducer';

const Auth = () => {
  const [themeMode, setThemeMode] = useState('basic');
  const navigate = useNavigate();
  const { callApi, loading } = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'basic';
    setThemeMode(savedTheme);
  }, []);

  const theme = useMemo(() => {
    switch (themeMode) {
      case 'basic': return createTheme(basicTheme);
      case 'dark': return createTheme(darkTheme);
      case 'light': return createTheme(lightTheme);
      case 'custom': return createTheme(customTheme);
      case 'blue light': return createTheme(blueLightTheme);
      case 'blue dark': return createTheme(blueDarkTheme);
      case 'green light': return createTheme(greenLightTheme);
      case 'green dark': return createTheme(greenDarkTheme);
      case 'red light': return createTheme(redLightTheme);
      case 'red dark': return createTheme(redDarkTheme);
      case 'orange light': return createTheme(orangeLightTheme);
      case 'orange dark': return createTheme(orangeDarkTheme);
      default: return createTheme(lightTheme);
    }
  }, [themeMode]);

  const doLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const response = await callApi({
      url: "auth/login/",
      method: "POST",
      body: { username, password }
    });

    if (response?.data?.access) {
      localStorage.setItem("token", response.data.access);
      toast.success("Login Successfully");
      dispatch(login());
      navigate("/home");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: theme.palette.background.default
          }}
        >
          <Card sx={{ maxWidth: 400, width: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img src={theme.logo.square} alt="Logo" style={{ borderRadius: '50%', width: '100px' }} />
              </Box>
              <Typography variant="h5" align="center" gutterBottom>
                Login
              </Typography>
              <Box component="form" sx={{ mt: 2 }} onSubmit={doLogin}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                {loading ? (
                  <LinearProgress sx={{ width: '100%' }} />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </CardContent>
            <Box sx={{ textAlign: 'center', py: 2, borderTop: '1px solid', borderColor: theme.palette.divider }}>
              <Typography variant="body2" color="text.secondary">
                © 2025 Quicko [ZuruWaala Private Limited]. All rights reserved.
              </Typography>
            </Box>
          </Card>
        </Box>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export default Auth;
