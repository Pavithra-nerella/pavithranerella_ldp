import React from 'react'
import {Typography} from '@mui/material';
type TypographyProps = {
  variant: any,
  text: string,
  color: string,
  fontSize: any,
  marginRight: string 
}
const TypographyComponent = ({variant, text, color, fontSize, marginRight}: TypographyProps) => {
  return (
    <>
    <Typography sx={{ fontSize: {fontSize}, marginRight: {marginRight}}} variant={variant} color={color}>{text}</Typography>
    </>
  )
}

export default TypographyComponent