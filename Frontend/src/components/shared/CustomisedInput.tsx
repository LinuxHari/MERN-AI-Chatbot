import React from 'react'
import { TextField } from '@mui/material'

type Props = {
    name: string
    type: string
    label: string
}

const CustomisedInput = ({name, type, label}: Props) => {
  return (
    <TextField 
    name={name}
    margin='normal'
    label={label}
    type={type}
    InputLabelProps={{style: {color: "white"}}}
    InputProps={{style: {width: "400px", borderRadius: 10, fontSize: 20, color:"white"}}}
    >

    </TextField>
  )
}

export default CustomisedInput