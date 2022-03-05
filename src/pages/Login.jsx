import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let userCred = {
      email: data.get("email"),
      password: data.get("password"),
    };
    axios
      .post("http://localhost:7789/api/login", userCred)
      .then((res) => {
        if (res.data === "no user found") {
          alert("Invalid User");
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              helperText="Incorrect entry."
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              error={true}
              label="Password"
              type="password"
              id="password"
              helperText="Incorrect entry."
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign_In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
