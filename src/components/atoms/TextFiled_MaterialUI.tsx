import React,{VFC} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

type Props = {
    label?:string
    id?:string
    //styles?:StyledType
    width?:number
    height?:number
    handleChange?:(event: React.ChangeEvent<HTMLInputElement>) => void
    value:string
}
export const  BasicTextFields:VFC<Props> = (props) => {
  const {label="",id,width=100,height=30,handleChange,value} = props
  const classes = useStyles();
  // const strStyeles = returnStyle(styles)
  return (
    <form className={classes.root} noValidate autoComplete="off" >
      <TextField 
      id="standard-basic" 
      label={label} 
      autoComplete="off" 
      onChange={handleChange}
      value={value}/>
      </form>  
  );
}