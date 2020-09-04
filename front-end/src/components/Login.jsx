import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
import { Grid, Button, TextField, Paper } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { AccountCircle, MailOutline, Https, } from '@material-ui/icons';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Login() {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState({ name: '', email: '', password: '' })
  return (


    <form onSubmit={(e) => {
      e.preventDefault();
      axios.post('/signup', userDetails).then(server => console.log(server)).catch(e => console.log(e))

    }} >
      
      <div style={{width:'100%', height:'70%',display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Paper elevation={4} style={{padding:"5% 15%"}} >
      <h2 style={{borderBottom:' 1px solid black',marginBottom:15}}>Join Us...</h2>

        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" >
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField onChange={e => setUserDetails({ ...userDetails, name: e.target.value })} id="input-with-icon-grid" autoCorrect='off' autoComplete='off' type="text" label="User name" />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <MailOutline />
            </Grid>
            <Grid item>
              <TextField onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} id="input-with-icon-grid" type="email" label="email" />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Https />
            </Grid>
            <Grid item>
              <TextField onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} id="input-with-icon-grid" type="password" label="password" />
            </Grid>
          </Grid>
          <Button
            style={{marginTop:50}}
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"

            onClick={(e) => {
              setTimeout(() => {
                window.location.reload()
              }, 2000)
              e.target.innerHTML='adding...'
            }
          }
          >
            Add me...
      </Button>
        </div>
      </Paper>
      </div>
      {console.log('login loaded')}
    </form>
  );
}

export default Login