import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import ButtonComponent from "./components/Button";
import CheckBox from "./components/CheckBox";
import TextFieldComponent from "./components/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TypographyComponent from "./components/Typography";
import { Divider } from "@mui/material";

function App() {
  return (
    <>
      <Box display="flex" justifyContent="center" sx={{ height: "98vh" }}>
        <Card sx={{ width: "380px", marginTop: 2, padding: 3 }}>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 1.5 }} fontSize="25px">
              Sign in
            </Typography>
            <TypographyComponent
              variant="body2"
              text="Please enter your login credentials"
              color="text.secondary"
              fontSize="14px"
              marginRight={""}
            />
            <TextFieldComponent label="Email" />

            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <CheckBox label="Remember me" color="rgba(0,0,0,0.6)" />
              <TypographyComponent
                variant="body2"
                text="Forgot Password?"
                fontSize="14px"
                color="blue"
                marginRight={""}
              />
            </Grid>
            <Box
              sx={{
                width: "100%",
                mb: "15px",
                mt: "6px",
              }}
            >
              <ButtonComponent
                variant="contained"
                text="Sign in"
                icon={undefined}
                color={""}
              />
              <Divider>or</Divider>
            </Box>

            <Box
              sx={{
                width: "100%",
                mb: "15px",
              }}
            >
              <ButtonComponent
                variant="outlined"
                text="Sign in with Google"
                icon={<GoogleIcon />}
                color="black"
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                mb: "15px",
              }}
            >
              <ButtonComponent
                variant="outlined"
                text="Sign in with GitHub"
                icon={<GitHubIcon />}
                color="black"
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TypographyComponent
                variant="h6"
                text="Don't have an account?"
                fontSize="14px"
                marginRight="5px"
                color={""}
              />
              <TypographyComponent
                variant="h6"
                text="Sign up"
                fontSize="14px"
                color="blue"
                marginRight={""}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default App;
