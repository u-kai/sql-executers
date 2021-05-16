import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles({
  root: {
    top:0,
    leht:0,
    height:50,
    width: 150,
    zIndex:1,
    position:"absolute"
  },
});

export default function LabelBottomNavigation(props:{children:JSX.Element}) {
    const {children} = props
    const classes = useStyles();
    const [text,setText] = useState("")
    
    return (
      <BottomNavigation  className={classes.root}>
        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} 
        children={children}/>
      </BottomNavigation>
    );
  }