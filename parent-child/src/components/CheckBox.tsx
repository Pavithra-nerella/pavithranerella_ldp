import {FormGroup,FormControlLabel, Checkbox} from '@mui/material';
type CheckBoxProps = {
  label: string,
  color: string
}
const CheckBox = ({label, color}: CheckBoxProps) => {
  return (
    <>
    <FormGroup>
    <FormControlLabel control={<Checkbox size="small"/>} label={label}
     style={{ color: color }} />
  </FormGroup>
  </>
  )
}

export default CheckBox