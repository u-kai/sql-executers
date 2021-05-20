import React,{VFC} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);
type Props = {
    value?:string
    color?:"primary"|"secondary"
    onClick?:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export const ContainedButtons:VFC<Props> = (props) => {
  const classes = useStyles();
  const {value="Primary",color="primary",onClick} = props
  return (
    <div className={classes.root}>
      <Button variant="contained" color={color} onClick={onClick}>
        {value}
      </Button>
    </div>
    )
  }