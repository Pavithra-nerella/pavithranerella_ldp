import { Button } from "@mui/material"
type ButtonProps = {
variant: any,
text: string,
icon: any,
color: string
}
const ButtonComponent = ({variant, text, icon, color}: ButtonProps) => {
  return (
    <>
    <Button sx={{
        width: '100%',
    }} 
    startIcon={icon} 
    style={{color: color}}
    variant={variant}>{text}</Button>
    </>
  )
}

export default ButtonComponent