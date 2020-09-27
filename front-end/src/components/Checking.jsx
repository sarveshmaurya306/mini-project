import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import axios from 'axios'

function MyApp() {

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('I love snacks.');
  };

  const handleClickVariant = (message ,variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {variant} );
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={()=>handleClickVariant('hi this is warning','success')}>Show success snackbar</Button>
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <MyApp />
    </SnackbarProvider>
  );
}
