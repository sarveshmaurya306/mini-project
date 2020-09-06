import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Paper } from '@material-ui/core';

import { AccountCircle, MailOutline, Https, } from '@material-ui/icons';
import axios from 'axios'
//setting aos
import AOS from 'aos';
import 'aos/dist/aos.css';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  papershadow: {
    boxShadow: '  0px 2px 4px -1px rgba(0,0,0,0.2),  0px 4px 5px 0px rgba(0,0,0,0.14),  0px 1px 10px 0px rgba(0,0,0,0.12)',
  }
}));

function Join() {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState({ name: '', email: '', password: '' })

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once:true,
      refresh:true,
    });
    AOS.refresh();
  }, [])

  return (
    <div  >
      
      <form  onSubmit={(e) => {
        e.preventDefault();
        axios.post('/signup', userDetails).then(server => console.log(server)).catch(e => console.log(e))

      }} >

        <div style={{ width: '100%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper data-aos="zoom-in" elevation={4} style={{ padding: "5% 15%", }} className={classes.papershadow}>
            <h1 style={{ borderBottom: ' 1px solid black', marginBottom: 15 }}>Join Us...</h1>

            <div className={classes.margin}>
              <Grid container spacing={1} alignItems="flex-end" >
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField onChange={e => setUserDetails({ ...userDetails, name: e.target.value })} id="input-with-icon-grid" autoCorrect='off' autoComplete='off' type="text" label="Name" />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <MailOutline />
                </Grid>
                <Grid item>
                  <TextField onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} id="input-with-icon-grid" type="email" label="Email" />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Https />
                </Grid>
                <Grid item>
                  <TextField onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} id="input-with-icon-grid" type="password" label="Password" />
                </Grid>
              </Grid>
              <Button
                style={{ marginTop: 50 }}
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"

                onClick={(e) => {
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                  e.target.innerHTML = 'adding...'
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

    </div>
  );
}

export default Join