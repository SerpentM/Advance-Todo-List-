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
  const [inputerror, setError] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let userCred = {
      email: data.get("email"),
      username: data.get("name"),
      password: data.get("password"),
    };
    if (
      userCred.email === "" ||
      userCred.username === "" ||
      userCred.password === ""
    ) {
      setError(true);
    } else {
      axios
        .post("http://localhost:7789/api/register", userCred)
        .then((res) => {
          console.log(res);
          if (res.data === "User Already Exist") {
            alert("Invalid User");
          } else {
            alert("User Created");
            navigate("/login");
          }
        })
        .catch((err) => {
          alert(err);
          alert("User already Exist ");
        });
    }
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
            Register User
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
              error={inputerror}
              id="email"
              label="Email Address"
              name="email"
              helperText="required *"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              error={inputerror}
              helperText="required *"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              error={inputerror}
              type="password"
              helperText="required *"
              id="password"
              autoFocus
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
