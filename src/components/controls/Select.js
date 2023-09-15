import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core'
import React from 'react'

function Select(props) {
    const { name, label, value, size, onChange, children } = props;    
  return (
    <FormControl variant='outlined' size={size}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect label={label} name={name} value={value} onChange={onChange}>
            {children}
        </MuiSelect>
    </FormControl>
  )
}

export default Select