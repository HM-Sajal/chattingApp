import React from 'react'
import Grid from '@mui/material/Grid';
import MsgGroup from '../components/MsgGroup';
import Friends from '../components/Friends';

const Messages = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <MsgGroup/>
        <Friends/>
      </Grid>
      <Grid item xs={9}>
      </Grid>
    </Grid>
  )
}

export default Messages