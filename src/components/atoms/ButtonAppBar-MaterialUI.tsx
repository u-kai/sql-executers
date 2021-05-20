
import Reac,{VFC} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


type Props = {
    buttons:string[]
    onClicks:((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)[]
    color?: "inherit" | "transparent" | "default" | "primary" | "secondary" | undefined
    title?:string

}
export const ButtonAppBar:VFC<Props> = (props) => {
  const classes = useStyles();
  const {buttons,onClicks,color="secondary",title="SQL-EXECUTERS"} = props
  return (
    <div className={classes.root}>
      <AppBar position="static" color={color}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
            {buttons?.map((button,i)=>(
                onClicks[i] ? (
                <Button color="inherit" onClick={onClicks[i]}>
                    {button}
                </Button>
                ) : (
                <Button color="inherit">
                    {button}
                </Button>
                )
            ))}
        </Toolbar>
      </AppBar>
    </div>
  );
}