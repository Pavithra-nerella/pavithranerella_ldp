import { Stack, TextField, InputAdornment } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

type TextFieldProps = {
  label: string;
};
const TextFieldComponent = ({ label }: TextFieldProps) => {
  return (
    <Stack spacing={2}>
      <p style={{ marginBottom: 5, color: "rgba(0, 0, 0, 0.6)" }}>{label}</p>
      <TextField
        sx={{
          width: "100%",
        }}
        size="small"
        id="outlined-basic"
        variant="outlined"
      />
      <TextField
        label="Password"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <VisibilityIcon />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default TextFieldComponent;
