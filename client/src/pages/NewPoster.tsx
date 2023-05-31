import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function NewPoster() {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState<Record<string, string>[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const data = new FormData(event.currentTarget);

    const info = {
      name: data.get("name"),
      title: data.get("title"),
      content: data.get("content"),
    };

    if (info.name === "") info.name = null;

    const response = await fetch("https://posters-srv.onrender.com/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });

    if (response.ok) {
      return navigate("/");
    } else {
      const json = await response.json();
      setErrors(json.errors ?? []);
    }
  };

  const getErrorMsg = (field: string) => {
    const obj = errors.find((e) => e.path === field);
    if (!obj) return "";
    return obj.msg ?? "";
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h5">
            Write a Post
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  error={getErrorMsg("name") !== ""}
                  helperText={getErrorMsg("name")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Post Title"
                  autoFocus
                  error={getErrorMsg("title") !== ""}
                  helperText={getErrorMsg("title")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="content"
                  label="Content"
                  type="text"
                  id="content"
                  multiline
                  rows={4}
                  error={getErrorMsg("content") !== ""}
                  helperText={getErrorMsg("content")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
