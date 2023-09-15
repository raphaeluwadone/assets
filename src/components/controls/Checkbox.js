import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import React from 'react'

function Checkbox(props) {
    const { name, label, value, onChange } = props;

    const converToDefEventPara = (name, value) =>({
      target: {
          name, value
      }
  })
  return (
    <FormControl>
        <FormControlLabel control={<MuiCheckbox name={name} color="secondary" checked={value} onChange={ e => onChange(converToDefEventPara(name, e.target.checked))} />} label = {label} />
    </FormControl>
  )
}

export default Checkbox