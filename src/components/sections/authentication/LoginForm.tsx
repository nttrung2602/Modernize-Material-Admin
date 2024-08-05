// import {
//   Box,
//   Button,
//   Checkbox,
//   Divider,
//   FormControlLabel,
//   FormGroup,
//   IconButton,
//   InputAdornment,
//   Link,
//   Stack,
//   TextField,
//   Typography,
// } from '@mui/material';
// import IconifyIcon from 'components/base/IconifyIcon';
// import { useState } from 'react';

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const handleClickShowPassword = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   return (
//     <Box
//       sx={{
//         mt: { sm: 5, xs: 2.5 },
//       }}
//     >
//       <Stack spacing={3}>
//         <TextField fullWidth variant="outlined" id="mail" type="text" label="Email" />
//         <TextField
//           fullWidth
//           variant="outlined"
//           id="password"
//           type={showPassword ? 'text' : 'password'}
//           label="Password"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   edge="end"
//                 >
//                   {showPassword ? (
//                     <IconifyIcon icon="el:eye-open" color="action.active" />
//                   ) : (
//                     <IconifyIcon icon="el:eye-close" color="action.focus" />
//                   )}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>
//       <FormGroup sx={{ my: 2 }}>
//         <FormControlLabel
//           control={<Checkbox />}
//           label="Keep me signed in"
//           sx={{
//             color: 'text.secondary',
//           }}
//         />
//       </FormGroup>
//       <Button
//         color="primary"
//         variant="contained"
//         size="large"
//         fullWidth
//         component={Link}
//         href="#!"
//         type="submit"
//       >
//         Sign In
//       </Button>
//       <Stack
//         sx={{
//           textAlign: 'center',
//           color: 'text.secondary',
//           my: 3,
//         }}
//       >
//         <Link href="/authentication/forgot-password">
//           <Typography color="primary" variant="subtitle1">
//             Forgot Your Password?
//           </Typography>
//         </Link>
//       </Stack>
//       <Divider
//         sx={{
//           my: 3,
//         }}
//       />

//       <Stack
//         spacing={1.5}
//         sx={{
//           mt: 4,
//         }}
//       >
//         <Typography textAlign="center" color="text.secondary" variant="subtitle1">
//           Or sign in using:
//         </Typography>
//         <Button
//           startIcon={<IconifyIcon icon="flat-color-icons:google" />}
//           variant="outlined"
//           sx={{ typography: { sm: 'button', xs: 'subtitle1', whiteSpace: 'nowrap' } }}
//         >
//           Continue with Google
//         </Button>
//         <Button
//           startIcon={<IconifyIcon icon="logos:facebook" />}
//           variant="outlined"
//           sx={{ typography: { sm: 'button', xs: 'subtitle1', whiteSpace: 'nowrap' } }}
//         >
//           Continue with Facebook
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useMutation } from '@tanstack/react-query';
// import { toast } from 'react-toastify';
import paths from 'routes/path';
import { useNavigate } from 'react-router-dom';

const authentication = async (email: string, password: string, role: string) =>
  await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role: role,
      email: email,
      password: password,
    }),
  }).then((res) => {
    return res.json();
  });

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const login = useMutation({
    mutationFn: ({ email, password, role }: { email: string; password: string; role: string }) =>
      authentication(email, password, role),
    onSuccess: (data) => {
      // console.log('data', data);
      localStorage.setItem(
        'user',
        JSON.stringify({ email: data.email, role: data.role, id: data.id }),
      );
      navigate(paths.default);
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    login.mutate({
      email: formJson.email.toString(),
      password: formJson.password.toString(),
      role: formJson.role.toString(),
    });

    // Giả định lưu thông tin người dùng vào localStorage
    // localStorage.setItem('user', JSON.stringify({ email }));

    // if (email.includes('admin')) {
    //   navigate(`/${paths.products}`);
    // } else {
    //   navigate(paths.default); // Chuyển hướng đến trang mặc định sau khi đăng nhập thành công
    // }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ mt: { sm: 5, xs: 2.5 } }}>
      <Stack spacing={3}>
        <TextField fullWidth variant="outlined" id="mail" type="text" label="Email" name="email" />
        <TextField
          name="password"
          fullWidth
          variant="outlined"
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <IconifyIcon icon="el:eye-open" color="action.active" />
                  ) : (
                    <IconifyIcon icon="el:eye-close" color="action.focus" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <FormControl
        variant="filled"
        required
        style={{
          marginTop: '10px',
        }}
        sx={{ mt: 1, minWidth: 80, color: 'text.secondary' }}
      >
        <InputLabel id="demo-dialog-select-label">Role</InputLabel>
        <Select
          fullWidth
          sx={{ whiteSpace: 'normal', wordWrap: 'break-all' }}
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            textWrap: 'wrap',
            maxWidth: '500px',
          }}
          defaultValue={''}
          displayEmpty
          size="small"
          name="role"
          labelId="demo-dialog-select-label"
          id="demo-dialog-select"
        >
          <MenuItem style={{ whiteSpace: 'normal' }} value="">
            <em>None</em>
          </MenuItem>

          <MenuItem value="supplier">Supplier</MenuItem>
          <MenuItem value="distributor">Distributor</MenuItem>
          <MenuItem value="seller">Seller</MenuItem>
        </Select>
      </FormControl>
      <FormGroup sx={{ my: 2 }}>
        <FormControlLabel
          control={<Checkbox />}
          label="Keep me signed in"
          sx={{ color: 'text.secondary' }}
        />
      </FormGroup>
      <Button color="primary" variant="contained" size="large" fullWidth type="submit">
        Sign In
      </Button>
      <Stack sx={{ textAlign: 'center', color: 'text.secondary', my: 3 }}>
        <Link href="/authentication/forgot-password">
          <Typography color="primary" variant="subtitle1">
            Forgot Your Password?
          </Typography>
        </Link>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack spacing={1.5} sx={{ mt: 4 }}>
        <Typography textAlign="center" color="text.secondary" variant="subtitle1">
          Or sign in using:
        </Typography>
        <Button
          startIcon={<IconifyIcon icon="flat-color-icons:google" />}
          variant="outlined"
          sx={{ typography: { sm: 'button', xs: 'subtitle1', whiteSpace: 'nowrap' } }}
        >
          Continue with Google
        </Button>
        <Button
          startIcon={<IconifyIcon icon="logos:facebook" />}
          variant="outlined"
          sx={{ typography: { sm: 'button', xs: 'subtitle1', whiteSpace: 'nowrap' } }}
        >
          Continue with Facebook
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
