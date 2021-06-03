import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function EmptyCard(props) {
  const {children} = props
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{marginTop:20}}>
      <CardContent>
        {children}
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
