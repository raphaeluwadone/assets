import React from 'react';
import {Button as MuiButton, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    Button: {
        textAlign: "right",
        marginTop: "20px"
    },

    MuiButton: {
        '&.Mui-focused fieldset': {
            borderColor: '#444',
        },
    }
})

function Button(props) {
    const classes = useStyles();
    const { size, icon, variant, color, title, ...other } = props;
  return (
      <div className={classes.Button}>
          <MuiButton className={classes.MuiButton} size={size} startIcon={icon} variant={variant} color={color} {...other}>{title}</MuiButton>
      </div>
  )
}

export default Button