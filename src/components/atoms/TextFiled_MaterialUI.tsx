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
    type?:"text" | "password" 
}
export const  BasicTextFields:VFC<Props> = (props) => {
  const {label="",id,width=100,height=30,handleChange,value,type="text"} = props
  const classes = useStyles();
  // const strStyeles = returnStyle(styles)
  return (
    <form className={classes.root} noValidate autoComplete="off" >
      <TextField 
      id="standard-basic" 
      type={type}
      label={label} 
      autoComplete="on" 
      onChange={handleChange}
      value={value}/>
      </form>  
  );
}