import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
    marginLeft: 75
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size="4rem" thickness="3" />
    </div>
  );
}