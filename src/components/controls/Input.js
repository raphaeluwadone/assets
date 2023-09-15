import { makeStyles, TextField } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles({
  root: {
    '&.MuiFormControl-root': {
      marginRight: "10px"
    }
    
  }
})

function Input(props) {
  const classes = useStyles();
    const { label, size, variant, value, onChange, ...other } = props;
  return (
    <TextField className={classes.root} label={label} size={size} variant={variant} value={value} onChange={onChange} {...other} />
  )
}

export default Input