import { Container, Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet, Link as RouterLink } from "react-router-dom";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Posters
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="new">
            New Poster
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const RootLayout = () => {
  return (
    <Paper elevation={0} sx={{ minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="xl" sx={{ paddingY: "10px" }}>
        <Outlet />
      </Container>
    </Paper>
  );
};

export default RootLayout;
